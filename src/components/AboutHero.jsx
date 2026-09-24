import React from 'react'

const heroImages = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=700&h=700&q=80',
    alt: 'Pharmaceutical capsules and healthcare formulations',
    col: 1,
    row: 1,
    bgColor: '#d4c7b5',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=700&h=700&q=80',
    alt: 'Medical blister packaging of generic tablets',
    col: 2,
    row: 1,
    bgColor: '#c57d6b',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=700&h=700&q=80',
    alt: 'High quality colorful medicinal capsules',
    col: 2,
    row: 2,
    bgColor: '#d8b5a0',
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=700&h=700&q=80',
    alt: 'Laboratory scientific chemistry testing and analysis',
    col: 3,
    row: 2,
    bgColor: '#9da7c9',
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=700&h=700&q=80',
    alt: 'Pharmaceutical pills on bright minimalist backdrop',
    col: 4,
    row: 2,
    bgColor: '#e3c86b',
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=700&h=700&q=80',
    alt: 'Laboratory scientist conducting pharmaceutical quality assurance',
    col: 1,
    row: 3,
    bgColor: '#a5a3cb',
  },
  {
    id: 7,
    url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=700&h=700&q=80',
    alt: 'Modern medicine manufacturing and healthcare science',
    col: 2,
    row: 3,
    bgColor: '#8a9b75',
  },
]

export default function AboutHero() {
  return (
    <section className="about-hero" aria-label="About Trust Pharmaceuticals">
      <div className="about-hero-inner">
        {/* Left Side: Top-left ABOUT US headline and Bottom-left Trust Pharmaceuticals */}
        <div className="about-hero-left">
          <div className="about-hero-top">
            <span className="about-hero-tag">Who We Are</span>
            <h1 className="about-hero-title">ABOUT US</h1>
            <p className="about-hero-tagline">
              Serving people through quality-driven pharmaceutical manufacturing,
              dependable medicine supply, and accessible healthcare.
            </p>
          </div>

          <div className="about-hero-bottom">
            <strong className="about-hero-brand">Trust Pharmaceuticals</strong>
            <span className="about-hero-subline">Pvt. Ltd. Co. · Debre Birhan & Addis Ababa</span>
          </div>
        </div>

        {/* Right Side: 4x3 Staggered Grid of 7 Unsplash Images */}
        <div className="about-hero-right">
          <div className="about-hero-grid">
            {heroImages.map((img) => (
              <div
                key={img.id}
                className={`about-hero-cell cell-col-${img.col} cell-row-${img.row}`}
                style={{
                  gridColumn: img.col,
                  gridRow: img.row,
                  backgroundColor: img.bgColor,
                }}
              >
                <img
                  src={img.url}
                  alt={img.alt}
                  loading="eager"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
