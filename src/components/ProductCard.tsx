import React from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { ShieldCheck, Eye, Sparkles } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { openProductDetail } = useStore();

  return (
    <div
      id={`product-card-${product.code}`}
      className="group bg-[#FFFFFF]/80 backdrop-blur-xs border border-[#E6DACB] rounded-sm overflow-hidden transition-all duration-300 hover:border-[#B89058] hover:shadow-md flex flex-col justify-between"
    >
      {/* Top Image Container */}
      <div
        className="relative aspect-square w-full overflow-hidden bg-[#F2E7D8]/40 cursor-pointer"
        onClick={() => openProductDetail(product.id)}
      >
        <img
          src={product.mainImage}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Code Badge */}
        <div className="absolute top-3 left-3 bg-[#F8F1E8]/95 backdrop-blur-xs border border-[#D9C5B0] px-2.5 py-1 text-[11px] font-sans font-semibold tracking-[0.14em] text-[#2C221E] shadow-2xs">
          Code: {product.code}
        </div>

        {/* Certified / Laboratory Badge if applicable */}
        {product.laboratory && (
          <div className="absolute top-3 right-3 bg-[#2C221E]/90 backdrop-blur-xs text-[#F8F1E8] px-2 py-0.5 text-[10px] tracking-[0.12em] uppercase font-sans font-medium flex items-center gap-1 rounded-xs">
            <ShieldCheck className="w-3 h-3 text-[#B89058]" />
            <span>{product.laboratory}</span>
          </div>
        )}

        {/* Hover Quick Overlay */}
        <div className="absolute inset-0 bg-[#2C221E]/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <span className="bg-[#F8F1E8] text-[#2C221E] text-[11px] uppercase tracking-[0.18em] font-medium px-4 py-2 shadow-xs flex items-center gap-1.5 border border-[#D5C2AA]">
            <Eye className="w-3.5 h-3.5 text-[#B89058]" />
            View Details
          </span>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category */}
          <p className="text-[10px] tracking-[0.2em] uppercase text-[#7A6E65] font-sans font-medium mb-1.5">
            {product.category}
          </p>

          {/* Product Name */}
          <h3
            onClick={() => openProductDetail(product.id)}
            className="font-serif text-lg text-[#2C221E] group-hover:text-[#B89058] transition-colors line-clamp-1 font-medium cursor-pointer"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Short Text: Max 3 lines */}
          <p className="mt-2 text-xs text-[#5C5048] leading-relaxed line-clamp-3 font-sans">
            {product.shortText}
          </p>
        </div>

        {/* Action Button: Strictly NON-ECOMMERCE, no Add to Cart */}
        <div className="mt-5 pt-3 border-t border-[#F2E7D8]">
          <button
            id={`view-details-btn-${product.code}`}
            onClick={() => openProductDetail(product.id)}
            className="w-full py-2.5 px-4 bg-[#F2E7D8] hover:bg-[#2C221E] text-[#2C221E] hover:text-[#F8F1E8] border border-[#D5C2AA] text-[11px] uppercase tracking-[0.18em] font-sans font-semibold transition-all duration-200 text-center rounded-xs shadow-2xs cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>View Details</span>
          </button>
        </div>
      </div>
    </div>
  );
};
