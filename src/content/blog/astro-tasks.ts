import type { BlogPost } from '../blog'

export const astroTasks: BlogPost = {
  slug: 'building-astro-tasks',
  title: 'Building astro-tasks: A Python CLI Developer Dashboard for NASA x Hack Club Stardance',
  date: '2026-07-28',
  excerpt: 'How I designed, packaged, and published a modular CLI to PyPI that integrates GitHub notifications, Hackatime coding stats, and git health checks into one pre-flight dashboard.',
  tags: ['Python', 'CLI', 'Hack Club', 'NASA', 'Open Source'],
  image: '/images/bg/home.jpg',
  content: `
## The Stardance Challenge

This summer, NASA partnered with Hack Club to launch the [Stardance Challenge](https://stardance.hackclub.com/) — the largest STEM event of the summer, powered by AMD and GitHub Education. Students aged 13-18 build projects using real NASA mission data from Artemis and the James Webb Space Telescope, logging hours to earn hardware prizes: Raspberry Pis, 3D printers, and even laptops.

I wanted to build something that would help other participants — and myself — stay on top of the daily coding workflow. The result is **astro-tasks**: a pre-flight checklist CLI that runs in your terminal and shows your GitHub status, coding stats, and local repo health in one place.

[View on GitHub](https://github.com/3ni8ma/astro-tasks) | [Install from PyPI](https://pypi.org/project/astro-tasks/)

## What It Does

\`\`\`
$ astro check

>>> ASTRO TASKS <<<
  pre-flight checklist

  [*] GitHub Status
  ------------------------------------------
    [+] Unread notifications: 3
    [+] Open PRs: 1

  [*] Coding Stats (Last 7 Days)
  ------------------------------------------
    [+] Total time: 40 hrs 12 mins
    [+] Daily average: 10 hrs 4 mins
    [+] Active days: 4

  [*] Top Projects
  ------------------------------------------
    [+]   react-hooks: 11 hrs 39 mins
    [+]   TheCoderBros-Website: 10 hrs 23 mins

  [*] Languages
  ------------------------------------------
    [+]   TypeScript: 35 hrs 12 mins
    [+]   Python: 7 hrs 53 mins

  [*] Local Repo Scan
  ------------------------------------------
    [+] cli-tool: branch: main
    [!] 3ni8ma: branch: main | 2 unpushed
\`\`\`

## Architecture

The package is organized into five modules, each responsible for a single domain:

\`\`\`
astro_tasks/
├── __init__.py      — Version and package metadata
├── __main__.py      — \`python -m astro_tasks\` support
├── cli.py           — Argument parsing and command routing
├── config.py        — Shared config (repos list, WakaTime path)
├── display.py       — Terminal UI with colorama
├── github_check.py  — GitHub notifications + open PRs
├── hackatime_check.py — WakaTime/Hackatime coding stats
├── repo_check.py    — Local git repo health scan
└── config_check.py  — Show current configuration
\`\`\`

### CLI Layer (cli.py)

Built with Python's \`argparse\`, the CLI exposes five commands via subparsers. The \`--version\` flag is handled at the top level, while each subcommand has its own handler function:

\`\`\`python
def main():
    parser = argparse.ArgumentParser(prog='astro', description='Pre-flight checklist')
    parser.add_argument('--version', action='store_true')
    sub = parser.add_subparsers(dest='command', title='Commands')

    p_check = sub.add_parser('check', help='Full pre-flight check')
    p_check.add_argument('--json', action='store_true', help='Output as JSON')
    p_check.set_defaults(func=cmd_check)

    p_scan = sub.add_parser('scan', help='Scan local repos')
    p_scan.set_defaults(func=cmd_scan)

    p_log = sub.add_parser('log', help='Show coding log from Hackatime')
    p_log.set_defaults(func=cmd_log)

    p_config = sub.add_parser('config', help='Show configuration')
    p_config.set_defaults(func=cmd_config)
\`\`\`

The JSON output flag on \`check\` enables piping into other tools — useful for integration with dashboard widgets or CI systems.

### GitHub Module (github_check.py)

This module shells out to the \`gh\` CLI for authentication and data fetching. Two endpoints:

\`\`\`python
def get_notifications():
    result = subprocess.run(
        ['gh', 'api', 'notifications'],
        capture_output=True, text=True, timeout=15
    )
    data = json.loads(result.stdout)
    unread = sum(1 for n in data if not n.get('unread', False) is False)
    return unread

def get_open_prs():
    result = subprocess.run([
        'gh', 'pr', 'list', '--author', config.GITHUB_USER, '--state', 'open',
        '--json', 'number,title,headRefName,baseRefName'
    ], capture_output=True, text=True, timeout=15, cwd=some_repo)
    return json.loads(result.stdout)
\`\`\`

Why shell out instead of using PyGithub? The \`gh\` CLI is pre-authenticated with the user's GitHub token (via \`gh auth login\`), which means the tool requires zero API key configuration. It Just Works if you already have GitHub CLI set up.

### Hackatime Module (hackatime_check.py)

This module reads the WakaTime config file at \`~/.wakatime.cfg\` and makes a direct HTTP request to the Hackatime API. Hackatime is a Hack Club fork of WakaTime that tracks coding activity:

\`\`\`python
def get_stats():
    cfg = configparser.ConfigParser()
    cfg.read(config.WAKATIME_CFG)
    api_key = cfg.get('settings', 'api_key')
    api_url = cfg.get('settings', 'api_url')

    url = f'{api_url}/users/current/stats/last_7_days'
    req = urllib.request.Request(url)
    req.add_header('Authorization', f'Bearer {api_key}')

    with urllib.request.urlopen(req, timeout=10) as resp:
        data = json.loads(resp.read().decode())
        return data.get('data', {})
\`\`\`

The response includes total time, daily average, and breakdowns by project, language, and category — all displayed in the terminal with color-coded sections.

### Repo Scan Module (repo_check.py)

Scans each tracked repository for three conditions:

\`\`\`python
def git_status(repo_dir):
    branch = subprocess.check_output(
        ['git', 'rev-parse', '--abbrev-ref', 'HEAD'],
        cwd=repo_dir, timeout=10
    ).decode().strip()

    unpushed = subprocess.check_output(
        ['git', 'log', '--oneline', f'origin/{branch}..HEAD'],
        cwd=repo_dir, timeout=10
    ).decode().strip()

    dirty = subprocess.check_output(
        ['git', 'status', '--porcelain'],
        cwd=repo_dir, timeout=10
    ).decode().strip()

    return branch, { 'unpushed': count, 'dirty': bool(dirty) }
\`\`\`

This catches common mistakes: forgetting to push, having uncommitted changes, or being on the wrong branch.

### Terminal UI (display.py)

Uses \`colorama\` for cross-platform colored terminal output. Each display function corresponds to a message severity:

\`\`\`python
def banner():
    print(f'  {Fore.CYAN}{Style.BRIGHT}>>> ASTRO TASKS <<<{Style.RESET_ALL}')
    print(f'  {Fore.YELLOW}pre-flight checklist{Style.RESET_ALL}')

def print_ok(label, value):
    print(f'    {Fore.GREEN}[+]{Style.RESET_ALL} {label}: {Fore.WHITE}{value}{Style.RESET_ALL}')

def print_warn(label, value):
    print(f'    {Fore.YELLOW}[!]{Style.RESET_ALL} {label}: {Fore.WHITE}{value}{Style.RESET_ALL}')
\`\`\`

## Publishing to PyPI

The package uses \`setuptools\` with a console_scripts entry point:

\`\`\`python
# setup.py
setup(
    name='astro-tasks',
    version='0.1.2',
    packages=find_packages(),
    entry_points={
        'console_scripts': [
            'astro=astro_tasks.cli:main',
        ],
    },
    install_requires=['colorama>=0.4.6'],
    python_requires='>=3.8',
)
\`\`\`

Publishing is a single command:
\`\`\`bash
python -m build
python -m twine upload dist/*
\`\`\`

The only runtime dependency is \`colorama\` — the rest uses Python standard library (\`argparse\`, \`subprocess\`, \`urllib.request\`, \`configparser\`, \`json\`). This keeps the install size minimal and avoids dependency hell.

## Design Decisions

### Why a CLI?

- **Zero configuration** for users who already have \`gh\` and Hackatime set up
- **Composable** — each subcommand can be used independently or piped
- **Fast** — cold start in under 200ms, no Electron process
- **Terminal-native** — developers spend most of their time in the terminal

### Why Not a TUI?

A TUI (Textual, urwid, etc.) would look fancier but adds complexity and dependency weight. The tabular output format is readable and grep-able. The \`--json\` flag provides structured output for anyone who wants to build a UI on top.

### Why Tracked Repos?

The config file defines which repos to scan:

\`\`\`python
REPOS = [
    { 'name': 'react-hooks', 'dir': '/path/to/react-hooks' },
    { 'name': 'cli-tool', 'dir': '/path/to/cli-tool' },
    # ...
]
\`\`\`

Hardcoding paths avoids scanning every directory under \`~/Coding Projects\` (which would be slow and return irrelevant results). The trade-off is a manual setup step — but you only do it once.

## Lessons Learned

1. **Standard library is enough** — \`argparse\` + \`subprocess\` + \`urllib\` + \`json\` handled the entire feature set without third-party dependencies beyond \`colorama\`.
2. **Entry points are elegant** — \`console_scripts\` makes the CLI instantly available system-wide after \`pip install\`.
3. **Error messages matter more than features** — Every API call has a try-except with a human-readable fallback message. A tool that crashes with a traceback feels broken; a tool that gracefully says "Could not reach GitHub API" feels temporarily offline.
4. **JSON output costs almost nothing** — Adding \`--json\` was 5 lines of code but enables integration with anything.

## Try It

\`\`\`bash
pip install astro-tasks
astro check
\`\`\`

Full source on [GitHub](https://github.com/3ni8ma/astro-tasks). Built for the [NASA x Hack Club Stardance Challenge](https://stardance.hackclub.com/).
`
}
