import type { BlogPost } from '../blog'

export const fullstackFinancePlatform: BlogPost = {
  slug: 'building-fullstack-finance-platform',
  title: 'Building AuraFinance: A Full-Stack Financial Intelligence Platform on Zero Budget',
  date: '2026-07-20',
  excerpt: 'How I built a production-grade financial analytics platform with real-time market monitoring, AI forecasting, and portfolio analysis — using only free-tier infrastructure.',
  tags: ['Finance', 'React', 'Python', 'Supabase', 'AI'],
  image: '/images/bg/home.jpg',
  content: `
## The Zero-Cost Challenge

Could you build a useful financial intelligence platform without spending a dollar on infrastructure? That was the question.

The answer is yes — with the right architecture.

## Architecture

\`\`\`
Frontend (Vercel free)   →   Backend (Render free)   →   Supabase (free tier)
React + Vite + Tailwind        FastAPI + Prophet          PostgreSQL + Auth
\`\`\`

### Frontend: React + Vite + Tailwind

The UI needed to feel real-time without real-time infrastructure costs. Solution: 2000ms polling instead of WebSockets. It's not as snappy as dedicated WebSockets, but for a free-tier app, it's indistinguishable to most users.

### Backend: FastAPI + Prophet

Market data comes from yfinance (free Yahoo Finance scraper). Forecasts run on Meta's Prophet library with 12-hour caching via cachetools — no redundant compute cycles.

The correlation matrix uses \`numpy.corrcoef\` on 90 days of closing prices:

\`\`\`python
import numpy as np

def correlation_matrix(returns: np.ndarray) -> np.ndarray:
    return np.corrcoef(returns.T)
\`\`\`

### Database: Supabase

Supabase Auth handles authentication (email/password), and Row Level Security policies scope every query to \`user_id\`. No custom JWT management needed.

## Dealing With Free-Tier Limitations

| Constraint | Solution |
|------------|----------|
| Render spins down after 15 min | Health endpoint for cold-start handling |
| yfinance transient empty payloads | try-except fallback with retry logic |
| No real WebSockets | 2000ms polling simulation |
| Prophet compute is heavy | 12-hour cache with cachetools |

## Key Features

- **Live Portfolio Dashboard** — Track holdings with real-time price updates
- **AI Price Forecasts** — 30-day Prophet projections with 80% confidence intervals
- **Technical Indicators** — RSI (14-period, 70/30), MACD (12/26/9)
- **Correlation Matrix** — Compare up to 5 tickers
- **Portfolio Analysis** — Performance tracking and allocation views

## What I'd Do Differently

1. **Use Redis for caching** — In-memory cachetools works, but Redis would persist across Render restarts
2. **Add WebSocket support** — When the project generates revenue, real-time WebSockets are the first upgrade
3. **Background tasks with Celery** — Prophet forecasts block the API for a few seconds

## Try It

The platform is live at [aura-finance.vercel.app](https://aura-finance.vercel.app). Full source on [GitHub](https://github.com/3ni8ma/Finance-Hub).
`
}
