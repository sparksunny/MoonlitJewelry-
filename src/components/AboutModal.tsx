import React from 'react';
import { useStore } from '../context/StoreContext';
import { X, Sparkles, Gem, Award, HeartHandshake } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  const { content, openInquiry } = useStore();

  if (!isOpen) return null;

  return (
    <div
      id="about-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2C221E]/60 backdrop-blur-xs overflow-y-auto animate-fade-in"
      onClick={onClose}
    >
      <div
        id="about-modal-content"
        className="bg-[#F8F1E8] border border-[#D5C2AA] shadow-2xl rounded-sm w-full max-w-2xl overflow-hidden relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#F2E7D8] px-6 py-5 border-b border-[#E6DACB] flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-[0.28em] text-[#7A6E65] font-semibold">
              Heritage & Atelier
            </span>
            <h3 className="font-serif text-2xl text-[#2C221E] font-medium mt-0.5">
              About Moonlit Jewelry
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#7A6E65] hover:text-[#2C221E] p-1.5 transition-colors cursor-pointer"
            aria-label="Close about modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Main Slogan Banner */}
          <div className="text-center py-4 px-6 bg-[#F2E7D8]/50 border border-[#E6DACB] rounded-xs">
            <p className="font-serif italic text-lg sm:text-xl text-[#2C221E]">
              &ldquo;{content.tagline}&rdquo;
            </p>
          </div>

          {/* Story Paragraphs */}
          <div className="space-y-4 text-xs sm:text-sm text-[#5C5048] leading-relaxed font-sans">
            <p>
              Operating under <strong className="text-[#2C221E]">{content.companyName}</strong>, Moonlit Jewelry is a specialized fine jewelry and natural gemstone house established to bring together authentic Pakistani goldsmith traditions with certified international gemological standards.
            </p>
            <p>
              Unlike conventional mass-retail or e-commerce websites, Moonlit Jewelry functions as an exclusive digital showroom. Each piece in our collection—from regal bridal chokers designed for lehengas and ghararas to investment-grade loose emeralds and sapphires—is curated with personal attention and bespoke consultation.
            </p>
          </div>

          {/* 4 Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-white/70 border border-[#E6DACB] rounded-xs space-y-2">
              <div className="flex items-center gap-2 text-[#B89058]">
                <Gem className="w-4 h-4" />
                <h4 className="font-serif text-base text-[#2C221E] font-medium">Real Natural Stones</h4>
              </div>
              <p className="text-xs text-[#7A6E65] leading-relaxed">
                Hand-sourced emeralds from Swat and Colombia, unheated Burma rubies, and Ceylon sapphires with transparent disclosure.
              </p>
            </div>

            <div className="p-4 bg-white/70 border border-[#E6DACB] rounded-xs space-y-2">
              <div className="flex items-center gap-2 text-[#B89058]">
                <Sparkles className="w-4 h-4" />
                <h4 className="font-serif text-base text-[#2C221E] font-medium">Pakistani Heritage</h4>
              </div>
              <p className="text-xs text-[#7A6E65] leading-relaxed">
                Artisanal polki setting, delicate meenakari enamel, and intricate filigree crafted specifically to complement Pakistani formal fashion.
              </p>
            </div>

            <div className="p-4 bg-white/70 border border-[#E6DACB] rounded-xs space-y-2">
              <div className="flex items-center gap-2 text-[#B89058]">
                <Award className="w-4 h-4" />
                <h4 className="font-serif text-base text-[#2C221E] font-medium">Recognized Testing</h4>
              </div>
              <p className="text-xs text-[#7A6E65] leading-relaxed">
                Applicable stones accompanied by laboratory identification dossiers from premier bodies including GIA, AGA, GFCO, and GGI.
              </p>
            </div>

            <div className="p-4 bg-white/70 border border-[#E6DACB] rounded-xs space-y-2">
              <div className="flex items-center gap-2 text-[#B89058]">
                <HeartHandshake className="w-4 h-4" />
                <h4 className="font-serif text-base text-[#2C221E] font-medium">Personal Attention</h4>
              </div>
              <p className="text-xs text-[#7A6E65] leading-relaxed">
                Direct one-on-one communication with our jewelry specialists via WhatsApp or consultation forms to guide your selection.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                onClose();
                openInquiry();
              }}
              className="flex-1 py-3 bg-[#2C221E] text-[#F8F1E8] text-xs font-semibold uppercase tracking-[0.18em] rounded-xs shadow-xs text-center cursor-pointer hover:bg-[#3D302A] transition-colors"
            >
              Request A Private Consultation
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-[#F2E7D8] border border-[#D5C2AA] text-[#2C221E] text-xs font-semibold uppercase tracking-[0.14em] rounded-xs text-center cursor-pointer hover:bg-[#EADBCA] transition-colors"
            >
              Back to Showroom
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
