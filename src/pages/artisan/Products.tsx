import React from "react";
import { Plus, Edit, Trash2 } from "lucide-react";

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
      title: "Sunset Landscape",
      description: "A vibrant oil painting capturing the golden hour",
      category: "Landscape",
      price: 1500,
      images: ["/placeholder-image.jpg"],
    },
    {
      id: 2,
      title: "Abstract Composition",
      description: "Modern abstract piece with vibrant colors",
      category: "Abstract",
      price: 2200,
      images: ["/placeholder-image.jpg"],
    },
    {
      id: 3,
      title: "Urban Sketch",
      description: "Detailed cityscape drawing",
      category: "Urban",
      price: 1800,
      images: ["/placeholder-image.jpg"],
    },
    {
      id: 4,
      title: "Mountain Serenity",
      description: "Tranquil mountain landscape",
      category: "Landscape",
      price: 2500,
      images: ["/placeholder-image.jpg"],
    },
  ]);

  // Create a default product template
  const createDefaultProduct = (): Product => ({
    id: products.length + 1,
    title: `Artwork ${products.length + 1}`,
    description: "New artwork description",
    category: "Uncategorized",
    price: 0,
    images: ["/placeholder-image.jpg"],
  });

  // Add new product
  const handleAddProduct = () => {
    const newProduct = createDefaultProduct();
    setProducts([...products, newProduct]);
  };

  // Delete product
  const handleDeleteProduct = (productId: number) => {
    setProducts(products.filter((p) => p.id !== productId));
  };

  // Edit product handler (placeholder)
  const handleEditProduct = () => {
    // Placeholder for future edit functionality
    console.log("Edit product clicked");
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gradient-to-br from-green-50 to-blue-100">
      <div className="container mx-auto px-4 py-6 flex-grow overflow-y-auto">
        {/* Page Header */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">My Artworks</h1>
            <p className="text-gray-500">
              Manage and showcase your creative collection
            </p>
          </div>
          <button
            onClick={handleAddProduct}
            className="
              flex items-center 
              bg-green-600 
              text-white 
              px-4 py-2 
              rounded-lg 
              text-sm
              hover:bg-green-700 
              transition-all 
              duration-300 
              shadow-md
            "
          >
            <Plus className="mr-2 w-4 h-4" /> Add Artwork
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="
                bg-white 
                rounded-xl 
                shadow-md 
                p-4 
                transform 
                transition-transform 
                hover:-translate-y-1
              "
            >
              {/* Product Image */}
              <div className="relative">
                <img
                  src={product.images[0] || "/placeholder-image.jpg"}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>

              {/* Product Details */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-green-600 font-semibold text-lg">
                    Rs {product.price.toLocaleString()}
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={handleEditProduct}
                      className="
                        text-green-500 
                        hover:bg-green-50 
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
                <h2 className="text-gray-800 font-semibold text-sm mb-1">
                  {product.title}
                </h2>
                <p className="text-gray-600 text-xs">{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
