'use client';

import { useState } from 'react';
import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services';
import { About } from '@/components/About';
import { Reviews } from '@/components/Reviews';
import { Contact } from '@/components/Contact';
import Navbar from '@/components/Navbar';
import BookingForm from '@/components/BookingForm';
import siteData from '@/config/site.json';
import { SiteConfig } from '@/types/config';

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const config = siteData as SiteConfig;
  const openBooking = () => setIsBookingOpen(true);

  return (
    <main className="w-full overflow-hidden">
      <Navbar config={config} onBookClick={openBooking} />

      {/* Hero Section */}
      <Hero
        salonName={config.salonName}
        tagline={config.tagline}
        heroImage={config.heroImage}
        onBookClick={openBooking}
      />

      {/* Services Section */}
      <div id="services">
        <Services services={config.services} />
      </div>

      {/* About Section */}
      <div id="about">
        <About about={config.about} />
      </div>

      {/* Reviews Section */}
      <div id="reviews">
        <Reviews reviews={config.reviews} />
      </div>

      {/* Contact Section */}
      <div id="contact">
        <Contact contact={config.contact} />
      </div>

      <BookingForm
        config={config}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />

      {/* Footer */}
      <footer className="bg-foreground text-background py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="text-2xl font-display font-bold mb-4">
                {config.salonName}
              </h3>
              <p className="font-body text-background/70">
                Where your nails become art. Premium Korean-inspired nail salon.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-display font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 font-body text-sm text-background/70">
                <li>
                  <a href="#" className="hover:text-background transition-colors">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-background transition-colors">
                    Gallery
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-background transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-background transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-display font-bold mb-4">Follow Us</h4>
              <div className="flex gap-4">
                {['Instagram', 'Facebook', 'TikTok'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-10 h-10 bg-background/20 rounded-full flex items-center justify-center hover:bg-background/40 transition-colors font-body text-sm"
                  >
                    {social[0]}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-background/20 pt-8">
            <p className="text-center font-body text-sm text-background/60">
              © 2024 {config.salonName}. All rights reserved. | Designed with ✨
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
