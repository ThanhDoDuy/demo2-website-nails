'use client'

import { useState } from 'react'

interface GalleryProps {
  images: string[]
}

export function Gallery({ images }: GalleryProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  // Create a masonry-like layout
  const getSpan = (index: number) => {
    const pattern = [1, 2, 1, 2, 1, 1]
    return pattern[index % pattern.length]
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-display font-bold text-foreground mb-4">
            Gallery
          </h2>
          <p className="text-lg text-muted-foreground font-body">
            Showcase of our beautiful nail designs
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-max">
          {images.map((image, index) => (
            <div
              key={index}
              className={`relative group cursor-pointer overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 ${
                getSpan(index) === 2 ? 'md:col-span-2' : 'md:col-span-1'
              } ${getSpan(index) === 2 ? 'md:row-span-2' : ''}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative h-64 md:h-80 w-full overflow-hidden bg-muted">
                <img
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className={`w-full h-full object-cover transition-transform duration-500 ${
                    hoveredIndex === index ? 'scale-110' : 'scale-100'
                  }`}
                />
              </div>

              {/* Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent flex items-end justify-center pb-6 transition-opacity duration-300 ${
                  hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <button className="px-6 py-2 bg-white text-primary rounded-full font-body font-semibold text-sm hover:bg-opacity-90 transition-all">
                  View Design
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
