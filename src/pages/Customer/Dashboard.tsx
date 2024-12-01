import { useState } from "react";
import {
  Package,
  MessageSquare,
  Heart,
  Clock,
  Mail,
  Phone,
} from "lucide-react";

const CustomerDashboard = () => {
  const [activeTab, setActiveTab] = useState("all");

  // Mock data
  const recentItems = [
    { id: 1, name: "Abstract Art Print", price: "$299", image: "" },
    { id: 2, name: "Nature Photography", price: "$199", image: "image2" },
    { id: 3, name: "Modern Sculpture", price: "$599", image: "image3" },
  ];

  const orders = [
    {
      id: 1,
      product: "Canvas Print",
      status: "Delivered",
      date: "2024-03-15",
      total: "$299",
    },
    {
      id: 2,
      product: "Wall Art",
      status: "Pending",
      date: "2024-03-18",
      total: "$199",
    },
    {
      id: 3,
      product: "Digital Print",
      status: "Cancelled",
      date: "2024-03-10",
      total: "$99",
    },
  ];

  const wishlistItems = [
    { id: 1, name: "Abstract Painting", price: "$399", image: "image1" },
    { id: 2, name: "Landscape Photo", price: "$249", image: "image5" },
  ];

  return (
    <div className="flex bg-gray-50">
      <div className="flex-1 ">
        <div className="p-6 space-y-6">
          {/* Welcome Section */}
          <div className="p-6 text-white rounded-lg bg-gradient-to-r from-green-600 to-green-700">
            <h1 className="mb-2 text-3xl font-bold">Welcome back, {localStorage.getItem('userName')}!</h1>
            <p>Here's what's happening with your account today.</p>
          </div>

          {/* Recently Viewed Items */}
          <div className="p-6 bg-white border rounded-lg shadow-sm">
            <h2 className="flex items-center mb-4 text-xl font-semibold">
              <Clock size={20} className="mr-2" /> Recently Viewed Items
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {recentItems.map((item) => (
                <div
                  key={item.id}
                  className="p-4 transition-shadow border rounded-lg hover:shadow-md"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="object-cover w-full h-40 mb-3 rounded-md"
                  />
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-green-600">{item.price}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="p-6 bg-white border rounded-lg shadow-sm">
            <h2 className="flex items-center mb-4 text-xl font-semibold">
              <Package size={20} className="mr-2" /> Order Summary
            </h2>
            <div className="mb-4 space-x-2">
              {["all", "pending", "delivered", "cancelled"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-full capitalize ${
                    activeTab === tab
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="space-y-3">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <h3 className="font-medium">{order.product}</h3>
                    <p className="text-sm text-gray-500">{order.date}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="font-medium">{order.total}</span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-800"
                          : order.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Wishlist */}
          <div className="p-6 bg-white border rounded-lg shadow-sm">
            <h2 className="flex items-center mb-4 text-xl font-semibold">
              <Heart size={20} className="mr-2" /> Wishlist
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {wishlistItems.map((item) => (
                <div
                  key={item.id}
                  className="flex p-4 transition-shadow border rounded-lg hover:shadow-md"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="object-cover w-24 h-24 rounded-md"
                  />
                  <div className="flex-1 ml-4">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-green-600">{item.price}</p>
                    <button className="px-4 py-2 mt-2 text-white bg-green-600 rounded-lg hover:bg-green-700">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 bg-white border rounded-lg shadow-sm">
            <h2 className="flex items-center mb-4 text-xl font-semibold">
              <MessageSquare size={20} className="mr-2" /> Customer Support
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h3 className="font-medium">Contact Us</h3>
                <div className="flex items-center space-x-2">
                  <Mail size={16} className="text-green-600" />
                  <span>support@example.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone size={16} className="text-green-600" />
                  <span>1-800-123-4567</span>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-medium">Submit a Ticket</h3>
                <div>
                  <input
                    type="text"
                    placeholder="Subject"
                    className="w-full p-2 mb-2 border rounded-lg"
                  />
                  <textarea
                    placeholder="Describe your issue..."
                    className="w-full p-2 border rounded-lg"
                  ></textarea>
                  <button className="px-4 py-2 mt-2 text-white bg-green-600 rounded-lg hover:bg-green-700">
                    Submit Ticket
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
