import { useEffect, useState } from 'react'
import './App.css'

const NEW_SITE_URL = 'https://takeawaygrowthagency.com'
const REDIRECT_SECONDS = 8

function App() {
  const [secondsLeft, setSecondsLeft] = useState(REDIRECT_SECONDS)

  useEffect(() => {
    if (secondsLeft <= 0) {
      window.location.href = NEW_SITE_URL
      return
    }

    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [secondsLeft])

  return (
    <main className="bridge-page">
      <div className="gradient-orb orb-top" aria-hidden="true" />
      <div className="gradient-orb orb-bottom" aria-hidden="true" />

      <section className="hero">
        <div className="badge">Exciting news</div>
        <h1>
          OrderDigital has evolved into<br />
          <span className="brand-name">Takeaway Growth Agency</span>
        </h1>
        <p className="subtitle">
          Same team. Same zero-commission mission. A bigger, smarter way to grow your takeaway.
        </p>

        <div className="cta-group">
          <a
            href={NEW_SITE_URL}
            className="cta-button"
            rel="noopener noreferrer"
          >
            Visit Takeaway Growth Agency
          </a>
          <p className="redirect-note">
            Redirecting you automatically in <strong>{secondsLeft}</strong> second
            {secondsLeft !== 1 ? 's' : ''}…
          </p>
        </div>
      </section>

      <section className="highlights">
        <div className="card">
          <span className="card-icon">🚀</span>
          <h2>From ordering to growth</h2>
          <p>
            We still build your branded app and website with 0% commission — now wrapped in a managed growth engine that wins customers before the portals do.
          </p>
        </div>
        <div className="card">
          <span className="card-icon">💰</span>
          <h2>Keep more of what you earn</h2>
          <p>
            No 30%+ marketplace cuts. No setup fees. No contracts. Just a fixed fee and the profit you already deserve back in your pocket.
          </p>
        </div>
        <div className="card">
          <span className="card-icon">🎯</span>
          <h2>Own your customers</h2>
          <p>
            Portals rent you customers. We help you own them — with loyalty tools, reactivation campaigns, and a dedicated UK growth manager.
          </p>
        </div>
      </section>

      <footer className="footer">
        <p>
          Questions? Email us at{' '}
          <a href="mailto:hello@takeawaygrowthagency.com">hello@takeawaygrowthagency.com</a>
        </p>
        <p className="copyright">
          © {new Date().getFullYear()} Takeaway Growth Agency. Formerly OrderDigital.
        </p>
      </footer>
    </main>
  )
}

export default App
