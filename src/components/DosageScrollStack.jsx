import React, { useEffect, useRef, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import SectionTitle from './SectionTitle.jsx'

const dosageData = [
  {
    id: 'tablets',
    title: 'Tablets',
    description:
      'Solid oral dosage products across multiple therapeutic areas. Manufactured using high-precision compression technology to ensure exact dosing, uniform tablet hardness, and compliance with USP and BP dissolution standards.',
    to: '/products/tablets',
    bgTint: '#edf4f7',
  },
  {
    id: 'capsules',
    title: 'Capsules',
    description:
      'Capsule-form products within the company’s planned finished dosage portfolio. Engineered with moisture-barrier gelatin shells to ensure stable active substance protection, uniform fill weights, and optimal biological availability.',
    to: '/products/capsule',
    bgTint: '#f2f5f2',
  },
  {
    id: 'oral-liquid',
    title: 'Oral Liquid',
    description:
      'Liquid preparations designed for convenient oral administration. Homogeneous solutions and suspensions formulated for consistent stability, palatable administration, and reliable dosing across adult and pediatric patient care.',
    to: '/products/oral-liquid',
    bgTint: '#edf2f7',
  },
  {
    id: 'sachets',
    title: 'Sachet',
    description:
      'Unit-dose sachet formats for suitable pharmaceutical preparations. Engineered with multi-layer barrier foil packaging to protect against humidity and oxidation, ensuring rapid oral reconstitution and dependable shelf stability.',
    to: '/products/sachet',
    bgTint: '#f2f2f6',
  },
]

export default function DosageScrollStack() {
  const containerRef = useRef(null)
  const stageRef = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeCardIndex, setActiveCardIndex] = useState(0)
  const [stageWidth, setStageWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth - 60 : 1200
  )

  // Track stage width accurately using ResizeObserver
  useEffect(() => {
    const el = stageRef.current
    if (!el) return

    const update = () => {
      if (el.clientWidth > 0) {
        setStageWidth(el.clientWidth)
      } else if (typeof window !== 'undefined') {
        setStageWidth(window.innerWidth - 60)
      }
    }

    update()

    const ro = new ResizeObserver(() => {
      update()
    })
    ro.observe(el)

    window.addEventListener('resize', update)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [])

  // Smooth scroll listener
  useEffect(() => {
    let animationFrameId = null

    const handleScroll = () => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const navOffset = 82
      const totalScrollable = rect.height - (window.innerHeight - navOffset)

      if (totalScrollable <= 0) return

      const currentScrolled = navOffset - rect.top
      const progress = Math.max(0, Math.min(1, currentScrolled / totalScrollable))

      setScrollProgress(progress)

      const totalTransitions = dosageData.length - 1
      const step = Math.min(dosageData.length - 1, Math.floor(progress * totalTransitions + 0.35))
      setActiveCardIndex(step)
    }

    const onScroll = () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
      animationFrameId = requestAnimationFrame(handleScroll)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
    }
  }, [])

  // Jump to specific card on click
  const scrollToCard = useCallback((cardIndex) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const navOffset = 82
    const totalScrollable = rect.height - (window.innerHeight - navOffset)
    const totalTransitions = dosageData.length - 1

    const targetProgress = Math.min(1, Math.max(0, cardIndex / totalTransitions))
    const targetY = scrollTop + rect.top - navOffset + (targetProgress * totalScrollable)

    window.scrollTo({
      top: Math.max(0, targetY + 2),
      behavior: 'smooth',
    })
  }, [])

  const isMobile = stageWidth < 700
  const numCards = dosageData.length
  const totalTransitions = numCards - 1 // 3 transitions

  // Normal, compact card width (not oversized)
  const cardWidth = isMobile
    ? Math.round(stageWidth * 0.85)
    : Math.min(500, Math.max(380, Math.round(stageWidth * 0.4)))

  // Step between cards when piled up so cumulative width reaches exactly stageWidth (the right edge)
  // (numCards - 1) * peekStep + cardWidth = stageWidth  ==>  peekStep = (stageWidth - cardWidth) / (numCards - 1)
  const peekStep = isMobile
    ? 40
    : Math.max(60, (stageWidth - cardWidth) / totalTransitions)

  const cardGap = isMobile ? 16 : 24
  const smoothStep = (t) => t * t * (3 - 2 * t)
  const k = scrollProgress * totalTransitions

  return (
    <section className="dosage-scroll-container" ref={containerRef}>
      <div className="dosage-sticky-stage">
        <div className="dosage-inner">
          {/* Centered Section Title */}
          <SectionTitle
            center
            eyebrow="Dosage Forms"
            title="Product portfolio"
            text="Explore the major dosage-form categories manufactured to exacting quality standards."
          />

          {/* Cards Stage matching width of the sections above */}
          <div className="dosage-cards-stage" ref={stageRef}>
            {dosageData.map((card, index) => {
              let leftPos = 0

              if (!isMobile) {
                const currentSegment = Math.min(totalTransitions - 1, Math.floor(k))
                const segmentProgress = k - currentSegment
                const eased = smoothStep(Math.max(0, Math.min(1, segmentProgress)))

                if (index <= currentSegment) {
                  // Piled up tab on the left
                  leftPos = index * peekStep
                } else if (index === currentSegment + 1) {
                  // Sliding card moving to lay over the previous card
                  const startPos = currentSegment * peekStep + cardWidth + cardGap
                  const endPos = (currentSegment + 1) * peekStep
                  leftPos = startPos + (endPos - startPos) * eased
                } else {
                  // Queued card following behind
                  const movingStart = currentSegment * peekStep + cardWidth + cardGap
                  const movingEnd = (currentSegment + 1) * peekStep
                  const movingLeft = movingStart + (movingEnd - movingStart) * eased

                  const offset = index - (currentSegment + 1)
                  leftPos = movingLeft + offset * (cardWidth + cardGap)
                }
              }

              const zIndex = index + 1
              const isCovered = index < activeCardIndex

              return (
                <div
                  key={card.id}
                  className={`dosage-card-item ${isCovered ? 'is-stacked-tab' : ''} ${
                    index === activeCardIndex ? 'is-active' : ''
                  }`}
                  style={
                    !isMobile
                      ? {
                          transform: `translate3d(${leftPos}px, 0, 0)`,
                          zIndex: zIndex,
                          width: `${cardWidth}px`,
                          backgroundColor: card.bgTint,
                        }
                      : {
                          backgroundColor: card.bgTint,
                        }
                  }
                  onClick={() => {
                    if (index !== activeCardIndex) {
                      scrollToCard(index)
                    }
                  }}
                >
                  {/* Clean Title */}
                  <h3 className="dosage-card-title">{card.title}</h3>

                  {/* Description below Title */}
                  <p className="dosage-card-desc">{card.description}</p>

                  {/* Link below with underline */}
                  <Link
                    to={card.to}
                    className="dosage-card-link"
                    onClick={(e) => e.stopPropagation()}
                  >
                    View category &gt;
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
