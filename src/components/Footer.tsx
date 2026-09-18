import React from 'react';
import { useStore } from '../context/StoreContext';
import { PageRoute } from '../types';
import { Phone, Mail, MapPin, Globe, Instagram, MessageSquare, Shield, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  const { content, navigate } = useStore();

  const navLinks: { label: string; route: PageRoute }[] = [
    { label: 'Home', route: 'home' },
    { label: 'Bridal Jewelry', route: 'bridal' },
    { label: 'Pendants & Necklace', route: 'pendants' },
    { label: 'Rings & Earrings', route: 'rings' },
    { label: 'Natural Gemstones', route: 'gemstones' },
    { label: 'Contact & Inquiry', route: 'contact' },
  ];

  const whatsappNumber = content.whatsapp.replace(/[^0-9]/g, '');

  return (
    <footer id="main-footer" className="bg-[#F2E7D8] border-t border-[#E6DACB] text-[#2C221E] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-[#E0D0BD]">
          
          {/* Col 1: Brand & Slogan */}
          <div className="space-y-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-serif text-2xl tracking-[0.16em] uppercase font-medium text-[#2C221E]">
                  {content.brandName}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#B89058]"></span>
              </div>
              <p className="text-[10px] tracking-[0.28em] uppercase text-[#7A6E65] font-sans font-medium">
                {content.businessDescription}
              </p>
            </div>

            <p className="font-serif italic text-sm text-[#5C5048] leading-relaxed">
              &ldquo;{content.tagline}&rdquo;
            </p>

            <p className="text-xs text-[#7A6E65] leading-relaxed font-sans">
              Specializing in authentic Pakistani bridal heirlooms, natural emeralds, rubies, sapphires, and diamond creations crafted for generations.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                id="footer-instagram-link"
                href={`https://instagram.com/${content.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xs bg-[#F8F1E8] border border-[#D9C5B0] flex items-center justify-center text-[#2C221E] hover:text-[#B89058] hover:border-[#B89058] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                id="footer-whatsapp-link"
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xs bg-[#F8F1E8] border border-[#D9C5B0] flex items-center justify-center text-[#2C221E] hover:text-[#25D366] hover:border-[#25D366] transition-colors"
                aria-label="WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>

              <a
                id="footer-email-link"
                href={`mailto:${content.email}`}
                className="w-9 h-9 rounded-xs bg-[#F8F1E8] border border-[#D9C5B0] flex items-center justify-center text-[#2C221E] hover:text-[#B89058] hover:border-[#B89058] transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-xs tracking-[0.24em] uppercase font-sans font-semibold text-[#2C221E] border-b border-[#E0D0BD] pb-2">
              Collections
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((item) => (
                <li key={item.route}>
                  <button
                    id={`footer-nav-${item.route}`}
                    onClick={() => navigate(item.route)}
                    className="text-xs text-[#5C5048] hover:text-[#B89058] transition-colors tracking-wide cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Company & Atelier Information */}
          <div className="space-y-4">
            <h4 className="text-xs tracking-[0.24em] uppercase font-sans font-semibold text-[#2C221E] border-b border-[#E0D0BD] pb-2">
              Company & Contact
            </h4>
            <div className="space-y-3 text-xs text-[#5C5048]">
              <div className="flex items-start gap-2.5">
                <span className="font-semibold text-[#2C221E] min-w-[70px]">Entity:</span>
                <span>{content.companyName}</span>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#B89058] shrink-0 mt-0.5" />
                <span>
                  {content.address}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#B89058] shrink-0" />
                <a
                  href={`tel:${content.phone}`}
                  className="hover:text-[#2C221E] transition-colors"
                >
                  {content.phone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#B89058] shrink-0" />
                <a
                  href={`mailto:${content.email}`}
                  className="hover:text-[#2C221E] transition-colors"
                >
                  {content.email}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-[#B89058] shrink-0" />
                <a
                  href={`https://${content.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#2C221E] transition-colors"
                >
                  {content.website}
                </a>
              </div>
            </div>
          </div>

          {/* Col 4: Inquiry & Certification Notice */}
          <div className="space-y-4">
            <h4 className="text-xs tracking-[0.24em] uppercase font-sans font-semibold text-[#2C221E] border-b border-[#E0D0BD] pb-2">
              Showroom Policy
            </h4>
            <div className="p-4 bg-[#F8F1E8] border border-[#E0D0BD] rounded-xs space-y-2.5">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#2C221E]">
                <Shield className="w-3.5 h-3.5 text-[#B89058]" />
                <span>Authenticity & Inquiry Only</span>
              </div>
              <p className="text-[11px] text-[#7A6E65] leading-relaxed">
                Moonlit Jewelry operates exclusively as a luxury showcase and personal advisory atelier. Direct checkout is disabled to ensure bespoke consultation for every gemstone and jewelry piece.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7A6E65]">
          <p>© 2026 Moonlit Jewelry. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <span>Natural Stones &bull; Certified Gemstones &bull; Real Gold</span>
            <button
              id="footer-admin-login-btn"
              onClick={() => navigate('admin')}
              className="text-[#7A6E65] hover:text-[#2C221E] flex items-center gap-1 transition-colors text-[11px] cursor-pointer"
              title="Atelier Management Portal"
            >
              <Lock className="w-3 h-3" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
