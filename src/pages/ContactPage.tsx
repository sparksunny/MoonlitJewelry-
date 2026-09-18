import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Mail, Phone, MapPin, Globe, Instagram, MessageSquare, Send, CheckCircle, Sparkles } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { content } = useStore();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    productCode: '',
    productName: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const whatsappPhone = content.whatsapp.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
    'Hello Moonlit Jewelry, I would like to inquire about your jewelry collection and gemstone availability.'
  )}`;

  return (
    <div className="pt-24 lg:pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F2E7D8] border border-[#D9C5B0] rounded-xs shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-[#B89058]" />
          <span className="text-[10px] tracking-[0.24em] uppercase font-sans font-semibold text-[#2C221E]">
            Private Consultation & Showroom
          </span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#2C221E] font-medium">
          Contact & Inquiries
        </h1>
        <p className="text-xs sm:text-sm text-[#5C5048] leading-relaxed font-sans">
          Whether you are seeking a customized bridal parure, a certified natural loose emerald, or private advisory, our team is at your service.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Left: Contact Info */}
        <div className="lg:col-span-5 space-y-8 bg-[#F2E7D8]/60 p-8 sm:p-10 border border-[#E6DACB] rounded-xs">
          <div>
            <span className="text-[10px] tracking-[0.24em] uppercase text-[#7A6E65] font-semibold">
              The Atelier
            </span>
            <h2 className="font-serif text-2xl text-[#2C221E] font-medium mt-1">
              {content.brandName}
            </h2>
            <p className="text-xs text-[#7A6E65] italic mt-0.5">
              by {content.companyName}
            </p>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-[#5C5048]">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#B89058] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-[#2C221E] font-semibold text-xs uppercase tracking-wider">
                  Location & Address
                </strong>
                <span>{content.address}</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-[#B89058] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-[#2C221E] font-semibold text-xs uppercase tracking-wider">
                  Phone & Advisory
                </strong>
                <a href={`tel:${content.phone}`} className="hover:text-[#2C221E] transition-colors">
                  {content.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MessageSquare className="w-5 h-5 text-[#25D366] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-[#2C221E] font-semibold text-xs uppercase tracking-wider">
                  WhatsApp Direct
                </strong>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#2C221E] transition-colors">
                  {content.whatsapp}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-[#B89058] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-[#2C221E] font-semibold text-xs uppercase tracking-wider">
                  Electronic Mail
                </strong>
                <a href={`mailto:${content.email}`} className="hover:text-[#2C221E] transition-colors">
                  {content.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Instagram className="w-5 h-5 text-[#B89058] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-[#2C221E] font-semibold text-xs uppercase tracking-wider">
                  Instagram Atelier
                </strong>
                <a
                  href={`https://instagram.com/${content.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#2C221E] transition-colors"
                >
                  @{content.instagram}
                </a>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#E0D0BD]">
            <a
              id="contact-page-whatsapp-btn"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-[#25D366] hover:bg-[#20b858] text-white text-xs font-semibold uppercase tracking-[0.16em] rounded-xs shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Connect on WhatsApp Now</span>
            </a>
          </div>
        </div>

        {/* Right: Inquiry Form */}
        <div className="lg:col-span-7 bg-[#FFFFFF]/80 p-8 sm:p-10 border border-[#E6DACB] rounded-xs shadow-sm">
          {submitted ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#EADBCA] mx-auto flex items-center justify-center text-[#B89058]">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="font-serif text-3xl text-[#2C221E]">Inquiry Submitted</h3>
              <p className="text-xs sm:text-sm text-[#5C5048] max-w-md mx-auto leading-relaxed">
                Thank you for contacting Moonlit Jewelry. One of our master jewelry consultants will contact you shortly with bespoke guidance.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2.5 bg-[#F2E7D8] text-[#2C221E] text-xs uppercase tracking-wider font-semibold rounded-xs border border-[#D5C2AA] hover:bg-[#EADBCA]"
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="font-serif text-2xl text-[#2C221E] font-medium">
                Send Direct Message
              </h3>
              <p className="text-xs text-[#7A6E65]">
                Fill out the form below to request product availability, bridal consultation, or gemstone certification files.
              </p>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#2C221E] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Your full name"
                  className="w-full px-4 py-2.5 text-xs bg-white border border-[#D9C5B0] rounded-xs focus:outline-hidden focus:border-[#B89058]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#2C221E] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@example.com"
                    className="w-full px-4 py-2.5 text-xs bg-white border border-[#D9C5B0] rounded-xs focus:outline-hidden focus:border-[#B89058]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#2C221E] mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (716) 000-0000"
                    className="w-full px-4 py-2.5 text-xs bg-white border border-[#D9C5B0] rounded-xs focus:outline-hidden focus:border-[#B89058]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#2C221E] mb-1">
                    Product Code (If specific)
                  </label>
                  <input
                    type="text"
                    value={formData.productCode}
                    onChange={(e) => setFormData({ ...formData, productCode: e.target.value })}
                    placeholder="e.g. 101, 401"
                    className="w-full px-4 py-2.5 text-xs bg-white border border-[#D9C5B0] rounded-xs focus:outline-hidden focus:border-[#B89058]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#2C221E] mb-1">
                    Inquiry Subject
                  </label>
                  <input
                    type="text"
                    value={formData.productName}
                    onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                    placeholder="Bridal Set, Loose Emerald, etc."
                    className="w-full px-4 py-2.5 text-xs bg-white border border-[#D9C5B0] rounded-xs focus:outline-hidden focus:border-[#B89058]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#2C221E] mb-1">
                  Message Details *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share details regarding your preferred metal karat, ring size, wedding date, or gemstone specifications..."
                  className="w-full px-4 py-2.5 text-xs bg-white border border-[#D9C5B0] rounded-xs focus:outline-hidden focus:border-[#B89058] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#2C221E] hover:bg-[#3D302A] text-[#F8F1E8] text-xs font-semibold uppercase tracking-[0.18em] rounded-xs shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 text-[#B89058]" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
