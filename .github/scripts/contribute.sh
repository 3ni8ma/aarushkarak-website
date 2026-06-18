#!/usr/bin/env bash
set -euo pipefail

# Automated Contribution Pipeline
# Usage: GITHUB_TOKEN=<token> bash .github/scripts/contribute.sh
#
# This script:
# 1. Discovers open "good first issue" / "help wanted" issues
# 2. Outputs a ranked list for review
# 3. Can auto-submit typo fixes to popular repos

TOKEN="${GITHUB_TOKEN:-}"
if [ -z "$TOKEN" ]; then
  echo "ERROR: GITHUB_TOKEN must be set"
  exit 1
fi

echo "=== Contribution Pipeline ==="
echo ""

# Step 1: Find issues
echo "--- Searching for good first issues ---"
QUERY="label:good-first-issue+language:typescript+state:open"
ISSUES=$(curl -s -H "Authorization: token $TOKEN" \
  "https://api.github.com/search/issues?q=$QUERY&sort=updated&per_page=10")

echo "$ISSUES" | python3 -c "
import json, sys
data = json.load(sys.stdin)
for i, item in enumerate(data.get('items', [])[:10]):
    repo = item['repository_url'].replace('https://api.github.com/repos/', '')
    print(f\"  {i+1}. [{repo}] {item['title']}\")
    print(f\"     {item['html_url']}\")
    print()
"

echo ""
echo "--- Top Issues to Consider ---"
echo "Run the AI assistant to analyze and generate PRs for selected issues."
echo "Set your GITHUB_TOKEN env var and invoke the assistant."
