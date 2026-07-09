import { BridgeLanding } from './BridgeLanding.jsx'

// Legacy OrderDigital legal URLs (/privacy, /merchantserviceagreement, ...)
// are 301-redirected to the canonical Takeaway Growth Agency terms pages at
// the Netlify edge — see netlify.toml. Everything else is the rebrand landing.
function App() {
  return <BridgeLanding />
}

export default App
