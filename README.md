My Book Buddy
==============

Modern web app to track your reading, discover new books and events, and connect with friends. Monorepo with a React + Vite client and an Express + Prisma + PostgreSQL API.

Features
- Authentication: JWT access token + HTTP‑only refresh cookie, Axios interceptors with auto‑refresh and 401 retry
- Protected routes: Auth context, guarded views, axiosPrivate with Authorization header
- Books: Popular feed by default, fast search with AbortController, empty‑query fallback
- Friends & Profile: View profile, friends, and reading history (controllers and routes wired on API)
- UI/UX: Responsive hero, themed “We Offer” cards, page‑wide gradient with floating book SVGs
- DB & Migrations: Prisma schema + migrations (fixed self‑relation for refresh tokens)

Tech Stack
- Client: React, Vite, React Router, Axios, Tailwind CSS
- Server: Node.js, Express, Prisma ORM, PostgreSQL, cookie‑parser, CORS

Repository Layout
```
My-Book-Buddy/
  client/           # React app (components, pages, assets, styles)
  server/           # Express API (controllers, routes, middlewares, prisma)
  README.md
```

Prerequisites
- Node.js 18+
- PostgreSQL 13+ running locally (or a connection URL)

Environment (server/.env)
Create `server/.env` with:
```
DATABASE_URL=postgresql://user:pass@localhost:5432/bookbuddy
SHADOW_DATABASE_URL=postgresql://user:pass@localhost:5432/bookbuddy_shadow
JWT_ACCESS_SECRET=replace_with_strong_secret
JWT_REFRESH_SECRET=replace_with_strong_secret
CORS_ORIGIN=http://localhost:5173
PORT=3000
```

Install & Run (two terminals)
```powershell

cd server
npm install
npx prisma migrate dev ; npx prisma generate
npm start

cd ../client
npm install
npm run dev
```

Local URLs
- Client: http://localhost:5173
- API:    http://localhost:3000

Auth Flow (summary)
- Server sets an HTTP‑only refresh cookie on login
- Client stores access token in memory; `axiosPrivate` adds `Authorization: Bearer <token>`
- Axios interceptor refreshes on 401 and retries once
- Protected components defer fetching until token is ready

Key Client Paths
- `client/src/context/AuthContext.jsx` – token lifecycle, interceptors
- `client/src/api/axios.js` – `axiosPublic`/`axiosPrivate` instances
- `client/src/components/ProtectedRoute.jsx` – route guard
- `client/src/pages/Home.jsx` – gradient + floating SVG background
- `client/src/components/Hero.jsx` / `WeOffer.jsx` – hero and offer cards
- `client/src/App.css` – background and float keyframes

Key Server Paths
- `server/server.js` – app bootstrap, CORS, routes
- `server/controllers/` – auth, profile, books, events, friends, history
- `server/middlewares/AuthMiddleware.js` – bearer verification
- `server/prisma/schema.prisma` – DB models & relations

Production Notes
- Set cookies `Secure:true` (HTTPS) and tune `SameSite` per deployment
- Set `CORS_ORIGIN` to your client domain
- Run `npx prisma migrate deploy` during release pipelines

Scripts (typical)
- Client: `npm run dev`, `npm run build`, `npm run preview`
- Server: `npm run dev` (nodemon) or `node server.js`

Troubleshooting
- 401 on protected calls: check `Authorization` header and refresh cookie presence
- Cookies not sent: ensure `withCredentials` (client) and `credentials:true` in CORS (server)
- Prisma errors: verify `DATABASE_URL`/`SHADOW_DATABASE_URL`, then `prisma migrate dev`

License
This project is for learning/demo purposes. Add a license if you plan to distribute.
