import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { media } from '../data/site.js'
import { Icon } from '../components/Icons.jsx'

const heroHeadlines = [
  'Manufacturing medicines with quality, access and precision in focus.',
  'Building a modern pharmaceutical production platform.',
  'From product development to dependable supply.',
]

const productHighlights = [
  ['WHO-GMP Focus', '/manufacture-imgs/gmp-who-2-1024x673-Photoroom.png', 'Quality systems and plant standards designed around recognized good manufacturing practices.'],
  ['Tablet and Capsule', '/manufacture-imgs/117-1174315_pills-png-image-transparent-background-medicine-tablet-png-Photoroom.png', 'Solid oral dosage manufacturing capabilities for a broad generic portfolio.'],
  ['Oral Liquid Preparations', '/manufacture-imgs/istockphoto-457410879-612x612-1-Photoroom.png', 'Solutions, syrups and related liquid dosage forms for varied patient needs.'],
  ['Sachet', '/manufacture-imgs/pngtree-black-sachets-with-wet-wipes-png-image_4740013-Photoroom.png', 'Flexible unit-dose formats designed for practical packaging and distribution.'],
]

const services = [
  ['Research and Development', 'Research', 'https://images.pexels.com/photos/11589239/pexels-photo-11589239.jpeg', 'Formulation, process development and continuous product improvement.'],
  ['Production', 'Production', 'https://images.pexels.com/photos/38688812/pexels-photo-38688812.jpeg', 'Structured manufacturing workflows with consistent quality controls.'],
  ['Export', 'Export', 'https://images.pexels.com/photos/6646921/pexels-photo-6646921.jpeg', 'Supporting distribution partners with export-oriented pharmaceutical supply.'],
]

