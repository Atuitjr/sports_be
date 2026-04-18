# Soca Backend

Football data aggregation REST API built with **Node.js + TypeScript + Express + Redis**. Fetches data from [football-data.org](https://www.football-data.org) and caches responses in Redis to minimise external API calls.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js (ESM) |
| Language | TypeScript 5 (strict) |
| Framework | Express 5 |
| Cache | Redis via ioredis |
| HTTP Client | Axios |

---

## Project Structure

```
src/
├── app.ts                  # Express app setup (middleware, routes, error handler)
├── index.ts                # Entry point + graceful shutdown
├── constants/              # Cache keys and TTL values
├── controllers/football/   # Request/response handling
├── useCases/football/      # Business logic + cache orchestration
├── repositories/
│   ├── football.ts         # football-data.org API calls
│   └── redisRepository.ts  # Redis read/write helpers
├── interfaces/football/    # TypeScript types and request interfaces
├── lib/
│   ├── axios.ts            # Axios singleton
│   ├── redis.ts            # Redis client
│   └── logger.ts           # Structured JSON logger
├── middleware/
│   └── errorHandler.ts     # Global Express error handler
├── errors/
│   └── AppError.ts         # Custom error classes
└── utils/
    └── utils.ts            # Shared utility functions
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- A Redis instance (local or [Redis Cloud](https://redis.io/cloud/) free tier)
- A [football-data.org](https://www.football-data.org) API key (free tier available)

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file at the project root:

```env
# Server
PORT=3000
BASE_PATH=/api

# football-data.org
FOOTBALL_API_BASE_URL=https://api.football-data.org/v4
API_HEADER_NAME=X-Auth-Token
API_SECRET_KEY=your_api_key_here
API_TIMEOUT=5000

# Redis
REDIS_URL=redis://127.0.0.1:6379

# Logging: error | warn | info | debug
LOG_LEVEL=info
```

### Running locally

```bash
# Development (hot reload)
npm run dev

# Production build
npm run build
npm run start
```

---

## API Reference

All endpoints are prefixed with `/api/football`.

### Countries

```
GET /api/football/countries
```

| Query Param | Type | Required | Description |
|---|---|---|---|
| `countryId` | number | No | Filter by country ID |

---

### Seasons

```
GET /api/football/seasons
```

No parameters.

---

### Leagues

```
GET /api/football/leagues
```

| Query Param | Type | Required | Description |
|---|---|---|---|
| `countryId` | number | Yes | Filter leagues by country ID |

---

### Standings

```
GET /api/football/standings
```

| Query Param | Type | Required | Description |
|---|---|---|---|
| `leagueId` | number | Yes | Competition ID |

---

### Teams

```
GET /api/football/team
```

| Query Param | Type | Required | Description |
|---|---|---|---|
| `teamId` | number | One of | Get a single team by ID |
| `leagueId` | number | One of | Get all teams in a league |

---

### Player

```
GET /api/football/player
```

| Query Param | Type | Required | Description |
|---|---|---|---|
| `playerId` | number | Yes | Player ID |

---

### Top Scorers (Pichichi)

```
GET /api/football/pichichi
```

| Query Param | Type | Required | Description |
|---|---|---|---|
| `leagueId` | number | Yes | Competition ID |

---

### Matches by Competition

```
GET /api/football/matches/competition
```

| Query Param | Type | Required | Description |
|---|---|---|---|
| `leagueId` | number | Yes | Competition ID |

---

### Matches by Team

```
GET /api/football/matches/team
```

| Query Param | Type | Required | Description |
|---|---|---|---|
| `teamId` | number | Yes | Team ID |

---

### Single Match

```
GET /api/football/matches
```

| Query Param | Type | Required | Description |
|---|---|---|---|
| `matchId` | number | Yes | Match ID |

---

## Caching Strategy

Responses are cached in Redis to avoid hitting the external API on every request.

| Data | Strategy | TTL |
|---|---|---|
| Countries, Seasons | String key | 24 hours |
| Leagues, Standings, Teams, Players, Matches | Hash field per ID | 1 week |

---

## Deployment

### Render / Railway (recommended free tier)

1. Push the repo to GitHub.
2. Create a new **Web Service** on [Render](https://render.com) or [Railway](https://railway.app) pointing at the repo.
3. Set the following:
   - **Build command:** `npm install && npm run build`
   - **Start command:** `npm run start`
4. Add all environment variables from the `.env` section above in the platform's dashboard.
5. Provision a Redis instance (Redis Cloud free tier or the platform's built-in Redis add-on) and set `REDIS_URL`.

### GitHub Actions (auto-deploy on push)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger deploy hook
        run: curl -X POST ${{ secrets.DEPLOY_HOOK_URL }}
```

Set `DEPLOY_HOOK_URL` as a secret in your GitHub repository settings. Render and Railway both provide a deploy hook URL in their dashboard.

---

## Logging

Logs are structured JSON written to stdout. Control verbosity with the `LOG_LEVEL` env var:

| Level | When to use |
|---|---|
| `error` | Production — errors only |
| `warn` | Warnings + errors |
| `info` | Default — requests and lifecycle events |
| `debug` | Local dev — cache hits/misses and outgoing API calls |
