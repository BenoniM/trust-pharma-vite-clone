import React from 'react'
import PageHero from '../components/PageHero.jsx'

const heroImages = [
  { id: 1, url: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=700&h=700&q=80', alt: 'Laboratory scientific chemistry testing', col: 1, row: 1, bgColor: '#9da7c9' },
  { id: 2, url: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=700&h=700&q=80', alt: 'Pharmaceutical manufacturing clean room', col: 2, row: 1, bgColor: '#8a9b75' },
  { id: 3, url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=700&h=700&q=80', alt: 'Laboratory scientist conducting quality assurance', col: 2, row: 2, bgColor: '#a5a3cb' },
  { id: 4, url: 'https://images.unsplash.com/photo-1563213126-a4273aed2016?auto=format&fit=crop&w=700&h=700&q=80', alt: 'Global shipping logistics and containers', col: 3, row: 2, bgColor: '#c57d6b' },
  { id: 5, url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=700&h=700&q=80', alt: 'Healthcare science and pharmaceutical research', col: 4, row: 2, bgColor: '#d4c7b5' },
  { id: 6, url: 'https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?auto=format&fit=crop&w=700&h=700&q=80', alt: 'Modern pharmaceutical production facility', col: 1, row: 3, bgColor: '#d8b5a0' },
  { id: 7, url: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=700&h=700&q=80', alt: 'Quality controlled pharmaceutical products', col: 2, row: 3, bgColor: '#e3c86b' },
]

const servicesData = [
  { id: 'research', number: '01', image: 'https://images.pexels.com/photos/7231210/pexels-photo-7231210.jpeg', alt: 'Trust Pharma Research & Development Lab', title: 'RESEARCH & DEVELOPMENT', description: 'Development work supports formulation design, process optimization, analytical planning and the continual improvement of pharmaceutical products.', link: '/contact' },
  { id: 'production', number: '02', image: 'https://images.pexels.com/photos/31985602/pexels-photo-31985602.jpeg', alt: 'Trust Pharma High-Precision Production Facility', title: 'PRODUCTION', description: 'Manufacturing is organized around repeatable processes, production controls, documentation and consistent quality expectations.', link: '/contact' },
  { id: 'export', number: '03', image: 'https://images.pexels.com/photos/9893848/pexels-photo-9893848.jpeg', alt: 'Trust Pharma Global Export and Logistics', title: 'EXPORT', description: 'Serving both domestic and international distributors with finished generic pharmaceutical products across validated distribution corridors.', link: '/contact' },
]

export default function Services() {
  return (
    <>
      <PageHero tag="What We Do" title="SERVICES" tagline="From research and development through manufacturing to export — end-to-end pharmaceutical capabilities built on repeatable processes and quality systems." images={heroImages} />
      <div className="services-editorial-page">
        {servicesData.map((item) => (
          <section className="editorial-service-block" key={item.id} id={item.id}>
            <div className="editorial-service-stage">
              <div className="editorial-specs-side">
                <span className="editorial-index-number">{item.number}</span>
              </div>
              <div className="editorial-image-center">
                <img src={item.image} alt={item.alt} loading="lazy" />
              </div>
              <div className="editorial-copy-side">
                <p>{item.description}</p>
              </div>
              <h2 className="editorial-bottom-title">{item.title}</h2>
            </div>
          </section>
        ))}
      </div>
    </>
  )
}
