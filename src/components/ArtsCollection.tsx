import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import ProductCard from "../assets/components/productCard/ProductCard";
import { apiClient } from "../services/apiClient";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  artistId: string;
  category: string;
  imageUrl: string;
  available: boolean;
  artistName?: string;
}

interface ProductResponse {
  content: Product[];
  totalPages: number;
  totalElements: number;
}

interface Artisan {
  id: string;
  email: string;
  name: string;
  phoneNumber: string;
  profilePictureUrl: string;
  bio: string;
  artworkCategories: string[];
  averageRating: number;
  totalSales: number;
  verified: boolean;
}

const ArtsCollection: React.FC = () => {
  const [featuredArt, setFeaturedArt] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedArtworks = async () => {
      try {
        setIsLoading(true);

        // Fetch the products
        const productResponse = await apiClient.get<ProductResponse>(
          "products",
          {
            page: 0,
            size: 4,
          },
        );

        const products = productResponse.data.content;

        // Fetch artists' names for the products
        const productsWithArtists = await Promise.all(
          products.map(async (product) => {
            try {
              const artistResponse = await apiClient.get<Artisan>(
                `users/artisans/${product.artistId}`,
              );
              return { ...product, artistName: artistResponse.data.name };
            } catch {
              return { ...product, artistName: "Unknown Artist" };
            }
          }),
        );

        setFeaturedArt(productsWithArtists);
      } catch (err) {
        setError("Failed to fetch featured artworks");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedArtworks();
  }, []);

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#094129]"></div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            {error}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-[#094129]">
            Featured Artworks
          </h2>
          <button className="text-[#094129] font-semibold flex items-center hover:underline">
            View All
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
        {featuredArt.length === 0 ? (
          <div className="text-center text-gray-500">
            No featured artworks available
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredArt.map((art) => (
              <ProductCard
                key={art.id}
                imageUrl={art.imageUrl}
                title={art.name}
                artist={art.artistName || "Unknown Artist"}
                price={art.price}
                isNew={art.available}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ArtsCollection;