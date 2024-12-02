import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { CheckCircle } from "lucide-react";
import { apiClient } from "../../services/apiClient";

// Replace with your actual Stripe publishable key
const stripePromise = loadStripe(
  "pk_test_51QJef7RwP0CS6vlpJKa4aIbmfRJdUMqt8K4Lm1dBEM63cbBBvBgHLbpblPVZND1G7iNtTVhNEqCqk1YcFVgWFlqL0084kYVZX8",
);

const PaymentForm: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const { product, paymentData } = location.state || {};
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    try {
      const cardElement = elements.getElement(CardElement);

      if (!cardElement) {
        throw new Error("Card details not found");
      }

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        paymentData.clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: localStorage.getItem("userName"),
            },
          },
        },
      );

      if (error) {
        setError(error.message || "Payment failed");
        setProcessing(false);
        return;
      }

      // Confirm payment on backend
      const confirmResponse = await apiClient.post(
        `/payments/confirm/${paymentIntent?.id}`,
        {
          paymentIntentId: paymentIntent?.id,
        },
      );

      if (confirmResponse.success) {
        setPaymentSuccess(true);
        setProcessing(false);
      }
    } catch (err) {
      setError("An unexpected error occurred");
      setProcessing(false);
    }
  };

  const handleKeepExploring = () => {
    navigate("/customer/gallery");
  };

  if (!product || !paymentData) {
    return <div>No payment details available</div>;
  }

  // Success Popup Component
  const SuccessPopup = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
        <CheckCircle
          className="mx-auto mb-6 text-green-500"
          size={80}
          strokeWidth={1.5}
        />
        <h2 className="text-3xl font-bold text-green-900 mb-4">
          Payment Successful!
        </h2>
        <p className="text-gray-700 mb-6">
          Thank you for your purchase. Your transaction has been completed
          successfully.
        </p>
        <button
          onClick={handleKeepExploring}
          className="w-full bg-green-800 text-white py-4 rounded-xl 
                     hover:bg-green-700 transition duration-300 
                     transform hover:scale-105 focus:outline-none 
                     focus:ring-2 focus:ring-green-500"
        >
          Keep Exploring
        </button>
      </div>
    </div>
  );

  // Render payment form or success popup
  if (paymentSuccess) {
    return <SuccessPopup />;
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 
                    flex items-center justify-center p-6"
    >
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full">
        <h2 className="text-3xl font-bold text-green-900 mb-6 text-center">
          Complete Payment
        </h2>

        <div className="mb-6 bg-gray-100 rounded-xl p-4">
          <h3 className="text-xl font-semibold text-green-800 mb-2">
            {product.name}
          </h3>
          <p className="text-gray-700">
            Total Amount: LKR {product.price.toLocaleString()}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />

          {error && <div className="text-red-600 text-sm mb-4">{error}</div>}

          <button
            type="submit"
            disabled={!stripe || processing}
            className="w-full bg-green-800 text-white py-4 rounded-xl 
                       hover:bg-green-700 transition duration-300 
                       transform hover:scale-105 focus:outline-none 
                       focus:ring-2 focus:ring-green-500 
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {processing ? "Processing..." : "Pay Now"}
          </button>
        </form>
      </div>
    </div>
  );
};

const Payment: React.FC = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};

export default Payment;
