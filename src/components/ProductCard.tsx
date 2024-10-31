import React, { useState } from 'react';
import { ShoppingCart, CreditCard } from 'lucide-react';
import LoginRegisterModal from './LoginRegisterModal';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBuyNow = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
        <p className="text-gray-600 mb-4">${product.price.toFixed(2)}</p>
        <div className="flex space-x-2">
          <button
            onClick={handleBuyNow}
            className="flex-1 bg-green-500 text-white px-4 py-2 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
          >
            <CreditCard className="h-5 w-5 mr-2" />
            Buy Now
          </button>
          <button className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
            <ShoppingCart className="h-5 w-5 mr-2" />
            Add to Cart
          </button>
        </div>
      </div>
      <LoginRegisterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default ProductCard;