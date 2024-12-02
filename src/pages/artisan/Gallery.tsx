import { useState, useEffect } from "react";
import { apiClient } from "../../services/apiClient"; // Adjust the import path as needed

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  available: boolean;
  medium: string;
  style: string;
}

const Gallery = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArtistProducts = async () => {
      try {
        // Get the artist ID from localStorage
        const artistId = localStorage.getItem("userId");

        if (!artistId) {
          throw new Error("No artist ID found");
        }

        // Fetch products for the artist
        const response = await apiClient.get<Product[]>(
          `/products/artist/${artistId}`,
        );

        if (response.success) {
          setProducts(response.data);
        } else {
          throw new Error(response.message || "Failed to fetch products");
        }
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching products");
      } finally {
        setLoading(false);
      }
    };

    fetchArtistProducts();
  }, []);

  // Function to update product availability
  const toggleProductAvailability = async (
    productId: string,
    currentAvailability: boolean,
  ) => {
    try {
      const response = await apiClient.patch<Product>(
        `/products/${productId}/availability`,
        {
          available: !currentAvailability,
        },
      );

      if (response.success) {
        // Update the product in the state
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === productId ? response.data : product,
          ),
        );
      }
    } catch (err: any) {
      setError(err.message || "Failed to update product availability");
    }
  };

  // Render loading state
  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Gallery</h1>
        <p>Loading products...</p>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Gallery</h1>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  // Render products
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Gallery</h1>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg overflow-hidden shadow-lg"
            >
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
              ) : (
                <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                  No Image
                </div>
              )}

              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold">LKR {product.price.toFixed(2)}</p>
                    <p className="text-sm text-gray-500">
                      {product.medium} | {product.style}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      toggleProductAvailability(product.id, product.available)
                    }
                    className={`px-3 py-1 rounded ${
                      product.available
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {product.available ? "Available" : "Unavailable"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;
