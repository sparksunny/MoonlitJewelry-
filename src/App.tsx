/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { InquiryModal } from './components/InquiryModal';
import { LightboxModal } from './components/LightboxModal';
import { AboutModal } from './components/AboutModal';

import { HomePage } from './pages/HomePage';
import { BridalPage } from './pages/BridalPage';
import { PendantsNecklacePage } from './pages/PendantsNecklacePage';
import { RingsPage } from './pages/RingsPage';
import { GemstonesPage } from './pages/GemstonesPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';

const AppContent: React.FC = () => {
  const { activePage } = useStore();
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  // Scroll to top on page transition
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F1E8] text-[#2C221E] selection:bg-[#EADBCA] selection:text-[#2C221E] font-sans antialiased">
      {/* Sticky Luxury Header (Hidden on Admin for focus, or visible) */}
      <Header onOpenAbout={() => setIsAboutOpen(true)} />

      {/* Main Dynamic View */}
      <main className="flex-1">
        {activePage === 'home' && <HomePage />}
        {activePage === 'bridal' && <BridalPage />}
        {activePage === 'pendants' && <PendantsNecklacePage />}
        {activePage === 'rings' && <RingsPage />}
        {activePage === 'gemstones' && <GemstonesPage />}
        {activePage === 'product-detail' && <ProductDetailPage />}
        {activePage === 'contact' && <ContactPage />}
        {activePage === 'admin' && <AdminPage />}
      </main>

      {/* Luxury Footer (Except on admin page for a distraction-free management workspace) */}
      {activePage !== 'admin' && <Footer />}

      {/* Global Modals */}
      <InquiryModal />
      <LightboxModal />
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
