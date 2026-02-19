'use client'

import { useState } from 'react'

interface ContactInfo {
  phone: string
  address: string
  hours: string
  email: string
}

interface ContactProps {
  contact: ContactInfo
}

export function Contact({ contact }: ContactProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const contactItems = [
    { id: 'address', icon: '📍', label: 'Address', value: contact.address },
    { id: 'phone', icon: '📞', label: 'Phone', value: contact.phone },
    { id: 'hours', icon: '🕒', label: 'Hours', value: contact.hours },
    { id: 'email', icon: '✉️', label: 'Email', value: contact.email },
  ]

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background via-secondary/20 to-background">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-display font-bold text-foreground mb-4">
            Get In Touch
          </h2>
          <p className="text-lg text-muted-foreground font-body">
            We'd love to hear from you and help make your nails beautiful
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {contactItems.map((item) => (
              <div
                key={item.id}
                className={`p-8 rounded-3xl transition-all duration-300 cursor-pointer transform ${
                  hoveredItem === item.id
                    ? 'bg-gradient-to-br from-primary/40 to-accent/30 shadow-lg scale-105'
                    : 'bg-white hover:shadow-md'
                }`}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-display font-bold text-foreground mb-2">
                  {item.label}
                </h3>
                <p className="text-muted-foreground font-body leading-relaxed text-sm">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-3xl p-8 shadow-md">
            <h3 className="text-3xl font-display font-bold text-foreground mb-8">
              Send us a Message
            </h3>
            <form className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-body font-semibold text-foreground mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="e.g., Sarah"
                  className="w-full px-4 py-3 rounded-xl border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-body"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-body font-semibold text-foreground mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-body"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-body font-semibold text-foreground mb-2">
                  Message
                </label>
                <textarea
                  placeholder="Tell us about your nail dreams..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-muted bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-body resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-xl font-body font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Map or Decorative Section */}
        <div className="mt-16 rounded-3xl overflow-hidden shadow-lg h-80 bg-gradient-to-br from-muted via-secondary/30 to-accent/20 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">📍</div>
            <h3 className="text-2xl font-display font-bold text-foreground mb-2">
              Visit Us Today
            </h3>
            <p className="text-muted-foreground font-body">
              Find our cozy salon at {contact.address.split(',')[0]}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
