import React from 'react'
import ExpandingHero from '../components/ExpandingHero.jsx'
import ProductDirectory from '../components/ProductDirectory.jsx'
import DosageScrollStack from '../components/DosageScrollStack.jsx'
import { allProducts } from '../data/allProducts.js'

const heroImage = {
  url: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=2400&q=85',
  alt: 'Pharmaceutical capsules and formulations',
}

export default function Products() {
  return (
    <div className="products-page">
      <ExpandingHero
        tag="Our Range"
        title="PRODUCTS"
        tagline="Explore our portfolio of generic finished dosage forms — tablets, capsules, oral liquids and sachets — manufactured to exacting quality standards."
        image={heroImage.url}
        imageAlt={heroImage.alt}
      />

      {/* Visual replica of the attached image: Product Listings directory */}
      <ProductDirectory
        className="hero-overlap-section"
        items={allProducts}
        title="Explore an overview of our products and search for information on our most popular products."
        eyebrow="Product Listings"
        defaultLetter="C"
      />

      {/* Interactive Horizontal Scroll-Stacking Section */}
      <DosageScrollStack />
    </div>
  )
}
