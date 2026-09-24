import React from 'react'
import { useLocation } from 'react-router-dom'
import PageHero from '../components/PageHero.jsx'
import { media } from '../data/site.js'

export default function ExtraProduct() {
  const key = useLocation().pathname.split('/').pop()
  const labels = { 'suppository': 'Suppository', 'shampoo-lotion': 'Shampoo / Lotion', 'general-ointment-cream': 'General Ointment / Cream' }
  return <><PageHero title={labels[key] || 'Product'} image={media.heroMedicine}/><section className="section"><div className="container source-gap-card"><strong>{labels[key] || 'Product'} portfolio</strong><p>This route is included because it appears in the source site’s footer navigation. Add verified product data here when available.</p></div></section></>
}
