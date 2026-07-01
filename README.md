# OrderDigital → Takeaway Growth Agency

A positive, on-brand bridging page for visitors arriving at the old OrderDigital domain. It announces the rebrand to **Takeaway Growth Agency** and automatically redirects to the new site.

## Live site

- **Netlify URL:** https://orderdigital-bridge.netlify.app
- **GitHub repo:** https://github.com/kyridigital/orderdigital-bridge
- **Netlify admin:** https://app.netlify.com/projects/orderdigital-bridge

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

## Deployment

The site is deployed to Netlify. The previous GitHub Actions auto-deploy workflow was removed because it triggered failing builds through a misconfigured build hook.

To deploy manually from this repo:

```bash
npm run build
netlify deploy --prod --dir=dist
```

To set up automatic deploys on every push to `main`, connect the GitHub repo inside Netlify:

1. Go to https://app.netlify.com/projects/orderdigital-bridge
2. Click **Build & deploy → Continuous deployment → Git repository**
3. Select **GitHub** and authorise Netlify
4. Choose the `kyridigital/orderdigital-bridge` repository
5. Netlify will auto-detect the build settings from `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Save — from then on every push to `main` will deploy automatically.

## Connect your custom domain

1. In the Netlify admin, go to **Domain settings → Add custom domain**
2. Enter `orderdigital.co.uk` (or whichever old domain you want to point here)
3. Update the domain’s DNS to Netlify’s servers when prompted
4. Add an SSL/TLS certificate (Netlify can provision one automatically)

Once the DNS propagates, anyone visiting the old OrderDigital domain will see the bridging page and be redirected to Takeaway Growth Agency.

## License

Internal use for Takeaway Growth Agency.