export default function Home() {
  const [headline, setHeadline] = useState(0)
  const heroRef = useRef(null)
  const transitionRef = useRef(null)
  const introVisualRef = useRef(null)
  const serviceGridRef = useRef(null)
  useEffect(() => {
    const id = setInterval(() => setHeadline(v => (v + 1) % heroHeadlines.length), 5200)
    return () => clearInterval(id)
  }, [])
  useEffect(() => {
    const hero = heroRef.current
    const transition = transitionRef.current
    const introVisual = introVisualRef.current
    const serviceImages = serviceGridRef.current.querySelectorAll('.service-card-image')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0

    const update = () => {
      frame = 0
      const heroBounds = hero.getBoundingClientRect()
      const transitionBounds = transition.getBoundingClientRect()
      const introBounds = introVisual.getBoundingClientRect()
      const clamp = value => Math.min(1, Math.max(0, value))
      const heroProgress = reducedMotion.matches ? 0 : clamp(-heroBounds.top / heroBounds.height)
      const transitionProgress = reducedMotion.matches ? 0 : clamp((window.innerHeight - transitionBounds.top) / (window.innerHeight + transitionBounds.height))
      const introProgress = reducedMotion.matches ? .5 : clamp((window.innerHeight - introBounds.top) / (window.innerHeight + introBounds.height))
      hero.style.setProperty('--parallax-shift', `${heroProgress * 20}%`)
      transition.style.setProperty('--parallax-shift', `${transitionProgress * transitionBounds.height * 0.2}px`)
      introVisual.style.setProperty('--intro-parallax-shift', `${(introProgress - .5) * introBounds.height * .52}px`)
      serviceImages.forEach(visual => {
        const bounds = visual.getBoundingClientRect()
        const progress = reducedMotion.matches ? .5 : clamp((window.innerHeight - bounds.top) / (window.innerHeight + bounds.height))
        visual.style.setProperty('--service-parallax-shift', `${(progress - .5) * bounds.height * .36}px`)
      })
    }
    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    reducedMotion.addEventListener('change', scheduleUpdate)
    return () => {
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      reducedMotion.removeEventListener('change', scheduleUpdate)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return <>
    <section ref={heroRef} className="home-hero" aria-label="Trust Pharmaceuticals">
      <img className="home-hero-image" src="https://images.pexels.com/photos/37466061/pexels-photo-37466061.jpeg" alt="" />
      <div className="home-hero-shade" />
      <div className="home-hero-inner">
        <h1 key={headline} className="home-hero-title" aria-live="polite">{heroHeadlines[headline]}</h1>
      </div>
    </section>

    <section className="trust-strip">
      <div className="container trust-strip-grid">
        <div><h2>Quality<br />Focused</h2><p>Consistent systems</p></div>
        <div><h2>Local<br />Manufacturing</h2><p>Debre Birhan, Ethiopia</p></div>
        <div><h2>R&amp;D<br />Driven</h2><p>Continuous improvement</p></div>
        <div><h2>Export<br />Ready</h2><p>Regional ambition</p></div>
      </div>
    </section>

    <section ref={transitionRef} className="transition-image" aria-label="Production imagery">
      <img src="https://images.pexels.com/photos/20339264/pexels-photo-20339264.jpeg" alt="Pink granules moving through a metal processing channel" />
    </section>

    <section className="section intro-section">
      <div className="intro-panel">
        <div className="intro-copy">
          <div className="intro-heading">
            <span className="eyebrow">Serving the People</span>
            <h2>A growing pharmaceutical manufacturer in Ethiopia</h2>
          </div>
          <div className="intro-details">
            <p>Trust Pharmaceuticals is based in Debre Birhan and is developing finished pharmaceutical products across tablets, capsules, oral liquids and sachet formats. Its stated focus is affordable, high-quality medicine produced with dependable processes.</p>
            <Link className="intro-link" to="/about-us">Read more about the company <Icon name="arrow-up-right" size={16} /></Link>
          </div>
        </div>
        <div ref={introVisualRef} className="intro-visual">
          <img src={media.heroLab} alt="Laboratory research" />
          <div className="intro-image-label"><strong>WHO-GMP</strong><span>Plant quality focus</span></div>
        </div>
      </div>
    </section>

    <section className="section products-showcase">
      <div className="container">
        <div className="intro-heading products-heading">
          <span className="eyebrow">Manufacturing Capabilities</span>
          <h2>What we will do</h2>
          <p>Developing, manufacturing and supporting distribution of generic pharmaceutical products in Ethiopia and beyond.</p>
        </div>
        <div className="product-card-grid">
          {productHighlights.map(([title, image, text]) => <article className="product-card" key={title}>
            <h3>{title}</h3>
            <div className="product-image"><img src={image} alt="" /></div>
            <p>{text}</p>
          </article>)}
        </div>
        <div className="category-links" aria-label="Product categories">
          <Link to="/products/tablets">Tablet</Link><Link to="/products/capsule">Capsule</Link><Link to="/products/oral-liquid">Oral liquid</Link><Link to="/products/sachet">Sachet</Link>
        </div>
      </div>
    </section>

    <section className="section services-section">
      <div className="container">
        <div className="intro-heading services-heading">
          <span className="eyebrow">Our Services</span>
          <h2>From research to market supply</h2>
        </div>
      </div>
      <div ref={serviceGridRef} className="service-grid">
        {services.map(([title, label, image, text], index) => <article className="service-card" key={title}>
          <div className="service-card-left">
            <div className="service-card-index"><span>{String(index + 1).padStart(2, '0')}</span><span>{label}</span></div>
            <div className="service-card-image"><img src={image} alt="" loading="lazy" /></div>
          </div>
          <div className="service-card-body">
            <div className="service-card-copy"><h3>{title}</h3><p>{text}</p></div>
            <Link to="/services" aria-label={`Read more about ${title}`}><span>Read more</span><Icon name="chevron" size={28} /></Link>
          </div>
        </article>)}
      </div>
    </section>

    <section className="cta-band">
      <div className="container cta-inner">
        <div>
          <span>Trust Pharmaceuticals Manufacturing</span>
          <h2>Committed to medicines that serve people.</h2>
        </div>
        <Link className="btn primary cta-button" to="/contact-us">Get in touch <Icon name="arrow-up-right" size={18} /></Link>
      </div>
    </section>
  </>
}
