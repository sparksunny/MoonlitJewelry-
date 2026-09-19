import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { PageRoute } from '../types';
import { Menu, X, Sparkles, Phone, MessageSquare, ShieldCheck, ChevronRight } from 'lucide-react';

interface HeaderProps {
  onOpenAbout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAbout }) => {
  const { activePage, navigate, openInquiry, content } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string; route?: PageRoute; isAbout?: boolean }[] = [
    { label: 'Home', route: 'home' },
    { label: 'About', isAbout: true },
    { label: 'Bridal Jewelry', route: 'bridal' },
    { label: 'Pendants & Necklace', route: 'pendants' },
    { label: 'Rings', route: 'rings' },
    { label: 'Gemstones', route: 'gemstones' },
  ];

  const handleNavClick = (route: PageRoute) => {
    navigate(route);
    setMobileMenuOpen(false);
  };

  const handleItemClick = (item: { label: string; route?: PageRoute; isAbout?: boolean }) => {
    if (item.isAbout) {
      onOpenAbout();
    } else if (item.route) {
      handleNavClick(item.route);
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        id="main-header"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'py-3 bg-[#F8F1E8]/95 backdrop-blur-md shadow-xs border-b border-[#E6DACB]'
            : 'py-5 bg-[#F8F1E8] border-b border-[#E6DACB]/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* LEFT: Brand Logo */}
            <button
              id="header-logo-btn"
              onClick={() => handleNavClick('home')}
              className="text-left group cursor-pointer flex items-center gap-3 focus:outline-hidden"
              aria-label="Moonlit Jewelry Home"
            >
              {content.logoUrl ? (
                <img
                  src={content.logoUrl}
                  alt={content.brandName}
                  className="h-10 md:h-12 w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="font-serif text-2xl sm:text-3xl tracking-[0.18em] text-[#2C221E] font-medium uppercase group-hover:text-[#B89058] transition-colors">
                      Moonlit
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B89058] inline-block mb-1"></span>
                  </div>
                  <span className="text-[9px] tracking-[0.38em] uppercase text-[#7A6E65] font-sans font-medium -mt-1">
                    Jewels &bull; Gemstones
                  </span>
                </div>
              )}
            </button>

            {/* CENTER: Desktop Navigation */}
            <nav id="desktop-nav" className="hidden lg:flex items-center space-x-7" aria-label="Main Navigation">
              {navItems.map((item) => {
                const isActive = item.route ? activePage === item.route : false;
                return (
                  <button
                    key={item.label}
                    id={`nav-link-${item.route || 'about'}`}
                    onClick={() => handleItemClick(item)}
                    className={`text-[13px] tracking-[0.14em] uppercase font-sans transition-all duration-200 py-1 relative cursor-pointer ${
                      isActive
                        ? 'text-[#2C221E] font-semibold'
                        : 'text-[#5C5048] hover:text-[#B89058]'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#B89058] rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* RIGHT: Actions */}
            <div className="hidden lg:flex items-center space-x-6">
              <button
                id="header-contact-btn"
                onClick={() => handleNavClick('contact')}
                className="text-[12px] tracking-[0.16em] uppercase font-sans font-medium text-[#7A6E65] hover:text-[#B89058] transition-colors cursor-pointer"
              >
                Contact & Showroom
              </button>
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                id="header-menu-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#2C221E] hover:text-[#B89058] focus:outline-hidden"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Slide-down / Overlay Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-overlay"
          className="fixed inset-0 z-30 bg-[#2C221E]/30 backdrop-blur-xs lg:hidden pt-20"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="bg-[#F8F1E8] border-b border-[#E6DACB] shadow-xl px-6 py-6 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-4">
              <p className="text-[10px] tracking-[0.24em] uppercase text-[#7A6E65] font-semibold border-b border-[#E6DACB] pb-2">
                Navigation & Collections
              </p>
              {navItems.map((item) => (
                <button
                  key={item.label}
                  id={`mobile-nav-${item.route || 'about'}`}
                  onClick={() => handleItemClick(item)}
                  className={`w-full flex items-center justify-between text-left py-2.5 text-sm tracking-[0.12em] uppercase font-sans border-b border-[#F2E7D8] cursor-pointer ${
                    item.route && activePage === item.route ? 'text-[#B89058] font-bold' : 'text-[#2C221E]'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-4 h-4 text-[#B89058]" />
                </button>
              ))}

              <div className="pt-2 space-y-2">
                <button
                  id="mobile-nav-contact"
                  onClick={() => handleNavClick('contact')}
                  className="w-full text-left py-2 text-xs tracking-[0.14em] uppercase text-[#5C5048] flex items-center justify-between"
                >
                  <span>Contact & Showroom</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="pt-4 border-t border-[#E6DACB] space-y-2">
                <a
                  id="mobile-whatsapp-header-btn"
                  href={`https://wa.me/${content.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    'Hello Moonlit Jewelry, I am interested in your jewelry collection. Please provide details.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-[#F2E7D8] border border-[#D5C2AA] text-[#2C221E] text-xs uppercase tracking-[0.14em] font-medium flex items-center justify-center gap-2 rounded-xs"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>WhatsApp: {content.whatsapp}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
