import React from 'react';
import { 
  Plus, 
  Edit, 
  Trash2 
} from 'lucide-react';

// Define Product interface
interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  images: string[];
}

const Products: React.FC = () => {
  // State for managing products
  const [products, setProducts] = React.useState<Product[]>([
    {
      id: 1,
      title: 'Sunset Landscape',
      description: 'A vibrant oil painting capturing the golden hour',
      category: 'Landscape',
      price: 1500,
      images: ['/placeholder-image.jpg']
    },
    {
      id: 2,
      title: 'Abstract Composition',
      description: 'Modern abstract piece with vibrant colors',
      category: 'Abstract',
      price: 2200,
      images: ['/placeholder-image.jpg']
    },
    {
      id: 3,
      title: 'Urban Sketch',
      description: 'Detailed cityscape drawing',
      category: 'Urban',
      price: 1800,
      images: ['/placeholder-image.jpg']
    },
    {
      id: 4,
      title: 'Mountain Serenity',
      description: 'Tranquil mountain landscape',
      category: 'Landscape',
      price: 2500,
      images: ['/placeholder-image.jpg']
    }
  ]);

  // Create a default product template
  const createDefaultProduct = (): Product => ({
    id: products.length + 1,
    title: `Artwork ${products.length + 1}`,
    description: 'New artwork description',
    category: 'Uncategorized',
    price: 0,
    images: ['/placeholder-image.jpg']
  });

  // Add new product
  const handleAddProduct = () => {
    const newProduct = createDefaultProduct();
    setProducts([...products, newProduct]);
  };

  // Delete product
  const handleDeleteProduct = (productId: number) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  // Edit product handler (placeholder)
  const handleEditProduct = () => {
    // Placeholder for future edit functionality
    console.log('Edit product clicked');
  };

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="container mx-auto">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">My Artworks</h1>
            <p className="text-gray-500">Manage and showcase your creative collection</p>
          </div>
          <button 
            onClick={handleAddProduct}
            className="
              flex 
              items-center 
              bg-blue-600 
              text-white 
              px-5 
              py-3 
              rounded-full 
              shadow-lg 
              hover:bg-blue-700 
              transition-all 
              duration-300 
              ease-in-out 
              transform 
              hover:-translate-y-1 
              hover:scale-105
            "
          >
            <Plus className="mr-2" /> Add New Artwork
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {products.map(product => (
            <div 
              key={product.id} 
              className="
                bg-white 
                rounded-xl 
                shadow-lg 
                overflow-hidden 
                transform 
                transition-all 
                duration-300 
                hover:shadow-2xl 
                hover:-translate-y-2
              "
            >
              {/* Product Image */}
              <div className="relative">
                <img 
                  src={product.images[0] || '/placeholder-image.jpg'} 
                  alt={product.title}
                  className="w-full h-48 object-cover"
                />
              </div>

              {/* Product Details */}
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <span className="text-blue-600 font-semibold">
                    Rs {product.price.toLocaleString()}
                  </span>
                  <div className="flex space-x-2">
                    <button 
                      onClick={handleEditProduct}
                      className="
                        text-blue-500 
                        hover:bg-blue-50 
                        p-2 
                        rounded-full
                      "
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => handleDeleteProduct(product.id)}
                      className="
                        text-red-500 
                        hover:bg-red-50 
                        p-2 
                        rounded-full
                      "
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {product.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;