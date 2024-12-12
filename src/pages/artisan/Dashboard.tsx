import  { useState, useEffect } from "react";
import { DollarSign, ShoppingBag, Eye, Gavel, Plus, X } from "lucide-react";
import { apiClient } from "../../services/apiClient";
import NewArtAdd from "../homepage/NewArtAdd";
import React from 'react';

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
      <div className="flex items-center justify-center h-screen">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-600">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container px-4 py-6 mx-auto">
      {/* Dashboard Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Artisan Dashboard
          </h1>
          <p className="text-gray-600">Your artistic journey at a glance</p>
        </div>
        <button
          onClick={() => setShowAddArtwork(true)}
          className="px-4 py-2 text-white transition bg-green-600 rounded-lg hover:bg-green-700"
        >
          <Plus className="inline-block mr-2" /> Add Artwork
        </button>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid gap-4 mb-6 md:grid-cols-4">
        <div className="p-4 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between mb-2">
            <ShoppingBag className="text-blue-600" />
            <span className="text-green-600">+12.5%</span>
          </div>
          <h3 className="text-sm text-gray-500">Total Products</h3>
          <p className="text-2xl font-bold">{metrics.totalProducts}</p>
        </div>

        <div className="p-4 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="text-green-600" />
            <span className="text-green-600">+8.3%</span>
          </div>
          <h3 className="text-sm text-gray-500">Total Earnings</h3>
          <p className="text-2xl font-bold">
            LKR {metrics.totalEarnings.toLocaleString()}
          </p>
        </div>

        <div className="p-4 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between mb-2">
            <Gavel className="text-purple-600" />
            <span className="text-green-600">+15.2%</span>
          </div>
          <h3 className="text-sm text-gray-500">Total Orders</h3>
          <p className="text-2xl font-bold">{metrics.totalOrders}</p>
        </div>

        <div className="p-4 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between mb-2">
            <Eye className="text-gray-600" />
            <span className="text-green-600">+10.1%</span>
          </div>
          <h3 className="text-sm text-gray-500">Available Products</h3>
          <p className="text-2xl font-bold">{metrics.availableProducts}</p>
        </div>
      </div>

      {/* Products and Orders Section */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Products */}
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="flex items-center mb-4 text-lg font-semibold">
            <ShoppingBag className="mr-2 text-green-600" /> Recent Products
          </h2>
          {products.slice(0, 5).map((product) => (
            <div
              key={product.id}
              className="flex items-center pb-3 mb-3 border-b"
            >
              <img
                src={product.imageUrl || "/placeholder.jpg"}
                alt={product.name}
                className="object-cover w-16 h-16 mr-4 rounded"
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
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="flex items-center mb-4 text-lg font-semibold">
            <Gavel className="mr-2 text-green-600" /> Recent Orders
          </h2>
          {orders.slice(0, 5).map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between pb-3 mb-3 border-b"
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 bg-white rounded-lg">
            <div className="flex items-center justify-between mb-4">
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
