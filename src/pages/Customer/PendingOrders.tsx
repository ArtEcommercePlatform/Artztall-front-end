import React, { useState } from "react";
import {
  Search,
  Clock,
  Package,
  Truck,
  CheckCircle,
  AlertCircle,
  XCircle,
  MoreVertical,
} from "lucide-react";

interface Order {
  id: string;
  customerName: string;
  orderDate: string;
  amount: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
    image: string;
  }>;
  shippingAddress: string;
  paymentMethod: string;
  trackingNumber?: string;
}

// Rest of the dummy data remains the same...
const dummyOrders: Order[] = [
  {
    id: "ORD-001",
    customerName: "Alice Johnson",
    orderDate: "2024-11-22",
    amount: 1250.0,
    status: "pending",
    items: [
      {
        id: "ITEM-1",
        name: "Abstract Harmony",
        quantity: 1,
        price: 1250.0,
        image:
          "https://img.freepik.com/free-vector/decorative-background-with-abstract-floral-design_1048-2569.jpg?semt=ais_hybrid",
      },
    ],
    shippingAddress: "123 Art Street, Creative City, AC 12345",
    paymentMethod: "Credit Card",
  },
  {
    id: "ORD-002",
    customerName: "Bob Smith",
    orderDate: "2024-11-22",
    amount: 2700.0,
    status: "processing",
    items: [
      {
        id: "ITEM-2",
        name: "Urban Landscape",
        quantity: 2,
        price: 1350.0,
        image:
          "https://img.freepik.com/free-photo/city-architecture-landscape-digital-art_23-2151065642.jpg?semt=ais_hybrid",
      },
    ],
    shippingAddress: "456 Gallery Road, Art Town, AT 67890",
    paymentMethod: "PayPal",
  },
  {
    id: "ORD-003",
    customerName: "Carol White",
    orderDate: "2024-11-21",
    amount: 980.0,
    status: "shipped",
    items: [
      {
        id: "ITEM-3",
        name: "Modern Expressions",
        quantity: 1,
        price: 980.0,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRURW_sSk7CTijfY9etkC_fYpMa5jSCgkQog&s",
      },
    ],
    shippingAddress: "789 Canvas Lane, Paint City, PC 13579",
    paymentMethod: "Credit Card",
    trackingNumber: "TRK123456789",
  },
];

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const statusIcons = {
  pending: Clock,
  processing: Package,
  shipped: Truck,
  delivered: CheckCircle,
  cancelled: XCircle,
};

const PendingOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(dummyOrders);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleStatusUpdate = (orderId: string, newStatus: Order["status"]) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order,
      ),
    );
  };

  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      filterStatus === "all" || order.status === filterStatus;
    const matchesSearch =
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusIcon = (status: Order["status"]) => {
    const Icon = statusIcons[status];
    return <Icon size={16} className="mr-1" />;
  };

  return (
    <div className="bg-white rounded-md p-4 ">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Orders Management</h1>
        <p className="text-gray-600 mt-2">
          Manage and track all your orders in one place
        </p>
      </div>

      {/* Filters and Search */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex gap-4">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search orders..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#094129]/20"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#094129]/20"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img
                        src={order.items[0].image}
                        alt={order.items[0].name}
                        className="h-10 w-10 rounded-md object-cover"
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {order.id}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(order.orderDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {order.customerName}
                    </div>
                    <div className="text-sm text-gray-500">
                      {order.paymentMethod}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      LKR {order.amount.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[order.status]}`}
                    >
                      {getStatusIcon(order.status)}
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <select
                        className="text-sm border border-gray-200 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#094129]/20"
                        value={order.status}
                        onChange={(e) =>
                          handleStatusUpdate(
                            order.id,
                            e.target.value as Order["status"],
                          )
                        }
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                      <button
                        onClick={() => {
                          // Handle view details action
                          console.log("View details for order:", order.id);
                        }}
                        className="text-[#094129] hover:text-[#094129]/80"
                      >
                        <MoreVertical size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No orders found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              No orders match your current filters.
            </p>
          </div>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
        {[
          { label: "Total Orders", value: orders.length },
          {
            label: "Pending Orders",
            value: orders.filter((o) => o.status === "pending").length,
          },
          {
            label: "Processing Orders",
            value: orders.filter((o) => o.status === "processing").length,
          },
          {
            label: "Shipped Orders",
            value: orders.filter((o) => o.status === "shipped").length,
          },
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-500">
              {stat.label}
            </div>
            <div className="mt-2 text-3xl font-semibold text-gray-900">
              {stat.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingOrders;
