# Ella's Birthday Dash

A mobile-first birthday game for Ella. The countdown opens at **12:00 PM on October 27, 2026 (Africa/Accra)**. Once open, the game stays available. The first visit on a browser gets a birthday greeting; later visits go straight to the game site.

## Run locally

1. Install Node.js 20 or newer and MongoDB (local or Atlas).
2. Create `server/.env` with `MONGODB_URI`, `PORT=4000`, and `CLIENT_ORIGINS=http://localhost:5173`. For local MongoDB, use `MONGODB_URI=mongodb://127.0.0.1:27017/ella_birthday`.
3. From this folder, run `npm install`, `npm --prefix client install`, `npm --prefix server install`, then `npm run dev`.
4. Open the Vite URL printed in the terminal (normally `http://localhost:5173`).

The local client uses Vite's `/api` proxy to reach Express on port 4000. Leave `VITE_API_BASE_URL` unset in local development. `npm run dev` remains the one-command local workflow.

## Deploy to Vercel and Render

This repository is configured as a Vercel static frontend and a Render Node API. Deploy the same repository to both providers:

1. Create a Render Blueprint from the repository using [`render.yaml`](render.yaml) at the repository root. The Blueprint sets the API root to `/server`. When prompted, set `MONGODB_URI` to your MongoDB Atlas connection string and set `CLIENT_ORIGINS` to the exact Vercel site origin, such as `https://your-site.vercel.app` (no trailing slash). Multiple origins can be comma-separated.
2. In Vercel, import the same repository and set the project's Root Directory to `client`. [`client/vercel.json`](client/vercel.json) installs the client dependencies, builds the Vite app, and publishes `dist` from that directory.
3. In Vercel Project Settings → Environment Variables, add `VITE_API_BASE_URL` with the Render service origin, such as `https://ella-birthday-api.onrender.com` (no `/api` suffix). Redeploy Vercel after saving it.
4. If the Vercel domain changes, update `CLIENT_ORIGINS` in Render to match the new exact origin and redeploy the API.

The client appends `/api` to `VITE_API_BASE_URL`. The browser calls Render directly in production; CORS only allows the origin or origins configured in `CLIENT_ORIGINS`. For local development, `client/.env` keeps the variable blank and the Vite proxy continues to use `http://localhost:4000`. The root [`vercel.json`](vercel.json) remains available if you prefer to configure Vercel with the repository root instead of `client`.

The Render Blueprint uses the Free plan by default. Free Render web services sleep after 15 minutes without traffic, so the first API request after a quiet period can take about a minute to wake the service. Upgrade the Render API service if you want it to stay warm for Ella's birthday.

During local development, open `http://localhost:5173/?preview=1` to bypass the countdown. The countdown page also has a **Developer preview** button. Preview scores and cashouts stay in the browser and do not write to MongoDB. This preview is disabled in production builds.

The client is in `/client` and the Express/Mongoose API is in `/server`. Cashout details are stored in the `accounts` collection in the `ella_birthday` database, in the `cashout` object on Ella's single account document. Game runs are stored in `runs`.

## Prize rule

The game is an endless side-scrolling runner: Ella can choose Bloop the slime, Miso the street cat, or Kofi the beach crab. Each runner jumps over cupcakes, cake stacks, and lollipops, collects parcels, and can pick up a one-hit shield or a short-lived parcel magnet. The character choice is saved on that device; every character uses the same run and reward rules. Power-ups wait for a clear gap between obstacles before spawning. When a life is lost, an angel descends to the runner and revives it with temporary protection. The scenery moves through Takoradi's high street, beach road, market circle, and harbour road, crossfading to the next area every 20 seconds. A complete run ends after all three lives are used. Each run earns `min(500, 50 + 2 × seconds survived + 5 × gifts collected)` cedis; run earnings accumulate up to GH₵500. Cashout clamps the total to GH₵50–GH₵500, guaranteeing the minimum even if she cashes out before playing. The amount stays hidden in the game/account API until Ella explicitly taps Cash Out, when the server returns a quote. After a successful claim it is shown on the birthday page and game HUD. MongoDB stores the amount in `accounts.cashout.amount` alongside the submitted name, mobile number, and rating.
"# party" 
