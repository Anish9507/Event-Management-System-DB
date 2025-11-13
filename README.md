# Event Management Platform

A full‑stack app to create, view, update, and delete events. Users can sign up and log in, then manage their personal events. The backend is Express with JWT auth and SQLite/MySQL; the frontend is React.

## Features
- Auth: signup, login with JWT
- Event CRUD for the authenticated user
- Responsive UI (React + Tailwind styles via CRA)
- SQLite (default) or MySQL, auto‑migrated tables

## Tech Stack
- React 18, react-router-dom
- Express 4, cors, jsonwebtoken, bcryptjs
- SQLite3 (default) or MySQL2

## Getting Started (Local)
- Prereqs: Node 18+
- Install deps:
  ```bash
  npm install
  ```
- Set env vars: copy `.env.example` to `.env` and fill values. Minimal:
  ```env
  JWT_SECRET=dev_secret_change_me
  DB_CLIENT=sqlite3
  ```
- Run in development (two terminals):
  ```bash
  npm run dev         # starts Express on http://localhost:5000
  npm run start:web   # starts React on http://localhost:3000
  ```
- Or build UI and run a single server:
  ```bash
  npm run build
  npm start           # Express serves ./build at PORT (defaults 5000)
  ```

## Environment Variables
- `JWT_SECRET` (required)
- `DB_CLIENT` = `sqlite3` (default) or `mysql2`
- MySQL only:
  - `DB_HOST`, `DB_USER`, `DB_PASS`, `DB_NAME`
- `NODE_ENV` is set by your environment; Render uses `production`.

## API Endpoints
Base path: `/api`
- Auth
  - `POST /auth/signup` { name, email, password }
  - `POST /auth/login` { email, password }
- Events (requires `Authorization: Bearer <token>`)
  - `GET /events`
  - `POST /events`
  - `PUT /events/:id`
  - `DELETE /events/:id`

## Deploy on Render (single Web Service)
1) Push this repository to GitHub.
2) In Render: New → Web Service → Connect the repo.
3) Configure:
   - Environment: Node
   - Build Command:
     ```bash
     npm install && npm run build
     ```
   - Start Command:
     ```bash
     npm start
     ```
   - Environment Variables:
     - `NODE_ENV=production`
     - `JWT_SECRET=your_prod_secret`
     - `DB_CLIENT=sqlite3` (simplest) or `mysql2` with the MySQL vars
4) If using SQLite, add a Disk for persistence:
   - Mount path: `/opt/render/project/src/data`
   - Size: 1GB+ as needed
   - The app writes the database to `./data/events.sqlite` which resolves to that mount path.
5) Create Web Service and wait for build → Open the Render URL.

### Using MySQL on Render
Provide `DB_CLIENT=mysql2` and set `DB_HOST`, `DB_USER`, `DB_PASS`, `DB_NAME`. Tables are created automatically on first boot.

## Scripts
- `npm run dev` → dev backend with nodemon
- `npm run start:web` → React dev server
- `npm run build` → Build React to `./build`
- `npm start` → Start Express and (in production) serve `./build`

## Project Structure
```
server/
  server.js        # Express app and routing
  routes/          # /api/auth, /api/events
  middleware/      # JWT auth
  db.js            # SQLite/MySQL wrapper + migrations
src/               # React app
build/             # Production build output (generated)
```

## Security Notes
- Passwords are hashed with bcrypt.
- JWT is signed with `JWT_SECRET`. Keep this secret in production.

## License
MIT (add your preferred license if different)
