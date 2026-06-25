# Daily Contribution Routine

Call me daily to run the contribution pipeline.

## Git config

Git commits MUST use your primary GitHub email:
- Email: `worldshaans@gmail.com`
- Name: `Aarush Karak`

This is critical — only commits with this email show on your contribution graph.

I will:

1. Run the issue discovery to find good-first-issues matching your stack
2. Pick 1-3 issues to work on
3. Analyze the codebase and generate PRs
4. Submit them via your GitHub account

## Quick start

```
> Run daily contribution pipeline
```

## Dev server

Managed via `screen` session named `vite-dev`:

```bash
# Start (if not running)
screen -dmS vite-dev bash -c "cd /path/to/project && npx vite --port 5173 --host 2>&1 | tee /tmp/vite-dev.log"

# View logs
cat /tmp/vite-dev.log

# Reattach to console
screen -r vite-dev

# Stop
screen -S vite-dev -X quit
```

## Automated workflows (run on schedule)

| Workflow | Schedule | What it does |
|---|---|---|
| Daily Issue Discovery | Weekdays 8am | Finds `good-first-issue` / `help-wanted` issues, creates report |
| Weekly Typo Scan | Mondays 10am | Scans popular repos for documentation typos |
| Dependabot | Weekly | Auto-PRs for dependency updates |
| CI | On push/PR | Lints and builds |

## Personal repos to maintain

- `3ni8ma/react-hooks` - React hook library
- `3ni8ma/tailwind-plugin` - Tailwind CSS utilities
- `3ni8ma/vite-plugin` - Vite sitemap plugin
- `3ni8ma/cli-tool` - Project scaffolding CLI
- `3ni8ma/aarushkarak-website` - Portfolio site
