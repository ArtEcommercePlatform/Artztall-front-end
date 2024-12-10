import React, { useState, useEffect } from "react";
import { apiClient } from "../services/apiClient";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  artistId: string;
  category: string;
  tags: string[];
  imageUrl: string;
  stockQuantity: number;
  createdAt: string;
  updatedAt: string;
  dimensions: {
    length: number;
    width: number;
    unit: string;
  };
  medium: string;
  style: string;
  available: boolean;
}

interface ProductResponse {
  content: Product[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const pageSize = 8; 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await apiClient.get<ProductResponse>("/products", {
          page,
          size: pageSize,
        });

        if (response.success) {
          setProducts(response.data.content);
          setTotalPages(response.data.totalPages);
        } else {
          throw new Error(response.message || "Failed to fetch products");
        }
      } catch (err: any) {
        setError(err.message || "Failed to fetch products");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [page]);

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages - 1) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-primary"></div>
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
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-primary mb-6 text-center">
        Art Gallery
      </h1>

      {products.length === 0 ? (
        <div className="text-center text-gray-500">No products found</div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-xl"
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-48 object-cover mb-4 rounded-md"
                />
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold text-gray-800 truncate">
                    {product.name}
                  </h2>
                  <p className="text-sm text-gray-500">{product.category}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-primary font-bold text-lg">
                      ${product.price.toFixed(2)}
                    </span>
                    <span
                      className={`text-sm font-medium ${product.available ? "text-green-600" : "text-red-600"}`}
                    >
                      {product.available ? "In Stock" : "Sold Out"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center mt-8 space-x-4">
            <button
              onClick={handlePreviousPage}
              disabled={page === 0}
              className="px-6 py-2 bg-primary text-white rounded-md disabled:bg-gray-400 transition-colors"
            >
              Previous
            </button>
            <span className="text-gray-700">
              Page {page + 1} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={page === totalPages - 1}
              className="px-6 py-2 bg-primary text-white rounded-md disabled:bg-gray-400 transition-colors"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductList;