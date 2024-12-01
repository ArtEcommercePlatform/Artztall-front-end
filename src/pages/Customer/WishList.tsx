import React, { useState, useEffect } from "react";
import { Heart, Trash2, ShoppingCart } from "lucide-react";
import { apiClient } from "../../services/apiClient";

// Interfaces for type safety
interface WishlistItem {
  productId: string;
  addedOn: string;
  note?: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  available: boolean;
}

const Wishlist: React.FC = () => {
  const [wishlistItems, setWishlistItems] = useState<
    (WishlistItem & Product)[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        // Fetch wishlist items

        const userId = localStorage.getItem("userId");
        const wishlistResponse = await apiClient.get<WishlistItem[]>(
          `/users/${userId}/wishlist`,
        );

        // Fetch product details for each wishlist item
        const productDetailsPromises = wishlistResponse.data.map(
          async (item) => {
            const productResponse = await apiClient.get<Product>(
              `/products/${item.productId}`,
            );
            return { ...item, ...productResponse.data };
          },
        );

        const wishlistWithProducts = await Promise.all(productDetailsPromises);
        setWishlistItems(wishlistWithProducts);
        setLoading(false);
      } catch (err: any) {
        setError(err.message || "Failed to fetch wishlist");
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const handleRemoveFromWishlist = async (productId: string) => {
    try {
      // Implement remove from wishlist logic
      // This would typically be an API call to remove the item
      setWishlistItems((prevItems) =>
        prevItems.filter((item) => item.productId !== productId),
      );
    } catch (err: any) {
      setError(err.message || "Failed to remove item from wishlist");
    }
  };

  const handleAddToCart = async (product: Product) => {
    try {
      // Implement add to cart logic
      // This would typically be an API call to add the item to cart
      console.log("Added to cart:", product);
    } catch (err: any) {
      setError(err.message || "Failed to add item to cart");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <Heart className="mr-2 text-red-500" /> My Wishlist
      </h2>

      {wishlistItems.length === 0 ? (
        <div className="text-center text-gray-500">Your wishlist is empty</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <div
              key={item.productId}
              className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-2">${item.price.toFixed(2)}</p>

                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="flex items-center bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 transition-colors"
                    disabled={!item.available}
                  >
                    <ShoppingCart className="mr-2" size={20} />
                    {item.available ? "Add to Cart" : "Unavailable"}
                  </button>

                  <button
                    onClick={() => handleRemoveFromWishlist(item.productId)}
                    className="text-red-500 hover:text-red-700"
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 size={24} />
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

export default Wishlist;
