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
      <div className="overflow-hidden bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Order Details
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Customer
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Amount
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Status
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
                        className="object-cover w-10 h-10 rounded-md"
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PendingOrders;
