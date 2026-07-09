import { BridgeLanding } from './BridgeLanding.jsx'
import { LegalPage } from './legal/LegalPage.jsx'
import { LEGAL_PAGES } from './legal/index.js'

// Normalise the pathname: drop a trailing slash (except root) and lower-case
// so /Privacy, /privacy and /privacy/ all resolve to the same page.
function normalizePath(pathname) {
  let path = pathname.toLowerCase()
  if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1)
  return path
}

function App() {
  const path = normalizePath(window.location.pathname)
  const page = LEGAL_PAGES.find((p) => `/${p.slug}` === path)

  // Legal routes render their static content and never auto-redirect.
  if (page) {
    return <LegalPage title={page.title} Component={page.Component} />
  }

  // Every other path is the rebrand landing, which redirects to the new site.
  return <BridgeLanding />
}

export default App
