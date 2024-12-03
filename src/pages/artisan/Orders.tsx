import React, { useState, useEffect } from "react";
import { apiClient } from "../../services/apiClient";
import { Eye, Search, Filter, ChevronUp, ChevronDown, X } from "lucide-react";

// Define interfaces for type safety
interface Dimensions {
  length: number;
  width: number;
  unit: string;
}

interface Item {
  productId: string;
  productName: string;
  artistId: string;
  quantity: number;
  price: number;
  subtotal: number;
  imageUrl: string;
  dimensions: Dimensions;
  medium: string;
  style: string;
}

interface Order {
  id: string;
  userId: string;
  item: Item;
  totalAmount: number;
  status: string;
  paymentStatus: string;
  shippingAddress: string;
  specialInstructions: string;
  createdAt: string;
  updatedAt: string;
}

interface ProductDetails {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  imageUrl: string;
  stockQuantity: number;
  dimensions: Dimensions;
  medium: string;
  style: string;
  available: boolean;
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [productDetails, setProductDetails] = useState<ProductDetails | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [sortBy, setSortBy] = useState<keyof Order>("createdAt");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const artisanId = localStorage.getItem("userId");
        if (!artisanId) {
          throw new Error("No artisan ID found");
        }

        const response = await apiClient.get(`/orders/artisan/${artisanId}`);
        const ordersData = response.data as Order[];
        setOrders(ordersData);
        setFilteredOrders(ordersData);
        setIsLoading(false);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        setError(errorMessage);
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    let result = [...orders];

    if (searchTerm) {
      result = result.filter(
        (order) =>
          order.item.productName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          order.id.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (statusFilter !== "ALL") {
      result = result.filter((order) => order.status === statusFilter);
    }

    result.sort((a, b) => {
      const valueA = a[sortBy];
      const valueB = b[sortBy];

      if (valueA === undefined || valueB === undefined) return 0;

      if (typeof valueA === "string" && typeof valueB === "string") {
        return sortOrder === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      return sortOrder === "asc"
        ? Number(valueA) - Number(valueB)
        : Number(valueB) - Number(valueA);
    });

    setFilteredOrders(result);
  }, [searchTerm, statusFilter, sortOrder, sortBy, orders]);

  const fetchProductDetails = async (productId: string) => {
    try {
      const response = await apiClient.get(`/products/${productId}`);
      const productData = response.data as ProductDetails;
      setProductDetails(productData);
    } catch (err) {
      console.error("Failed to fetch product details", err);
      setProductDetails(null);
    }
  };

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    fetchProductDetails(order.item.productId);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const resetFilters = () => {
    setSearchTerm("");
    setStatusFilter("ALL");
    setSortOrder("desc");
    setSortBy("createdAt");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-blue-500"></div>
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
    <div className="container mx-auto p-4">
      <div className="mb-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <h1 className="text-2xl font-bold">My Orders</h1>

        <div className="flex items-center space-x-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search orders"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none w-full pl-3 pr-8 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">All Status</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="PENDING">Pending</option>
              <option value="SHIPPED">Shipped</option>
            </select>
            <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          <button
            onClick={resetFilters}
            className="text-red-500 hover:text-red-700 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
      </div>

      <div className="mb-4 flex justify-end items-center space-x-4">
        <span className="text-sm text-gray-600">Sort by</span>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as keyof Order)}
          className="border rounded-md px-2 py-1"
        >
          <option value="createdAt">Date</option>
          <option value="totalAmount">Total Amount</option>
        </select>
        <button
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          className="text-gray-600 hover:text-blue-500 transition-colors"
        >
          {sortOrder === "asc" ? <ChevronUp /> : <ChevronDown />}
        </button>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          No orders match your search or filter criteria.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold">
                  {order.item.productName}
                </h2>
                <button
                  onClick={() => handleViewDetails(order)}
                  className="text-blue-500 hover:text-blue-700 transition-colors"
                >
                  <Eye className="h-6 w-6" />
                </button>
              </div>
              <div className="space-y-2">
                <p className="text-gray-600">Order ID: {order.id}</p>
                <p className="text-gray-600">
                  Total: LKR {order.totalAmount.toLocaleString()}
                </p>
                <div className="flex justify-between items-center">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      order.status === "CONFIRMED"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {order.status}
                  </span>
                  <span className="text-sm text-gray-500">
                    {formatDate(order.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedOrder && productDetails && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50"
          onClick={() => {
            setSelectedOrder(null);
            setProductDetails(null);
          }}
        >
          <div
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                setSelectedOrder(null);
                setProductDetails(null);
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                {productDetails.imageUrl && (
                  <img
                    src={productDetails.imageUrl}
                    alt={productDetails.name}
                    className="w-full h-auto rounded-lg mb-4"
                  />
                )}
                <h2 className="text-2xl font-bold mb-2">
                  {productDetails.name}
                </h2>
                <p className="text-gray-600 mb-4">
                  {productDetails.description}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Order Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order ID:</span>
                    <span>{selectedOrder.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="font-medium">{selectedOrder.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Status:</span>
                    <span>{selectedOrder.paymentStatus}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Quantity:</span>
                    <span>{selectedOrder.item.quantity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price:</span>
                    <span>LKR {selectedOrder.item.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping Address:</span>
                    <span>{selectedOrder.shippingAddress}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Special Instructions:</span>
                    <span>{selectedOrder.specialInstructions}</span>
                  </div>
                </div>

                <div className="mt-6 border-t pt-4">
                  <h3 className="text-xl font-semibold mb-2">
                    Product Specifications
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Medium:</span>
                      <span>{productDetails.medium}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Style:</span>
                      <span>{productDetails.style}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Dimensions:</span>
                      <span>{`${productDetails.dimensions.length} x ${productDetails.dimensions.width} ${productDetails.dimensions.unit}`}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
