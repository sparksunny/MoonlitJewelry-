import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product, ProductCategory } from '../types';
import { SingleImageUploader, MultiImageUploader } from '../components/ImageUploader';
import { 
  Lock, 
  LogOut, 
  Plus, 
  Edit, 
  Trash2, 
  Check, 
  X, 
  Search, 
  Filter, 
  ExternalLink, 
  Save, 
  RotateCcw, 
  Image as ImageIcon, 
  ShieldCheck, 
  Layers, 
  Sparkles,
  ArrowLeft
} from 'lucide-react';

export const AdminPage: React.FC = () => {
  const { 
    isAdminLoggedIn, 
    loginAdmin, 
    logoutAdmin, 
    products, 
    content, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    updateSiteContent, 
    resetToDefaultData,
    navigate 
  } = useStore();

  // Login form state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Admin tab navigation
  type AdminTab = 'overview' | 'products' | 'add' | 'homepage' | 'settings';
  const [currentTab, setCurrentTab] = useState<AdminTab>('overview');

  // Product search & filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');

  // Edit product modal / drawer state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // New product form state
  const emptyNewProduct: Omit<Product, 'id'> = {
    code: '901',
    name: '',
    category: 'Bridal Jewelry',
    section: 'Bridal Jewelry',
    price: '$2,500',
    shortText: '',
    description: '',
    material: '18K Yellow Gold',
    gemstone: 'Natural Emerald & Diamonds',
    carat: '2.50 ct',
    color: 'Vivid Green',
    cut: 'Octagonal Emerald Cut',
    clarity: 'Very Good',
    origin: 'Swat Valley, Pakistan',
    treatment: 'Minor Cedarwood Oil',
    certification: 'Certified Natural',
    laboratory: 'GGI',
    certificateNumber: 'GGI-2026-901',
    mainImage: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000&auto=format&fit=crop'
    ],
    isNewArrival: true,
  };
  const [newProductData, setNewProductData] = useState<Omit<Product, 'id'>>(emptyNewProduct);

  // Site content edit state
  const [siteContentForm, setSiteContentForm] = useState(content);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  // Handle Admin Login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(username, password);
    if (!success) {
      setLoginError('Invalid administrator credentials. Access restricted.');
    } else {
      setLoginError('');
    }
  };

  // Handle Save Content
  const handleSaveContent = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteContent(siteContentForm);
    setSaveSuccessMsg('Atelier content and settings saved successfully!');
    setTimeout(() => setSaveSuccessMsg(''), 3000);
  };

  // Handle Add Product Submit
  const handleAddProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProduct(newProductData);
    setNewProductData(emptyNewProduct);
    setCurrentTab('products');
  };

  // Handle Edit Product Submit
  const handleEditProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      updateProduct(editingProduct.id, editingProduct);
      setEditingProduct(null);
    }
  };

  // Filtered products
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.gemstone.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat =
      selectedCategoryFilter === 'all' || p.category === selectedCategoryFilter;
    return matchesSearch && matchesCat;
  });

  // ==========================================
  // VIEW: LOGIN SCREEN IF NOT AUTHENTICATED
  // ==========================================
  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen bg-[#F8F1E8] flex items-center justify-center p-4 pt-24">
        <div className="w-full max-w-md bg-[#FFFFFF] border border-[#D5C2AA] rounded-xs shadow-xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-[#F2E7D8] mx-auto flex items-center justify-center text-[#B89058]">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-2xl text-[#2C221E] font-medium uppercase tracking-wider">
              Moonlit Atelier
            </h2>
            <p className="text-xs text-[#7A6E65] font-sans">
              Administrative Content Management Portal
            </p>
          </div>

          {loginError && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xs">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#2C221E] mb-1">
                Username
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full px-3.5 py-2.5 text-xs bg-[#F8F1E8]/50 border border-[#D9C5B0] rounded-xs focus:outline-hidden focus:border-[#B89058]"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#2C221E] mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 text-xs bg-[#F8F1E8]/50 border border-[#D9C5B0] rounded-xs focus:outline-hidden focus:border-[#B89058]"
              />
            </div>

            <button
              type="submit"
              id="admin-login-submit-btn"
              className="w-full py-3 bg-[#2C221E] hover:bg-[#3D302A] text-[#F8F1E8] text-xs font-semibold uppercase tracking-[0.2em] rounded-xs transition-colors cursor-pointer"
            >
              Authenticate & Enter
            </button>
          </form>

          <div className="pt-4 border-t border-[#E6DACB] text-center">
            <button
              onClick={() => navigate('home')}
              className="text-xs text-[#7A6E65] hover:text-[#2C221E] flex items-center justify-center gap-1 mx-auto cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Public Showroom</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW: AUTHENTICATED ADMIN DASHBOARD
  // ==========================================
  return (
    <div className="min-h-screen bg-[#F8F1E8] pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Top Bar */}
        <div className="bg-[#FFFFFF] border border-[#E6DACB] p-4 sm:p-6 rounded-xs shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-2xl text-[#2C221E] font-medium">
                Atelier Administration
              </span>
              <span className="px-2 py-0.5 bg-[#F2E7D8] text-[#B89058] text-[10px] font-semibold uppercase tracking-wider rounded-xs border border-[#D5C2AA]">
                Live Storage Mode
              </span>
            </div>
            <p className="text-xs text-[#7A6E65] font-sans mt-0.5">
              Manage product codes, images, descriptions, prices, laboratory certs, and homepage narratives.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('home')}
              className="px-4 py-2 bg-[#F2E7D8] hover:bg-[#EADBCA] border border-[#D5C2AA] text-[#2C221E] text-xs font-semibold uppercase tracking-wider rounded-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Website</span>
            </button>

            <button
              id="admin-logout-btn"
              onClick={logoutAdmin}
              className="px-4 py-2 bg-[#2C221E] hover:bg-[#3D302A] text-[#F8F1E8] text-xs font-semibold uppercase tracking-wider rounded-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto gap-2 border-b border-[#E6DACB] pb-2">
          {[
            { key: 'overview', label: 'Dashboard Overview' },
            { key: 'products', label: `Products (${products.length})` },
            { key: 'add', label: '+ Add New Piece' },
            { key: 'homepage', label: 'Homepage Content' },
            { key: 'settings', label: 'Contact & Settings' },
          ].map((tab) => (
            <button
              key={tab.key}
              id={`admin-tab-${tab.key}`}
              onClick={() => setCurrentTab(tab.key as AdminTab)}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-xs transition-colors shrink-0 cursor-pointer ${
                currentTab === tab.key
                  ? 'bg-[#2C221E] text-[#F8F1E8]'
                  : 'bg-[#FFFFFF] text-[#5C5048] hover:bg-[#F2E7D8] border border-[#E6DACB]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {saveSuccessMsg && (
          <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs rounded-xs flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>{saveSuccessMsg}</span>
          </div>
        )}

        {/* TAB 1: OVERVIEW */}
        {currentTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-6 bg-[#FFFFFF] border border-[#E6DACB] rounded-xs space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-[#7A6E65] font-semibold">Total Catalog Pieces</span>
                <p className="font-serif text-3xl text-[#2C221E] font-medium">{products.length}</p>
                <p className="text-[11px] text-[#7A6E65]">All categories combined</p>
              </div>

              <div className="p-6 bg-[#FFFFFF] border border-[#E6DACB] rounded-xs space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-[#7A6E65] font-semibold">Bridal Pieces</span>
                <p className="font-serif text-3xl text-[#2C221E] font-medium">
                  {products.filter((p) => p.category === 'Bridal Jewelry').length}
                </p>
                <p className="text-[11px] text-[#7A6E65]">Sets & bracelets</p>
              </div>

              <div className="p-6 bg-[#FFFFFF] border border-[#E6DACB] rounded-xs space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-[#7A6E65] font-semibold">Pendants & Necklaces</span>
                <p className="font-serif text-3xl text-[#2C221E] font-medium">
                  {products.filter((p) => p.category === 'Pendants & Necklace').length}
                </p>
                <p className="text-[11px] text-[#7A6E65]">Chokers & malas</p>
              </div>

              <div className="p-6 bg-[#FFFFFF] border border-[#E6DACB] rounded-xs space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-[#7A6E65] font-semibold">Rings & Gemstones</span>
                <p className="font-serif text-3xl text-[#2C221E] font-medium">
                  {products.filter((p) => p.category === 'Rings' || p.category === 'Natural Gemstones').length}
                </p>
                <p className="text-[11px] text-[#7A6E65]">Rings & loose gems</p>
              </div>
            </div>

            <div className="bg-[#FFFFFF] border border-[#E6DACB] p-6 rounded-xs space-y-4">
              <h3 className="font-serif text-lg text-[#2C221E] font-medium">
                Quick Atelier Actions
              </h3>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setCurrentTab('add')}
                  className="px-4 py-2.5 bg-[#2C221E] text-[#F8F1E8] text-xs uppercase tracking-wider font-semibold rounded-xs flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4 text-[#B89058]" />
                  <span>Add New Jewelry Piece</span>
                </button>
                <button
                  onClick={() => setCurrentTab('products')}
                  className="px-4 py-2.5 bg-[#F2E7D8] border border-[#D5C2AA] text-[#2C221E] text-xs uppercase tracking-wider font-semibold rounded-xs flex items-center gap-1.5"
                >
                  <Layers className="w-4 h-4" />
                  <span>Browse Product Table</span>
                </button>
                <button
                  onClick={() => {
                    if (window.confirm('Reset all catalog data and site text back to factory initial state?')) {
                      resetToDefaultData();
                      setSiteContentForm(content);
                      alert('Data has been reset to default catalogue.');
                    }
                  }}
                  className="px-4 py-2.5 bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 text-xs uppercase tracking-wider font-semibold rounded-xs flex items-center gap-1.5"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset to Factory Catalog</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS MANAGEMENT */}
        {currentTab === 'products' && (
          <div className="space-y-4">
            {/* Search & Filter Bar */}
            <div className="bg-[#FFFFFF] border border-[#E6DACB] p-4 rounded-xs flex flex-col sm:flex-row gap-3 justify-between items-center">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-[#7A6E65] absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search by code (e.g. 101) or name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-[#F8F1E8]/50 border border-[#D9C5B0] rounded-xs focus:outline-hidden focus:border-[#B89058]"
                />
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Filter className="w-4 h-4 text-[#7A6E65]" />
                <select
                  value={selectedCategoryFilter}
                  onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                  className="px-3 py-2 text-xs bg-[#F8F1E8]/50 border border-[#D9C5B0] rounded-xs focus:outline-hidden focus:border-[#B89058] w-full sm:w-auto"
                >
                  <option value="all">All Categories</option>
                  <option value="Bridal Jewelry">Bridal Jewelry</option>
                  <option value="Pendants & Necklace">Pendants & Necklace</option>
                  <option value="Rings">Rings</option>
                  <option value="Natural Gemstones">Natural Gemstones</option>
                </select>

                <button
                  onClick={() => setCurrentTab('add')}
                  className="px-3 py-2 bg-[#2C221E] text-[#F8F1E8] text-xs uppercase tracking-wider font-semibold rounded-xs flex items-center gap-1 shrink-0"
                >
                  <Plus className="w-3.5 h-3.5 text-[#B89058]" />
                  <span>New</span>
                </button>
              </div>
            </div>

            {/* Products Table */}
            <div className="bg-[#FFFFFF] border border-[#E6DACB] rounded-xs overflow-x-auto shadow-2xs">
              <table className="w-full text-left text-xs text-[#5C5048]">
                <thead className="bg-[#F2E7D8] text-[10px] uppercase tracking-wider text-[#2C221E] border-b border-[#E6DACB]">
                  <tr>
                    <th className="p-3">Image</th>
                    <th className="p-3">Code</th>
                    <th className="p-3">Name</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Section</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Gemstone / Spec</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F2E7D8]">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-[#F8F1E8]/60 transition-colors">
                      <td className="p-3">
                        <img
                          src={p.mainImage}
                          alt={p.name}
                          referrerPolicy="no-referrer"
                          className="w-12 h-12 object-cover rounded-xs border border-[#D9C5B0]"
                        />
                      </td>
                      <td className="p-3 font-semibold text-[#2C221E]">
                        <span className="px-2 py-0.5 bg-[#F2E7D8] border border-[#D9C5B0] rounded-xs">
                          {p.code}
                        </span>
                      </td>
                      <td className="p-3 font-medium text-[#2C221E] max-w-[180px] truncate">
                        {p.name}
                      </td>
                      <td className="p-3">{p.category}</td>
                      <td className="p-3 text-[#7A6E65]">{p.section}</td>
                      <td className="p-3 font-semibold text-[#2C221E]">{p.price}</td>
                      <td className="p-3 max-w-[150px] truncate">
                        {p.gemstone} {p.carat ? `(${p.carat})` : ''}
                      </td>
                      <td className="p-3 text-right space-x-2">
                        <button
                          onClick={() => setEditingProduct(p)}
                          className="p-1.5 bg-[#F2E7D8] hover:bg-[#EADBCA] text-[#2C221E] rounded-xs border border-[#D5C2AA]"
                          title="Edit product"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete product code ${p.code} (${p.name})?`)) {
                              deleteProduct(p.id);
                            }
                          }}
                          className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xs border border-red-200"
                          title="Delete product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: ADD NEW PRODUCT FORM */}
        {currentTab === 'add' && (
          <div className="bg-[#FFFFFF] border border-[#E6DACB] p-6 sm:p-8 rounded-xs shadow-2xs space-y-6">
            <div className="border-b border-[#E6DACB] pb-4">
              <h3 className="font-serif text-2xl text-[#2C221E] font-medium">
                Add New Jewelry Piece to Atelier Catalogue
              </h3>
              <p className="text-xs text-[#7A6E65]">
                Complete all product specifications. Code must be 3 digits (e.g. 101, 205).
              </p>
            </div>

            <form onSubmit={handleAddProductSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs uppercase font-semibold text-[#2C221E] mb-1">
                    Product Code (3 digits) *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={3}
                    value={newProductData.code}
                    onChange={(e) => setNewProductData({ ...newProductData, code: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#F8F1E8]/50 border border-[#D9C5B0] rounded-xs font-semibold"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs uppercase font-semibold text-[#2C221E] mb-1">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newProductData.name}
                    onChange={(e) => setNewProductData({ ...newProductData, name: e.target.value })}
                    placeholder="e.g. Regal Swat Emerald & Polki Choker"
                    className="w-full px-3 py-2 text-xs bg-[#F8F1E8]/50 border border-[#D9C5B0] rounded-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs uppercase font-semibold text-[#2C221E] mb-1">
                    Category *
                  </label>
                  <select
                    value={newProductData.category}
                    onChange={(e) => setNewProductData({ ...newProductData, category: e.target.value as ProductCategory })}
                    className="w-full px-3 py-2 text-xs bg-[#F8F1E8]/50 border border-[#D9C5B0] rounded-xs"
                  >
                    <option value="Bridal Jewelry">Bridal Jewelry</option>
                    <option value="Pendants & Necklace">Pendants & Necklace</option>
                    <option value="Rings">Rings</option>
                    <option value="Natural Gemstones">Natural Gemstones</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase font-semibold text-[#2C221E] mb-1">
                    Section *
                  </label>
                  <input
                    type="text"
                    required
                    value={newProductData.section}
                    onChange={(e) => setNewProductData({ ...newProductData, section: e.target.value })}
                    placeholder="Bridal Jewelry, Bracelets, Emerald, Ruby, etc."
                    className="w-full px-3 py-2 text-xs bg-[#F8F1E8]/50 border border-[#D9C5B0] rounded-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-semibold text-[#2C221E] mb-1">
                    Informational Price *
                  </label>
                  <input
                    type="text"
                    required
                    value={newProductData.price}
                    onChange={(e) => setNewProductData({ ...newProductData, price: e.target.value })}
                    placeholder="$3,200"
                    className="w-full px-3 py-2 text-xs bg-[#F8F1E8]/50 border border-[#D9C5B0] rounded-xs"
                  />
                </div>
              </div>

              {/* Product Images: Load direct image files */}
              <div className="space-y-4 p-4 bg-[#F2E7D8]/40 border border-[#E6DACB] rounded-xs">
                <SingleImageUploader
                  label="Main Product Image"
                  value={newProductData.mainImage}
                  onChange={(dataUrl) => setNewProductData({ ...newProductData, mainImage: dataUrl })}
                  helperText="Select or drag & drop high-res product photo from your device"
                  required
                />

                <MultiImageUploader
                  label="Additional Gallery Images (Angles, Close-ups, Certificates)"
                  images={newProductData.galleryImages || []}
                  onChange={(imgs) => setNewProductData({ ...newProductData, galleryImages: imgs })}
                  maxImages={4}
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-[#2C221E] mb-1">
                  Short Description (For Card, Max 3 lines) *
                </label>
                <textarea
                  rows={2}
                  required
                  value={newProductData.shortText}
                  onChange={(e) => setNewProductData({ ...newProductData, shortText: e.target.value })}
                  placeholder="Short 2-3 line summary for catalogue cards..."
                  className="w-full px-3 py-2 text-xs bg-[#F8F1E8]/50 border border-[#D9C5B0] rounded-xs resize-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-[#2C221E] mb-1">
                  Detailed Description *
                </label>
                <textarea
                  rows={4}
                  required
                  value={newProductData.description}
                  onChange={(e) => setNewProductData({ ...newProductData, description: e.target.value })}
                  placeholder="Elaborate details on metal purity, setting craftsmanship, gemstone provenance..."
                  className="w-full px-3 py-2 text-xs bg-[#F8F1E8]/50 border border-[#D9C5B0] rounded-xs"
                />
              </div>

              {/* Gemstone Specifications */}
              <div className="p-4 bg-[#F2E7D8]/50 border border-[#E6DACB] rounded-xs space-y-4">
                <h4 className="text-xs uppercase tracking-wider font-semibold text-[#2C221E]">
                  Gemological Specifications
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase text-[#7A6E65] font-semibold">Material</label>
                    <input
                      type="text"
                      value={newProductData.material}
                      onChange={(e) => setNewProductData({ ...newProductData, material: e.target.value })}
                      className="w-full mt-1 px-2.5 py-1.5 text-xs bg-white border border-[#D9C5B0] rounded-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase text-[#7A6E65] font-semibold">Gemstone</label>
                    <input
                      type="text"
                      value={newProductData.gemstone}
                      onChange={(e) => setNewProductData({ ...newProductData, gemstone: e.target.value })}
                      className="w-full mt-1 px-2.5 py-1.5 text-xs bg-white border border-[#D9C5B0] rounded-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase text-[#7A6E65] font-semibold">Carat Weight</label>
                    <input
                      type="text"
                      value={newProductData.carat || ''}
                      onChange={(e) => setNewProductData({ ...newProductData, carat: e.target.value })}
                      className="w-full mt-1 px-2.5 py-1.5 text-xs bg-white border border-[#D9C5B0] rounded-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase text-[#7A6E65] font-semibold">Color</label>
                    <input
                      type="text"
                      value={newProductData.color || ''}
                      onChange={(e) => setNewProductData({ ...newProductData, color: e.target.value })}
                      className="w-full mt-1 px-2.5 py-1.5 text-xs bg-white border border-[#D9C5B0] rounded-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase text-[#7A6E65] font-semibold">Cut</label>
                    <input
                      type="text"
                      value={newProductData.cut || ''}
                      onChange={(e) => setNewProductData({ ...newProductData, cut: e.target.value })}
                      className="w-full mt-1 px-2.5 py-1.5 text-xs bg-white border border-[#D9C5B0] rounded-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase text-[#7A6E65] font-semibold">Clarity</label>
                    <input
                      type="text"
                      value={newProductData.clarity || ''}
                      onChange={(e) => setNewProductData({ ...newProductData, clarity: e.target.value })}
                      className="w-full mt-1 px-2.5 py-1.5 text-xs bg-white border border-[#D9C5B0] rounded-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase text-[#7A6E65] font-semibold">Origin</label>
                    <input
                      type="text"
                      value={newProductData.origin || ''}
                      onChange={(e) => setNewProductData({ ...newProductData, origin: e.target.value })}
                      className="w-full mt-1 px-2.5 py-1.5 text-xs bg-white border border-[#D9C5B0] rounded-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase text-[#7A6E65] font-semibold">Treatment</label>
                    <input
                      type="text"
                      value={newProductData.treatment || ''}
                      onChange={(e) => setNewProductData({ ...newProductData, treatment: e.target.value })}
                      className="w-full mt-1 px-2.5 py-1.5 text-xs bg-white border border-[#D9C5B0] rounded-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase text-[#7A6E65] font-semibold">Laboratory (GIA, AGA, GFCO, GGI)</label>
                    <input
                      type="text"
                      value={newProductData.laboratory || ''}
                      onChange={(e) => setNewProductData({ ...newProductData, laboratory: e.target.value })}
                      className="w-full mt-1 px-2.5 py-1.5 text-xs bg-white border border-[#D9C5B0] rounded-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase text-[#7A6E65] font-semibold">Certificate Number</label>
                    <input
                      type="text"
                      value={newProductData.certificateNumber || ''}
                      onChange={(e) => setNewProductData({ ...newProductData, certificateNumber: e.target.value })}
                      className="w-full mt-1 px-2.5 py-1.5 text-xs bg-white border border-[#D9C5B0] rounded-xs"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="new-arrival-checkbox"
                  checked={newProductData.isNewArrival}
                  onChange={(e) => setNewProductData({ ...newProductData, isNewArrival: e.target.checked })}
                  className="rounded-xs border-[#D9C5B0] text-[#B89058] focus:ring-[#B89058]"
                />
                <label htmlFor="new-arrival-checkbox" className="text-xs text-[#2C221E] font-medium">
                  Feature in "New Arrivals" on Homepage
                </label>
              </div>

              <div className="pt-4 border-t border-[#E6DACB] flex gap-3">
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#2C221E] hover:bg-[#3D302A] text-[#F8F1E8] text-xs font-semibold uppercase tracking-[0.2em] rounded-xs transition-colors cursor-pointer"
                >
                  Save & Publish Piece
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentTab('products')}
                  className="px-6 py-3 bg-[#F2E7D8] text-[#2C221E] text-xs font-semibold uppercase tracking-wider rounded-xs border border-[#D5C2AA]"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 4: HOMEPAGE CONTENT MANAGEMENT */}
        {currentTab === 'homepage' && (
          <form onSubmit={handleSaveContent} className="bg-[#FFFFFF] border border-[#E6DACB] p-6 sm:p-8 rounded-xs shadow-2xs space-y-6">
            <div className="border-b border-[#E6DACB] pb-4 flex justify-between items-center">
              <div>
                <h3 className="font-serif text-2xl text-[#2C221E] font-medium">
                  Homepage Content & Editorial Imagery
                </h3>
                <p className="text-xs text-[#7A6E65]">
                  Update brand hero statements, introduction copy, and Pakistani model photography paths.
                </p>
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#2C221E] text-[#F8F1E8] text-xs font-semibold uppercase tracking-wider rounded-xs flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5 text-[#B89058]" />
                <span>Save Changes</span>
              </button>
            </div>

            {/* Hero Section Copy */}
            <div className="space-y-4">
              <h4 className="text-xs uppercase tracking-wider font-semibold text-[#2C221E] border-b border-[#F2E7D8] pb-1">
                Hero Section
              </h4>
              <div>
                <label className="block text-xs font-medium text-[#2C221E] mb-1">Tagline / Slogan</label>
                <input
                  type="text"
                  value={siteContentForm.tagline}
                  onChange={(e) => setSiteContentForm({ ...siteContentForm, tagline: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#F8F1E8]/50 border border-[#D9C5B0] rounded-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#2C221E] mb-1">Hero Subheading</label>
                <textarea
                  rows={2}
                  value={siteContentForm.homeHeroSubheading}
                  onChange={(e) => setSiteContentForm({ ...siteContentForm, homeHeroSubheading: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#F8F1E8]/50 border border-[#D9C5B0] rounded-xs"
                />
              </div>
              <div className="pt-2">
                <SingleImageUploader
                  label="Hero Pakistani Model Editorial Image"
                  value={siteContentForm.homeHeroImage}
                  onChange={(dataUrl) => setSiteContentForm({ ...siteContentForm, homeHeroImage: dataUrl })}
                  helperText="Load high-fashion image of Pakistani model wearing jewelry"
                />
              </div>
            </div>

            {/* Intro Section */}
            <div className="space-y-4 pt-4">
              <h4 className="text-xs uppercase tracking-wider font-semibold text-[#2C221E] border-b border-[#F2E7D8] pb-1">
                Introduction Section (Section 8.1)
              </h4>
              <div>
                <label className="block text-xs font-medium text-[#2C221E] mb-1">Intro Heading</label>
                <input
                  type="text"
                  value={siteContentForm.homeIntroHeading}
                  onChange={(e) => setSiteContentForm({ ...siteContentForm, homeIntroHeading: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#F8F1E8]/50 border border-[#D9C5B0] rounded-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#2C221E] mb-1">Intro Text</label>
                <textarea
                  rows={3}
                  value={siteContentForm.homeIntroText}
                  onChange={(e) => setSiteContentForm({ ...siteContentForm, homeIntroText: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#F8F1E8]/50 border border-[#D9C5B0] rounded-xs"
                />
              </div>
              <div className="pt-2">
                <SingleImageUploader
                  label="Intro Pakistani Model Editorial Image"
                  value={siteContentForm.homeIntroImage}
                  onChange={(dataUrl) => setSiteContentForm({ ...siteContentForm, homeIntroImage: dataUrl })}
                  helperText="Load image of Pakistani model in traditional attire for introduction"
                />
              </div>
            </div>

            {/* Craftsmanship & Certification */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="space-y-3">
                <h4 className="text-xs uppercase tracking-wider font-semibold text-[#2C221E] border-b border-[#F2E7D8] pb-1">
                  Craftsmanship Section
                </h4>
                <div>
                  <label className="block text-xs font-medium text-[#2C221E] mb-1">Heading</label>
                  <input
                    type="text"
                    value={siteContentForm.craftsmanshipHeading}
                    onChange={(e) => setSiteContentForm({ ...siteContentForm, craftsmanshipHeading: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#F8F1E8]/50 border border-[#D9C5B0] rounded-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#2C221E] mb-1">Subtext</label>
                  <textarea
                    rows={2}
                    value={siteContentForm.craftsmanshipSubtext}
                    onChange={(e) => setSiteContentForm({ ...siteContentForm, craftsmanshipSubtext: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#F8F1E8]/50 border border-[#D9C5B0] rounded-xs"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs uppercase tracking-wider font-semibold text-[#2C221E] border-b border-[#F2E7D8] pb-1">
                  Certification Section
                </h4>
                <div>
                  <label className="block text-xs font-medium text-[#2C221E] mb-1">Heading</label>
                  <input
                    type="text"
                    value={siteContentForm.certificationHeading}
                    onChange={(e) => setSiteContentForm({ ...siteContentForm, certificationHeading: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#F8F1E8]/50 border border-[#D9C5B0] rounded-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#2C221E] mb-1">Text</label>
                  <textarea
                    rows={2}
                    value={siteContentForm.certificationText}
                    onChange={(e) => setSiteContentForm({ ...siteContentForm, certificationText: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#F8F1E8]/50 border border-[#D9C5B0] rounded-xs"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E6DACB]">
              <button
                type="submit"
                className="px-6 py-3 bg-[#2C221E] hover:bg-[#3D302A] text-[#F8F1E8] text-xs font-semibold uppercase tracking-[0.2em] rounded-xs transition-colors cursor-pointer"
              >
                Save All Homepage Content
              </button>
            </div>
          </form>
        )}

        {/* TAB 5: CONTACT & SITE SETTINGS */}
        {currentTab === 'settings' && (
          <form onSubmit={handleSaveContent} className="bg-[#FFFFFF] border border-[#E6DACB] p-6 sm:p-8 rounded-xs shadow-2xs space-y-6">
            <div className="border-b border-[#E6DACB] pb-4 flex justify-between items-center">
              <div>
                <h3 className="font-serif text-2xl text-[#2C221E] font-medium">
                  Atelier Company & Contact Details
                </h3>
                <p className="text-xs text-[#7A6E65]">
                  Updates contact coordinates across the header, footer, inquiry popups, and WhatsApp links.
                </p>
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#2C221E] text-[#F8F1E8] text-xs font-semibold uppercase tracking-wider rounded-xs flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5 text-[#B89058]" />
                <span>Save Coordinates</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase font-semibold text-[#2C221E] mb-1">Brand Name</label>
                <input
                  type="text"
                  value={siteContentForm.brandName}
                  onChange={(e) => setSiteContentForm({ ...siteContentForm, brandName: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#F8F1E8]/50 border border-[#D9C5B0] rounded-xs"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-[#2C221E] mb-1">Company Legal Entity</label>
                <input
                  type="text"
                  value={siteContentForm.companyName}
                  onChange={(e) => setSiteContentForm({ ...siteContentForm, companyName: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#F8F1E8]/50 border border-[#D9C5B0] rounded-xs"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-[#2C221E] mb-1">Business Description</label>
                <input
                  type="text"
                  value={siteContentForm.businessDescription}
                  onChange={(e) => setSiteContentForm({ ...siteContentForm, businessDescription: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#F8F1E8]/50 border border-[#D9C5B0] rounded-xs"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-[#2C221E] mb-1">Telephone</label>
                <input
                  type="text"
                  value={siteContentForm.phone}
                  onChange={(e) => setSiteContentForm({ ...siteContentForm, phone: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#F8F1E8]/50 border border-[#D9C5B0] rounded-xs"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-[#2C221E] mb-1">WhatsApp Number</label>
                <input
                  type="text"
                  value={siteContentForm.whatsapp}
                  onChange={(e) => setSiteContentForm({ ...siteContentForm, whatsapp: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#F8F1E8]/50 border border-[#D9C5B0] rounded-xs"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-[#2C221E] mb-1">Email Address</label>
                <input
                  type="email"
                  value={siteContentForm.email}
                  onChange={(e) => setSiteContentForm({ ...siteContentForm, email: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#F8F1E8]/50 border border-[#D9C5B0] rounded-xs"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-[#2C221E] mb-1">Official Website</label>
                <input
                  type="text"
                  value={siteContentForm.website}
                  onChange={(e) => setSiteContentForm({ ...siteContentForm, website: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#F8F1E8]/50 border border-[#D9C5B0] rounded-xs"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-[#2C221E] mb-1">Instagram Handle</label>
                <input
                  type="text"
                  value={siteContentForm.instagram}
                  onChange={(e) => setSiteContentForm({ ...siteContentForm, instagram: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#F8F1E8]/50 border border-[#D9C5B0] rounded-xs"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs uppercase font-semibold text-[#2C221E] mb-1">Showroom Address</label>
                <input
                  type="text"
                  value={siteContentForm.address}
                  onChange={(e) => setSiteContentForm({ ...siteContentForm, address: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#F8F1E8]/50 border border-[#D9C5B0] rounded-xs"
                />
              </div>

              <div className="sm:col-span-2 pt-2">
                <SingleImageUploader
                  label="Brand Logo / Monogram Image"
                  value={siteContentForm.logoUrl}
                  onChange={(dataUrl) => setSiteContentForm({ ...siteContentForm, logoUrl: dataUrl })}
                  helperText="Load PNG or SVG logo emblem file from device"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#E6DACB]">
              <button
                type="submit"
                className="px-6 py-3 bg-[#2C221E] hover:bg-[#3D302A] text-[#F8F1E8] text-xs font-semibold uppercase tracking-[0.2em] rounded-xs transition-colors cursor-pointer"
              >
                Save Atelier Settings
              </button>
            </div>
          </form>
        )}

        {/* EDIT PRODUCT MODAL DRAWER */}
        {editingProduct && (
          <div className="fixed inset-0 z-50 bg-[#2C221E]/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-[#FFFFFF] border border-[#D5C2AA] rounded-xs shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-4">
              <div className="flex justify-between items-center border-b border-[#E6DACB] pb-3">
                <h3 className="font-serif text-xl text-[#2C221E] font-medium">
                  Edit Piece: Code {editingProduct.code}
                </h3>
                <button
                  onClick={() => setEditingProduct(null)}
                  className="p-1 text-[#7A6E65] hover:text-[#2C221E]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleEditProductSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase font-semibold text-[#7A6E65]">Product Code</label>
                    <input
                      type="text"
                      value={editingProduct.code}
                      onChange={(e) => setEditingProduct({ ...editingProduct, code: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs bg-[#F8F1E8]/50 border border-[#D9C5B0] rounded-xs font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-semibold text-[#7A6E65]">Price ($)</label>
                    <input
                      type="text"
                      value={editingProduct.price}
                      onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs bg-[#F8F1E8]/50 border border-[#D9C5B0] rounded-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-semibold text-[#7A6E65]">Product Name</label>
                  <input
                    type="text"
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs bg-[#F8F1E8]/50 border border-[#D9C5B0] rounded-xs"
                  />
                </div>

                {/* Product Images: Load direct files */}
                <div className="space-y-4 p-3 bg-[#F8F1E8]/50 border border-[#E6DACB] rounded-xs">
                  <SingleImageUploader
                    label="Main Product Image"
                    value={editingProduct.mainImage}
                    onChange={(dataUrl) => setEditingProduct({ ...editingProduct, mainImage: dataUrl })}
                    helperText="Select or drag & drop to replace main photo"
                    required
                  />

                  <MultiImageUploader
                    label="Additional Gallery Images"
                    images={editingProduct.galleryImages || []}
                    onChange={(imgs) => setEditingProduct({ ...editingProduct, galleryImages: imgs })}
                    maxImages={4}
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-semibold text-[#7A6E65]">Short Description (Max 3 lines)</label>
                  <textarea
                    rows={2}
                    value={editingProduct.shortText}
                    onChange={(e) => setEditingProduct({ ...editingProduct, shortText: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs bg-[#F8F1E8]/50 border border-[#D9C5B0] rounded-xs"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-semibold text-[#7A6E65]">Detailed Description</label>
                  <textarea
                    rows={3}
                    value={editingProduct.description}
                    onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs bg-[#F8F1E8]/50 border border-[#D9C5B0] rounded-xs"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[9px] uppercase text-[#7A6E65]">Material</label>
                    <input
                      type="text"
                      value={editingProduct.material}
                      onChange={(e) => setEditingProduct({ ...editingProduct, material: e.target.value })}
                      className="w-full px-2 py-1 text-xs border border-[#D9C5B0] rounded-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase text-[#7A6E65]">Gemstone</label>
                    <input
                      type="text"
                      value={editingProduct.gemstone}
                      onChange={(e) => setEditingProduct({ ...editingProduct, gemstone: e.target.value })}
                      className="w-full px-2 py-1 text-xs border border-[#D9C5B0] rounded-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase text-[#7A6E65]">Laboratory</label>
                    <input
                      type="text"
                      value={editingProduct.laboratory || ''}
                      onChange={(e) => setEditingProduct({ ...editingProduct, laboratory: e.target.value })}
                      className="w-full px-2 py-1 text-xs border border-[#D9C5B0] rounded-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase text-[#7A6E65]">Carat</label>
                    <input
                      type="text"
                      value={editingProduct.carat || ''}
                      onChange={(e) => setEditingProduct({ ...editingProduct, carat: e.target.value })}
                      className="w-full px-2 py-1 text-xs border border-[#D9C5B0] rounded-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase text-[#7A6E65]">Origin</label>
                    <input
                      type="text"
                      value={editingProduct.origin || ''}
                      onChange={(e) => setEditingProduct({ ...editingProduct, origin: e.target.value })}
                      className="w-full px-2 py-1 text-xs border border-[#D9C5B0] rounded-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase text-[#7A6E65]">Certificate #</label>
                    <input
                      type="text"
                      value={editingProduct.certificateNumber || ''}
                      onChange={(e) => setEditingProduct({ ...editingProduct, certificateNumber: e.target.value })}
                      className="w-full px-2 py-1 text-xs border border-[#D9C5B0] rounded-xs"
                    />
                  </div>
                </div>

                <div className="pt-3 flex justify-end gap-2 border-t border-[#E6DACB]">
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="px-4 py-2 bg-[#F2E7D8] text-xs font-semibold rounded-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#2C221E] text-[#F8F1E8] text-xs font-semibold uppercase tracking-wider rounded-xs"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
