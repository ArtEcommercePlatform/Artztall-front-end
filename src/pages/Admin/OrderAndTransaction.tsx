import React, { useState } from 'react';
import {
  Package,
  CreditCard,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  ChevronDown,
  X,
  Calendar
} from 'lucide-react';

const Modal = ({ isOpen, onClose, children }: { 
  isOpen: boolean; 
  onClose: () => void; 
  children: React.ReactNode;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-xl max-w-2xl w-full p-6 shadow-xl transform transition-all">
          {children}
        </div>
      </div>
    </div>
  );
};

interface Order {
  id: string;
  customerName: string;
  artworkTitle: string;
  amount: number;
  status: 'pending' | 'shipped' | 'completed' | 'cancelled';
  date: string;
  image: string;
  shippingAddress: string;
  paymentMethod: string;
  artistName: string;
}

interface Transaction {
  id: string;
  type: 'payment' | 'payout';
  amount: number;
  status: 'successful' | 'pending' | 'failed';
  recipient: string;
  date: string;
}

type DateFilter = 'today' | 'week' | 'month' | 'all';

const OrderAndTransaction: React.FC = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [dateFilter, setDateFilter] = useState<DateFilter>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const orders: Order[] = [
    {
      id: "ORD-001",
      customerName: "Alice Johnson",
      artworkTitle: "Abstract Sunset",
      amount: 1250.00,
      status: "pending",
      date: "2024-03-24",
      image: "/api/placeholder/300/200",
      shippingAddress: "123 Art Street, Creative City, AC 12345",
      paymentMethod: "Credit Card",
      artistName: "Sarah Creative"
    },
    {
      id: "ORD-002",
      customerName: "Michael Smith",
      artworkTitle: "Urban Dreams",
      amount: 890.00,
      status: "shipped",
      date: "2024-03-23",
      image: "/api/placeholder/300/200",
      shippingAddress: "456 Gallery Road, Art District, AD 67890",
      paymentMethod: "PayPal",
      artistName: "David Urban"
    },
    {
      id: "ORD-003",
      customerName: "Emma Davis",
      artworkTitle: "Nature's Harmony",
      amount: 1500.00,
      status: "completed",
      date: "2024-03-22",
      image: "/api/placeholder/300/200",
      shippingAddress: "789 Canvas Lane, Paint City, PC 45678",
      paymentMethod: "Bank Transfer",
      artistName: "Nina Nature"
    }
  ];

  const transactions: Transaction[] = [
    {
      id: "TRX-001",
      type: "payment",
      amount: 1250.00,
      status: "successful",
      recipient: "Art Gallery",
      date: "2024-03-24"
    },
    {
      id: "TRX-002",
      type: "payout",
      amount: 890.00,
      status: "pending",
      recipient: "David Urban",
      date: "2024-03-23"
    },
    {
      id: "TRX-003",
      type: "payment",
      amount: 1500.00,
      status: "successful",
      recipient: "Canvas Studio",
      date: "2024-03-22"
    }
  ];

  const getOrderStatusColor = (status: Order['status']) => {
    const statusColors = {
      pending: 'bg-yellow-100 text-yellow-800 ring-1 ring-yellow-200',
      shipped: 'bg-blue-100 text-blue-800 ring-1 ring-blue-200',
      completed: 'bg-green-100 text-green-800 ring-1 ring-green-200',
      cancelled: 'bg-red-100 text-red-800 ring-1 ring-red-200'
    };
    return statusColors[status];
  };

  const getTransactionStatusColor = (status: Transaction['status']) => {
    const statusColors = {
      successful: 'bg-green-100 text-green-800 ring-1 ring-green-200',
      pending: 'bg-yellow-100 text-yellow-800 ring-1 ring-yellow-200',
      failed: 'bg-red-100 text-red-800 ring-1 ring-red-200'
    };
    return statusColors[status];
  };

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const filterTransactionsByDate = (transactions: Transaction[], filter: DateFilter) => {
    const today = new Date();
    const startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    return transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      switch (filter) {
        case 'today':
          return transactionDate.toDateString() === today.toDateString();
        case 'week':
          return transactionDate >= startOfWeek;
        case 'month':
          return transactionDate >= startOfMonth;
        default:
          return true;
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Orders Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <Package className="text-green-600 w-6 h-6 mr-3" />
              <h2 className="text-xl font-semibold">Order Management</h2>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Filter className="w-5 h-5 text-gray-500" />
              </button>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search orders..."
                  className="pl-8 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <Search className="w-4 h-4 text-gray-400 absolute left-2 top-2.5" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {orders.map((order) => (
              <div 
                key={order.id} 
                className="p-4 border border-gray-100 rounded-lg hover:border-green-200 transition-all duration-300 cursor-pointer"
                onClick={() => handleOrderClick(order)}
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="font-medium text-gray-800">{order.artworkTitle}</p>
                    <p className="text-sm text-gray-500">{order.customerName}</p>
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getOrderStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                      <span className="text-xs text-gray-400">{order.date}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <button className="mt-2 text-sm text-green-600 hover:text-green-700 font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transactions Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <CreditCard className="text-green-600 w-6 h-6 mr-3" />
              <h2 className="text-xl font-semibold">Transaction History</h2>
            </div>
            <div className="relative">
              <button 
                className="px-4 py-2 text-sm border border-gray-200 rounded-lg flex items-center space-x-2"
                onClick={() => document.getElementById('dateFilter')?.click()}
              >
                <Calendar className="w-4 h-4" />
                <span>Filter by date</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <select 
                id="dateFilter"
                className="absolute opacity-0 inset-0 cursor-pointer"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value as DateFilter)}
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            {filterTransactionsByDate(transactions, dateFilter).map((transaction) => (
              <div key={transaction.id} 
                   className="p-4 border border-gray-100 rounded-lg hover:border-green-200 transition-all duration-300">
                <div className="flex justify-between items-start">
                  <div className="flex items-start space-x-3">
                    {transaction.type === 'payment' ? (
                      <ArrowDownRight className="w-6 h-6 text-green-600" />
                    ) : (
                      <ArrowUpRight className="w-6 h-6 text-blue-600" />
                    )}
                    <div className="space-y-1">
                      <p className="font-medium text-gray-800">
                        {transaction.type === 'payment' ? 'Payment Received' : 'Artist Payout'}
                      </p>
                      <p className="text-sm text-gray-500">{transaction.recipient}</p>
                      <div className="flex items-center space-x-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTransactionStatusColor(transaction.status)}`}>
                          {transaction.status}
                        </span>
                        <span className="text-xs text-gray-400">{transaction.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Order Details Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedOrder && (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Order Details</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <img 
                  src={selectedOrder.image} 
                  alt={selectedOrder.artworkTitle} 
                  className="w-full rounded-lg shadow-md"
                />
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-lg">{selectedOrder.artworkTitle}</h3>
                  <p className="text-gray-600">by {selectedOrder.artistName}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Order ID: {selectedOrder.id}</p>
                  <p className="text-sm text-gray-600">Customer: {selectedOrder.customerName}</p>
                  <p className="text-sm text-gray-600">Date: {selectedOrder.date}</p>
                  <p className="text-sm text-gray-600">Payment Method: {selectedOrder.paymentMethod}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Shipping Address:</p>
                  <p className="text-sm text-gray-600">{selectedOrder.shippingAddress}</p>
                </div>
                <div className="pt-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getOrderStatusColor(selectedOrder.status)}`}>
                    {selectedOrder.status}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button 
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700">
                Update Status
              </button>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default OrderAndTransaction;