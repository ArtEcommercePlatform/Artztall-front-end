import React, { useState, useEffect } from "react";
import { apiClient } from "../../services/apiClient";
import {  Search,  X } from "lucide-react";

// Define interfaces (remained the same as yours)
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
  const [productDetails, setProductDetails] = useState<ProductDetails | null>(null);
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



  const resetFilters = () => {
    setSearchTerm("");
    setStatusFilter("ALL");
    setSortOrder("desc");
    setSortBy("createdAt");
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-32 h-32 border-t-2 border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div
        className="relative px-4 py-3 text-red-700 bg-red-100 border border-red-400 rounded-lg shadow-md"
        role="alert"
      >
        {error}
      </div>
    );
  }

  return (
    <div className="container p-6 mx-auto">
      <div className="flex flex-col items-center justify-between mb-8 space-y-4 md:flex-row md:space-y-0">
        <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>

        <div className="flex items-center space-x-6">
          {/* Search Bar */}
          <div className="relative flex-grow max-w-xs">
            <input
              type="text"
              placeholder="Search orders"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute text-gray-500 transform -translate-y-1/2 left-3 top-1/2" />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full py-3 pl-3 pr-8 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">All Orders</option>
              <option value="PENDING">Pending</option>
              <option value="SHIPPED">Shipped</option>
              <option value="DELIVERED">Delivered</option>
            </select>
          </div>

          {/* Reset Filters Button */}
          <button
            onClick={resetFilters}
            className="font-semibold text-gray-600 hover:text-gray-800"
          >
            <X className="inline-block mr-2" />
            Reset Filters
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className="flex items-center p-4 space-x-4 transition duration-300 border rounded-lg shadow-md hover:shadow-xl"
          >
            <div className="flex-shrink-0">
              <img
                src={order.item.imageUrl}
                alt={order.item.productName}
                className="object-cover w-24 h-24 rounded-md"
              />
            </div>
            <div className="flex-grow">
              <h3 className="text-lg font-semibold">{order.item.productName}</h3>
              <p className="text-gray-600">{order.item.artistId}</p>
              <p className="text-sm text-gray-500">Qty: {order.item.quantity}</p>
              <p className="text-sm text-gray-500">
                Order Status:{" "}
                <span
                  className={`${
                    order.status === "PENDING" ? "text-yellow-500" : "text-green-500"
                  } font-semibold`}
                >
                  {order.status}
                </span>
              </p>
            </div>
            <button
              onClick={() => handleViewDetails(order)}
              className="ml-auto text-blue-600 hover:text-blue-800"
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Modal for Product Details */}
      {selectedOrder && productDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700 bg-opacity-50">
          <div className="p-6 bg-white rounded-lg shadow-lg w-96">
            <div className="flex justify-between">
              <h3 className="text-xl font-semibold">{productDetails.name}</h3>
              <button onClick={() => setSelectedOrder(null)}>
                <X className="text-gray-600" />
              </button>
            </div>
            <img
              src={productDetails.imageUrl}
              alt={productDetails.name}
              className="object-cover w-full h-40 my-4 rounded-md"
            />
            <p className="text-gray-700">{productDetails.description}</p>
            <p className="mt-2 text-gray-600">Price: ${productDetails.price}</p>
            <p className="mt-2 text-gray-500">
              Dimensions: {productDetails.dimensions.length} x{" "}
              {productDetails.dimensions.width}{" "}
              {productDetails.dimensions.unit}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
