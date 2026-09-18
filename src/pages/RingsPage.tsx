import React from 'react';
import { useStore } from '../context/StoreContext';
import { ProductGrid } from '../components/ProductGrid';
import { Sparkles, MessageSquare } from 'lucide-react';

export const RingsPage: React.FC = () => {
  const { content, products, openInquiry } = useStore();

  // Section 1: Natural Gemstone Rings
  const gemstoneRings = products.filter(
    (p) => p.category === 'Rings' && p.section === 'Natural Gemstone Rings'
  );

  // Section 2: Moissanite Rings
  const moissaniteRings = products.filter(
    (p) => p.category === 'Rings' && p.section === 'Moissanite Rings'
  );

  // Section 3: Diamond Rings
  const diamondRings = products.filter(
    (p) => p.category === 'Rings' && p.section === 'Diamond Rings'
  );

  // Section 4: Earrings (Explicit user instruction on Rings page)
  const earrings = products.filter(
    (p) => p.category === 'Rings' && p.section === 'Earrings'
  );

  return (
    <div className="space-y-16 sm:space-y-24 pb-20 pt-24 lg:pt-28">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F2E7D8] border border-[#E6DACB] p-8 sm:p-14 rounded-xs text-center space-y-4 shadow-xs">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F8F1E8] border border-[#D9C5B0] rounded-xs shadow-2xs mx-auto">
            <Sparkles className="w-3.5 h-3.5 text-[#B89058]" />
            <span className="text-[10px] tracking-[0.24em] uppercase font-sans font-semibold text-[#2C221E]">
              Fine Rings & Atelier Earrings
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl text-[#2C221E] font-medium tracking-tight">
            {content.ringsHeroHeading}
          </h1>

          <div className="w-12 h-[1.5px] bg-[#B89058] mx-auto"></div>

          <p className="text-xs sm:text-sm text-[#5C5048] max-w-xl mx-auto leading-relaxed font-sans">
            {content.ringsHeroText}
          </p>

          <div className="pt-2">
            <button
              onClick={() => openInquiry('Rings & Earrings', 'Custom Ring Sizing / Commission')}
              className="px-6 py-3 bg-[#2C221E] text-[#F8F1E8] hover:bg-[#3D302A] text-xs uppercase tracking-[0.18em] font-semibold rounded-xs transition-colors cursor-pointer"
            >
              Inquire for Custom Ring Sizing
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 1: Natural Gemstone Rings */}
      <section id="gemstone-rings-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProductGrid
          products={gemstoneRings}
          title="1. Natural Gemstone Rings"
          subtitle="Rare octagonal Panjshir emeralds, unheated ruby medallions, and royal Ceylon sapphires in 18K solid gold."
        />
      </section>

      {/* SECTION 2: Moissanite Rings */}
      <section id="moissanite-rings-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProductGrid
          products={moissaniteRings}
          title="2. Moissanite Rings"
          subtitle="Ethically lab-synthesized VVS1 crushed-ice cushion and emerald cut moissanites with supreme refractive fire."
        />
      </section>

      {/* SECTION 3: Diamond Rings */}
      <section id="diamond-rings-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProductGrid
          products={diamondRings}
          title="3. Diamond Rings"
          subtitle="Certified earth-mined oval and brilliant-cut natural diamond solitaires with handcrafted hidden halos."
        />
      </section>

      {/* SECTION 4: Earrings (Explicitly placed on Rings page) */}
      <section id="earrings-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProductGrid
          products={earrings}
          title="4. Earrings"
          subtitle="Traditional Pakistani chaandbaali earrings, polki jhumkas, and tiered emerald drop danglers."
        />
      </section>
    </div>
  );
};
