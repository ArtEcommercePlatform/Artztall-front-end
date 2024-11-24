import React from "react";
import {
  Users,
  ShoppingBag,
  Bell,
  AlertCircle,
  Clock,
  DollarSign,
  Eye,
  Gavel,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

interface AdminStats {
  totalArtworks: number;
  activeUsers: number;
  ongoingAuctions: number;
  completedOrders: number;
  totalRevenue: number;
  analyticsGrowth: {
    artworks: number;
    users: number;
    auctions: number;
    orders: number;
    revenue: number;
  };
}

interface ActivityLog {
  id: number;
  action: string;
  user: string;
  timestamp: string;
  type: 'upload' | 'purchase' | 'signup' | 'auction';
  status: 'pending' | 'completed' | 'processing';
}

interface Notification {
  id: number;
  title: string;
  message: string;
  type: 'approval' | 'stock' | 'inquiry';
  timestamp: string;
  isRead: boolean;
}

const AdminDashboard: React.FC = () => {
  // Mock data
  const adminStats: AdminStats = {
    totalArtworks: 1250,
    activeUsers: 456,
    ongoingAuctions: 35,
    completedOrders: 892,
    totalRevenue: 158750.50,
    analyticsGrowth: {
      artworks: 15.2,
      users: 8.7,
      auctions: 12.4,
      orders: 9.6,
      revenue: 18.3,
    },
  };

  const recentActivity: ActivityLog[] = [
    {
      id: 1,
      action: "New Artwork Upload",
      user: "Sarah Chen",
      timestamp: "10 minutes ago",
      type: "upload",
      status: "pending"
    },
    {
      id: 2,
      action: "Auction Completed",
      user: "Mike Johnson",
      timestamp: "25 minutes ago",
      type: "auction",
      status: "completed"
    },
    {
      id: 3,
      action: "New User Registration",
      user: "Emma Wilson",
      timestamp: "1 hour ago",
      type: "signup",
      status: "completed"
    },
    {
      id: 4,
      action: "Purchase Confirmed",
      user: "David Lee",
      timestamp: "2 hours ago",
      type: "purchase",
      status: "processing"
    }
  ];

  const notifications: Notification[] = [
    {
      id: 1,
      title: "Artwork Approval Required",
      message: "5 new artworks pending review",
      type: "approval",
      timestamp: "5 minutes ago",
      isRead: false
    },
    {
      id: 2,
      title: "Low Stock Alert",
      message: "3 artworks nearly sold out",
      type: "stock",
      timestamp: "30 minutes ago",
      isRead: false
    },
    {
      id: 3,
      title: "Customer Inquiry",
      message: "New message from premium customer",
      type: "inquiry",
      timestamp: "1 hour ago",
      isRead: true
    }
  ];

  const renderGrowthIndicator = (percentage: number) => {
    return percentage > 0 ? (
      <span className="text-green-600 flex items-center ml-2 font-medium">
        <ChevronUp className="w-4 h-4 animate-bounce" />
        {percentage}%
      </span>
    ) : (
      <span className="text-red-600 flex items-center ml-2 font-medium">
        <ChevronDown className="w-4 h-4 animate-bounce" />
        {Math.abs(percentage)}%
      </span>
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 ring-1 ring-yellow-200';
      case 'completed':
        return 'bg-green-100 text-green-800 ring-1 ring-green-200';
      case 'processing':
        return 'bg-blue-100 text-blue-800 ring-1 ring-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 ring-1 ring-gray-200';
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 flex-grow overflow-y-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-green-900 tracking-tight">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 text-sm mt-2">
              Welcome back! Here's your latest overview
            </p>
          </div>
          <div className="flex space-x-4">
            {/* Filter button removed */}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-8">
          {[
            {
              icon: <ShoppingBag className="text-green-600" />,
              title: "Total Artworks",
              value: adminStats.totalArtworks,
              growth: adminStats.analyticsGrowth.artworks,
              bgColor: "bg-green-50"
            },
            {
              icon: <Users className="text-blue-600" />,
              title: "Active Users",
              value: adminStats.activeUsers,
              growth: adminStats.analyticsGrowth.users,
              bgColor: "bg-blue-50"
            },
            {
              icon: <Gavel className="text-purple-600" />,
              title: "Ongoing Auctions",
              value: adminStats.ongoingAuctions,
              growth: adminStats.analyticsGrowth.auctions,
              bgColor: "bg-purple-50"
            },
            {
              icon: <ShoppingBag className="text-yellow-600" />,
              title: "Completed Orders",
              value: adminStats.completedOrders,
              growth: adminStats.analyticsGrowth.orders,
              bgColor: "bg-yellow-50"
            },
            {
              icon: <DollarSign className="text-green-600" />,
              title: "Total Revenue",
              value: `Rs ${adminStats.totalRevenue.toLocaleString()}`,
              growth: adminStats.analyticsGrowth.revenue,
              bgColor: "bg-green-50"
            }
          ].map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 space-y-2 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex justify-between items-center">
                <div className={`${card.bgColor} p-3 rounded-lg shadow-sm`}>
                  {card.icon}
                </div>
                {renderGrowthIndicator(card.growth)}
              </div>
              <div>
                <h3 className="text-sm text-gray-500 font-medium mb-1">{card.title}</h3>
                <p className="text-2xl font-bold text-gray-800">{card.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Activity Log and Notifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Activity Log */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <Clock className="mr-3 text-green-600 w-6 h-6" /> Recent Activity
            </h2>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} 
                     className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-all duration-300 border border-gray-100 hover:border-green-200">
                  <div className="flex items-center space-x-4">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                      {activity.status}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{activity.action}</p>
                      <p className="text-xs text-gray-500 mt-1">by {activity.user} • {activity.timestamp}</p>
                    </div>
                  </div>
                  <Eye className="w-4 h-4 text-gray-400 hover:text-green-600 cursor-pointer" />
                </div>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <Bell className="mr-3 text-green-600 w-6 h-6" /> Notifications
            </h2>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div key={notification.id} 
                     className={`p-4 rounded-lg transition-all duration-300 hover:shadow-md
                       ${notification.isRead ? 'bg-white border border-gray-100' : 'bg-green-50 border border-green-200'}`}>
                  <div className="flex items-start">
                    <AlertCircle className={`w-5 h-5 mr-4 ${notification.isRead ? 'text-gray-400' : 'text-green-600'}`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">{notification.title}</p>
                      <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                      <p className="text-xs text-gray-400 mt-2">{notification.timestamp}</p>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${notification.isRead ? 'bg-gray-200' : 'bg-green-500'}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;