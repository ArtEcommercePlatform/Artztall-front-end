import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MapPin, CreditCard } from "lucide-react";
import { apiClient } from "../../services/apiClient";

const MakeOrder: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  const [orderDetails, setOrderDetails] = useState({
    userId: localStorage.getItem("userId"),
    shippingAddress: "",
    specialInstructions: "",
    paymentMethod: "credit",
  });

  const [paymentInitiated, setPaymentInitiated] = useState(false);
  const [paymentData, setPaymentData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setOrderDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setOrderDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async () => {
    // Validate shipping address
    if (!orderDetails.shippingAddress.trim()) {
      setError("Please provide a shipping address");
      return;
    }

    try {
      // Reset any previous errors
      setError(null);

      const orderPayload = {
        userId: orderDetails.userId,
        items: [
          {
            productId: product.id,
            quantity: 1, // Always 1 as per requirement
          },
        ],
        shippingAddress: orderDetails.shippingAddress,
        specialInstructions: orderDetails.specialInstructions || "",
      };

      const response = await apiClient.post<any>("/orders", orderPayload);

      if (response.success) {
        const orderId = response.data.id;
        console.log(orderId);

        // Initiate payment
        const paymentPayload = {
          orderId: orderId,
          userId: orderDetails.userId,
          currency: "LKR",
          paymentMethodId:
            orderDetails.paymentMethod === "credit"
              ? "pm_card_visa"
              : orderDetails.paymentMethod === "debit"
                ? "pm_card_debit"
                : "pm_paypal",
        };

        const paymentResponse = await apiClient.post<any>(
          "/payments",
          paymentPayload,
        );

        if (paymentResponse.success) {
          setPaymentData({
            ...paymentResponse.data,
            orderId: orderId,
          });
          setPaymentInitiated(true);
        }
      }
    } catch (error) {
      console.error("Order placement error", error);
      setError("Failed to place order. Please try again.");
    }
  };

  // If no product is selected
  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 text-xl">
        No product selected
      </div>
    );
  }

  // If payment is initiated, redirect to payment component
  if (paymentInitiated && paymentData) {
    navigate("/customer/payment", {
      state: {
        product,
        paymentData,
        orderDetails,
      },
    });

    return (
      <div className="flex items-center justify-center min-h-screen bg-green-100">
        <div className="bg-white p-8 rounded-xl shadow-2xl text-center">
          <p>Redirecting to Payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 
                    flex items-center justify-center p-6"
    >
      <div
        className="bg-white rounded-3xl shadow-2xl overflow-hidden 
                      grid md:grid-cols-2 gap-8 max-w-5xl w-full"
      >
        {/* Product Details Column */}
        <div className="p-8 bg-gray-50">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-80 object-cover rounded-2xl shadow-lg mb-6"
          />
          <div className="space-y-4">
            <div>
              <h2 className="text-3xl font-bold text-green-900 mb-2">
                {product.name}
              </h2>
              <p className="text-gray-600 text-lg">{product.category}</p>
            </div>

            <div className="space-y-2 text-gray-700">
              <p>
                <strong className="text-green-800">Price:</strong>
                <span className="ml-2 text-xl font-semibold">
                  LKR {product.price.toLocaleString()}
                </span>
              </p>
              <p>
                <strong className="text-green-800">Medium:</strong>{" "}
                {product.medium}
              </p>
              <p>
                <strong className="text-green-800">Dimensions:</strong>
                {product.dimensions.length}" x {product.dimensions.width}"{" "}
                {product.dimensions.unit}
              </p>
            </div>
          </div>
        </div>

        {/* Order Form Column */}
        <div className="p-8 space-y-6">
          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              {error}
            </div>
          )}

          <div>
            <h3 className="text-2xl font-semibold mb-4 flex items-center text-green-900">
              <MapPin className="mr-3 text-green-700" /> Shipping Details
            </h3>

            <div className="space-y-4">
              <input
                type="text"
                name="shippingAddress"
                value={orderDetails.shippingAddress}
                onChange={handleInputChange}
                placeholder="Shipping Address"
                className="w-full border-2 border-green-200 rounded-xl 
                           px-4 py-3 focus:outline-none focus:ring-2 
                           focus:ring-green-500 transition"
                required
              />

              <textarea
                name="specialInstructions"
                value={orderDetails.specialInstructions}
                onChange={handleInputChange}
                placeholder="Special Instructions (Optional)"
                className="w-full border-2 border-green-200 rounded-xl 
                           px-4 py-3 h-24 focus:outline-none focus:ring-2 
                           focus:ring-green-500 transition"
              />

              <div>
                <h3 className="text-2xl font-semibold mb-4 flex items-center text-green-900">
                  <CreditCard className="mr-3 text-green-700" /> Payment
                </h3>
                <select
                  name="paymentMethod"
                  value={orderDetails.paymentMethod}
                  onChange={handleSelectChange}
                  className="w-full border-2 border-green-200 rounded-xl 
                             px-4 py-3 focus:outline-none focus:ring-2 
                             focus:ring-green-500 transition"
                >
                  <option value="credit">Credit Card</option>
                  <option value="debit">Debit Card</option>
                  <option value="paypal">PayPal</option>
                </select>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="w-full bg-green-800 text-white py-4 rounded-xl 
                           hover:bg-green-700 transition duration-300 
                           transform hover:scale-105 focus:outline-none 
                           focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakeOrder;
