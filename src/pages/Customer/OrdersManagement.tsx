import React, { useState, useEffect } from "react";
import {
  Search,
  Clock,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { apiClient } from "../../services/apiClient";

// Updated interfaces to match new data structure
interface OrderItem {
  productId: string;
  productName: string;
  artistId: string;
  quantity: number;
  price: number;
  subtotal: number;
  imageUrl: string;
  dimensions: {
    length: number;
    width: number;
    unit: string;
  };
  medium: string;
  style: string;
}

interface Order {
  id: string;
  userId: string;
  item: OrderItem;
  totalAmount: number;
  status: OrderStatus;
  paymentStatus: string;
  shippingAddress: string;
  specialInstructions?: string;
  createdAt: string;
  updatedAt: string;
}

enum OrderStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
  EXPIRED = "EXPIRED",
}

// Status colors remain the same
const statusColors = {
  [OrderStatus.PENDING]: "bg-yellow-100 text-yellow-800",
  [OrderStatus.CONFIRMED]: "bg-blue-100 text-blue-800",
  [OrderStatus.PROCESSING]: "bg-blue-100 text-blue-800",
  [OrderStatus.SHIPPED]: "bg-purple-100 text-purple-800",
  [OrderStatus.DELIVERED]: "bg-green-100 text-green-800",
  [OrderStatus.CANCELLED]: "bg-red-100 text-red-800",
  [OrderStatus.EXPIRED]: "bg-gray-100 text-gray-800",
};

const statusIcons = {
  [OrderStatus.PENDING]: Clock,
  [OrderStatus.CONFIRMED]: Package,
  [OrderStatus.PROCESSING]: Package,
  [OrderStatus.SHIPPED]: Truck,
  [OrderStatus.DELIVERED]: CheckCircle,
  [OrderStatus.CANCELLED]: XCircle,
  [OrderStatus.EXPIRED]: XCircle,
};

const OrdersManagement: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [ordersPerPage] = useState<number>(5);

  // Fetch orders for the current user
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          throw new Error("User ID not found");
        }

        setIsLoading(true);
        const response = await apiClient.get<Order[]>(`/orders/user/${userId}`);

        if (response.success) {
          setOrders(response.data);
        } else {
          throw new Error(response.message || "Failed to fetch orders");
        }
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching orders");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusIcon = (status: OrderStatus) => {
    const Icon = statusIcons[status];
    return <Icon size={16} className="mr-1" />;
  };

  // Filter orders based on status and search term
  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      filterStatus === "all" || order.status === filterStatus;
    const matchesSearch = order.id
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder,
  );

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Pagination component
  const Pagination = () => {
    const pageNumbers = [];
    for (
      let i = 1;
      i <= Math.ceil(filteredOrders.length / ordersPerPage);
      i++
    ) {
      pageNumbers.push(i);
    }

    return (
      <div className="flex justify-center items-center mt-4 space-x-2">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={20} />
        </button>
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`px-4 py-2 border rounded ${
              currentPage === number
                ? "bg-[#094129] text-white"
                : "bg-white text-gray-700"
            }`}
          >
            {number}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === pageNumbers.length}
          className="p-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <p>Loading orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-800 rounded-md">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-md">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Orders Management</h1>
        <p className="mt-2 text-gray-600">
          Manage and track all your orders in one place
        </p>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col justify-between gap-4 mb-6 sm:flex-row">
        <div className="flex gap-4">
          <div className="relative">
            <Search
              className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2"
              size={20}
            />
            <input
              type="text"
              placeholder="Search orders..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#094129]/20"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page when searching
              }}
            />
          </div>
          <select
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#094129]/20"
            value={filterStatus}
            onChange={(e) => {
              setFilterStatus(e.target.value);
              setCurrentPage(1); // Reset to first page when changing filter
            }}
          >
            <option value="all">All Status</option>
            {Object.values(OrderStatus).map((status) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders Table */}
      {filteredOrders.length === 0 ? (
        <div className="text-center text-gray-500 py-8">No orders found</div>
      ) : (
        <>
          <div className="overflow-hidden bg-white rounded-lg shadow">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Order Details
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Product Details
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Total Amount
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {order.id}
                            </div>
                            <div className="text-sm text-gray-500">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <img
                            src={order.item.imageUrl || "/placeholder.jpg"}
                            alt={order.item.productName || "Order item"}
                            className="object-cover w-10 h-10 rounded-md mr-4"
                          />
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {order.item.productName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {order.item.quantity} x LKR{" "}
                              {order.item.price.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          LKR {order.totalAmount.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[order.status]}`}
                        >
                          {getStatusIcon(order.status)}
                          {order.status.charAt(0).toUpperCase() +
                            order.status.slice(1).toLowerCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination Component */}
          <Pagination />
        </>
      )}
    </div>
  );
};

export default OrdersManagement;
