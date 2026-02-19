'use client'

import { useState, useEffect } from 'react'

interface HeroProps {
  salonName: string
  tagline: string
  heroImage: string
  onBookClick?: () => void
}

export function Hero({ salonName, tagline, heroImage, onBookClick }: HeroProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-pink-100/40 via-peach-50/30 to-lavender-50/50" />

      {/* Floating Decorative Blobs */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full opacity-30 blur-3xl animate-pulse" />
      <div className="absolute bottom-32 right-20 w-40 h-40 bg-secondary rounded-full opacity-25 blur-3xl animate-pulse" />
      <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-accent rounded-full opacity-20 blur-2xl animate-pulse" />

      {/* Content */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center px-4 transition-all duration-1000 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <h1
          className="text-6xl md:text-7xl font-display font-bold text-center text-gray-900 drop-shadow-lg mb-4"
          style={{ textShadow: '2px 2px 8px rgba(255,255,255,0.5)' }}
        >
          {salonName}
        </h1>
        <p
          className="text-xl md:text-2xl text-gray-700 text-center font-body font-light drop-shadow-md mb-8 max-w-2xl"
          style={{ textShadow: '1px 1px 4px rgba(255,255,255,0.3)' }}
        >
          {tagline}
        </p>
        <button
          type="button"
          onClick={onBookClick}
          className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-body font-semibold hover:bg-opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 text-lg"
        >
          Book Appointment
        </button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}
