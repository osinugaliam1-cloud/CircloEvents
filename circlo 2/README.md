# Circlo — Phase 1 Prototype

Interactive landing page + waitlist prototype, built with React, Vite, Tailwind CSS, and lucide-react.

## Run locally

```bash
npm install
npm run dev
```

Opens at http://localhost:5173

## Deploy to Cloudflare Pages

You have two options. **Option A (recommended)** connects to GitHub so every future push auto-deploys. **Option B** is a one-off manual upload with no GitHub needed.

### Option A — Connect a GitHub repo (auto-deploys on every push)

1. Push this folder to a new GitHub repo:
   ```bash
   git init
   git add .
   git commit -m "Circlo Phase 1"
   git branch -M main
   git remote add origin https://github.com/<your-username>/circlo.git
   git push -u origin main
   ```
2. Go to the Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Select the `circlo` repo.
4. Set the build settings:
   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
5. Click **Save and Deploy**. Cloudflare builds it and gives you a `*.pages.dev` URL.
6. Add a custom domain later under the project's **Custom domains** tab, once you have one.

### Option B — Manual upload (no GitHub)

1. Build the site locally:
   ```bash
   npm install
   npm run build
   ```
   This creates a `dist/` folder with static HTML/CSS/JS.
2. Go to the Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Upload assets**.
3. Drag in the `dist/` folder.
4. Cloudflare deploys it instantly and gives you a `*.pages.dev` URL.

### Option C — Wrangler CLI (fastest if you're comfortable with a terminal)

```bash
npm install
npm run build
npx wrangler pages deploy dist --project-name=circlo
```

The first run will prompt you to log in to Cloudflare in your browser.

## Notes

- The waitlist and demo forms currently store nothing — submissions just show a success state. Next step is wiring them to Supabase (`waitlist` and `demo_requests` tables) once we're ready to collect real signups.
- No environment variables or backend are required for this deploy — it's fully static.
