import React from 'react'

/**
 * Reusable page-hero with the same split-layout aesthetic as the About hero.
 *
 * ── New-style props (split layout + image grid) ──
 *  tag       – small uppercase label above the title
 *  title     – large uppercase headline
 *  tagline   – paragraph below the title
 *  images    – array of { id, url, alt, col, row, bgColor }
 *  brandLine – { name, sub }
 *
 * ── Legacy props (simple background-image hero) ──
 *  title     – headline
 *  image     – background image URL   (single string)
 *  eyebrow   – small label
 *
 * When `images` (array) is provided the component renders the rich
 * split-layout.  When only `image` (string) is provided it falls back
 * to the compact background-image hero so existing sub-pages still work.
 */
export default function PageHero({
  tag,
  title,
  tagline,
  images,
  brandLine,
  /* legacy */
  image,
  eyebrow = 'Trust Pharmaceuticals',
}) {
  /* ── Legacy / compact mode ─────────────────────────── */
  if (!images || images.length === 0) {
    return (
      <section
        className="page-hero"
        style={
          image
            ? {
                backgroundImage: `linear-gradient(90deg, rgba(16,46,62,.9), rgba(19,77,103,.65)), url(${image})`,
              }
            : undefined
        }
      >
        <div className="container">
          <span>{eyebrow}</span>
          <h1>{title}</h1>
        </div>
      </section>
    )
  }

  /* ── Rich split-layout mode ────────────────────────── */
  return (
    <section className="about-hero" aria-label={title}>
      <div className="about-hero-inner">
        {/* Left Side */}
        <div className="about-hero-left">
          <div className="about-hero-top">
            <span className="about-hero-tag">{tag || eyebrow}</span>
            <h1 className="about-hero-title">{title}</h1>
            {tagline && <p className="about-hero-tagline">{tagline}</p>}
          </div>

          <div className="about-hero-bottom">
            <strong className="about-hero-brand">
              {brandLine?.name ?? 'Trust Pharmaceuticals'}
            </strong>
            <span className="about-hero-subline">
              {brandLine?.sub ?? 'Pvt. Ltd. Co. · Debre Birhan & Addis Ababa'}
            </span>
          </div>
        </div>

        {/* Right Side – staggered grid */}
        <div className="about-hero-right">
          <div className="about-hero-grid">
            {images.map((img) => (
              <div
                key={img.id}
                className={`about-hero-cell cell-col-${img.col} cell-row-${img.row}`}
                style={{
                  gridColumn: img.col,
                  gridRow: img.row,
                  backgroundColor: img.bgColor,
                }}
              >
                <img src={img.url} alt={img.alt} loading="eager" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
