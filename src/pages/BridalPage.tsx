import React from 'react';
import { useStore } from '../context/StoreContext';
import { ProductGrid } from '../components/ProductGrid';
import { Sparkles, MessageSquare, ArrowRight, ShieldCheck } from 'lucide-react';

export const BridalPage: React.FC = () => {
  const { content, products, openInquiry } = useStore();

  // Section 1: Bridal Jewelry
  const bridalJewelry = products.filter(
    (p) => p.category === 'Bridal Jewelry' && p.section === 'Bridal Jewelry'
  );

  // Section 2: Bracelets
  const bracelets = products.filter(
    (p) => p.category === 'Bridal Jewelry' && p.section === 'Bracelets'
  );

  return (
    <div className="space-y-16 sm:space-y-24 pb-20 pt-24 lg:pt-28">
      {/* ==================================================
          BRIDAL HERO
          ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-xs overflow-hidden bg-[#F2E7D8] border border-[#E6DACB] shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6 p-8 sm:p-12 lg:p-16 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F8F1E8] border border-[#D9C5B0] rounded-xs shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#B89058]" />
                <span className="text-[10px] tracking-[0.24em] uppercase font-sans font-semibold text-[#2C221E]">
                  Pakistani Bridal Atelier
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#2C221E] font-medium leading-tight">
                {content.bridalHeroHeading}
              </h1>

              <div className="w-12 h-[1.5px] bg-[#B89058]"></div>

              <p className="text-xs sm:text-sm text-[#5C5048] leading-relaxed font-sans max-w-lg">
                {content.bridalHeroText}
              </p>

              <div className="p-4 bg-[#F8F1E8]/90 border border-[#D9C5B0] rounded-xs text-xs text-[#7A6E65] space-y-1 font-sans">
                <p className="font-semibold text-[#2C221E]">Authentic Pakistani Bridal Styling:</p>
                <p>
                  Handcrafted to complement traditional lehengas, royal ghararas, shararas, and heavily hand-worked tissue dupattas with exquisite emerald, ruby, and polki motifs.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  onClick={() => openInquiry('Bridal', 'Custom Bridal Consultation')}
                  className="px-6 py-3.5 bg-[#2C221E] text-[#F8F1E8] hover:bg-[#3D302A] text-xs uppercase tracking-[0.18em] font-semibold rounded-xs transition-colors shadow-xs cursor-pointer"
                >
                  Request Bridal Consultation
                </button>
              </div>
            </div>

            {/* Right Pakistani Bridal Model Photography */}
            <div className="lg:col-span-6 relative aspect-16/10 lg:aspect-square overflow-hidden bg-[#2C221E]">
              <img
                src={content.bridalHeroImage}
                alt="Pakistani bride in lehenga and dupatta with royal gold and emerald bridal jewelry"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C221E]/50 via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-4 right-4 bg-[#F8F1E8]/95 px-3 py-1.5 border border-[#D9C5B0] text-[10px] uppercase tracking-widest font-semibold text-[#2C221E]">
                Traditional Bridal Suite
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================================================
          PRODUCT SECTION 1: BRIDAL JEWELRY
          ================================================== */}
      <section id="bridal-sets" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProductGrid
          products={bridalJewelry}
          title="Bridal Jewelry"
          subtitle="Statement bridal chokers, layered raani haars, and matha patti headpieces crafted in 21K and 22K pure gold with natural stones."
        />
      </section>

      {/* ==================================================
          PRODUCT SECTION 2: BRACELETS
          ================================================== */}
      <section id="bridal-bracelets" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProductGrid
          products={bracelets}
          title="Bracelets & Kadas"
          subtitle="Handcrafted Pakistani bridal kadas, polki bangles, and delicate diamond eternity bracelets designed for wedding festivities."
        />
      </section>

      {/* Inquiry Banner */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="p-8 bg-[#FFFFFF]/70 border border-[#E6DACB] rounded-xs space-y-4 shadow-2xs">
          <h3 className="font-serif text-2xl text-[#2C221E] font-medium">
            Bridal Trousseau Inquiries
          </h3>
          <p className="text-xs text-[#5C5048] max-w-md mx-auto leading-relaxed font-sans">
            Need a custom necklace length, specific gemstone matching your lehenga shade, or personalized wrist measurements? Our advisors are ready to assist.
          </p>
          <button
            onClick={() => openInquiry('Bridal Suite', 'Trousseau Consultation')}
            className="px-6 py-2.5 bg-[#F2E7D8] hover:bg-[#2C221E] text-[#2C221E] hover:text-[#F8F1E8] border border-[#D5C2AA] text-xs uppercase tracking-wider font-semibold rounded-xs transition-colors cursor-pointer"
          >
            Inquire for Bridal Planning
          </button>
        </div>
      </section>
    </div>
  );
};
