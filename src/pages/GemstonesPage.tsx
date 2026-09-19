import React from 'react';
import { useStore } from '../context/StoreContext';
import { ProductGrid } from '../components/ProductGrid';
import { Sparkles, ShieldCheck, Gem, MapPin, Award } from 'lucide-react';

export const GemstonesPage: React.FC = () => {
  const { content, products, openInquiry } = useStore();

  // 1. Natural Gemstones (Overview)
  const naturalGems = products.filter(
    (p) => p.category === 'Natural Gemstones' && p.section === 'Natural Gemstones'
  );

  // 2. Emerald
  const emeralds = products.filter(
    (p) => p.category === 'Natural Gemstones' && p.section === 'Emerald'
  );

  // 3. Ruby
  const rubies = products.filter(
    (p) => p.category === 'Natural Gemstones' && p.section === 'Ruby'
  );

  // 4. Sapphire
  const sapphires = products.filter(
    (p) => p.category === 'Natural Gemstones' && p.section === 'Sapphire'
  );

  // 5. Diamond
  const diamonds = products.filter(
    (p) => p.category === 'Natural Gemstones' && p.section === 'Diamond'
  );

  return (
    <div className="space-y-16 sm:space-y-24 pb-20 pt-24 lg:pt-28">
      {/* Gemstones Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-xs overflow-hidden bg-[#F2E7D8] border border-[#E6DACB] shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6 p-8 sm:p-12 lg:p-16 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F8F1E8] border border-[#D9C5B0] rounded-xs shadow-2xs">
                <Gem className="w-3.5 h-3.5 text-[#B89058]" />
                <span className="text-[10px] tracking-[0.24em] uppercase font-sans font-semibold text-[#2C221E]">
                  Precious Natural Stones &bull; Certified Origins
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#2C221E] font-medium leading-tight">
                Natural Gemstones
              </h1>

              <div className="w-12 h-[1.5px] bg-[#B89058]"></div>

              <p className="text-xs sm:text-sm text-[#5C5048] leading-relaxed font-sans max-w-lg">
                {content.gemstonesHeroText}
              </p>

              {/* Gemstone disclosure card */}
              <div className="p-4 bg-[#F8F1E8]/90 border border-[#D9C5B0] rounded-xs space-y-2 text-xs text-[#5C5048]">
                <div className="flex items-center gap-1.5 text-[#2C221E] font-semibold">
                  <ShieldCheck className="w-4 h-4 text-[#B89058]" />
                  <span>Uncompromised Disclosure Policy</span>
                </div>
                <p className="text-[11px] text-[#7A6E65] leading-relaxed">
                  Every gemstone listed specifies exact carat weight, cut, color saturation, verified country of origin, and certified thermal/oil treatment status.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => openInquiry('Loose Gems', 'Gemstone Sourcing & Advisory')}
                  className="px-6 py-3.5 bg-[#2C221E] text-[#F8F1E8] hover:bg-[#3D302A] text-xs uppercase tracking-[0.18em] font-semibold rounded-xs transition-colors shadow-xs cursor-pointer"
                >
                  Inquire for Loose Gemstones
                </button>
              </div>
            </div>

            {/* Right Still-life Image */}
            <div className="lg:col-span-6 relative aspect-16/10 lg:aspect-square overflow-hidden bg-[#2C221E]">
              <img
                src={content.gemstonesHeroImage}
                alt="Certified loose natural emeralds, rubies, and sapphires with tweezers and certificate card"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes('photo-1599643478518')) {
                    target.src = 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80';
                  }
                }}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C221E]/40 via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-4 right-4 bg-[#F8F1E8]/95 px-3 py-1.5 border border-[#D9C5B0] text-[10px] uppercase tracking-widest font-semibold text-[#2C221E]">
                Laboratory Certified Specimens
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 1: Natural Gemstones Overview */}
      <section id="gems-overview" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProductGrid
          products={naturalGems}
          title="1. Natural Gemstones"
          subtitle="Featured rare natural specimens, including unheated Swat Valley emeralds and collector parcels."
        />
      </section>

      {/* SECTION 2: Emerald */}
      <section id="gems-emerald" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProductGrid
          products={emeralds}
          title="2. Emerald"
          subtitle="Exceptional beryl crystals originating from Muzo (Colombia), Zambia, and Swat (Pakistan)."
        />
      </section>

      {/* SECTION 3: Ruby */}
      <section id="gems-ruby" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProductGrid
          products={rubies}
          title="3. Ruby"
          subtitle="Natural unheated and gently heated corundum showcasing coveted Pigeon Blood crimson hues from Burma and Mozambique."
        />
      </section>

      {/* SECTION 4: Sapphire */}
      <section id="gems-sapphire" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProductGrid
          products={sapphires}
          title="4. Sapphire"
          subtitle="Velvety royal cornflower blue Ceylon sapphires from the historic gem gravels of Ratnapura, Sri Lanka."
        />
      </section>

      {/* SECTION 5: Diamond */}
      <section id="gems-diamond" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProductGrid
          products={diamonds}
          title="5. Diamond"
          subtitle="GIA certified natural earth-mined diamonds graded with Triple Excellent symmetry and unblemished fire."
        />
      </section>
    </div>
  );
};
