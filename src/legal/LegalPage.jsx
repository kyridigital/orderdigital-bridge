import { useEffect } from 'react'
import './legal.css'
import { LEGAL_PAGES } from './index.js'

const NEW_SITE_URL = 'https://takeawaygrowthagency.com'

export function LegalPage({ title, Component }) {
  useEffect(() => {
    const previous = document.title
    document.title = `${title} | OrderDigital`
    return () => {
      document.title = previous
    }
  }, [title])

  return (
    <div className="legal-page">
      <header className="legal-topbar">
        <a className="legal-wordmark" href="/">OrderDigital</a>
        <a className="legal-back" href="/">Back to home</a>
      </header>

      <main className="legal-content">
        <Component />
      </main>

      <footer className="legal-footer">
        <nav className="legal-footer-nav" aria-label="Legal">
          {LEGAL_PAGES.map((p) => (
            <a key={p.slug} href={`/${p.slug}`}>{p.title}</a>
          ))}
        </nav>
        <p className="legal-footer-note">
          OrderDigital is now{' '}
          <a href={NEW_SITE_URL}>Takeaway Growth Agency</a>. Questions? Email{' '}
          <a href="mailto:info@orderdigital.co.uk">info@orderdigital.co.uk</a>.
        </p>
      </footer>
    </div>
  )
}
