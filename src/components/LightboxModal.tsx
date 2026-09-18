import React from 'react';
import { useStore } from '../context/StoreContext';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

export const LightboxModal: React.FC = () => {
  const { lightbox, closeLightbox } = useStore();

  if (!lightbox.isOpen) return null;

  const currentIndex = lightbox.allImages.indexOf(lightbox.currentSrc);
  const hasMultiple = lightbox.allImages.length > 1;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!hasMultiple) return;
    const prevIndex = (currentIndex - 1 + lightbox.allImages.length) % lightbox.allImages.length;
    lightbox.currentSrc = lightbox.allImages[prevIndex];
    // Force re-render through close and reopen or local state
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!hasMultiple) return;
    const nextIndex = (currentIndex + 1) % lightbox.allImages.length;
    lightbox.currentSrc = lightbox.allImages[nextIndex];
  };

  return (
    <div
      id="lightbox-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#2C221E]/90 backdrop-blur-md p-4 animate-fade-in"
      onClick={closeLightbox}
    >
      <button
        id="close-lightbox-btn"
        onClick={closeLightbox}
        className="absolute top-6 right-6 text-[#F8F1E8] hover:text-[#B89058] p-2 transition-colors cursor-pointer z-50 bg-[#2C221E]/60 rounded-full"
        aria-label="Close image viewer"
      >
        <X className="w-6 h-6" />
      </button>

      <div
        className="max-w-4xl max-h-[90vh] flex flex-col items-center justify-center relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative group max-h-[80vh] flex items-center justify-center">
          <img
            src={lightbox.currentSrc}
            alt="Jewelry High Resolution View"
            referrerPolicy="no-referrer"
            className="max-w-full max-h-[80vh] object-contain rounded-xs shadow-2xl border border-[#D5C2AA]/40"
          />
        </div>

        {/* Thumbnail row if multiple */}
        {hasMultiple && (
          <div className="flex gap-2 mt-4 p-2 bg-[#2C221E]/70 rounded-full backdrop-blur-xs">
            {lightbox.allImages.map((img, i) => (
              <button
                key={i}
                onClick={() => {
                  lightbox.currentSrc = img;
                }}
                className={`w-12 h-12 rounded-xs overflow-hidden border transition-all cursor-pointer ${
                  lightbox.currentSrc === img
                    ? 'border-[#B89058] scale-105'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${i + 1}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
