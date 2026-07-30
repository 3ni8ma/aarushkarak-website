import type { BlogPost } from '../blog'

export const communityOne: BlogPost = {
  slug: 'civic-tech-communityone',
  title: 'Civic Tech and Open Source Data Platforms',
  date: '2026-06-10',
  excerpt: 'Architecting backend tools for CommunityOne to bridge local public record accessibility gaps — using GitHub API integration, automated data pipelines, and open-source civic data standards.',
  tags: ['Civic Tech', 'Open Source', 'Python', 'Data', 'Community'],
  image: '/images/bg/about.jpg',
  content: `
## The Civic Data Problem

Local government decisions shape daily life — school funding, zoning laws, public transportation, police oversight. Yet the data documenting these decisions is scattered across thousands of city council websites, PDF meeting minutes, and proprietary databases. Finding out what your local government is doing requires checking multiple siloed sources.

CommunityOne is an open-source civic data platform that solves this. It aggregates fragmented legislative, nonprofit, and public records data into a structured, searchable navigator. Think of it as an intelligence layer for local public policy — tracking 90,000+ jurisdictions and 3M+ nonprofits to surface what's actually happening in communities.

[CommunityOne](https://www.communityone.com/) is a 501(c)(3) nonprofit building the Open Navigator for Engagement.

## What I Contributed

My work focused on the backend data infrastructure — specifically building the tooling to discover, ingest, and enrich open-source civic tech repositories as first-class data sources within the CommunityOne platform.

### The Problem Space

Civic tech projects live on GitHub, but they're hard to discover systematically. A volunteer-built housing transparency tool in Oakland won't show up in a search for "Seattle public records." The data exists — it's just not connected.

The goal: treat every open-source civic tech repository as a potential data source, with its own metadata, maintainers, contribution opportunities, and impact metrics.

## Architecture

The data pipeline has four stages:

\`\`\`
Discovery → Ingestion → Enrichment → Indexing
   │            │            │           │
   v            v            v           v
GitHub API   Repository   Metadata    CommunityOne
Topic Search  Cloning     Enrichment   Search Index
\`\`\`

### Stage 1: Discovery via GitHub Topics

GitHub's topic system groups repositories by keyword. Civic tech projects commonly use topics like \`civic-tech\`, \`open-government\`, \`public-data\`, and \`community-organizing\`. The discovery module searches by topic and rank by stars:

\`\`\`python
async def discover_civic_repos():
    topics = [
        'civic-tech',
        'open-government',
        'public-data',
        'community-organizing',
        'transparency',
        'municipal-data',
    ]

    repos = []
    for topic in topics:
        result = await github_api.search_repositories(
            query=f'topic:{topic}',
            sort='stars',
            order='desc',
            per_page=100,
        )
        repos.extend(result['items'])

    # Deduplicate by repo ID
    seen = set()
    unique = []
    for r in repos:
        if r['id'] not in seen:
            seen.add(r['id'])
            unique.append(r)

    return unique
\`\`\`

### Stage 2: Curated Lists (High Quality)

Topic search returns noise. Curated lists from established civic tech organizations provide higher signal:

- **Code for America Brigade Projects** — 80+ active brigade projects across US cities
- **U.S. Digital Response** — Rapid-response tools for government needs
- **Civic Tech Field Guide** — Catalog of ~1,000+ civic tech projects
- **Digital Public Goods Alliance** — Open source projects meeting DPG standards

Each source is ingested via its GitHub organization API or maintained as a manual registry:

\`\`\`python
async def ingest_cfa_brigades():
    # Code for America has org-level repos
    orgs = ['codeforamerica', 'cfa-brigade']

    for org in orgs:
        repos = await github_api.get_org_repos(org)
        for repo in repos:
            if is_civic_tech(repo):
                await index_repository(repo)
\`\`\`

### Stage 3: Metadata Enrichment

Raw repository data is enriched with additional context:

\`\`\`python
def enrich_repository(repo):
    return {
        'id': repo['id'],
        'name': repo['full_name'],
        'description': repo['description'],
        'language': repo['language'],
        'topics': repo['topics'],
        'stars': repo['stargazers_count'],
        'forks': repo['forks_count'],
        'license': repo['license']['spdx_id'] if repo['license'] else None,
        'maintainers': get_maintainers(repo['full_name']),
        'good_first_issues': count_issues(repo['full_name'], 'good first issue'),
        'last_commit': get_latest_commit(repo['full_name']),
        'health_score': calculate_health_score(repo),
    }
\`\`\`

The health score combines several signals:

\`\`\`python
def calculate_health_score(repo):
    score = 0.0

    # Recency: points for activity in last 90 days
    days_since_last_commit = (datetime.utcnow() - repo.last_commit).days
    if days_since_last_commit < 30: score += 0.3
    elif days_since_last_commit < 90: score += 0.15

    # Community: stars and contributors
    if repo.stars >= 100: score += 0.2
    elif repo.stars >= 10: score += 0.1

    if repo.contributors >= 5: score += 0.2
    elif repo.contributors >= 2: score += 0.1

    # Maintenance: open issues with PRs
    if repo.open_issues > 0: score += 0.15
    if repo.good_first_issues > 0: score += 0.15

    return min(score, 1.0)
\`\`\`

### Stage 4: Mapping to CommunityOne Concepts

CommunityOne models the world as Jurisdictions, Decision Makers, Causes, and Financial Documents. Open-source repositories map to these concepts:

| CommunityOne Concept | Repository Mapping |
|--------------------|-------------------|
| **Jurisdiction** | Repository (a self-contained community) |
| **Decision Makers** | Maintainers and core contributors |
| **Causes** | Open issues, especially "good first issue" |
| **Financial Documents** | Sponsorship info, OpenCollective, GitHub Sponsors |

\`\`\`python
def repo_to_jurisdiction(repo):
    return {
        'name': repo['full_name'],
        'type': 'open_source_project',
        'description': repo['description'],
        'location': None,  # Repos are virtual jurisdictions
        'population': repo['stars'],  # Stars as community size proxy
        'website': repo['html_url'],
        'data_sources': ['github_api'],
    }

def issue_to_cause(issue):
    return {
        'title': issue['title'],
        'description': issue['body'][:500] if issue['body'] else '',
        'type': 'contribution_opportunity',
        'difficulty': 'beginner' if 'good first issue' in issue['labels'] else 'advanced',
        'url': issue['html_url'],
    }
\`\`\`

## Technical Challenges

### GitHub API Rate Limiting

The unauthenticated GitHub API allows 60 requests per hour. Authenticated (with a personal access token): 5,000 requests per hour. For discovering and enriching thousands of repos, even the authenticated limit requires careful management:

\`\`\`python
class RateLimitedGitHubClient:
    def __init__(self, token):
        self.token = token
        self.remaining = 5000
        self.reset_time = 0

    async def request(self, endpoint):
        if self.remaining == 0:
            wait = self.reset_time - time.time()
            if wait > 0:
                await asyncio.sleep(wait + 1)

        async with aiohttp.ClientSession() as session:
            async with session.get(
                f'https://api.github.com{endpoint}',
                headers={'Authorization': f'token {self.token}'}
            ) as resp:
                self.remaining = int(resp.headers['X-RateLimit-Remaining'])
                self.reset_time = int(resp.headers['X-RateLimit-Reset'])
                return await resp.json()
\`\`\`

### Data Freshness

Repository metadata changes constantly. The pipeline refreshes at different cadences depending on data volatility:

| Data | Refresh Rate |
|------|-------------|
| Stars, forks, topics | Real-time (via API on access) |
| Good first issues | Weekly |
| Curated lists | Monthly |
| Full repository scan | Quarterly |

## Results

The pipeline successfully indexed hundreds of civic tech repositories, mapping them into CommunityOne's searchable navigator. Key metrics:

- **500+ repositories** discovered and enriched
- **9 curated data sources** integrated (Code for America, USDR, etc.)
- **1,000+ good first issues** indexed as contribution opportunities
- **200+ maintainers** documented as decision makers

## Lessons Learned

1. **GitHub topics are noisy but effective** — About 30% of topic-matched repos are genuinely civic tech, but the signal is strong enough to be useful with manual curation.
2. **Health scores need multiple signals** — Stars alone are misleading. A 5-star repo that was last updated yesterday is more useful than a 500-star repo abandoned in 2020.
3. **Curated lists beat algorithmic discovery** — The Code for America brigade directory and Civic Tech Field Guide produced higher-quality results than any GitHub topic search.
4. **Civic tech needs better metadata** — Many projects lack standard topics or descriptions that identify them as civic tech. A shared taxonomy (like the Civic Tech Field Guide's) would make discovery dramatically easier.

CommunityOne is [open source](https://github.com/getcommunityone) and actively looking for contributors. If you're interested in civic data infrastructure, the issues tagged "good first issue" are a great place to start.
`
}
