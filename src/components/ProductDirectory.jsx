import React, { useState, useRef, useEffect, useMemo } from 'react'

export default function ProductDirectory({
  items = [],
  title = 'Explore an overview of our products and search for information on our most popular products.',
  eyebrow = 'Product Listings',
}) {
  const [searchQuery, setSearchQuery] = useState('')
  const [thumbTop, setThumbTop] = useState(0)
  const [thumbHeight, setThumbHeight] = useState(36)

  const listContainerRef = useRef(null)
  const trackRef = useRef(null)
  const thumbRef = useRef(null)
  const isDraggingRef = useRef(false)
  const dragStartY = useRef(0)
  const dragStartScrollTop = useRef(0)

  // Filtered products when searching
  const displayedProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return items
    return items.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.generic && p.generic.toLowerCase().includes(q))
    )
  }, [searchQuery, items])

  const updateScrollThumb = () => {
    const container = listContainerRef.current
    const track = trackRef.current
    if (!container || !track) return

    const scrollHeight = container.scrollHeight
    const clientHeight = container.clientHeight
    const trackHeight = track.clientHeight

    if (scrollHeight <= clientHeight) {
      setThumbHeight(trackHeight)
      setThumbTop(0)
      return
    }

    const calculatedThumbHeight = Math.max(28, (clientHeight / scrollHeight) * trackHeight)
    setThumbHeight(calculatedThumbHeight)

    const maxScroll = scrollHeight - clientHeight
    const maxThumbTop = trackHeight - calculatedThumbHeight
    const scrollRatio = container.scrollTop / maxScroll
    setThumbTop(Math.min(maxThumbTop, Math.max(0, scrollRatio * maxThumbTop)))
  }

  // Recalculate thumb on window resize, scroll, or data changes
  useEffect(() => {
    updateScrollThumb()
    window.addEventListener('resize', updateScrollThumb)
    return () => window.removeEventListener('resize', updateScrollThumb)
  }, [displayedProducts])

  // Track scroll position to update thumb
  const handleScroll = () => {
    updateScrollThumb()
  }

  // Custom scrollbar dragging
  const handleThumbMouseDown = (e) => {
    e.preventDefault()
    e.stopPropagation()
    isDraggingRef.current = true
    dragStartY.current = e.clientY
    dragStartScrollTop.current = listContainerRef.current ? listContainerRef.current.scrollTop : 0

    const handleMouseMove = (moveEvent) => {
      if (!isDraggingRef.current || !listContainerRef.current || !trackRef.current) return
      const deltaY = moveEvent.clientY - dragStartY.current
      const container = listContainerRef.current
      const track = trackRef.current

      const trackHeight = track.clientHeight
      const maxThumbTop = trackHeight - thumbHeight
      const maxScroll = container.scrollHeight - container.clientHeight
      const scrollDelta = (deltaY / maxThumbTop) * maxScroll
      container.scrollTop = dragStartScrollTop.current + scrollDelta
    }

    const handleMouseUp = () => {
      isDraggingRef.current = false
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
  }

  // Click on scrollbar track to jump
  const handleTrackClick = (e) => {
    if (e.target === thumbRef.current) return
    const track = trackRef.current
    const container = listContainerRef.current
    if (!track || !container) return
    const rect = track.getBoundingClientRect()
    const clickY = e.clientY - rect.top
    const trackHeight = track.clientHeight
    const targetScrollRatio = Math.max(0, Math.min(1, clickY / trackHeight))
    container.scrollTo({
      top: targetScrollRatio * (container.scrollHeight - container.clientHeight),
      behavior: 'smooth',
    })
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (listContainerRef.current) {
      listContainerRef.current.scrollTop = 0
    }
  }

  const isCompact = items.length <= 4

  return (
    <section className="product-listings-hero" aria-label="Product Directory">
      <div className="product-listings-container">
        {/* Left Column: Eyebrow, Main Heading, Search */}
        <div className="product-listings-left">
          <span className="product-listings-eyebrow">{eyebrow}</span>
          <h2 className="product-listings-title">{title}</h2>

          <form className="product-search-bar" onSubmit={handleSearchSubmit} role="search">
            <input
              type="text"
              className="product-search-input"
              placeholder="Looking for a product?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Looking for a product?"
            />
            <button
              type="submit"
              className="product-search-circle-btn"
              aria-label="Search product listings"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="4" y1="12" x2="20" y2="12"></line>
                <polyline points="14 6 20 12 14 18"></polyline>
              </svg>
            </button>
          </form>
        </div>

        {/* Right Column: White Elevated Card with List and Custom Scrollbar (Letters Rail Removed) */}
        <div className={`product-card-container ${isCompact ? 'is-compact' : ''}`}>
          {/* Scrollable Products List */}
          <div
            className="product-list-scroll"
            ref={listContainerRef}
            onScroll={handleScroll}
            tabIndex={0}
            role="region"
            aria-label="Scrollable products list"
          >
            {displayedProducts.length === 0 ? (
              <div className="product-no-results">
                <p>No products found matching &ldquo;{searchQuery}&rdquo;</p>
                <button
                  type="button"
                  className="product-clear-search"
                  onClick={() => setSearchQuery('')}
                >
                  Clear search
                </button>
              </div>
            ) : (
              displayedProducts.map((p, idx) => (
                <div className="product-item" key={`${p.name}-${idx}`}>
                  <span className="product-name">{p.name}</span>
                  {p.generic && (
                    <span className="product-generic">
                      {p.generic.startsWith('(') ? p.generic : `(${p.generic})`}
                    </span>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Custom Vertical Scrollbar */}
          <div
            className="product-scrollbar-track"
            ref={trackRef}
            onClick={handleTrackClick}
            aria-hidden="true"
          >
            <div
              className="product-scrollbar-thumb"
              ref={thumbRef}
              style={{
                top: `${thumbTop}px`,
                height: `${thumbHeight}px`,
              }}
              onMouseDown={handleThumbMouseDown}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
