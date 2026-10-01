import React, { useEffect, useRef } from 'react'

export default function ExpandingHero({ title, tag, tagline, image, imageAlt }) {
  const heroRef = useRef(null)

  useEffect(() => {
    const hero = heroRef.current
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0

    const update = () => {
      frame = 0
      if (motionPreference.matches) return

      const viewportWidth = window.innerWidth
      const viewportHeight = hero.firstElementChild.clientHeight
      const scrollDistance = Math.max(1, hero.offsetHeight - viewportHeight)
      const scrollProgress = Math.min(1, Math.max(0, -hero.getBoundingClientRect().top / scrollDistance))
      const expansion = Math.min(1, scrollProgress / 0.55)
      const initialWidth = viewportWidth < 700
        ? viewportWidth * 0.62
        : Math.min(viewportWidth * 0.28, 360)
      const initialHeight = Math.min(viewportHeight * 0.34, 300)

      hero.style.setProperty('--about-image-width', `${initialWidth + (viewportWidth - initialWidth) * expansion}px`)
      hero.style.setProperty('--about-image-height', `${initialHeight + (viewportHeight - initialHeight) * expansion}px`)
      hero.style.setProperty('--about-image-top', `${40 + expansion * 10}%`)
      hero.style.setProperty('--about-copy-shift', `${-scrollProgress * viewportHeight * 0.75}px`)
      hero.style.setProperty('--about-image-parallax', `${expansion * viewportHeight * 0.045}px`)
    }

    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    motionPreference.addEventListener('change', scheduleUpdate)

    return () => {
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      motionPreference.removeEventListener('change', scheduleUpdate)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section ref={heroRef} className="about-hero" aria-label={`${title} hero`}>
      <div className="about-hero-stage">
        <div className="about-hero-copy">
          <h1 className="about-hero-title" aria-label={title}>
            {[0, 1].map((group) => (
              <span className="about-hero-title-set" aria-hidden="true" key={group}>
                <span>{title}</span><span>{title}</span><span>{title}</span>
              </span>
            ))}
          </h1>
          <p className="about-hero-tagline">{tagline}</p>
          <span className="about-hero-tag">{tag}</span>
          <div className="about-hero-bottom">
            <strong className="about-hero-brand">Trust Pharmaceuticals</strong>
            <span className="about-hero-subline">Pvt. Ltd. Co. · Debre Birhan &amp; Addis Ababa</span>
          </div>
        </div>
        <div className="about-hero-image-frame">
          <img src={image} alt={imageAlt} fetchPriority="high" />
        </div>
      </div>
    </section>
  )
}
