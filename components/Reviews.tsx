'use client'

import { useState } from 'react'

interface Review {
  text: string
  author: string
  rating: number
}

interface ReviewsProps {
  reviews: Review[]
}

export function Reviews({ reviews }: ReviewsProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background via-muted/30 to-background">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-display font-bold text-foreground mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-muted-foreground font-body">
            Loved by our beautiful community
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-3xl transition-all duration-300 cursor-pointer group ${
                activeIndex === index
                  ? 'bg-gradient-to-br from-primary/40 to-accent/30 shadow-lg scale-105'
                  : 'bg-white hover:shadow-md'
              }`}
              onClick={() => setActiveIndex(index)}
            >
              {/* Decorative blob background */}
              <div className="absolute -z-10 -inset-4 bg-gradient-to-br from-secondary/20 via-accent/10 to-primary/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-2xl ${i < review.rating ? 'text-accent' : 'text-muted'}`}
                  >
                    ★
                  </span>
                ))}
              </div>

              {/* Review Text */}
              <p className="text-muted-foreground font-body leading-relaxed mb-6 text-lg">
                {`"${review.text}"`}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <span className="text-white font-display font-bold text-lg">
                    {review.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-body font-semibold text-foreground">
                    {review.author}
                  </p>
                  <p className="text-sm text-muted-foreground">Verified Client</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonial Stats */}
        <div className="mt-16 grid grid-cols-3 gap-6 text-center">
          {[
            { number: '500+', label: 'Happy Clients' },
            { number: '4.9★', label: 'Average Rating' },
            { number: '5+', label: 'Years Experience' },
          ].map((stat, index) => (
            <div key={index} className="p-6 rounded-2xl bg-white hover:shadow-md transition-shadow">
              <p className="text-3xl md:text-4xl font-display font-bold text-primary mb-2">
                {stat.number}
              </p>
              <p className="text-sm text-muted-foreground font-body">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
