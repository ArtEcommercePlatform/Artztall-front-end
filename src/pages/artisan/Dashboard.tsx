import React, { useState, useEffect } from "react";
import { DollarSign, ShoppingBag, Eye, Gavel, Plus, X } from "lucide-react";
import { apiClient } from "../../services/apiClient";
import NewArtAdd from "../homepage/NewArtAdd";

// Interfaces for API responses
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stockQuantity: number;
  category: string;
}

interface Order {
  id: string;
  totalAmount: number;
  status: string;
}

interface Payment {
  id: string;
  amount: number;
  paymentStatus: string;
  createdAt: string;
}

const ArtisanDashboard: React.FC = () => {
  // State management
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddArtwork, setShowAddArtwork] = useState(false);

  // Fetch data on component mount
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        const artistId = localStorage.getItem("userId");

        if (!artistId) {
          throw new Error("Artist ID not found in local storage");
        }

        // Parallel API calls
        const [productsResponse, ordersResponse, paymentsResponse] =
          await Promise.all([
            apiClient.get<Product[]>(`/products/artist/${artistId}`),
            apiClient.get<Order[]>(`/orders/artisan/${artistId}`),
            apiClient.get<Payment[]>(`/payments/artisan/${artistId}`),
          ]);

        setProducts(productsResponse.data);
        setOrders(ordersResponse.data);
        setPayments(paymentsResponse.data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch dashboard data");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Compute dashboard metrics
  const computeMetrics = () => {
    const totalEarnings = payments.reduce(
      (sum, payment) =>
        payment.paymentStatus === "COMPLETED" ? sum + payment.amount : sum,
      0,
    );

    const pendingEarnings = payments.reduce(
      (sum, payment) =>
        payment.paymentStatus === "PENDING" ? sum + payment.amount : sum,
      0,
    );

    return {
      totalProducts: products.length,
      availableProducts: products.filter((p) => p.stockQuantity > 0).length,
      totalEarnings,
      pendingEarnings,
      totalOrders: orders.length,
    };
  };

  const metrics = computeMetrics();

  // Render loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-600">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Dashboard Header */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Artisan Dashboard
          </h1>
          <p className="text-gray-600">Your artistic journey at a glance</p>
        </div>
        <button
          onClick={() => setShowAddArtwork(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          <Plus className="inline-block mr-2" /> Add Artwork
        </button>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-2">
            <ShoppingBag className="text-blue-600" />
            <span className="text-green-600">+12.5%</span>
          </div>
          <h3 className="text-gray-500 text-sm">Total Products</h3>
          <p className="text-2xl font-bold">{metrics.totalProducts}</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-2">
            <DollarSign className="text-green-600" />
            <span className="text-green-600">+8.3%</span>
          </div>
          <h3 className="text-gray-500 text-sm">Total Earnings</h3>
          <p className="text-2xl font-bold">
            LKR {metrics.totalEarnings.toLocaleString()}
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-2">
            <Gavel className="text-purple-600" />
            <span className="text-green-600">+15.2%</span>
          </div>
          <h3 className="text-gray-500 text-sm">Total Orders</h3>
          <p className="text-2xl font-bold">{metrics.totalOrders}</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-2">
            <Eye className="text-gray-600" />
            <span className="text-green-600">+10.1%</span>
          </div>
          <h3 className="text-gray-500 text-sm">Available Products</h3>
          <p className="text-2xl font-bold">{metrics.availableProducts}</p>
        </div>
      </div>

      {/* Products and Orders Section */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Products */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <ShoppingBag className="mr-2 text-green-600" /> Recent Products
          </h2>
          {products.slice(0, 5).map((product) => (
            <div
              key={product.id}
              className="flex items-center mb-3 pb-3 border-b"
            >
              <img
                src={product.imageUrl || "/placeholder.jpg"}
                alt={product.name}
                className="w-16 h-16 object-cover rounded mr-4"
              />
              <div className="flex-grow">
                <h3 className="font-medium">{product.name}</h3>
                <p className="text-sm text-gray-500">
                  LKR {product.price.toLocaleString()}
                </p>
              </div>
              <span className="text-sm text-gray-500">
                {product.stockQuantity} in stock
              </span>
            </div>
          ))}
        </div>

        {/* Recent Orders */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Gavel className="mr-2 text-green-600" /> Recent Orders
          </h2>
          {orders.slice(0, 5).map((order) => (
            <div
              key={order.id}
              className="flex justify-between items-center mb-3 pb-3 border-b"
            >
              <div>
                <h3 className="font-medium">Order #{order.id.slice(-6)}</h3>
                <p className="text-sm text-gray-500">{order.status}</p>
              </div>
              <span className="font-semibold">
                LKR {order.totalAmount.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Adding Artwork */}
      {showAddArtwork && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New Artwork</h2>
              <button onClick={() => setShowAddArtwork(false)}>
                <X className="text-gray-600" />
              </button>
            </div>
            <NewArtAdd />
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtisanDashboard;
