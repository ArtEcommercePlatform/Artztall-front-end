import { useEffect, useState } from "react";
import { apiClient } from "../../services/apiClient";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import DetailedCard from "../../components/DetailedCard";
import Header from "../../components/Header";

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

interface PageResponse {
  content: Product[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async (page: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiClient.get<PageResponse>("/products", {
        page,
        size: 9,
      });
      setProducts(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (err: any) {
      setError(err.message || "Failed to fetch products");
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const handleBuy = async (productId: string) => {
    try {
      console.log(productId);
      // Handle successful purchase (e.g., show notification, update cart)
    } catch (err: any) {
      setError(err.message || "Failed to purchase product");
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-lg font-semibold text-red-500">{error}</p>
          <button
            onClick={() => fetchProducts(currentPage)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Art Gallery Shop
        </h1>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <DetailedCard key={product.id} {...product} onBuy={handleBuy} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center mt-8 gap-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 0}
                className="flex items-center px-4 py-2 rounded-md border border-gray-300 
                        disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </button>
              <span className="text-sm">
                Page {currentPage + 1} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages - 1}
                className="flex items-center px-4 py-2 rounded-md border border-gray-300 
                        disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Shop;
