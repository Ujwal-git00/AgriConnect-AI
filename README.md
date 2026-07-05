# AgriConnect AI Week 2

A React frontend with a small Node backend API, real account signup/login, and a farmer dashboard.

## Run the app (easiest way)

```bash
npm install
npm run start
```

This starts the backend (port 5000) and the frontend (port 5173) together in one command.
Open the frontend URL Vite prints, usually `http://localhost:5173`.

## Run them separately (optional)

If you'd rather run each in its own terminal:

```bash
# Terminal 1
npm run backend

# Terminal 2
npm run dev
```

## Accounts

There is no demo login. Open the app, click **Login**, then switch to **Create Account** to
sign up with a name, email, and password. Accounts are saved to `backend/users.json` so you
can log back in later.

## Troubleshooting

- **"vite is not recognized"** — run `npm install` first; this installs Vite and other
  dependencies into `node_modules`.
- **"EADDRINUSE: address already in use :::5000"** — something is already using port 5000,
  usually a leftover backend process from an earlier run. Close any other terminal window
  running `npm run backend`, or find and stop the process:
  ```bash
  # Windows PowerShell
  netstat -ano | findstr :5000
  taskkill /PID <the_PID_you_see> /F
  ```
- **Login/signup says it can't reach the server** — make sure the backend is running
  (`npm run backend` or `npm run start`) before using the login page.

## API

- `GET /api/health`
- `POST /api/signup` — body: `{ name, email, password, location }`
- `POST /api/login` — body: `{ email, password }`
- `GET /api/dashboard` — requires `Authorization: Bearer <token>` from login/signup
