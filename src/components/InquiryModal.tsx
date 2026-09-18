import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Send, MessageSquare, CheckCircle, Sparkles } from 'lucide-react';

export const InquiryModal: React.FC = () => {
  const { inquiryModal, closeInquiry, content } = useStore();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    productCode: '',
    productName: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (inquiryModal.isOpen) {
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        productCode: inquiryModal.productCode || '',
        productName: inquiryModal.productName || '',
        message: inquiryModal.productCode
          ? `Hello, I would like to inquire about availability and details regarding Product Code ${inquiryModal.productCode} (${inquiryModal.productName}).`
          : 'Hello Moonlit Jewelry, I would like to inquire about bespoke jewelry and gemstones.',
      });
      setIsSubmitted(false);
    }
  }, [inquiryModal]);

  if (!inquiryModal.isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission to advisor
    setIsSubmitted(true);
  };

  const whatsappPhone = content.whatsapp.replace(/[^0-9]/g, '');
  const whatsappMessage = encodeURIComponent(
    `Hello Moonlit Jewelry,\nI am interested in Product Code ${formData.productCode || 'General'} - ${formData.productName || 'Jewelry Inquiry'}.\nPlease provide more details.`
  );
  const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${whatsappMessage}`;

  return (
    <div
      id="inquiry-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2C221E]/60 backdrop-blur-xs overflow-y-auto animate-fade-in"
      onClick={closeInquiry}
    >
      <div
        id="inquiry-modal-content"
        className="bg-[#F8F1E8] border border-[#D5C2AA] shadow-2xl rounded-sm w-full max-w-lg overflow-hidden relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#F2E7D8] px-6 py-5 border-b border-[#E6DACB] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#B89058]" />
            <div>
              <h3 className="font-serif text-xl text-[#2C221E] font-medium">
                Jewelry Inquiry & Consultation
              </h3>
              <p className="text-[11px] text-[#7A6E65] font-sans">
                Personalized advisory &bull; Moonlit Jewelry
              </p>
            </div>
          </div>
          <button
            id="close-inquiry-modal-btn"
            onClick={closeInquiry}
            className="text-[#7A6E65] hover:text-[#2C221E] p-1.5 transition-colors cursor-pointer"
            aria-label="Close inquiry modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#EADBCA] mx-auto flex items-center justify-center text-[#B89058]">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-2xl text-[#2C221E]">Inquiry Received</h4>
              <p className="text-xs text-[#5C5048] max-w-sm mx-auto leading-relaxed font-sans">
                Thank you for your interest in Moonlit Jewelry. Our specialist will review your request regarding{' '}
                <strong className="text-[#2C221E]">
                  {formData.productCode ? `Code ${formData.productCode}` : 'our collection'}
                </strong>{' '}
                and reach out to you via email or phone promptly.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  id="modal-success-whatsapp-btn"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#25D366] text-white text-xs uppercase tracking-wider font-semibold rounded-xs shadow-2xs hover:bg-[#1ebd5a] transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>
                <button
                  id="modal-success-close-btn"
                  onClick={closeInquiry}
                  className="px-5 py-2.5 bg-[#F2E7D8] border border-[#D5C2AA] text-[#2C221E] text-xs uppercase tracking-wider font-semibold rounded-xs hover:bg-[#EADBCA] transition-all cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-[#F2E7D8]/60 p-3 rounded-xs border border-[#E6DACB] mb-4">
                <p className="text-[11px] text-[#5C5048] leading-relaxed">
                  As an exclusive jewelry showcase atelier, our pieces are prepared upon private inquiry. Please share your details below for availability and tailored consultation.
                </p>
              </div>

              {/* Product Info (Auto-populated) */}
              {(formData.productCode || formData.productName) && (
                <div className="grid grid-cols-3 gap-3 p-3 bg-white/70 border border-[#D9C5B0] rounded-xs">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#7A6E65] font-semibold">
                      Product Code
                    </label>
                    <input
                      type="text"
                      value={formData.productCode}
                      onChange={(e) => setFormData({ ...formData, productCode: e.target.value })}
                      className="w-full mt-1 text-xs font-semibold text-[#2C221E] bg-transparent border-none p-0 focus:ring-0"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[10px] uppercase tracking-wider text-[#7A6E65] font-semibold">
                      Product Name
                    </label>
                    <input
                      type="text"
                      value={formData.productName}
                      onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                      className="w-full mt-1 text-xs font-serif text-[#2C221E] bg-transparent border-none p-0 focus:ring-0 truncate"
                    />
                  </div>
                </div>
              )}

              {/* Full Name */}
              <div>
                <label className="block text-xs font-medium text-[#2C221E] uppercase tracking-wider text-[11px] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Ayesha Khan"
                  className="w-full px-3.5 py-2 text-xs bg-white border border-[#D9C5B0] rounded-xs focus:outline-hidden focus:border-[#B89058] focus:ring-1 focus:ring-[#B89058]"
                />
              </div>

              {/* Contact grid: Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#2C221E] uppercase tracking-wider text-[11px] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2 text-xs bg-white border border-[#D9C5B0] rounded-xs focus:outline-hidden focus:border-[#B89058] focus:ring-1 focus:ring-[#B89058]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#2C221E] uppercase tracking-wider text-[11px] mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3.5 py-2 text-xs bg-white border border-[#D9C5B0] rounded-xs focus:outline-hidden focus:border-[#B89058] focus:ring-1 focus:ring-[#B89058]"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-medium text-[#2C221E] uppercase tracking-wider text-[11px] mb-1">
                  Message / Inquiries
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-white border border-[#D9C5B0] rounded-xs focus:outline-hidden focus:border-[#B89058] focus:ring-1 focus:ring-[#B89058] resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 space-y-2.5">
                <button
                  type="submit"
                  id="submit-inquiry-btn"
                  className="w-full py-3 bg-[#2C221E] hover:bg-[#3D302A] text-[#F8F1E8] text-xs font-semibold uppercase tracking-[0.18em] rounded-xs shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 text-[#B89058]" />
                  <span>Send Inquiry</span>
                </button>

                <div className="flex items-center justify-center gap-3">
                  <span className="h-[1px] bg-[#D9C5B0] flex-1"></span>
                  <span className="text-[10px] uppercase tracking-widest text-[#7A6E65]">or connect directly</span>
                  <span className="h-[1px] bg-[#D9C5B0] flex-1"></span>
                </div>

                <a
                  id="whatsapp-direct-inquiry-btn"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-[#F2E7D8] hover:bg-[#E8DAC6] border border-[#D5C2AA] text-[#2C221E] text-xs font-medium uppercase tracking-[0.14em] rounded-xs transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-[#25D366]" />
                  <span>Contact on WhatsApp ({content.whatsapp})</span>
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
