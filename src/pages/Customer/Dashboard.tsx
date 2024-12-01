
import { useState, useEffect } from "react";
import {
  Package,
  Heart,
  Mail,
  Phone,
  ShoppingCart,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../../services/apiClient";

interface WishlistItem {
  productId: string;
  addedOn: string;
  note?: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  available: boolean;
}

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
  items: OrderItem[];
  totalAmount: number;
  status: string;
  paymentStatus: string;
  shippingAddress: string;
  specialInstructions: string;
  createdAt: string;
  updatedAt: string;
}

// Order status color mapping
const ORDER_STATUS_COLORS = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  shipped: "bg-green-100 text-green-800",
  delivered: "bg-green-200 text-green-900",
  cancelled: "bg-red-100 text-red-800",
  expired: "bg-yellow-100 text-yellow-800",
};

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [wishlistItems, setWishlistItems] = useState<
    (WishlistItem & Product)[]
  >([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const userId = localStorage.getItem("userId");

        // Fetch Wishlist
        const wishlistResponse = await apiClient.get<WishlistItem[]>(
          `/users/${userId}/wishlist`,
        );
        const wishlistWithProducts = await Promise.all(
          wishlistResponse.data.map(async (item) => {
            const productResponse = await apiClient.get<Product>(
              `/products/${item.productId}`,
            );
            return { ...item, ...productResponse.data };
          }),
        );
        setWishlistItems(wishlistWithProducts);

        // Fetch Orders
        const ordersResponse = await apiClient.get<Order[]>(
          `/orders/user/${userId}`,
        );
        setOrders(ordersResponse.data);

        setLoading(false);
      } catch (err: any) {
        setError(err.message || "Failed to fetch dashboard data");
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleAddToCart = async (product: Product) => {
    try {
      await apiClient.post("/cart", {
        userId: localStorage.getItem("userId"),
        productId: product.id,
        quantity: 1,
      });
    } catch (err: any) {
      setError(err.message || "Failed to add item to cart");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        {error}
      </div>
    );
  }

  return (
    <div className="flex bg-gray-50">
      <div className="flex-1">

        <div className="p-6 space-y-6">
          {/* Welcome Section */}
          <div className="p-6 text-white rounded-lg bg-gradient-to-r from-green-600 to-green-700">
            <h1 className="mb-2 text-3xl font-bold">
              Welcome back, {localStorage.getItem("userName")}!
            </h1>
            <p>Here's what's happening with your account today.</p>
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

              {orders
                .filter(
                  (order) =>
                    activeTab === "all" ||
                    order.status.toLowerCase() === activeTab,
                )
                .slice(0, 3)
                .map((order) => (
                  <div
                    key={order.id}
                    className="p-4 border rounded-lg flex justify-between items-center"
                  >
                    <div>
                      <h3 className="font-medium">Order #{order.id}</h3>
                      <p className="text-gray-500">
                        Total: LKR {order.totalAmount.toFixed(2)}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium capitalize 
                        ${ORDER_STATUS_COLORS[order.status.toLowerCase() as keyof typeof ORDER_STATUS_COLORS] || "bg-gray-100 text-gray-800"}`}

                    >
                      {order.status}
                    </span>
                  </div>
                ))}
              {orders.length > 3 && (
                <div className="text-center mt-4">
                  <button
                    onClick={() => navigate("/orders")}
                    className="flex items-center justify-center w-full bg-green-100 text-green-600 hover:bg-green-200 py-2 rounded-lg"
                  >
                    View All Orders <ChevronRight className="ml-2" size={20} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Wishlist */}
          <div className="p-6 bg-white border rounded-lg shadow-sm">
            <h2 className="flex items-center mb-4 text-xl font-semibold">
              <Heart size={20} className="mr-2" /> Wishlist
            </h2>

            {wishlistItems.length === 0 ? (
              <div className="text-center text-gray-500">
                Your wishlist is empty
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {wishlistItems.slice(0, 3).map((item) => (
                    <div
                      key={item.productId}
                      className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2">
                          {item.name}
                        </h3>
                        <p className="text-gray-600 mb-2">
                          ${item.price.toFixed(2)}
                        </p>
                        <div className="flex justify-center items-center mt-4">
                          <button
                            onClick={() => handleAddToCart(item)}
                            className="flex items-center bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 transition-colors w-full justify-center"
                            disabled={!item.available}
                          >
                            <ShoppingCart className="mr-2" size={20} />
                            {item.available ? "Add to Cart" : "Unavailable"}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {wishlistItems.length > 3 && (
                  <div className="text-center mt-4">
                    <button
                      onClick={() => navigate("/wishlist")}
                      className="flex items-center justify-center w-full bg-green-100 text-green-600 hover:bg-green-200 py-2 rounded-lg"
                    >
                      View All Wishlist Items{" "}
                      <ChevronRight className="ml-2" size={20} />

                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Customer Support */}
          <div className="p-6 bg-white border rounded-lg shadow-sm">
            <h2 className="flex items-center mb-4 text-xl font-semibold">
              <Mail size={20} className="mr-2" /> Customer Support
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

                  <button
                    onClick={() => navigate("/support/ticket")}
                    className="px-4 py-2 mt-2 text-white bg-green-600 rounded-lg hover:bg-green-700 w-full"
                  >

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
