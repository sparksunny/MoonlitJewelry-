import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { 
  ShieldCheck, 
  Sparkles, 
  MessageSquare, 
  Mail, 
  ZoomIn, 
  ArrowLeft, 
  ChevronRight, 
  Share2, 
  Check, 
  Info, 
  Award, 
  Gem 
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { selectedProduct, products, navigate, openInquiry, openLightbox, content } = useStore();
  const [activeImage, setActiveImage] = useState<string>('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (selectedProduct) {
      setActiveImage(selectedProduct.mainImage);
    }
  }, [selectedProduct]);

  if (!selectedProduct) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center pt-32 pb-20 px-4 text-center">
        <h2 className="font-serif text-3xl text-[#2C221E]">Piece Not Found</h2>
        <p className="text-xs text-[#7A6E65] mt-2 mb-6 font-sans">
          The requested jewelry piece could not be located in our atelier catalogue.
        </p>
        <button
          onClick={() => navigate('home')}
          className="px-6 py-3 bg-[#2C221E] text-[#F8F1E8] text-xs uppercase tracking-wider font-semibold rounded-xs"
        >
          Return to Collections
        </button>
      </div>
    );
  }

  // Combine main image + gallery images
  const allImages = [selectedProduct.mainImage, ...(selectedProduct.galleryImages || [])];

  // WhatsApp formatted inquiry URL
  const whatsappNumber = content.whatsapp.replace(/[^0-9]/g, '');
  const whatsappMessage = encodeURIComponent(
    `Hello Moonlit Jewelry,\nI am interested in Product Code ${selectedProduct.code} - ${selectedProduct.name}.\nPlease provide more details.`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  // Related products from same category
  const relatedProducts = products
    .filter((p) => p.id !== selectedProduct.id && (p.category === selectedProduct.category || p.section === selectedProduct.section))
    .slice(0, 4);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div id="product-detail-page" className="pt-24 lg:pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-xs text-[#7A6E65] font-sans">
        <button
          onClick={() => navigate('home')}
          className="hover:text-[#2C221E] transition-colors cursor-pointer"
        >
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button
          onClick={() => {
            if (selectedProduct.category === 'Bridal Jewelry') navigate('bridal');
            else if (selectedProduct.category === 'Pendants & Necklace') navigate('pendants');
            else if (selectedProduct.category === 'Rings') navigate('rings');
            else if (selectedProduct.category === 'Natural Gemstones') navigate('gemstones');
            else navigate('home');
          }}
          className="hover:text-[#2C221E] transition-colors cursor-pointer"
        >
          {selectedProduct.category}
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#2C221E] font-medium truncate max-w-xs sm:max-w-md">
          {selectedProduct.name}
        </span>
      </nav>

      {/* Main Grid: Gallery on Left, Details on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        
        {/* LEFT COLUMN: Gallery & Lightbox */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Large Image */}
          <div className="relative aspect-4/3 sm:aspect-square overflow-hidden bg-[#F2E7D8]/50 border border-[#E6DACB] rounded-xs group shadow-sm">
            <img
              src={activeImage || selectedProduct.mainImage}
              alt={selectedProduct.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />

            {/* Product Code Badge */}
            <div className="absolute top-4 left-4 bg-[#F8F1E8]/95 backdrop-blur-xs border border-[#D5C2AA] px-3 py-1.5 text-xs font-semibold tracking-[0.16em] text-[#2C221E] shadow-2xs">
              Code: {selectedProduct.code}
            </div>

            {/* Lightbox Trigger Zoom Button */}
            <button
              id="zoom-image-btn"
              onClick={() => openLightbox(activeImage || selectedProduct.mainImage, allImages)}
              className="absolute bottom-4 right-4 bg-[#F8F1E8]/95 hover:bg-[#2C221E] hover:text-[#F8F1E8] text-[#2C221E] p-2.5 rounded-xs border border-[#D5C2AA] shadow-xs transition-colors flex items-center gap-1.5 text-xs font-medium cursor-pointer"
              title="View full resolution in lightbox"
            >
              <ZoomIn className="w-4 h-4 text-[#B89058]" />
              <span className="text-[11px] uppercase tracking-wider hidden sm:inline">Zoom Image</span>
            </button>
          </div>

          {/* Thumbnails row */}
          {allImages.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {allImages.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(imgUrl)}
                  className={`w-20 h-20 sm:w-24 sm:h-24 rounded-xs overflow-hidden border transition-all cursor-pointer shrink-0 ${
                    (activeImage || selectedProduct.mainImage) === imgUrl
                      ? 'border-[#B89058] ring-2 ring-[#B89058]/40 shadow-xs'
                      : 'border-[#E6DACB] opacity-70 hover:opacity-100'
                  }`}
                  aria-label={`View thumbnail ${idx + 1}`}
                >
                  <img
                    src={imgUrl}
                    alt={`${selectedProduct.name} view ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Visual Trust Guarantee Note */}
          <div className="p-4 bg-[#FFFFFF]/60 border border-[#E6DACB] rounded-xs flex items-center gap-3 text-xs text-[#7A6E65]">
            <Info className="w-4 h-4 text-[#B89058] shrink-0" />
            <p>
              Jewelry images are photographed in soft daylight studio lighting to maintain accurate metal finish, diamond clarity, and natural gemstone color saturation.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: Details, Specifications, Inquiry Action */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-[0.24em] font-sans font-semibold text-[#7A6E65]">
                {selectedProduct.category} &bull; {selectedProduct.section}
              </span>
              <button
                onClick={handleShare}
                className="text-[#7A6E65] hover:text-[#2C221E] text-xs flex items-center gap-1 transition-colors cursor-pointer"
                title="Share link"
              >
                {copied ? (
                  <span className="text-[#B89058] flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Copied
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <Share2 className="w-3.5 h-3.5" /> Share
                  </span>
                )}
              </button>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl text-[#2C221E] font-medium leading-snug">
              {selectedProduct.name}
            </h1>

            {/* Product Code */}
            <div className="flex items-center gap-3 pt-1">
              <span className="text-xs tracking-[0.18em] uppercase text-[#7A6E65] font-medium">
                Product Code: <strong className="text-[#2C221E] font-bold">{selectedProduct.code}</strong>
              </span>
              {selectedProduct.laboratory && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#F2E7D8] border border-[#D5C2AA] rounded-xs text-[10px] font-semibold text-[#2C221E] uppercase tracking-wider">
                  <ShieldCheck className="w-3 h-3 text-[#B89058]" />
                  {selectedProduct.laboratory} Certified
                </span>
              )}
            </div>
          </div>

          {/* INFORMATIONAL PRICE */}
          <div className="py-3 px-4 bg-[#F2E7D8]/70 border border-[#E6DACB] rounded-xs space-y-1">
            <div className="flex items-baseline justify-between">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#7A6E65] font-semibold">
                Reference Price:
              </span>
              <span className="font-serif text-2xl sm:text-3xl text-[#2C221E] font-semibold">
                {selectedProduct.price}
              </span>
            </div>
            <p className="text-[10px] text-[#7A6E65] italic">
              * Price is provided for informational purposes only. Non-ecommerce showcase; transactions are concluded through personalized consultation.
            </p>
          </div>

          {/* Short Description */}
          <p className="text-xs sm:text-sm text-[#5C5048] leading-relaxed font-sans border-b border-[#E6DACB] pb-4">
            {selectedProduct.shortText}
          </p>

          {/* SPECIFICATIONS TABLE */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-[0.2em] font-sans font-semibold text-[#2C221E] flex items-center gap-1.5">
              <Gem className="w-3.5 h-3.5 text-[#B89058]" />
              <span>Product Specifications</span>
            </h3>

            <div className="bg-[#FFFFFF]/70 border border-[#E6DACB] rounded-xs divide-y divide-[#F2E7D8] text-xs">
              <div className="grid grid-cols-3 p-2.5">
                <span className="text-[#7A6E65] font-medium">Material:</span>
                <span className="col-span-2 text-[#2C221E] font-medium">{selectedProduct.material}</span>
              </div>
              <div className="grid grid-cols-3 p-2.5">
                <span className="text-[#7A6E65] font-medium">Gemstone:</span>
                <span className="col-span-2 text-[#2C221E] font-medium">{selectedProduct.gemstone}</span>
              </div>
              {selectedProduct.carat && (
                <div className="grid grid-cols-3 p-2.5">
                  <span className="text-[#7A6E65] font-medium">Carat Weight:</span>
                  <span className="col-span-2 text-[#2C221E]">{selectedProduct.carat}</span>
                </div>
              )}
              {selectedProduct.color && (
                <div className="grid grid-cols-3 p-2.5">
                  <span className="text-[#7A6E65] font-medium">Color:</span>
                  <span className="col-span-2 text-[#2C221E]">{selectedProduct.color}</span>
                </div>
              )}
              {selectedProduct.cut && (
                <div className="grid grid-cols-3 p-2.5">
                  <span className="text-[#7A6E65] font-medium">Cut / Shape:</span>
                  <span className="col-span-2 text-[#2C221E]">{selectedProduct.cut}</span>
                </div>
              )}
              {selectedProduct.clarity && (
                <div className="grid grid-cols-3 p-2.5">
                  <span className="text-[#7A6E65] font-medium">Clarity:</span>
                  <span className="col-span-2 text-[#2C221E]">{selectedProduct.clarity}</span>
                </div>
              )}
              {selectedProduct.origin && (
                <div className="grid grid-cols-3 p-2.5">
                  <span className="text-[#7A6E65] font-medium">Origin:</span>
                  <span className="col-span-2 text-[#2C221E]">{selectedProduct.origin}</span>
                </div>
              )}
              {selectedProduct.treatment && (
                <div className="grid grid-cols-3 p-2.5">
                  <span className="text-[#7A6E65] font-medium">Treatment:</span>
                  <span className="col-span-2 text-[#2C221E]">{selectedProduct.treatment}</span>
                </div>
              )}
              {selectedProduct.certification && (
                <div className="grid grid-cols-3 p-2.5">
                  <span className="text-[#7A6E65] font-medium">Certification:</span>
                  <span className="col-span-2 text-[#2C221E]">
                    {selectedProduct.certification}{' '}
                    {selectedProduct.laboratory ? `(${selectedProduct.laboratory})` : ''}
                  </span>
                </div>
              )}
              {selectedProduct.certificateNumber && (
                <div className="grid grid-cols-3 p-2.5">
                  <span className="text-[#7A6E65] font-medium">Certificate #:</span>
                  <span className="col-span-2 font-mono text-[#2C221E] font-semibold">
                    {selectedProduct.certificateNumber}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* DETAILED DESCRIPTION */}
          <div className="space-y-2 pt-2">
            <h3 className="text-xs uppercase tracking-[0.2em] font-sans font-semibold text-[#2C221E]">
              Craftsmanship & Details
            </h3>
            <p className="text-xs text-[#5C5048] leading-relaxed font-sans whitespace-pre-line">
              {selectedProduct.description}
            </p>
          </div>

          {/* INQUIRY CONVERSION ACTIONS: STRICTLY NON-ECOMMERCE */}
          <div className="p-5 bg-[#F2E7D8]/80 border border-[#D5C2AA] rounded-xs space-y-3 shadow-2xs">
            <div className="space-y-1">
              <p className="font-serif text-base text-[#2C221E] font-medium">
                Interested in this piece?
              </p>
              <p className="text-xs text-[#7A6E65]">
                Contact our atelier for availability, customization, and further details.
              </p>
            </div>

            <div className="space-y-2.5 pt-1">
              {/* Primary Inquiry Button */}
              <button
                id="inquire-about-piece-btn"
                onClick={() => openInquiry(selectedProduct.code, selectedProduct.name)}
                className="w-full py-3.5 bg-[#2C221E] hover:bg-[#3D302A] text-[#F8F1E8] text-xs font-semibold uppercase tracking-[0.18em] rounded-xs shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5 text-[#B89058]" />
                <span>Inquire About This Piece</span>
              </button>

              {/* Direct WhatsApp Inquiry */}
              <a
                id="whatsapp-inquiry-piece-btn"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-[#FFFFFF] hover:bg-[#F8F1E8] border border-[#D5C2AA] text-[#2C221E] text-xs font-semibold uppercase tracking-[0.14em] rounded-xs transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366]" />
                <span>Inquire on WhatsApp (+1 716-313-1615)</span>
              </a>
            </div>
          </div>

        </div>

      </div>

      {/* RELATED PIECES SECTION */}
      {relatedProducts.length > 0 && (
        <section className="pt-12 border-t border-[#E6DACB]">
          <div className="mb-8">
            <span className="text-[10px] uppercase tracking-[0.26em] text-[#7A6E65] font-semibold">
              Explore Further
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#2C221E] font-medium mt-1">
              Complementary Pieces
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
