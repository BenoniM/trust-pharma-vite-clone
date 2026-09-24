import React, { useState } from 'react'
import PageHero from '../components/PageHero.jsx'
import { site } from '../data/site.js'
import { Icon } from '../components/Icons.jsx'

const heroImages = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&w=700&h=700&q=80',
    alt: 'Modern office building exterior',
    col: 1, row: 1, bgColor: '#9da7c9',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=700&h=700&q=80',
    alt: 'Business team discussion and collaboration',
    col: 2, row: 1, bgColor: '#d4c7b5',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1596524430615-b46475ddff6e?auto=format&fit=crop&w=700&h=700&q=80',
    alt: 'Contact us via phone or email',
    col: 2, row: 2, bgColor: '#e3c86b',
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?auto=format&fit=crop&w=700&h=700&q=80',
    alt: 'Handshake partnership and trust',
    col: 3, row: 2, bgColor: '#8a9b75',
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=700&h=700&q=80',
    alt: 'Professional corporate workspace',
    col: 4, row: 2, bgColor: '#a5a3cb',
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=700&h=700&q=80',
    alt: 'City skyline and corporate headquarters',
    col: 1, row: 3, bgColor: '#c57d6b',
  },
  {
    id: 7,
    url: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=700&h=700&q=80',
    alt: 'Modern office with collaborative spaces',
    col: 2, row: 3, bgColor: '#d8b5a0',
  },
]

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [activeLocation, setActiveLocation] = useState('office')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  function handleChange(e) {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="contact-page-wrapper">
      {/* ── Page Hero ── */}
      <PageHero
        tag="Reach Out"
        title="CONTACT US"
        tagline="Have a question, partnership inquiry, or product discussion? We'd love to hear from you — get in touch with our team."
        images={heroImages}
      />

      {/* ── Form Section (Aligned with Images 1-3 visual structure, retaining original user content) ── */}
      <section className="contact-form-section">
        <div className="contact-section-container">
          <div className="contact-form-header">
            <span className="eyebrow">Get in touch</span>
            <h2>We would be happy to hear from you.</h2>
            <p>Use the details below for general enquiries, product discussions and partnership conversations.</p>
          </div>

          <form className="contact-styled-form" onSubmit={handleSubmit}>
            <div className="contact-fields-grid">
              <div className="contact-field">
                <label htmlFor="name">Name*</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="contact-field">
                <label htmlFor="email">Email*</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="contact-field full-width">
                <label htmlFor="subject">Subject</label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="How can we help?"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>

              <div className="contact-field full-width">
                <label htmlFor="message">Message*</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="7"
                  placeholder="Write your message..."
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="contact-action-row">
              {sent ? (
                <p className="form-message">Demo form submitted locally. Connect this handler to your email/API endpoint for production.</p>
              ) : <div />}

              <button type="submit" className="contact-submit-btn">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* ── "Get in touch" 2x2 Directory Grid Section (Image 4 aligned, user content) ── */}
      <section className="contact-directory-section">
        <div className="contact-section-container">
          <h2 className="contact-directory-heading">Get in touch</h2>

          <div className="contact-directory-grid">
            {/* Phone */}
            <div className="contact-directory-cell">
              <span className="contact-cell-label">Phone</span>
              <a href={`tel:${site.phone.replace(/[^+\d]/g, '')}`} className="contact-cell-value phone-link">
                {site.phone}
              </a>
            </div>

            {/* Email */}
            <div className="contact-directory-cell">
              <span className="contact-cell-label">Email</span>
              <a href={`mailto:${site.email}`} className="contact-cell-value email-link">
                {site.email}
              </a>
            </div>

            {/* Office */}
            <div className="contact-directory-cell">
              <span className="contact-cell-label">Office</span>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent('Droga Building, Gulele Subcity, Woreda 09, Addis Ababa, Ethiopia')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-cell-value address-link"
                title="View Gulele Subcity, Droga Building on Google Maps"
              >
                <span className="cell-pin-wrap" aria-hidden="true">
                  <Icon name="pin" size={22} />
                </span>
                <span>{site.office}</span>
              </a>
            </div>

            {/* Factory */}
            <div className="contact-directory-cell">
              <span className="contact-cell-label">Factory</span>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent('Debre Birhan, Amhara Region, Ethiopia')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-cell-value address-link"
                title="View Debre Birhan Factory on Google Maps"
              >
                <span className="cell-pin-wrap" aria-hidden="true">
                  <Icon name="pin" size={22} />
                </span>
                <span>{site.factory}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Map Section ── */}
      <section className="contact-map-section">
        <div className="contact-section-container map-header-wrap">
          <div className="map-tabs">
            <button
              type="button"
              className={`map-tab ${activeLocation === 'office' ? 'active' : ''}`}
              onClick={() => setActiveLocation('office')}
            >
              <Icon name="pin" size={15} /> Office (Gulele, Addis Ababa)
            </button>
            <button
              type="button"
              className={`map-tab ${activeLocation === 'factory' ? 'active' : ''}`}
              onClick={() => setActiveLocation('factory')}
            >
              <Icon name="factory" size={15} /> Factory (Debre Birhan)
            </button>
          </div>
        </div>

        <div className="contact-map-stage">
          {/* Floating Location Card Overlay */}
          <div className="contact-map-pin-card">
            <div className="pin-card-header">
              <span className="pin-live-dot" aria-hidden="true" />
              <div className="pin-icon-tag">
                <Icon name="pin" size={16} />
                <span>{activeLocation === 'office' ? 'Head Office Location' : 'Factory Location'}</span>
              </div>
            </div>
            <strong className="pin-card-name">
              {activeLocation === 'office' ? 'Droga Building, Gulele Subcity' : 'Debre Birhan Manufacturing Facility'}
            </strong>
            <address className="pin-card-address">
              {activeLocation === 'office'
                ? 'Gulele Subcity, Woreda 09, Droga Building, Addis Ababa, Ethiopia'
                : 'Debre Birhan City Administration, Amhara Region, Ethiopia'}
            </address>
            <a
              href={
                activeLocation === 'office'
                  ? 'https://www.google.com/maps/search/?api=1&query=9.0630,38.7436'
                  : 'https://www.google.com/maps/search/?api=1&query=9.6800,39.5300'
              }
              target="_blank"
              rel="noopener noreferrer"
              className="pin-card-link"
            >
              <span>Open in Google Maps</span>
              <Icon name="arrow-up-right" size={14} />
            </a>
          </div>

          <iframe
            title={activeLocation === 'office' ? 'Trust Pharma Office - Droga Building, Gulele, Addis Ababa' : 'Trust Pharma Factory - Debre Birhan'}
            src={
              activeLocation === 'office'
                ? 'https://maps.google.com/maps?q=9.0630,38.7436+(Droga+Building,+Gulele+Subcity,+Woreda+09,+Addis+Ababa)&z=16&hl=en&output=embed'
                : 'https://maps.google.com/maps?q=9.6800,39.5300+(Debre+Birhan+Manufacturing+Facility)&z=13&hl=en&output=embed'
            }
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </div>
  )
}
