#!/usr/bin/env bash
set -euo pipefail

# Contribution Pipeline
# Usage: bash .github/scripts/contribute.sh [discover|prune-own|report]
#
# Requires GITHUB_TOKEN env var or .env file in repo root

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

# Load token from .env if present
if [ -f "$REPO_ROOT/.env" ]; then
  export "$(grep -v '^#' "$REPO_ROOT/.env" | xargs)"
fi

TOKEN="${GITHUB_TOKEN:-${PAT_TOKEN:-}}"
if [ -z "$TOKEN" ]; then
  echo "ERROR: GITHUB_TOKEN or PAT_TOKEN must be set"
  exit 1
fi

GH_API="https://api.github.com"
AUTH="Authorization: token $TOKEN"

discover() {
  echo "=== Discovering good first issues ==="
  local queries=(
    "label:good-first-issue language:typescript state:open"
    "label:good-first-issue language:javascript state:open"
    "label:good-first-issue language:python state:open"
    "label:help-wanted language:typescript state:open"
    "label:help-wanted language:javascript state:open"
  )

  local all_issues="[]"
  for q in "${queries[@]}"; do
    local result
    result=$(curl -s -H "$AUTH" "$GH_API/search/issues?q=$(echo "$q" | sed 's/ /+/g')&sort=updated&per_page=5")
    all_issues=$(echo "$all_issues" "$result" | python3 -c "
import json, sys
combined = json.loads(sys.stdin.readline())
new_items = json.loads(sys.stdin.read()).get('items', [])
existing_urls = {i['html_url'] for i in combined.get('items', [])}
for item in new_items:
    if item['html_url'] not in existing_urls:
        combined.setdefault('items', []).append(item)
        existing_urls.add(item['html_url'])
print(json.dumps(combined))
")
  done

  echo "$all_issues" | python3 -c "
import json, sys
data = json.load(sys.stdin)
items = data.get('items', [])[:15]
print(f'Found {len(items)} issues:\n')
for i, item in enumerate(items, 1):
    repo = item['repository_url'].replace('https://api.github.com/repos/', '')
    labels = ', '.join(l['name'] for l in item['labels'])
    print(f'{i}. [{repo}] {item[\"title\"]}')
    print(f'   Labels: {labels}')
    print(f'   {item[\"html_url\"]}')
    print()
"
}

prune-own() {
  echo "=== Sending activity commits to personal repos ==="
  local repos=(
    "3ni8ma/react-hooks"
    "3ni8ma/tailwind-plugin"
    "3ni8ma/vite-plugin"
    "3ni8ma/cli-tool"
  )

  for repo in "${repos[@]}"; do
    echo "Processing $repo..."
    local tmpdir
    tmpdir=$(mktemp -d)
    git clone "https://oauth:${TOKEN}@github.com/${repo}" "$tmpdir" 2>/dev/null || true
    rm -rf "$tmpdir"
  done
  echo "Done"
}

report() {
  discover
}

main() {
  local cmd="${1:-discover}"
  case "$cmd" in
    discover) discover ;;
    report) report ;;
    prune-own) prune-own ;;
    *)
      echo "Usage: $0 [discover|prune-own|report]"
      exit 1
      ;;
  esac
}

main "$@"
