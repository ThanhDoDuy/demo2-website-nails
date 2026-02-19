'use client'

interface AboutProps {
  about: string
  image?: string
}

export function About({ about, image }: AboutProps) {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-background via-secondary/30 to-background">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <h2 className="text-5xl md:text-6xl font-display font-bold text-foreground mb-6">
              About Us
            </h2>
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground font-body leading-relaxed">
                {about}
              </p>
              <p className="text-base text-muted-foreground font-body leading-relaxed opacity-80">
                We use only premium, eco-friendly products and employ the latest nail care techniques. Our goal is to create a safe, welcoming space where every client feels valued and leaves with beautiful, healthy nails.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {[
                { icon: '✨', label: 'Premium Products' },
                { icon: '👥', label: 'Expert Team' },
                { icon: '🌿', label: 'Eco-Friendly' },
                { icon: '💆', label: 'Relaxing Vibe' },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <span className="text-3xl">{feature.icon}</span>
                  <span className="font-body font-semibold text-foreground text-sm">
                    {feature.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2">
            <div className="relative">
              {/* Decorative background */}
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/30 via-accent/20 to-secondary/30 rounded-3xl blur-xl" />

              {/* Image container */}
              <div className="relative bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl p-2 overflow-hidden">
                <img
                  src={image || 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=500&h=500&fit=crop'}
                  alt="About Salon"
                  className="w-full rounded-2xl object-cover aspect-square"
                />
              </div>

              {/* Floating accent */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-secondary rounded-full opacity-40 blur-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
