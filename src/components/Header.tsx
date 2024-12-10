import React, { useState, useEffect, useRef } from "react";
import { Search, Menu, User, X, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import ProductDetailsModal from "../components/ProductDetailModal";
import logo from "../assets/images/logo.png";
import { apiClient } from "../services/apiClient";
import { Product } from "../types/product";

const Header: React.FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isSearchResultsVisible, setIsSearchResultsVisible] = useState<boolean>(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const navigationLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Artists", path: "/artismain" },
  ];

  // Handle clicks outside of search results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchResultsVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLoginClick = () => {
    setIsSignupModalOpen(false);
    setIsLoginModalOpen(true);
  };

  const handleSignupClick = () => {
    setIsLoginModalOpen(false);
    setIsSignupModalOpen(true);
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    
    if (query.length < 2) {
      setSearchResults([]);
      setIsSearchResultsVisible(false);
      return;
    }

    try {
      const response = await apiClient.get<Product[]>('/products/search', { query });
      setSearchResults(response.data);
      setIsSearchResultsVisible(true);
    } catch (error) {
      console.error("Search failed", error);
      setSearchResults([]);
    }
  };

  const handleViewMore = (product: Product) => {
    setSelectedProduct(product);
    setIsSearchResultsVisible(false);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setIsSearchResultsVisible(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="w-full bg-white shadow-sm relative">
      <nav className="px-4 py-4 mx-auto max-w-7xl sm:px-6">
        <div className="flex items-center justify-between">
          {/* Left Section - Logo & Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Mobile Menu Toggle */}
            <button 
              onClick={toggleMobileMenu} 
              className="lg:hidden"
            >
              <Menu className="h-6 w-6 text-[#094129] hover:opacity-80" />
            </button>

            {/* Logo */}
            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="w-40 h-20 bg-[#ffffff] flex items-center justify-center"
              >
                <img
                  src={logo}
                  alt="Arts Shop Logo"
                  className="object-contain w-full h-full"
                />
              </Link>
            </div>
          </div>

          {/* Center Section - Navigation Links (Desktop) */}
          <div className="items-center hidden gap-8 lg:flex">
            {navigationLinks.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-[#094129] hover:opacity-80 transition-opacity"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Section - Search, Auth & Icons */}
          <div className="flex items-center gap-4">
            {/* Search Bar (Desktop) */}
            <div 
              ref={searchRef}
              className="relative items-center hidden px-4 py-2 bg-gray-100 rounded-full sm:flex"
            >
              <Search className="w-10 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search art..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => searchResults.length > 0 && setIsSearchResultsVisible(true)}
                className="w-40 ml-2 bg-transparent border-none focus:outline-none"
              />
              {searchQuery && (
                <button onClick={clearSearch} className="ml-2">
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              )}

              {/* Search Results Dropdown */}
              {isSearchResultsVisible && searchResults.length > 0 && (
                <div className="absolute top-full left-0 w-full mt-2 bg-white shadow-lg rounded-lg z-50 max-h-96 overflow-y-auto">
                  {searchResults.map((product) => (
                    <div 
                      key={product.id} 
                      className="px-4 py-2 hover:bg-gray-100 flex justify-between items-center"
                    >
                      <div>
                        <p className="font-semibold">{product.name}</p>
                        <p className="text-sm text-gray-500">{product.category}</p>
                      </div>
                      <button 
                        onClick={() => handleViewMore(product)}
                        className="text-sm text-[#094129] hover:underline"
                      >
                        View More
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Auth and Cart Buttons (Desktop) */}
            <div className="items-center hidden gap-3 md:flex">
              <button 
                onClick={handleLoginClick}
                className="text-[#094129] hover:opacity-80 transition-opacity mr-5 ml-5"
              >
                Login
              </button>
              <button
                onClick={handleSignupClick}
                className="bg-[#094129] text-white px-4 py-2 rounded-full hover:opacity-80 transition-opacity"
              >
                Sign up
              </button>
              <button className="text-[#094129] hover:opacity-80">
                <ShoppingCart className="h-6 w-6" />
              </button>
            </div>

            {/* Mobile User and Cart Icons */}
            <div className="flex items-center gap-2 md:hidden">
              <button onClick={handleLoginClick} className="hover:opacity-80">
                <User className="h-6 w-6 text-[#094129]" />
              </button>
              <button className="hover:opacity-80">
                <ShoppingCart className="h-6 w-6 text-[#094129]" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu (Slide-out) */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-white z-50 lg:hidden">
            <div className="flex justify-between items-center p-4">
              <img
                src={logo}
                alt="Arts Shop Logo"
                className="w-40 h-20 object-contain"
              />
              <button onClick={toggleMobileMenu}>
                <X className="h-6 w-6 text-[#094129]" />
              </button>
            </div>
            <div className="flex flex-col p-4 space-y-4">
              {navigationLinks.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-[#094129] text-xl"
                  onClick={toggleMobileMenu}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col space-y-3 pt-4">
                <button
                  onClick={() => {
                    handleLoginClick();
                    toggleMobileMenu();
                  }}
                  className="text-[#094129] text-xl"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    handleSignupClick();
                    toggleMobileMenu();
                  }}
                  className="bg-[#094129] text-white px-4 py-2 rounded-full"
                >
                  Sign up
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Product Details Modal */}
      {selectedProduct && (
        <ProductDetailsModal 
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {/* Auth Modals */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
      <SignupModal
        isOpen={isSignupModalOpen}
        onClose={() => setIsSignupModalOpen(false)}
      />
    </header>
  );
};

export default Header;