'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { SiteConfig } from '@/types/config';

interface NavbarProps {
  config: SiteConfig;
  onBookClick: () => void;
}

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ config, onBookClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.replace('#', ''));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const id = href.replace('#', '');
    setActiveSection(id);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-background/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-serif text-xl md:text-2xl font-bold text-foreground tracking-tight"
        >
          {config.salonName}
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <li key={link.href}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className={`relative text-sm font-medium tracking-wide uppercase transition-colors duration-200 ${
                    isActive ? 'text-foreground' : 'text-foreground/70 hover:text-foreground'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-foreground rounded-full transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0'
                    }`}
                  />
                </button>
              </li>
            );
          })}
          <li>
            <button
              onClick={onBookClick}
              className="ml-2 bg-foreground text-background text-sm font-semibold py-2.5 px-6 rounded-lg hover:opacity-90 transition-opacity duration-200"
            >
              Book Now
            </button>
          </li>
        </ul>

        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="md:hidden p-2 text-foreground"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <div
        className={`md:hidden fixed inset-0 top-16 bg-background/95 backdrop-blur-md transition-all duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <ul className="flex flex-col items-center gap-6 pt-12">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <li key={link.href}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className={`text-lg font-medium tracking-wide uppercase transition-colors duration-200 ${
                    isActive ? 'text-foreground' : 'text-foreground/60 hover:text-foreground'
                  }`}
                >
                  {link.label}
                </button>
              </li>
            );
          })}
          <li className="mt-4">
            <button
              onClick={() => {
                setMobileOpen(false);
                onBookClick();
              }}
              className="bg-foreground text-background font-semibold py-3 px-10 rounded-lg hover:opacity-90 transition-opacity duration-200 text-base"
            >
              Book Now
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}
