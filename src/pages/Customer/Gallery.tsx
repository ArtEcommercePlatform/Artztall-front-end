import React, { useState, useEffect } from 'react';
import { Heart, Share2, ExternalLink, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../../services/apiClient'; 

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  medium: string;
  dimensions: {
    length: number;
    width: number;
    unit: string;
  };
  available: boolean;
}

interface PaginatedResponse {
  content: Product[];
  totalPages: number;
  totalElements: number;
  number: number;
}

const Gallery: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [filters, setFilters] = useState({
    category: 'All',
    priceRange: 'All'
  });
  const [wishlist, setWishlist] = useState<string[]>([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const params = {
        page,
        size: 9,
        
      };

      const response = await apiClient.get<PaginatedResponse>('/products', params);
      
      if (response.success) {
        setProducts(response.data.content);
        setTotalPages(response.data.totalPages);
      }
    } catch (error) {
      console.error('Error fetching products', error);
    }
  };

  const addToWishlist = async (productId: string) => {
    try {
      const userId = localStorage.getItem('userId'); 
      
      await apiClient.post(`/users/${userId}/wishlist`, {
        productId,
        addedOn: new Date().toISOString()
      });
      
      setWishlist(prev => 
        prev.includes(productId) 
          ? prev.filter(id => id !== productId) 
          : [...prev, productId]
      );
    } catch (error) {
      console.error('Error adding to wishlist', error);
    }
  };

  const handleBuyNow = (product: Product) => {
    if (product.available) {
      navigate('/customer/make-order', { state: { product } });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, filters]);

  const categories = ['All', 'Abstract', 'Landscape', 'Portrait', 'Digital'];
  const priceRanges = ['All', 'Under LKR 100,000', 'LKR 100,000-LKR 200,000', 'Over LKR 200,000'];

  return (
    <div className="p-6 bg-gray-50">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Art Gallery</h1>
        
        <div className="flex space-x-4">
          <select 
            className="px-4 py-2 border rounded-lg"
            value={filters.category}
            onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          
          <select 
            className="px-4 py-2 border rounded-lg"
            value={filters.priceRange}
            onChange={(e) => setFilters(prev => ({ ...prev, priceRange: e.target.value }))}
          >
            {priceRanges.map(range => (
              <option key={range} value={range}>{range}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <div 
            key={product.id} 
            className={`bg-white rounded-lg shadow-md overflow-hidden ${!product.available ? 'opacity-50' : ''}`}
          >
            <div className="relative">
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-64 object-cover"
              />
              {!product.available && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white px-4 py-2 rounded-lg">
                  Out of Stock
                </div>
              )}
              <div className="absolute top-4 right-4 flex space-x-2">
                <button 
                  onClick={() => addToWishlist(product.id)}
                  className="p-2 bg-white rounded-full shadow-md"
                >
                  <Heart 
                    size={20} 
                    className={
                      wishlist.includes(product.id)
                        ? "fill-red-500 text-red-500"
                        : "text-gray-600"
                    }
                  />
                </button>
                <button className="p-2 bg-white rounded-full shadow-md">
                  <Share2 size={20} className="text-gray-600" />
                </button>
              </div>
            </div>

            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h2 className="text-xl font-semibold">{product.name}</h2>
                  <p className="text-gray-600">{product.category}</p>
                </div>
                <span className="text-lg font-bold text-green-800">
                  LKR {product.price.toLocaleString()}
                </span>
              </div>

              <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-500">
                  <span className="font-medium">Medium:</span> {product.medium}
                </p>
                <p className="text-sm text-gray-500">
                  <span className="font-medium">Dimensions:</span> 
                  {product.dimensions.length}" x {product.dimensions.width}" {product.dimensions.unit}
                </p>

                <div className="flex justify-between items-center mt-4">
                  {product.available ? (
                    <button 
                      onClick={() => handleBuyNow(product)}
                      className="flex items-center space-x-2 bg-green-800 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                    >
                      <ShoppingCart size={16} />
                      <span>Buy Now</span>
                    </button>
                  ) : (
                    <div className="text-red-500 font-medium">Sold</div>
                  )}
                  <button className="flex items-center space-x-1 text-green-800 hover:text-green-700">
                    <span className="text-sm">View Details</span>
                    <ExternalLink size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 space-x-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button 
            key={i} 
            onClick={() => setPage(i)}
            className={`px-4 py-2 rounded-lg ${
              page === i 
                ? 'bg-green-800 text-white' 
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Gallery;