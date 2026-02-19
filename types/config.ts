export interface Service {
  id: string;
  name: string;
  price: string;
  description: string;
  image?: string;
}

export interface Review {
  text: string;
  author: string;
  rating: number;
}

export interface ContactInfo {
  phone: string;
  address: string;
  hours: string;
  email?: string;
}

export interface SiteConfig {
  salonName: string;
  tagline: string;
  heroImage: string;
  services: Service[];
  gallery?: string[];
  about: string;
  reviews: Review[];
  contact: ContactInfo;
}
