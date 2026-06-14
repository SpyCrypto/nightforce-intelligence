# Deployment Procedure for Netlify

## Prerequisites

- GitHub repository connected to Netlify
- Midnight contract deployed and contract address available
- Netlify account

## One-Time Setup in Netlify

### 1. Import the Repository

1. Go to **[Netlify Dashboard](https://app.netlify.com)**
2. Click **"Add new site" → "Import an existing project"**
3. Connect GitHub and select `nightforce-intelligence`
4. Netlify will auto-detect settings from `netlify.toml`:
   - **Build command**: `pnpm build-production`
   - **Publish directory**: `frontend-vite-react/dist`
   - **Node version**: `22`

### 2. Configure Environment Variables

Go to **Site configuration → Environment variables** and add:

| Variable | Value |
|----------|-------|
| `VITE_CONTRACT_ADDRESS` | Your deployed contract address |

### 3. Deploy

Click **"Deploy site"** — Netlify will build and deploy automatically.

## Deployment Steps

### Every Deployment

1. **Commit and push changes**
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```

2. **Netlify automatically deploys** from the main branch.

### Manual Redeploy (if needed)

1. Go to **Netlify Dashboard → Deploys**
2. Click **"Trigger deploy" → "Clear cache and deploy site"**

## Post-Deployment Verification

### 1. Check Build Logs

In the Netlify dashboard, open the latest deploy and verify:
```
pnpm build-production
cd counter-contract && pnpm build
cd ../frontend-vite-react && pnpm build
```

### 2. Test the Application

1. Open your deployed app (`https://your-site.netlify.app`)
2. Connect wallet
3. Navigate through Dashboard, Spy Chat, Vault, Missions, Reputation
4. Verify wallet connection status updates correctly

## Build Process Flow

```
1. Netlify clones repo
2. pnpm install (installs all workspace dependencies)
3. pnpm build-production
   3a. cd counter-contract && pnpm build
       → Compiles Compact contract
       → Generates keys to counter-contract/src/managed/
   3b. cd frontend-vite-react && pnpm build
       → pnpm copy-contract-keys (copies keys to public/)
       → vite build → output: frontend-vite-react/dist/
4. Netlify serves frontend-vite-react/dist/
5. SPA redirects handled via netlify.toml (/* → /index.html)
```

## Common Issues & Quick Fixes

### Issue: 404 on page refresh

**Cause**: SPA routing requires catch-all redirect.  
**Fix**: Already handled in `netlify.toml` — the `/* → /index.html` redirect rule.

### Issue: Build fails on `pnpm` not found

**Fix**: Netlify detects `packageManager` from `package.json`. Ensure `netlify.toml` sets `PNPM_VERSION = "10.14.0"`.

### Issue: `VITE_CONTRACT_ADDRESS` missing

**Fix**: Add it in **Site configuration → Environment variables** and redeploy.

## Emergency Rollback

1. Go to **Netlify Dashboard → Deploys**
2. Find last working deploy
3. Click **"Publish deploy"**

## Checklist Before First Deployment

- [ ] `netlify.toml` committed to repository
- [ ] Environment variable `VITE_CONTRACT_ADDRESS` set in Netlify
- [ ] Node 22 available (set via `netlify.toml`)
- [ ] All changes pushed to main branch

## Checklist For Every Deployment

- [ ] Environment variables are correct
- [ ] Changes committed and pushed
- [ ] Build logs show successful compilation
- [ ] Application loads and routes work correctly
