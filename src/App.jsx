import { useEffect, useState, useCallback } from 'react'
import './App.css'
import { ExitAnimation } from './ExitAnimation'

const NEW_SITE_URL = 'https://takeawaygrowthagency.com'
const REDIRECT_SECONDS = 8

function App() {
  const [secondsLeft, setSecondsLeft] = useState(REDIRECT_SECONDS)
  const [isExiting, setIsExiting] = useState(false)

  const finishExit = useCallback(() => {
    window.location.replace(NEW_SITE_URL)
  }, [])

  const startExit = useCallback(() => {
    setIsExiting(true)
  }, [])

  useEffect(() => {
    if (isExiting) return
    if (secondsLeft <= 0) {
      setIsExiting(true)
      return
    }

    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [isExiting, secondsLeft])

  const handleVisitClick = (e) => {
    e.preventDefault()
    startExit()
  }

  // Fallback: redirect even if the canvas animation fails to complete
  useEffect(() => {
    if (!isExiting) return
    const fallback = setTimeout(() => {
      window.location.replace(NEW_SITE_URL)
    }, 2200)
    return () => clearTimeout(fallback)
  }, [isExiting])

  // Reset exit state when the browser restores the page from bfcache
  useEffect(() => {
    const handlePageShow = (e) => {
      if (e.persisted) {
        setIsExiting(false)
        setSecondsLeft(REDIRECT_SECONDS)
      }
    }
    window.addEventListener('pageshow', handlePageShow)
    return () => window.removeEventListener('pageshow', handlePageShow)
  }, [])

  return (
    <>
      <ExitAnimation active={isExiting} onComplete={finishExit} />

      <div className={`bridge-page${isExiting ? ' exiting' : ''}`}>
        <header className="site-header">
          <a href={NEW_SITE_URL} className="logo" aria-label="OrderDigital" onClick={handleVisitClick}>
            <span className="logo-mark" aria-hidden="true" />
            <span className="logo-text">OrderDigital</span>
          </a>
        </header>

        <main>
          <section className="hero">
            <span className="eyebrow">Exciting news</span>
            <h1>
              We’ve evolved into<br />
              <span className="brand-name">Takeaway Growth Agency</span>
            </h1>
            <p className="subtitle">
              Same zero-commission ordering. Same UK team. Now powered by a full growth engine built to win you more customers and more profit.
            </p>

            <div className="cta-group">
              <a
                href={NEW_SITE_URL}
                className="cta-button"
                rel="noopener noreferrer"
                onClick={handleVisitClick}
              >
                {isExiting ? 'Taking you there…' : 'Visit Takeaway Growth Agency'}
              </a>
              {!isExiting && (
                <p className="redirect-note">
                  Redirecting automatically in <strong>{secondsLeft}</strong> second
                  {secondsLeft !== 1 ? 's' : ''}
                </p>
              )}
            </div>
          </section>

          <section className="stats" aria-label="Key results">
            <div className="stat">
              <strong>680,000+</strong>
              <span>orders driven</span>
            </div>
            <div className="stat">
              <strong>1,000+</strong>
              <span>UK shops</span>
            </div>
            <div className="stat">
              <strong>0%</strong>
              <span>commission</span>
            </div>
          </section>

          <section className="highlights">
            <div className="card">
              <div className="card-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
              <h2>From ordering to growth</h2>
              <p>
                Your branded app and website still come with 0% commission — now wrapped in a managed growth engine that wins customers before the portals do.
              </p>
            </div>
            <div className="card">
              <div className="card-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <h2>Keep more of what you earn</h2>
              <p>
                No 30%+ marketplace cuts. No setup fees. No contracts. Just a fixed fee and the profit you already deserve back in your pocket.
              </p>
            </div>
            <div className="card">
              <div className="card-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="8.5" cy="7" r="4" />
                  <path d="M20 8v6m3-3h-6" />
                </svg>
              </div>
              <h2>Own your customers</h2>
              <p>
                Portals rent you customers. We help you own them — with loyalty tools, reactivation campaigns, and a dedicated UK growth manager.
              </p>
            </div>
          </section>

          <section className="testimonial">
            <blockquote>
              “We reduced our annual commission bill by £75k. I’ve got my profits back and business is growing.”
            </blockquote>
            <cite>
              <strong>Adele J</strong>, Grill House, UK
            </cite>
          </section>
        </main>

        <footer className="footer">
          <p>
            Questions? Email us at{' '}
            <a href="mailto:hello@takeawaygrowthagency.com">hello@takeawaygrowthagency.com</a>
          </p>
          <p className="copyright">
            © {new Date().getFullYear()} Takeaway Growth Agency. Formerly OrderDigital.
          </p>
        </footer>
      </div>
    </>
  )
}

export default App
