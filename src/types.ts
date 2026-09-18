export type ProductCategory = 
  | 'Bridal Jewelry'
  | 'Pendants & Necklace'
  | 'Rings'
  | 'Natural Gemstones'
  | string;

export interface Product {
  id: string;
  code: string; // Exactly 3 digits: e.g. "101", "001"
  name: string;
  category: string;
  section: string;
  price: string; // Informational, e.g. "$3,200" or "Inquire for price"
  shortText: string; // Maximum 3 lines
  description: string; // Full rich description
  mainImage: string;
  galleryImages: string[]; // 2-3 additional images
  material: string;
  gemstone: string;
  carat: string;
  color: string;
  cut: string;
  clarity: string;
  origin: string;
  treatment: string;
  certification: string; // e.g. "Laboratory Certified" or "Available upon inquiry"
  laboratory: string; // e.g. "GGI", "AGA", "GFCO", "GIA", or ""
  certificateNumber: string;
  certificationImage?: string;
  isNewArrival: boolean;
  featured?: boolean;
}

export interface SiteContent {
  brandName: string;
  tagline: string;
  companyName: string;
  businessDescription: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  country: string;
  website: string;
  instagram: string;
  logoUrl: string;
  // Home Page
  homeHeroHeading: string;
  homeHeroSubheading: string;
  homeHeroImage: string;
  homeIntroHeading: string;
  homeIntroText: string;
  homeIntroImage: string;
  craftsmanshipHeading: string;
  craftsmanshipSubtext: string;
  certificationHeading: string;
  certificationText: string;
  // Bridal
  bridalHeroHeading: string;
  bridalHeroText: string;
  bridalHeroImage: string;
  // Pendants & Necklace
  pendantsHeroHeading: string;
  pendantsHeroText: string;
  pendantsHeroImage: string;
  // Rings
  ringsHeroHeading: string;
  ringsHeroText: string;
  // Gemstones
  gemstonesHeroHeading: string;
  gemstonesHeroText: string;
  gemstonesHeroImage: string;
  // Footer
  footerText: string;
}

export type PageRoute = 
  | 'home'
  | 'bridal'
  | 'pendants'
  | 'rings'
  | 'gemstones'
  | 'product-detail'
  | 'admin'
  | 'contact';

export interface InquiryFormData {
  fullName: string;
  email: string;
  phone: string;
  productCode: string;
  productName: string;
  message: string;
}
