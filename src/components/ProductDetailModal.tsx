import React from "react";
import { X } from "lucide-react";
import { Product } from "../types/product";

interface ProductDetailsModalProps {
  product: Product;
  onClose: () => void;
}

const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({ product, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-gray-600 hover:text-gray-900" />
          </button>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 p-6">
          {/* Image */}
          <div>
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
          
          {/* Details */}
          <div>
            <div className="mb-4">
              <p className="text-gray-600">{product.description}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="font-semibold">Price</p>
                <p>${product.price.toLocaleString()}</p>
              </div>
              <div>
                <p className="font-semibold">Artist</p>
                <p>{product.artistId}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="font-semibold">Category</p>
                <p>{product.category}</p>
              </div>
              <div>
                <p className="font-semibold">Style</p>
                <p>{product.style}</p>
              </div>
            </div>
            
            <div>
              <p className="font-semibold">Dimensions</p>
              <p>{`${product.dimensions.length} x ${product.dimensions.width} ${product.dimensions.unit}`}</p>
            </div>
            
            <div className="mt-4">
              <p className="font-semibold">Tags</p>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span 
                    key={tag} 
                    className="bg-gray-100 text-sm px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mt-6">
              <p className={`font-semibold ${product.available ? 'text-green-600' : 'text-red-600'}`}>
                {product.available ? 'Available' : 'Out of Stock'}
              </p>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;