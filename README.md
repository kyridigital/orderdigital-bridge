# OrderDigital → Takeaway Growth Agency

A positive, on-brand bridging page for visitors arriving at the old OrderDigital domain. It announces the rebrand to **Takeaway Growth Agency** and automatically redirects to the new site.

## What it does

- Welcomes OrderDigital visitors with an exciting rebrand message
- Highlights the same zero-commission promise plus the new managed growth offering
- Auto-redirects to [takeawaygrowthagency.com](https://takeawaygrowthagency.com) after 8 seconds
- Provides a manual CTA for instant navigation
- Works for any path on the old domain (Netlify SPA redirect rule included)

## Tech stack

- [React](https://react.dev)
- [Vite](https://vitejs.dev)
- [Netlify](https://netlify.com)

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build for production

```bash
npm run build
```

The static site is output to the `dist/` folder.

## Deploy on Netlify

### Option 1: Drag & drop

1. Run `npm run build`
2. Drag the `dist/` folder into [Netlify Drop](https://app.netlify.com/drop)
3. Set your custom domain to the old OrderDigital domain

### Option 2: Git-connected continuous deploy

1. Push this repo to GitHub
2. In Netlify, click **Add new site → Import an existing project**
3. Select the GitHub repo
4. Build settings are already configured in `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Click **Deploy site**
6. Add your old domain under **Domain settings → Add custom domain**

### Important DNS note

Point the old OrderDigital domain’s DNS to Netlify so visitors land on this bridging page instead of the old site. Netlify will provide the required DNS records after you add the custom domain.

## Push to GitHub

```bash
git init
git add .
git commit -m "Initial bridging page"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/orderdigital-bridge.git
git push -u origin main
```

## License

Internal use for Takeaway Growth Agency.
