import React, { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import PageHero from '../components/PageHero.jsx'
import ProductDirectory from '../components/ProductDirectory.jsx'
import { categoryProducts } from '../data/products.js'

const categoryHeroData = {
  tablets: {
    tag: 'Solid Oral Dosage',
    title: 'TABLETS',
    tagline: 'Solid oral dosage products across multiple therapeutic areas, manufactured to exacting quality standards.',
    images: [
      {
        id: 1,
        url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=700&h=700&q=80',
        alt: 'Pharmaceutical blister packaging with tablets',
        col: 1, row: 1, bgColor: '#c57d6b',
      },
      {
        id: 2,
        url: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=700&h=700&q=80',
        alt: 'Clean white tablets',
        col: 2, row: 1, bgColor: '#e3c86b',
      },
      {
        id: 3,
        url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=700&h=700&q=80',
        alt: 'Scientist inspecting tablets on production line',
        col: 2, row: 2, bgColor: '#9da7c9',
      },
      {
        id: 4,
        url: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?auto=format&fit=crop&w=700&h=700&q=80',
        alt: 'Medicine tablet bottles',
        col: 3, row: 2, bgColor: '#d4c7b5',
      },
      {
        id: 5,
        url: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=700&h=700&q=80',
        alt: 'Pharmaceutical formulations',
        col: 4, row: 2, bgColor: '#d8b5a0',
      },
      {
        id: 6,
        url: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=700&h=700&q=80',
        alt: 'Quality control laboratory',
        col: 1, row: 3, bgColor: '#a5a3cb',
      },
      {
        id: 7,
        url: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?auto=format&fit=crop&w=700&h=700&q=80',
        alt: 'Solid oral dosage blister strip',
        col: 2, row: 3, bgColor: '#8a9b75',
      },
    ],
  },
  capsule: {
    tag: 'Encapsulated Dosage',
    title: 'CAPSULES',
    tagline: 'Capsule-form products within the company’s planned finished dosage portfolio, ensuring rapid bioavailability.',
    images: [
      {
        id: 1,
        url: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=700&h=700&q=80',
        alt: 'Colorful medicine capsules close-up',
        col: 1, row: 1, bgColor: '#2fa6d0',
      },
      {
        id: 2,
        url: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=700&h=700&q=80',
        alt: 'Medical capsules on sterile tray',
        col: 2, row: 1, bgColor: '#e3c86b',
      },
      {
        id: 3,
        url: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?auto=format&fit=crop&w=700&h=700&q=80',
        alt: 'Encapsulated pharmaceutical formulations',
        col: 2, row: 2, bgColor: '#8edcf2',
      },
      {
        id: 4,
        url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=700&h=700&q=80',
        alt: 'Blue and white medicine capsules',
        col: 3, row: 2, bgColor: '#c57d6b',
      },
      {
        id: 5,
        url: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=700&h=700&q=80',
        alt: 'Capsules in precision packaging',
        col: 4, row: 2, bgColor: '#d8b5a0',
      },
      {
        id: 6,
        url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=700&h=700&q=80',
        alt: 'Laboratory inspection of capsules',
        col: 1, row: 3, bgColor: '#9da7c9',
      },
      {
        id: 7,
        url: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&w=700&h=700&q=80',
        alt: 'Sterile capsule packaging',
        col: 2, row: 3, bgColor: '#8a9b75',
      },
    ],
  },
  'oral-liquid': {
    tag: 'Liquid Preparations',
    title: 'ORAL LIQUID',
    tagline: 'Liquid preparations and syrups designed for convenient oral administration and rapid therapeutic action.',
    images: [
      {
        id: 1,
        url: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?auto=format&fit=crop&w=700&h=700&q=80',
        alt: 'Liquid medicine in amber bottles',
        col: 1, row: 1, bgColor: '#9da7c9',
      },
      {
        id: 2,
        url: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=700&h=700&q=80',
        alt: 'Pharmaceutical dropper and syrup solution',
        col: 2, row: 1, bgColor: '#56c4e8',
      },
      {
        id: 3,
        url: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=700&h=700&q=80',
        alt: 'Suspension and syrup formulation laboratory',
        col: 2, row: 2, bgColor: '#d4c7b5',
      },
      {
        id: 4,
        url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=700&h=700&q=80',
        alt: 'Liquid dosage measurement inspection',
        col: 3, row: 2, bgColor: '#e3c86b',
      },
      {
        id: 5,
        url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=700&h=700&q=80',
        alt: 'Liquid pharmaceutical packaging line',
        col: 4, row: 2, bgColor: '#c57d6b',
      },
      {
        id: 6,
        url: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=700&h=700&q=80',
        alt: 'Oral syrup bottles on clean production track',
        col: 1, row: 3, bgColor: '#a5a3cb',
      },
      {
        id: 7,
        url: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&w=700&h=700&q=80',
        alt: 'Bottled medicine ready for distribution',
        col: 2, row: 3, bgColor: '#8a9b75',
      },
    ],
  },
  sachet: {
    tag: 'Unit-Dose Formats',
    title: 'SACHET',
    tagline: 'Unit-dose sachet formats for suitable pharmaceutical preparations, offering stable and accurate dosing.',
    images: [
      {
        id: 1,
        url: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&w=700&h=700&q=80',
        alt: 'Sachet packaging of medicine',
        col: 1, row: 1, bgColor: '#8a9b75',
      },
      {
        id: 2,
        url: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=700&h=700&q=80',
        alt: 'Pharmaceutical dry powder formulation',
        col: 2, row: 1, bgColor: '#d4c7b5',
      },
      {
        id: 3,
        url: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?auto=format&fit=crop&w=700&h=700&q=80',
        alt: 'Oral rehydration solution research',
        col: 2, row: 2, bgColor: '#56c4e8',
      },
      {
        id: 4,
        url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=700&h=700&q=80',
        alt: 'Sachet quality assurance check',
        col: 3, row: 2, bgColor: '#e3c86b',
      },
      {
        id: 5,
        url: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=700&h=700&q=80',
        alt: 'Unit dose manufacturing',
        col: 4, row: 2, bgColor: '#c57d6b',
      },
      {
        id: 6,
        url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=700&h=700&q=80',
        alt: 'Moisture barrier packaging inspection',
        col: 1, row: 3, bgColor: '#9da7c9',
      },
      {
        id: 7,
        url: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=700&h=700&q=80',
        alt: 'Accurate unit dose formulation',
        col: 2, row: 3, bgColor: '#a5a3cb',
      },
    ],
  },
}

export default function ProductCategory() {
  const { category } = useParams()
  const rows = categoryProducts[category] || []
  const heroConfig = categoryHeroData[category] || {
    tag: 'Dosage Form',
    title: formatTitle(category).toUpperCase(),
    tagline: 'Pharmaceutical products manufactured to exacting quality standards.',
    images: categoryHeroData.tablets.images,
  }

  // Convert verified category rows into directory items
  const directoryItems = useMemo(() => {
    return rows.map((r) => ({
      letter: r[0].trim().charAt(0).toUpperCase(),
      name: r[0].trim().toUpperCase(),
      generic: `(${r[1]} · ${r[2]})`,
    }))
  }, [rows])

  const directoryTitle = `Explore an overview of our ${heroConfig.title.toLowerCase()} and search for information on our most popular products.`
  const directoryEyebrow = `${formatTitle(category)} Listings`

  return (
    <div className="category-product-page">
      {/* Curated Hero Section with rich split layout matching parent page */}
      <PageHero
        tag={heroConfig.tag}
        title={heroConfig.title}
        tagline={heroConfig.tagline}
        images={heroConfig.images}
      />

      {/* Product Listings directory & search for this category */}
      <ProductDirectory
        items={directoryItems}
        title={directoryTitle}
        eyebrow={directoryEyebrow}
      />
    </div>
  )
}

function formatTitle(value = '') {
  return value
    .split('-')
    .map((v) => v.charAt(0).toUpperCase() + v.slice(1))
    .join(' ')
}
