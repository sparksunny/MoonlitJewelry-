import React from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  emptyMessage?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  title,
  subtitle,
  emptyMessage = 'No jewelry pieces found in this collection.',
}) => {
  return (
    <section className="w-full">
      {title && (
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center gap-3 mb-2">
            <span className="w-8 h-[1px] bg-[#B89058]" />
            <span className="text-[10px] uppercase tracking-[0.28em] text-[#7A6E65] font-sans font-medium">
              Curated Selection
            </span>
            <span className="w-8 h-[1px] bg-[#B89058]" />
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#2C221E] font-medium tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 text-xs sm:text-sm text-[#7A6E65] max-w-xl mx-auto font-sans">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {products.length === 0 ? (
        <div className="py-16 text-center bg-[#F2E7D8]/50 border border-dashed border-[#D9C5B0] rounded-sm p-8">
          <p className="font-serif text-lg text-[#5C5048]">{emptyMessage}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 lg:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};
