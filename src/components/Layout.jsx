import React, { useEffect, useRef, useState } from 'react'
import { NavLink, Link, Outlet, useLocation } from 'react-router-dom'
import { Icon } from './Icons.jsx'
import { media, site } from '../data/site.js'

const productLinks = [
  ['Capsule', '/products/capsule'],
  ['Sachet', '/products/sachet'],
  ['Tablets', '/products/tablets'],
  ['Oral Liquid', '/products/oral-liquid'],
]
const navigation = [
  { id: 'about', label: 'About', to: '/about-us' },
  { id: 'products', label: 'Products', to: '/products' },
  { id: 'services', label: 'Services', to: '/services' },
  { id: 'contact', label: 'Contact', to: '/contact-us' },
]

const subProducts = [
  {
    title: 'Tablets',
    to: '/products/tablets',
    img: '/manufacture-imgs/117-1174315_pills-png-image-transparent-background-medicine-tablet-png-Photoroom.png',
  },
  {
    title: 'Capsule',
    to: '/products/capsule',
    img: '/manufacture-imgs/capsules-clean.jpg',
  },
  {
    title: 'Oral Liquid',
    to: '/products/oral-liquid',
    img: '/manufacture-imgs/istockphoto-457410879-612x612-1-Photoroom.png',
  },
  {
    title: 'Sachet',
    to: '/products/sachet',
    img: '/manufacture-imgs/pngtree-black-sachets-with-wet-wipes-png-image_4740013-Photoroom.png',
  },
]

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [productOpen, setProductOpen] = useState(false)
  const [headerHidden, setHeaderHidden] = useState(false)
  const closeTimer = useRef(null)
  const exitTimer = useRef(null)
  const location = useLocation()

  const closeMobileMenu = () => {
    if (!mobileOpen || isClosing) return
    setIsClosing(true)
    exitTimer.current = setTimeout(() => {
      setMobileOpen(false)
      setIsClosing(false)
    }, 320)
  }

  const toggleMobileMenu = () => {
    if (mobileOpen) {
      closeMobileMenu()
    } else {
      window.clearTimeout(exitTimer.current)
      setIsClosing(false)
      setMobileOpen(true)
    }
  }

  useEffect(() => {
    window.clearTimeout(exitTimer.current)
    setMobileOpen(false)
    setIsClosing(false)
    setProductOpen(false)
    setHeaderHidden(false)
    window.scrollTo(0, 0)
  }, [location.pathname])

  useEffect(() => () => {
    window.clearTimeout(closeTimer.current)
    window.clearTimeout(exitTimer.current)
  }, [])

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [mobileOpen])

  // Close drawer on ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeMobileMenu()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [mobileOpen, isClosing])

  useEffect(() => {
    let previousY = Math.max(0, window.scrollY)
    let direction = 0
    let distance = 0
    let frame = null

    const updateHeader = () => {
      frame = null
      // Clamp overscroll so bouncing at either end cannot reverse the direction.
      const maximumY = Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
      const currentY = Math.min(maximumY, Math.max(0, window.scrollY))
      const delta = currentY - previousY
      previousY = currentY

      if (currentY <= 80 || mobileOpen) {
        setHeaderHidden(false)
        distance = 0
        direction = 0
        return
      }
      if (delta === 0) return

      const nextDirection = Math.sign(delta)
      distance = nextDirection === direction ? distance + Math.abs(delta) : Math.abs(delta)
      direction = nextDirection
      // Ignore tiny movements to avoid flickering on trackpads and touch screens.
      if (distance < 8) return

      setHeaderHidden(direction > 0)
      if (direction > 0) {
        window.clearTimeout(closeTimer.current)
        setProductOpen(false)
      }
    }
    const onScroll = () => {
      if (frame === null) frame = window.requestAnimationFrame(updateHeader)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame !== null) window.cancelAnimationFrame(frame)
    }
  }, [mobileOpen, location.pathname])

  const showProducts = () => {
    window.clearTimeout(closeTimer.current)
    setProductOpen(true)
  }
  const hideProducts = () => {
    window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => setProductOpen(false), 140)
  }

  const leftNavigation = navigation.slice(0, 2)
  const rightNavigation = navigation.slice(2)

  const renderDesktopItem = item => item.id === 'products' ? (
    <button
      key={item.id}
      className={location.pathname.startsWith('/products') ? 'active' : ''}
      onMouseEnter={showProducts}
      onMouseLeave={hideProducts}
      onFocus={showProducts}
      onClick={() => setProductOpen(v => !v)}
      aria-expanded={productOpen}
      aria-controls="product-menu"
    >
      Products <Icon name="down" size={11} />
    </button>
  ) : <NavLink key={item.id} to={item.to}>{item.label}</NavLink>

  return (
    <div className="site-shell">
      {/*
        Backdrop lives OUTSIDE <header> so it isn't trapped by the header's
        z-index stacking context — it can now cover the full viewport properly.
      */}
      {mobileOpen && (
        <div
          className={`broken-menu-backdrop ${isClosing ? 'is-closing' : ''}`}
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}

      <header
        className={`header ${mobileOpen ? 'menu-open' : ''} ${headerHidden ? 'is-hidden' : ''}`}
        onFocusCapture={() => setHeaderHidden(false)}
      >
        <div className="navbar-card">
          <button className="menu-button" onClick={() => setMobileOpen(v => !v)} aria-label="Toggle navigation">
            <Icon name={mobileOpen ? 'close' : 'menu'} size={24} />
          </button>

          <nav className="nav-side nav-left" aria-label="Primary navigation">
            {leftNavigation.map(renderDesktopItem)}
          </nav>

          <Link className="nav-brand" to="/" aria-label={`${site.company} home`}>
            <img src={media.logo} alt="Trust Pharma" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling.style.display = 'flex' }} />
            <span><strong>TRUST</strong><small>PHARMACEUTICALS</small></span>
          </Link>

          <nav className="nav-side nav-right" aria-label="Secondary navigation">
            {rightNavigation.map(renderDesktopItem)}
          </nav>

          <div
            id="product-menu"
            className={`dropdown-panel ${productOpen ? 'show' : ''}`}
            onMouseEnter={showProducts}
            onMouseLeave={hideProducts}
          >
            <Link className="dropdown-featured" to="/products">
              <span>Explore</span>
              <strong>All Products</strong>
            </Link>
            <div className="dropdown-links">
              {productLinks.map(([label, to]) => <Link key={to} to={to}>{label}<Icon name="arrow-up-right" size={14} /></Link>)}
            </div>
          </div>

          {/* Mobile Broken Box Header: Left/Center Logo Box + Right Hamburger Box */}
          <div className="mobile-broken-header">
            <Link className="broken-box-brand" to="/" onClick={closeMobileMenu} aria-label="Trust Pharma">
              <img src={media.logo} alt="Trust Pharma" onError={(e) => { e.currentTarget.style.display = 'none'; if (e.currentTarget.nextElementSibling) e.currentTarget.nextElementSibling.style.display = 'flex' }} />
              <span className="broken-brand-fallback">
                <strong>TRUST</strong>
                <small>PHARMACEUTICALS</small>
              </span>
            </Link>

            <button
              className="broken-box-toggle"
              onClick={toggleMobileMenu}
              aria-label={mobileOpen && !isClosing ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen && !isClosing}
            >
              <Icon name={mobileOpen && !isClosing ? 'close' : 'menu'} size={22} />
            </button>
          </div>

          {/* Dropdown: About → Product → 4-grid → Services → Contact */}
          {mobileOpen && (
            <div
              className={`mobile-broken-dropdown ${isClosing ? 'is-closing' : 'is-open'}`}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              <Link to="/about-us" className="broken-menu-box" onClick={closeMobileMenu}>
                About
              </Link>

              <Link to="/products" className="broken-menu-box" onClick={closeMobileMenu}>
                Product
              </Link>

              <div className="broken-grid-4">
                {subProducts.map(sub => (
                  <Link
                    key={sub.title}
                    to={sub.to}
                    className="broken-grid-cell"
                    onClick={closeMobileMenu}
                  >
                    <span className="broken-grid-title">{sub.title}</span>
                    <div className="broken-grid-visual">
                      <img src={sub.img} alt={sub.title} />
                    </div>
                  </Link>
                ))}
              </div>

              <Link to="/services" className="broken-menu-box" onClick={closeMobileMenu}>
                Services
              </Link>

              <Link to="/contact-us" className="broken-menu-box" onClick={closeMobileMenu}>
                Contact
              </Link>
            </div>
          )}
        </div>
      </header>

      <main><Outlet /></main>

      <footer className="footer">
        <div className="footer-card">
          <img className="footer-art" src="/footer.png" alt="" aria-hidden="true" />
          <div className="footer-content">
            <Link className="footer-logo" to="/" aria-label={`${site.company} home`}>
              <img src={media.logo} alt="" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling.style.display = 'flex' }} />
              <span><strong>TRUST</strong><small>PHARMACEUTICALS</small></span>
            </Link>

            <div className="footer-details">
              <div className="footer-links">
                <section aria-label="Company links">
                  <Link to="/about-us">About Us</Link>
                  <Link to="/services">Services</Link>
                  <Link to="/products">Products</Link>
                  <Link to="/contact-us">Contact Us</Link>
                </section>
                <section aria-label="Product links">
                  {productLinks.map(([label, to]) => <Link key={to} to={to}>{label}</Link>)}
                  <Link to="/products/suppository">Suppository</Link>
                  <Link to="/products/shampoo-lotion">Shampoo / Lotion</Link>
                </section>
              </div>

              <address className="footer-contact">
                <a href={`tel:${site.phone.replace(/[^\d+]/g, '')}`}>{site.phone}</a>
                <a href={`mailto:${site.email}`}>{site.email}</a>
                <span>{site.office}</span>
                <span>Factory: {site.factory}</span>
              </address>

              <div className="footer-bottom">&copy; {new Date().getFullYear()} Trust Pharma Pvt. Ltd. Co. All rights reserved.</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
