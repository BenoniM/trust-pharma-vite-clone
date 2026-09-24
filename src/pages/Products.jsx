import React from 'react'
import PageHero from '../components/PageHero.jsx'
import ProductDirectory from '../components/ProductDirectory.jsx'
import DosageScrollStack from '../components/DosageScrollStack.jsx'
import { allProducts } from '../data/allProducts.js'

const heroImages = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=700&h=700&q=80',
    alt: 'Pharmaceutical blister packaging with tablets',
    col: 1, row: 1, bgColor: '#c57d6b',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=700&h=700&q=80',
    alt: 'Colorful medicine capsules close-up',
    col: 2, row: 1, bgColor: '#e3c86b',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?auto=format&fit=crop&w=700&h=700&q=80',
    alt: 'Liquid medicine in amber bottles',
    col: 2, row: 2, bgColor: '#9da7c9',
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=700&h=700&q=80',
    alt: 'Pharmaceutical capsules and formulations',
    col: 3, row: 2, bgColor: '#d4c7b5',
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=700&h=700&q=80',
    alt: 'Colorful pills on clean surface',
    col: 4, row: 2, bgColor: '#d8b5a0',
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=700&h=700&q=80',
    alt: 'Scientist inspecting tablets on production line',
    col: 1, row: 3, bgColor: '#a5a3cb',
  },
  {
    id: 7,
    url: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&w=700&h=700&q=80',
    alt: 'Sachet packaging of medicine',
    col: 2, row: 3, bgColor: '#8a9b75',
  },
]

export default function Products() {
  return (
    <div className="products-page">
      {/* Restored Hero Section with image grid */}
      <PageHero
        tag="Our Range"
        title="PRODUCTS"
        tagline="Explore our portfolio of generic finished dosage forms — tablets, capsules, oral liquids and sachets — manufactured to exacting quality standards."
        images={heroImages}
      />

      {/* Visual replica of the attached image: Product Listings directory */}
      <ProductDirectory
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
