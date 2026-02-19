'use client'

import { useState } from 'react'
import Image from 'next/image'

interface Service {
  id: string
  name: string
  price: string
  description: string
  image?: string
}

interface ServicesProps {
  services: Service[]
}

export function Services({ services }: ServicesProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background via-secondary/20 to-background">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-display font-bold text-foreground mb-4">
            Our Services
          </h2>
          <p className="text-lg text-muted-foreground font-body">
            Premium nail care services with expert technicians
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className={`bg-white rounded-3xl p-8 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform ${
                hoveredId === service.id ? 'scale-105' : 'scale-100'
              }`}
              onMouseEnter={() => setHoveredId(service.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Service Image */}
              {service.image && (
                <div className="relative w-full h-48 mb-6 rounded-2xl overflow-hidden bg-muted">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Service Info */}
              <div>
                <h3 className="text-2xl font-display font-bold text-foreground mb-2">
                  {service.name}
                </h3>
                <p className="text-xl font-body font-semibold text-primary mb-4">
                  {service.price}
                </p>
                <p className="text-muted-foreground font-body leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Decorative Element */}
              <div className="mt-6 h-1 w-12 bg-gradient-to-r from-primary to-accent rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
