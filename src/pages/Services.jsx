import React from 'react'
import ExpandingHero from '../components/ExpandingHero.jsx'

const heroImage = {
  url: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=2400&q=85',
  alt: 'Pharmaceutical manufacturing clean room',
}

const servicesData = [
  {
    id: 'research',
    image: 'https://images.unsplash.com/photo-1576089388754-68c54a863b60?auto=format&fit=crop&w=1400&q=85',
    video: 'https://videos.pexels.com/video-files/6130312/6130312-hd_1080_1920_30fps.mp4', // https://www.pexels.com/download/video/6130312/
    alt: 'Researcher working with a sample in a laboratory',
    title: 'Research & Development',
    description: 'Our research and development work brings formulation, analytical planning and process improvement together. Each step is guided by the goal of making dependable medicines for the people who need them.',
  },
  {
    id: 'production',
    image: 'https://images.unsplash.com/photo-1732690233982-1d4567384ea1?auto=format&fit=crop&w=1400&q=85',
    video: 'https://videos.pexels.com/video-files/9574134/9574134-uhd_2160_4096_25fps.mp4', // https://www.pexels.com/download/video/9574134/
    alt: 'Pharmaceutical worker operating production equipment',
    title: 'Production',
    description: 'From raw materials to finished dosage forms, production is built around controlled processes, careful documentation and consistent quality. Our focus is on making every batch with the same attention to detail.',
  },
  {
    id: 'export',
    image: 'https://images.unsplash.com/photo-1494412552100-42e4e7a74ec6?auto=format&fit=crop&w=2400&q=85',
    video: 'https://videos.pexels.com/video-files/29903867/12836135_3840_2160_60fps.mp4', // https://www.pexels.com/download/video/29903867/
    alt: 'Shipping containers arranged at a port',
    title: 'Export',
    description: 'We work to connect locally manufactured pharmaceutical products with markets beyond Ethiopia. Coordinated distribution and reliable supply help our finished medicines travel further.',
  },
]

function ServiceMedia({ item }) {
  const videoRef = React.useRef(null)
  const engagedRef = React.useRef(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [isPlaying, setIsPlaying] = React.useState(false)

  const startVideo = () => {
    engagedRef.current = true
    setIsLoading(true)
    const playRequest = videoRef.current?.play()
    playRequest?.then(() => {
      if (engagedRef.current) {
        setIsLoading(false)
        setIsPlaying(true)
      }
    }).catch(() => {
      setIsLoading(false)
      setIsPlaying(false)
    })
  }

  const stopVideo = () => {
    engagedRef.current = false
    setIsLoading(false)
    setIsPlaying(false)
    const video = videoRef.current
    if (!video) return
    video.pause()
    if (video.readyState > 0) video.currentTime = 0
  }

  const handlePlaying = () => {
    if (engagedRef.current) {
      setIsLoading(false)
      setIsPlaying(true)
    }
    else videoRef.current?.pause()
  }

  return (
    <div
      className={`editorial-service-image${isPlaying ? ' is-playing' : isLoading ? ' is-loading' : ''}`}
      tabIndex={0}
      role="button"
      aria-label={`${isPlaying ? 'Pause' : 'Play'} ${item.title} video preview`}
      aria-pressed={isPlaying}
      onPointerEnter={(event) => {
        if (event.pointerType !== 'touch') startVideo()
      }}
      onPointerLeave={(event) => {
        if (event.pointerType !== 'touch') stopVideo()
      }}
      onFocus={(event) => {
        if (event.currentTarget.matches(':focus-visible')) startVideo()
      }}
      onBlur={stopVideo}
      onClick={(event) => {
        if (event.nativeEvent.pointerType === 'touch') {
          if (engagedRef.current) stopVideo()
          else startVideo()
        }
      }}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          if (engagedRef.current) stopVideo()
          else startVideo()
        }
      }}
    >
      <video
        ref={videoRef}
        src={item.video}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        onPlaying={handlePlaying}
        onError={() => {
          setIsLoading(false)
          setIsPlaying(false)
        }}
      />
      <div className="editorial-service-photo">
        <img src={item.image} alt={item.alt} loading="lazy" />
      </div>
    </div>
  )
}

export default function Services() {
  const sectionRef = React.useRef(null)

  React.useEffect(() => {
    const imageFrames = sectionRef.current.querySelectorAll('.editorial-service-image')
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    let animationFrame = 0

    const updateParallax = () => {
      animationFrame = 0
      const viewportHeight = window.innerHeight

      imageFrames.forEach((imageFrame) => {
        if (motionPreference.matches) {
          imageFrame.style.setProperty('--service-parallax-y', '0px')
          return
        }

        const bounds = imageFrame.getBoundingClientRect()
        const distanceFromCenter = viewportHeight / 2 - (bounds.top + bounds.height / 2)
        const progress = Math.max(-1, Math.min(1, distanceFromCenter / ((viewportHeight + bounds.height) / 2)))
        imageFrame.style.setProperty('--service-parallax-y', `${Math.round(progress * bounds.height * 0.16)}px`)
      })
    }

    const scheduleUpdate = () => {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(updateParallax)
    }

    updateParallax()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    motionPreference.addEventListener('change', scheduleUpdate)

    return () => {
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      motionPreference.removeEventListener('change', scheduleUpdate)
      if (animationFrame) window.cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <>
      <ExpandingHero
        tag="What We Do"
        title="Services"
        tagline="From research and development through manufacturing to export — end-to-end pharmaceutical capabilities built on repeatable processes and quality systems."
        image={heroImage.url}
        imageAlt={heroImage.alt}
      />
      <section ref={sectionRef} className="services-editorial-page hero-overlap-section" aria-label="Our services">
        {servicesData.map((item) => (
          <section className={`editorial-service-block editorial-service-block--${item.id}`} key={item.id} id={item.id}>
            <ServiceMedia item={item} />
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </section>
        ))}
      </section>
    </>
  )
}
