import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, SiteContent, PageRoute, InquiryFormData } from '../types';
import { initialProducts, initialSiteContent } from '../data/initialData';

interface StoreContextType {
  products: Product[];
  content: SiteContent;
  activePage: PageRoute;
  selectedProductId: string | null;
  selectedProduct: Product | null;
  inquiryModal: { isOpen: boolean; productCode: string; productName: string };
  lightbox: { isOpen: boolean; currentSrc: string; allImages: string[] };
  isAdminLoggedIn: boolean;
  
  // Navigation
  navigate: (page: PageRoute, productId?: string) => void;
  openProductDetail: (productId: string) => void;
  openInquiry: (code?: string, name?: string) => void;
  closeInquiry: () => void;
  openLightbox: (src: string, allImages?: string[]) => void;
  closeLightbox: () => void;
  
  // Admin
  loginAdmin: (username: string, pass: string) => boolean;
  logoutAdmin: () => void;
  addProduct: (product: Omit<Product, 'id'>) => { success: boolean; error?: string };
  updateProduct: (id: string, data: Partial<Product>) => { success: boolean; error?: string };
  deleteProduct: (id: string) => void;
  updateSiteContent: (newContent: Partial<SiteContent>) => void;
  resetToDefaultData: () => void;
  formatProductCode: (input: string) => { formatted: string; isValid: boolean; error?: string };
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEY_PRODUCTS = 'moonlit_jewelry_products_v2';
const STORAGE_KEY_CONTENT = 'moonlit_jewelry_content_v2';
const STORAGE_KEY_AUTH = 'moonlit_jewelry_admin_auth_v1';

// URL sanitizer to heal any stale cached paths
const sanitizeImageUrl = (url: string): string => {
  if (!url) return url;
  if (url.startsWith('/src/assets/images/')) {
    return url.replace('/src/assets/images/', '/images/');
  }
  if (url.includes('photo-1611591475819-322e705b7662')) {
    return 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=1200&q=80';
  }
  return url;
};

const sanitizeProduct = (p: Product): Product => ({
  ...p,
  mainImage: sanitizeImageUrl(p.mainImage),
  galleryImages: (p.galleryImages || []).map(sanitizeImageUrl),
});

const sanitizeSiteContent = (c: SiteContent): SiteContent => ({
  ...c,
  homeHeroImage: sanitizeImageUrl(c.homeHeroImage),
  homeIntroImage: sanitizeImageUrl(c.homeIntroImage),
  bridalHeroImage: sanitizeImageUrl(c.bridalHeroImage),
  pendantsHeroImage: sanitizeImageUrl(c.pendantsHeroImage),
  gemstonesHeroImage: sanitizeImageUrl(c.gemstonesHeroImage),
  logoUrl: sanitizeImageUrl(c.logoUrl),
});

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load products
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      // Check v2, fallback to v1 migration
      const saved = localStorage.getItem(STORAGE_KEY_PRODUCTS) || localStorage.getItem('moonlit_jewelry_products_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map(sanitizeProduct);
        }
      }
    } catch (e) {
      console.error('Error loading products from localStorage', e);
    }
    return initialProducts.map(sanitizeProduct);
  });

  // Load site content
  const [content, setContent] = useState<SiteContent>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CONTENT) || localStorage.getItem('moonlit_jewelry_content_v1');
      if (saved) {
        const merged = { ...initialSiteContent, ...JSON.parse(saved) };
        return sanitizeSiteContent(merged);
      }
    } catch (e) {
      console.error('Error loading site content from localStorage', e);
    }
    return sanitizeSiteContent(initialSiteContent);
  });

  // Page routing
  const [activePage, setActivePage] = useState<PageRoute>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  // Inquiry modal state
  const [inquiryModal, setInquiryModal] = useState({
    isOpen: false,
    productCode: '',
    productName: '',
  });

  // Lightbox
  const [lightbox, setLightbox] = useState<{ isOpen: boolean; currentSrc: string; allImages: string[] }>({
    isOpen: false,
    currentSrc: '',
    allImages: [],
  });

  // Admin Auth
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return sessionStorage.getItem(STORAGE_KEY_AUTH) === 'true';
  });

  // Persist products
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(products));
    } catch (e) {
      console.error('Error saving products', e);
    }
  }, [products]);

  // Persist site content
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CONTENT, JSON.stringify(content));
    } catch (e) {
      console.error('Error saving content', e);
    }
  }, [content]);

  // Handle URL hash routing if present
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'admin') {
        setActivePage('admin');
      } else if (hash === 'bridal') {
        setActivePage('bridal');
      } else if (hash === 'pendants') {
        setActivePage('pendants');
      } else if (hash === 'rings') {
        setActivePage('rings');
      } else if (hash === 'gemstones') {
        setActivePage('gemstones');
      } else if (hash === 'contact') {
        setActivePage('contact');
      } else if (hash.startsWith('product/')) {
        const pId = hash.replace('product/', '');
        setSelectedProductId(pId);
        setActivePage('product-detail');
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigate = (page: PageRoute, productId?: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (productId) {
      setSelectedProductId(productId);
      window.location.hash = `product/${productId}`;
    } else {
      window.location.hash = page === 'home' ? '' : page;
    }
    setActivePage(page);
  };

  const openProductDetail = (productId: string) => {
    setSelectedProductId(productId);
    setActivePage('product-detail');
    window.location.hash = `product/${productId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openInquiry = (code?: string, name?: string) => {
    setInquiryModal({
      isOpen: true,
      productCode: code || '',
      productName: name || '',
    });
  };

  const closeInquiry = () => {
    setInquiryModal((prev) => ({ ...prev, isOpen: false }));
  };

  const openLightbox = (src: string, allImages: string[] = []) => {
    setLightbox({
      isOpen: true,
      currentSrc: src,
      allImages: allImages.length > 0 ? allImages : [src],
    });
  };

  const closeLightbox = () => {
    setLightbox({ isOpen: false, currentSrc: '', allImages: [] });
  };

  // Product Code formatter: exactly 3 digits
  const formatProductCode = (input: string): { formatted: string; isValid: boolean; error?: string } => {
    const cleaned = input.trim();
    if (!cleaned) {
      return { formatted: '', isValid: false, error: 'Product code is required' };
    }
    if (!/^\d+$/.test(cleaned)) {
      return { formatted: cleaned, isValid: false, error: 'Product code must contain digits only' };
    }
    if (cleaned.length > 3) {
      return { formatted: cleaned, isValid: false, error: 'Product code must contain exactly 3 digits (e.g. 101)' };
    }
    // Automatically pad: "1" -> "001", "25" -> "025"
    const formatted = cleaned.padStart(3, '0');
    return { formatted, isValid: true };
  };

  // Admin Login
  const loginAdmin = (username: string, pass: string): boolean => {
    if (username.trim() === 'admin' && pass === 'taq@123') {
      setIsAdminLoggedIn(true);
      sessionStorage.setItem(STORAGE_KEY_AUTH, 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem(STORAGE_KEY_AUTH);
  };

  // Add Product
  const addProduct = (newProdData: Omit<Product, 'id'>): { success: boolean; error?: string } => {
    const codeCheck = formatProductCode(newProdData.code);
    if (!codeCheck.isValid) {
      return { success: false, error: codeCheck.error };
    }

    // Check duplicate code
    const isDuplicate = products.some((p) => p.code === codeCheck.formatted);
    if (isDuplicate) {
      return { success: false, error: `Product code ${codeCheck.formatted} already exists. Code must be unique.` };
    }

    const newProduct: Product = {
      ...newProdData,
      id: `prod-${Date.now()}`,
      code: codeCheck.formatted,
    };

    setProducts((prev) => [newProduct, ...prev]);
    return { success: true };
  };

  // Update Product
  const updateProduct = (id: string, data: Partial<Product>): { success: boolean; error?: string } => {
    if (data.code) {
      const codeCheck = formatProductCode(data.code);
      if (!codeCheck.isValid) {
        return { success: false, error: codeCheck.error };
      }
      const isDuplicate = products.some((p) => p.id !== id && p.code === codeCheck.formatted);
      if (isDuplicate) {
        return { success: false, error: `Product code ${codeCheck.formatted} is already in use by another product.` };
      }
      data.code = codeCheck.formatted;
    }

    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...data } : p)));
    return { success: true };
  };

  // Delete Product
  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // Update Site Content
  const updateSiteContent = (newContent: Partial<SiteContent>) => {
    setContent((prev) => ({ ...prev, ...newContent }));
  };

  // Reset to default
  const resetToDefaultData = () => {
    setProducts(initialProducts);
    setContent(initialSiteContent);
    localStorage.removeItem(STORAGE_KEY_PRODUCTS);
    localStorage.removeItem(STORAGE_KEY_CONTENT);
  };

  const selectedProduct = products.find((p) => p.id === selectedProductId) || null;

  return (
    <StoreContext.Provider
      value={{
        products,
        content,
        activePage,
        selectedProductId,
        selectedProduct,
        inquiryModal,
        lightbox,
        isAdminLoggedIn,
        navigate,
        openProductDetail,
        openInquiry,
        closeInquiry,
        openLightbox,
        closeLightbox,
        loginAdmin,
        logoutAdmin,
        addProduct,
        updateProduct,
        deleteProduct,
        updateSiteContent,
        resetToDefaultData,
        formatProductCode,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
