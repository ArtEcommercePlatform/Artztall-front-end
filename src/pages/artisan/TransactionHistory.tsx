import React, { useState, useEffect } from "react";
import {
  CreditCard,
  Clock,
  CheckCircle,
  AlertCircle,
  DollarSign,
} from "lucide-react";
import { apiClient } from "../../services/apiClient";

interface Transaction {
  id: string;
  orderId: string;
  userId: string;
  amount: number;
  currency: string;
  stripPaymentIntendId: string;
  paymentStatus: "PENDING" | "COMPLETED" | "FAILED";
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
}

const TransactionHistory: React.FC<any> = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const artisanId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get<Transaction[]>(
          `/payments/artisan/${artisanId}`,
        );

        if (response.success && response.data) {
          setTransactions(response.data);
          setError(null);
        }
      } catch (err: any) {
        setError(err.message || "Failed to fetch transactions");
        setTransactions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [artisanId]);

  // Helper function to get status icon and color
  const getStatusIcon = (status: Transaction["paymentStatus"]) => {
    switch (status) {
      case "PENDING":
        return {
          icon: <Clock className="text-yellow-500" />,
          color: "bg-yellow-100",
        };
      case "COMPLETED":
        return {
          icon: <CheckCircle className="text-green-500" />,
          color: "bg-green-100",
        };
      default:
        return {
          icon: <AlertCircle className="text-red-500" />,
          color: "bg-red-100",
        };
    }
  };

  // Helper function to format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <AlertCircle className="inline-block mr-2" />
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <CreditCard className="mr-2" /> Transaction History
        </h2>
      </div>

      {transactions.length === 0 ? (
        <div className="text-center py-6 text-gray-500">
          No transactions found
        </div>
      ) : (
        <div className="divide-y divide-gray-200">
          {transactions.map((transaction) => {
            const { icon, color } = getStatusIcon(transaction.paymentStatus);
            return (
              <div
                key={transaction.id}
                className="px-6 py-4 hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-full ${color}`}>{icon}</div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Order ID: {transaction.orderId}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatDate(transaction.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="text-green-600" />
                    <span className="text-lg font-semibold text-gray-900">
                      {transaction.amount.toLocaleString()}{" "}
                      {transaction.currency}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
