import React from 'react';
import { useStore } from '../context/StoreContext';
import { ProductGrid } from '../components/ProductGrid';
import { Sparkles, MessageSquare } from 'lucide-react';

export const PendantsNecklacePage: React.FC = () => {
  const { content, products, openInquiry } = useStore();

  // Section 1: Pendants
  const pendants = products.filter(
    (p) => p.category === 'Pendants & Necklace' && p.section === 'Pendants'
  );

  // Section 2: Necklaces
  const necklaces = products.filter(
    (p) => p.category === 'Pendants & Necklace' && p.section === 'Necklaces'
  );

  // Section 3: Chokers
  const chokers = products.filter(
    (p) => p.category === 'Pendants & Necklace' && p.section === 'Chokers'
  );

  return (
    <div className="space-y-16 sm:space-y-24 pb-20 pt-24 lg:pt-28">
      {/* ==================================================
          PENDANTS & NECKLACE HERO
          ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-xs overflow-hidden bg-[#F2E7D8] border border-[#E6DACB] shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6 p-8 sm:p-12 lg:p-16 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F8F1E8] border border-[#D9C5B0] rounded-xs shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#B89058]" />
                <span className="text-[10px] tracking-[0.24em] uppercase font-sans font-semibold text-[#2C221E]">
                  Haute Joaillerie &bull; Neckwear
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#2C221E] font-medium leading-tight">
                {content.pendantsHeroHeading}
              </h1>

              <div className="w-12 h-[1.5px] bg-[#B89058]"></div>

              <p className="text-xs sm:text-sm text-[#5C5048] leading-relaxed font-sans max-w-lg">
                {content.pendantsHeroText}
              </p>

              <div className="p-4 bg-[#F8F1E8]/90 border border-[#D9C5B0] rounded-xs text-xs text-[#7A6E65] space-y-1 font-sans">
                <p className="font-semibold text-[#2C221E]">Refined Styling for Every Occasion:</p>
                <p>
                  From solitaire natural emerald teardrops worn with delicate Pakistani chikankari kurtas to hand-enameled Gulabi meenakari malas for Eid and Barat festivities.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => openInquiry('Neckwear', 'Necklace & Pendant Inquiries')}
                  className="px-6 py-3.5 bg-[#2C221E] text-[#F8F1E8] hover:bg-[#3D302A] text-xs uppercase tracking-[0.18em] font-semibold rounded-xs transition-colors shadow-xs cursor-pointer"
                >
                  Inquire About Neckwear
                </button>
              </div>
            </div>

            {/* Right Pakistani Fashion Model Photography */}
            <div className="lg:col-span-6 relative aspect-16/10 lg:aspect-square overflow-hidden bg-[#2C221E]">
              <img
                src={content.pendantsHeroImage}
                alt="Pakistani woman wearing fine layered necklace and emerald pendant with formal dupatta"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C221E]/50 via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-4 right-4 bg-[#F8F1E8]/95 px-3 py-1.5 border border-[#D9C5B0] text-[10px] uppercase tracking-widest font-semibold text-[#2C221E]">
                Editorial High Jewelry
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================================================
          PRODUCT SECTION 1: PENDANTS
          ================================================== */}
      <section id="pendants-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProductGrid
          products={pendants}
          title="Pendants"
          subtitle="Handcrafted solitaire and medallion pendants showcasing natural Zambian emeralds, Ceylon sapphires, and rubies."
        />
      </section>

      {/* ==================================================
          PRODUCT SECTION 2: NECKLACES
          ================================================== */}
      <section id="necklaces-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProductGrid
          products={necklaces}
          title="Necklaces"
          subtitle="Cascading diamond rivières, traditional Pakistani Basra pearl malas, and antique meenakari collar designs."
        />
      </section>

      {/* ==================================================
          PRODUCT SECTION 3: CHOKERS
          ================================================== */}
      <section id="chokers-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProductGrid
          products={chokers}
          title="Chokers"
          subtitle="Intricate polki diamond chokers with silk tie cords, seed pearl drops, and emerald fringe detailing."
        />
      </section>
    </div>
  );
};
