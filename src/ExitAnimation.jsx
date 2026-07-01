import { useEffect, useRef } from 'react'

const DURATION = 1600

function createParticles(width, height) {
  const area = width * height
  const count = Math.min(450, Math.floor(area / 3000))
  const particles = []
  const colors = ['#fb4c7b', '#ff6b90', '#ffffff', '#ffd1dc']
  const centerX = width / 2
  const centerY = height / 2

  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2
    const speed = 2.5 + Math.random() * 7
    const size = 1.2 + Math.random() * 4.5
    const color = colors[Math.floor(Math.random() * colors.length)]
    const ring = Math.random() * 80

    particles.push({
      x: centerX + Math.cos(angle) * ring,
      y: centerY + Math.sin(angle) * ring,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size,
      color,
      alpha: 0.5 + Math.random() * 0.5,
      decay: 0.004 + Math.random() * 0.012,
      gravity: 0.04 + Math.random() * 0.12,
      drag: 0.98,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.25,
      shape: Math.random() > 0.85 ? 'square' : 'circle',
    })
  }

  return particles
}

export function ExitAnimation({ active, onComplete }) {
  const canvasRef = useRef(null)
  const rafRef = useRef(null)
  const startTimeRef = useRef(null)

  useEffect(() => {
    if (!active) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1
    const width = window.innerWidth
    const height = window.innerHeight

    canvas.width = Math.floor(width * dpr)
    canvas.height = Math.floor(height * dpr)
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    const particles = createParticles(width, height)
    const centerX = width / 2
    const centerY = height / 2
    startTimeRef.current = performance.now()

    const easeOutQuint = (t) => 1 - Math.pow(1 - t, 5)

    const animate = (now) => {
      const elapsed = now - startTimeRef.current
      const progress = Math.min(elapsed / DURATION, 1)
      const eased = easeOutQuint(progress)

      ctx.clearRect(0, 0, width, height)

      // Soft white vignette flash
      const flashAlpha = progress < 0.35
        ? (progress / 0.35) * 0.18
        : 0.18 * (1 - (progress - 0.35) / 0.65)
      ctx.fillStyle = `rgba(255, 255, 255, ${flashAlpha})`
      ctx.fillRect(0, 0, width, height)

      // Expanding brand shockwave
      const waveRadius = eased * Math.max(width, height) * 0.75
      const waveGradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, waveRadius
      )
      waveGradient.addColorStop(0, `rgba(251, 76, 123, ${0.35 * (1 - progress)})`)
      waveGradient.addColorStop(0.6, `rgba(251, 76, 123, ${0.12 * (1 - progress)})`)
      waveGradient.addColorStop(1, 'rgba(251, 76, 123, 0)')
      ctx.fillStyle = waveGradient
      ctx.beginPath()
      ctx.arc(centerX, centerY, waveRadius, 0, Math.PI * 2)
      ctx.fill()

      // Particle burst
      for (const p of particles) {
        p.vx *= p.drag
        p.vy *= p.drag
        p.vy += p.gravity
        p.x += p.vx * (1 + eased * 2.5)
        p.y += p.vy * (1 + eased * 2.5)
        p.rotation += p.rotationSpeed
        p.alpha -= p.decay

        if (p.alpha <= 0) continue

        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rotation)
        ctx.globalAlpha = p.alpha * (1 - progress * 0.65)
        ctx.fillStyle = p.color

        if (p.shape === 'square') {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size)
        } else {
          ctx.beginPath()
          ctx.arc(0, 0, p.size, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.restore()
      }

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      } else {
        onComplete()
      }
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [active, onComplete])

  if (!active) return null
  return <canvas ref={canvasRef} className="exit-canvas" aria-hidden="true" />
}
