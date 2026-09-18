import React from 'react';
import { useStore } from '../context/StoreContext';
import { ProductGrid } from '../components/ProductGrid';
import { Sparkles, ShieldCheck, Gem, Eye, Heart, Compass, ArrowRight, MessageSquare, Award } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { content, products, navigate, openInquiry } = useStore();

  // Filter new arrivals or top 4 products
  const newArrivals = products.filter((p) => p.isNewArrival).slice(0, 4);
  const displayArrivals = newArrivals.length > 0 ? newArrivals : products.slice(0, 4);

  return (
    <div className="space-y-20 sm:space-y-28 pb-20">
      {/* ==================================================
          SECTION: HERO DESIGN
          ================================================== */}
      <section
        id="home-hero"
        className="relative min-h-[85vh] lg:min-h-[92vh] flex items-center bg-[#F8F1E8] overflow-hidden pt-24 lg:pt-20 border-b border-[#E6DACB]"
      >
        {/* Subtle decorative champagne ring / pattern */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#F2E7D8]/60 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#EADBCA]/40 blur-xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* Left Column: Typography & CTAs */}
            <div className="lg:col-span-6 space-y-6 text-left">
              {/* Subtle jewelry-inspired icon + tagline badge */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-[#F2E7D8]/80 border border-[#D9C5B0] rounded-xs shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#B89058]" />
                <span className="text-[10px] tracking-[0.26em] uppercase font-sans font-semibold text-[#2C221E]">
                  Pakistani High Jewelry &bull; Natural Stones
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#2C221E] leading-[1.12] tracking-tight font-normal">
                Real Jewelry.<br />
                <span className="italic font-light text-[#B89058]">Natural Stones.</span><br />
                Timeless Beauty.
              </h1>

              {/* Small decorative gold line */}
              <div className="flex items-center gap-3">
                <span className="w-12 h-[1.5px] bg-[#B89058]"></span>
                <span className="w-2 h-2 rounded-full border border-[#B89058]"></span>
                <span className="w-6 h-[1px] bg-[#D5C2AA]"></span>
              </div>

              {/* Supporting text */}
              <p className="text-sm sm:text-base text-[#5C5048] max-w-lg leading-relaxed font-sans font-normal">
                {content.homeHeroSubheading}
              </p>

              {/* CTAs: Strictly Non-ecommerce */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  id="hero-explore-btn"
                  onClick={() => navigate('bridal')}
                  className="px-7 py-3.5 bg-[#2C221E] hover:bg-[#3D302A] text-[#F8F1E8] text-xs uppercase tracking-[0.2em] font-sans font-semibold rounded-xs shadow-sm transition-all duration-200 cursor-pointer flex items-center gap-2"
                >
                  <span>Explore Collections</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#B89058]" />
                </button>

                <button
                  id="hero-inquire-btn"
                  onClick={() => openInquiry()}
                  className="px-6 py-3.5 bg-[#F2E7D8] hover:bg-[#EADBCA] border border-[#D5C2AA] text-[#2C221E] text-xs uppercase tracking-[0.16em] font-sans font-semibold rounded-xs transition-all duration-200 cursor-pointer flex items-center gap-2"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#B89058]" />
                  <span>Inquire Now</span>
                </button>
              </div>

              {/* Trust markers */}
              <div className="pt-6 border-t border-[#E6DACB] flex items-center gap-6 text-[11px] text-[#7A6E65]">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#B89058]" />
                  <span>Certified Natural Gems</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#B89058]" />
                  <span>Pakistani Goldsmithing</span>
                </div>
              </div>
            </div>

            {/* Right Column: Large Pakistani Female Model Editorial Image */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Decorative border frame */}
                <div className="absolute -inset-3 border border-[#D5C2AA]/80 rounded-xs pointer-events-none transform translate-x-2 translate-y-2 hidden sm:block" />
                
                <div className="relative aspect-4/5 sm:aspect-16/11 lg:aspect-4/5 overflow-hidden rounded-xs bg-[#F2E7D8] shadow-lg border border-[#E6DACB]">
                  <img
                    src={content.homeHeroImage}
                    alt="Pakistani model in exquisite emerald jewelry and luxury attire"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2C221E]/40 via-transparent to-transparent opacity-60" />
                  
                  {/* Overlay Tag */}
                  <div className="absolute bottom-4 left-4 right-4 bg-[#F8F1E8]/95 backdrop-blur-xs p-3 border border-[#D9C5B0] rounded-xs flex items-center justify-between">
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.24em] text-[#7A6E65] font-semibold">
                        Bridal & Occasion
                      </p>
                      <p className="font-serif text-sm text-[#2C221E] font-medium">
                        Heirloom Colombian Emerald & Polki Suite
                      </p>
                    </div>
                    <button
                      onClick={() => navigate('bridal')}
                      className="text-[10px] uppercase tracking-wider font-semibold text-[#B89058] hover:text-[#2C221E] underline cursor-pointer"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 1 — INTRODUCTION
          ================================================== */}
      <section id="home-intro" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFFFFF]/60 border border-[#E6DACB] rounded-xs p-6 sm:p-10 lg:p-14 shadow-2xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* LEFT: Pakistani female model in formal Pakistani dress wearing jewelry */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-3/4 overflow-hidden rounded-xs bg-[#F2E7D8] border border-[#D5C2AA] shadow-xs">
                <img
                  src={content.homeIntroImage}
                  alt="Pakistani female model wearing handcrafted ruby pendant and gold rings"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              {/* Corner badge */}
              <div className="absolute -bottom-3 -right-3 bg-[#F8F1E8] border border-[#B89058] px-3.5 py-1.5 shadow-xs text-[10px] tracking-[0.2em] uppercase font-semibold text-[#2C221E]">
                Atelier Handcrafted
              </div>
            </div>

            {/* RIGHT: Introduction text */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2">
                  <span className="w-6 h-[1px] bg-[#B89058]"></span>
                  <span className="text-[10px] tracking-[0.24em] uppercase text-[#7A6E65] font-sans font-medium">
                    The Atelier Philosophy
                  </span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#2C221E] font-medium leading-snug">
                  {content.homeIntroHeading}
                </h2>
              </div>

              <div className="space-y-4 text-sm text-[#5C5048] leading-relaxed font-sans">
                <p>{content.homeIntroText}</p>
                <p>
                  Rooted in the timeless artistry of Pakistani master craftsmen, each piece is designed to harmonize with the elegance of traditional attire—from formal shalwar kameez and dupattas to regal bridal lehengas and shararas.
                </p>
                <p>
                  Every gemstone is carefully evaluated for color saturation, clarity, and authenticity. We believe fine jewelry is not merely an ornament, but an enduring personal investment that carries sentiment across generations.
                </p>
              </div>

              <div className="pt-2">
                <button
                  id="intro-discover-btn"
                  onClick={() => navigate('bridal')}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-sans font-semibold text-[#2C221E] hover:text-[#B89058] transition-colors border-b border-[#B89058] pb-1 cursor-pointer"
                >
                  <span>Discover Our Collections</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 2 — CRAFTSMANSHIP
          ================================================== */}
      <section id="home-craftsmanship" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-2">
          <div className="inline-flex items-center justify-center gap-3">
            <span className="w-8 h-[1px] bg-[#B89058]" />
            <span className="text-[10px] uppercase tracking-[0.28em] text-[#7A6E65] font-semibold">
              Heritage Standards
            </span>
            <span className="w-8 h-[1px] bg-[#B89058]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2C221E] font-medium">
            {content.craftsmanshipHeading}
          </h2>
          <p className="text-xs sm:text-sm text-[#7A6E65] max-w-xl mx-auto font-sans">
            {content.craftsmanshipSubtext}
          </p>
        </div>

        {/* 4 Feature Cards: 01, 02, 03, 04 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 01 */}
          <div className="p-6 bg-[#FFFFFF]/70 border border-[#E6DACB] rounded-xs space-y-3 hover:border-[#B89058] transition-colors duration-300">
            <span className="font-serif text-2xl text-[#B89058] font-light">01</span>
            <h3 className="font-serif text-lg text-[#2C221E] font-medium">
              Thoughtful Selection
            </h3>
            <p className="text-xs text-[#5C5048] leading-relaxed font-sans">
              Careful curation of precious 18K and 22K gold alloys, prioritizing structural durability, weight, and authentic antique finishes.
            </p>
          </div>

          {/* 02 */}
          <div className="p-6 bg-[#FFFFFF]/70 border border-[#E6DACB] rounded-xs space-y-3 hover:border-[#B89058] transition-colors duration-300">
            <span className="font-serif text-2xl text-[#B89058] font-light">02</span>
            <h3 className="font-serif text-lg text-[#2C221E] font-medium">
              Fine Craftsmanship
            </h3>
            <p className="text-xs text-[#5C5048] leading-relaxed font-sans">
              Master Pakistani goldsmiths execute hand filigree, traditional kundan foil setting, and intricate meenakari enameling.
            </p>
          </div>

          {/* 03 */}
          <div className="p-6 bg-[#FFFFFF]/70 border border-[#E6DACB] rounded-xs space-y-3 hover:border-[#B89058] transition-colors duration-300">
            <span className="font-serif text-2xl text-[#B89058] font-light">03</span>
            <h3 className="font-serif text-lg text-[#2C221E] font-medium">
              Natural Gemstones
            </h3>
            <p className="text-xs text-[#5C5048] leading-relaxed font-sans">
              Specializing in certified unheated Swat and Colombian emeralds, Burmese rubies, Ceylon sapphires, and ethical moissanite.
            </p>
          </div>

          {/* 04 */}
          <div className="p-6 bg-[#FFFFFF]/70 border border-[#E6DACB] rounded-xs space-y-3 hover:border-[#B89058] transition-colors duration-300">
            <span className="font-serif text-2xl text-[#B89058] font-light">04</span>
            <h3 className="font-serif text-lg text-[#2C221E] font-medium">
              Attention to Detail
            </h3>
            <p className="text-xs text-[#5C5048] leading-relaxed font-sans">
              Every clasp, bezel edge, seed pearl strand, and gallery interior is hand-inspected for silky skin comfort and lasting security.
            </p>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 3 — CERTIFICATION & AUTHENTICITY
          ================================================== */}
      <section id="home-certification" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F2E7D8]/80 border border-[#D5C2AA] rounded-xs p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#B89058]" />
              <span className="text-[10px] tracking-[0.26em] uppercase text-[#7A6E65] font-semibold">
                Integrity & Transparency
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl text-[#2C221E] font-medium">
              {content.certificationHeading}
            </h2>

            <p className="text-xs sm:text-sm text-[#5C5048] leading-relaxed font-sans">
              {content.certificationText}
            </p>

            {/* Laboratory Badges */}
            <div className="pt-2">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#7A6E65] font-semibold mb-3">
                Recognized Gemological Laboratories Represented in Our Inventory:
              </p>
              <div className="flex flex-wrap items-center gap-3">
                {[
                  { name: 'GIA', desc: 'Gemological Institute of America' },
                  { name: 'AGA', desc: 'Accredited Gemologists Association' },
                  { name: 'GFCO', desc: 'Gem Testing Laboratory' },
                  { name: 'GGI', desc: 'Gemological & Gemstone Identification' },
                ].map((lab) => (
                  <div
                    key={lab.name}
                    className="px-4 py-2 bg-[#F8F1E8] border border-[#D9C5B0] rounded-xs flex items-center gap-2 shadow-2xs"
                  >
                    <span className="font-serif font-bold text-sm text-[#2C221E]">{lab.name}</span>
                    <span className="text-[10px] text-[#7A6E65] font-sans border-l border-[#D9C5B0] pl-2 hidden sm:inline">
                      {lab.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-[11px] text-[#7A6E65] italic font-sans">
              * Note: Certification details, origin verification reports, and unique certificate numbers are provided on individual product detail pages where applicable.
            </p>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 4 — LUXURY / BEAUTY / TRUST / PERSONAL ATTENTION
          ================================================== */}
      <section id="home-pillars" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-[10px] uppercase tracking-[0.28em] text-[#7A6E65] font-semibold">
            The Moonlit Promise
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2C221E] font-medium mt-1">
            Luxury. Beauty. Trust. Personal Attention.
          </h2>
        </div>

        {/* 4 Visual Storytelling Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* LUXURY */}
          <div className="bg-[#FFFFFF]/80 border border-[#E6DACB] p-6 rounded-xs space-y-3 relative group hover:border-[#B89058] transition-all">
            <div className="w-10 h-10 rounded-xs bg-[#F2E7D8] flex items-center justify-center text-[#B89058]">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl text-[#2C221E] tracking-wider uppercase font-medium">
              Luxury
            </h3>
            <p className="text-xs text-[#5C5048] leading-relaxed font-sans">
              Refined jewelry designed for meaningful occasions, wedding celebrations, and unforgettable memories.
            </p>
          </div>

          {/* BEAUTY */}
          <div className="bg-[#FFFFFF]/80 border border-[#E6DACB] p-6 rounded-xs space-y-3 relative group hover:border-[#B89058] transition-all">
            <div className="w-10 h-10 rounded-xs bg-[#F2E7D8] flex items-center justify-center text-[#B89058]">
              <Gem className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl text-[#2C221E] tracking-wider uppercase font-medium">
              Beauty
            </h3>
            <p className="text-xs text-[#5C5048] leading-relaxed font-sans">
              Natural stones and elegant designs that complement your personal style and Pakistani formal fashion.
            </p>
          </div>

          {/* TRUST */}
          <div className="bg-[#FFFFFF]/80 border border-[#E6DACB] p-6 rounded-xs space-y-3 relative group hover:border-[#B89058] transition-all">
            <div className="w-10 h-10 rounded-xs bg-[#F2E7D8] flex items-center justify-center text-[#B89058]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl text-[#2C221E] tracking-wider uppercase font-medium">
              Trust
            </h3>
            <p className="text-xs text-[#5C5048] leading-relaxed font-sans">
              Clear product information, transparent stone disclosures, and applicable laboratory certification details.
            </p>
          </div>

          {/* PERSONAL ATTENTION */}
          <div className="bg-[#FFFFFF]/80 border border-[#E6DACB] p-6 rounded-xs space-y-3 relative group hover:border-[#B89058] transition-all">
            <div className="w-10 h-10 rounded-xs bg-[#F2E7D8] flex items-center justify-center text-[#B89058]">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl text-[#2C221E] tracking-wider uppercase font-medium">
              Personal Attention
            </h3>
            <p className="text-xs text-[#5C5048] leading-relaxed font-sans">
              A direct inquiry experience for customers seeking customized sizing, bespoke bridal pairings, and gemstone advice.
            </p>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 5 — NEW ARRIVALS
          ================================================== */}
      <section id="home-new-arrivals" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProductGrid
          products={displayArrivals}
          title="New Arrivals"
          subtitle="Discover the latest handcrafted jewels freshly added to our digital showroom."
        />

        <div className="mt-12 text-center">
          <button
            id="view-all-collections-btn"
            onClick={() => navigate('bridal')}
            className="px-8 py-3.5 bg-[#F2E7D8] hover:bg-[#2C221E] text-[#2C221E] hover:text-[#F8F1E8] border border-[#D5C2AA] text-xs font-semibold uppercase tracking-[0.2em] rounded-xs shadow-2xs transition-all cursor-pointer"
          >
            Explore Complete Collections
          </button>
        </div>
      </section>

      {/* Inquiry CTA Banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-[#2C221E] text-[#F8F1E8] p-8 sm:p-12 rounded-xs text-center space-y-4 shadow-xl">
          <span className="text-[10px] tracking-[0.28em] uppercase text-[#B89058] font-semibold">
            Bespoke Consultation
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#F8F1E8] font-normal">
            Seeking a Specific Gemstone or Custom Bridal Piece?
          </h2>
          <p className="text-xs sm:text-sm text-[#DFD3C3] max-w-xl mx-auto font-sans leading-relaxed">
            Our atelier works directly with international clients to source certified loose gems and craft bespoke bridal jewelry suites.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => openInquiry()}
              className="px-6 py-3 bg-[#B89058] hover:bg-[#c59e65] text-[#2C221E] text-xs uppercase tracking-[0.18em] font-semibold rounded-xs shadow-xs transition-colors cursor-pointer"
            >
              Start Private Inquiry
            </button>
            <a
              href={`https://wa.me/${content.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                'Hello Moonlit Jewelry, I would like to inquire about a custom jewelry commission.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#3A2E2B] hover:bg-[#4A3B37] border border-[#B89058]/40 text-[#F8F1E8] text-xs uppercase tracking-[0.16em] font-medium rounded-xs transition-colors flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp Advisor</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
