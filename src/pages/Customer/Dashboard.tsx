import React from "react";
import {
  Clock,
  Heart,
  ShoppingBag,
  Trophy,
  Package,
  LucideProps,
} from "lucide-react";
import { StatCard } from "../../assets/components/statCard/StatCard";

// Wrapper function for lucide-react icons
const WrappedIcon = (Icon: React.ComponentType<LucideProps>) => {
  return (props: { size?: number; className?: string }) => (
    <Icon {...props} size={props.size?.toString()} />
  );
};

export const Dashboard: React.FC = () => {
  const stats = [
    {
      title: "Active Bids",
      value: "5",
      icon: WrappedIcon(Clock),
      bgColor: "bg-purple-50",
      textColor: "text-purple-700",
    },
    {
      title: "Won Auctions",
      value: "12",
      icon: WrappedIcon(Trophy),
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
    },
    {
      title: "Total Orders",
      value: "8",
      icon: WrappedIcon(ShoppingBag),
      bgColor: "bg-green-50",
      textColor: "text-green-700",
    },
    {
      title: "Wishlist Items",
      value: "15",
      icon: WrappedIcon(Heart),
      bgColor: "bg-red-50",
      textColor: "text-red-700",
    },
  ];

  return (
    <div>
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Welcome back, John!</h1>
        <p className="text-gray-600 mt-1">Here's what's happening with your account today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Live Auctions */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-bold mb-6">Live Auctions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="border rounded-lg p-4">
              <img
                src="https://img.freepik.com/free-photo/abstract-nature-illustration-tree-backdrop-watercolor-painted-image-generated-by-ai_188544-15564.jpg?semt=ais_hybrid"
                alt={`Auction ${item}`}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="font-semibold mb-2">Masterpiece #{item}</h3>
              <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                <span>Current Bid: LKR 1,{item}00</span>
                <span>Ends in: 2h 45m</span>
              </div>
              <button className="w-full bg-[#094129] text-white py-2 rounded-lg hover:bg-[#094129]/90 transition-colors">
                Place Bid
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Featured Paintings</h2>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="border rounded-lg p-4">
                <img
                  src="https://img.freepik.com/free-photo/digital-art-style-illustration-river-nature_23-2151825737.jpg?semt=ais_hybrid"
                  alt="Painting"
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h3 className="font-semibold mb-2">Nature Scene #{item}</h3>
                <p className="text-gray-600 mb-2">By Artist Name</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold">LKR {item}99.99</span>
                  <button className="bg-[#094129] text-white px-4 py-2 rounded-lg  hover:bg-[#094129]/90 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-center p-4 border rounded-lg">
              <div className="w-12 h-12 bg-[#094129]/10 rounded-lg flex items-center justify-center mr-4">
                <Package className="text-[#094129]" />
              </div>
              <div>
                <h3 className="font-semibold">Order #{item}234 Placed</h3>
                <p className="text-sm text-gray-600">2 hours ago</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
