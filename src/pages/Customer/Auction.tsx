import React, { useState, useEffect } from "react";
import { Timer, Clock, X } from "lucide-react";

// Type Definitions
interface Auction {
  id: string;
  title: string;
  description: string;
  paintingUrl: string;
  startingPrice: number;
  currentPrice: number;
  startTime: string;
  endTime: string;
  bidsCount: number;
}

import { apiClient } from "../../services/apiClient";

const AuctionPage: React.FC = () => {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAuction, setSelectedAuction] = useState<Auction | null>(null);
  const [timeLeft, setTimeLeft] = useState<Record<string, string>>({});
  const [bidModal, setBidModal] = useState(false);
  const [imageModal, setImageModal] = useState(false);

  useEffect(() => {
    const fetchAuctions = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get<Auction[]>("/auctions/active");
        if (response.success) {
          setAuctions(response.data);
          setLoading(false);
        }
      } catch (error) {
        const errorMessage =
          (error as Error).message || "Unknown error occurred";
        console.error(errorMessage);
        setLoading(false);
        return { success: false, data: null, error: errorMessage };
      }
    };

    fetchAuctions();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft: Record<string, string> = {};
      auctions.forEach((auction) => {
        const end = new Date(auction.endTime);
        const now = new Date();
        const difference = end.getTime() - now.getTime();

        if (difference > 0) {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          );
          const minutes = Math.floor(
            (difference % (1000 * 60 * 60)) / (1000 * 60),
          );
          newTimeLeft[auction.id] = `${days}d ${hours}h ${minutes}m`;
        } else {
          newTimeLeft[auction.id] = "Ended";
        }
      });
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, [auctions]);

  const handlePlaceBid = (auction: Auction) => {
    setSelectedAuction(auction);
    setBidModal(true);
  };

  const submitBid = async (amount: number) => {
    if (!selectedAuction) return;

    try {
      const response = await apiClient.post("/auctions/bid", {
        auctionId: selectedAuction.id,
        amount,
      });

      if (response.success) {
        setBidModal(false);
        // Refresh auctions to update the latest bid
        const updatedAuctions = auctions.map((auction) =>
          auction.id === selectedAuction.id
            ? { ...auction, currentPrice: amount }
            : auction,
        );
        setAuctions(updatedAuctions);
      } else {
        console.error("Failed to place bid");
      }
    } catch (error) {
      const errorMessage = (error as Error).message || "Unknown error occurred";
      console.error(errorMessage);
      return { success: false, data: null, error: errorMessage };
    }
  };

  const renderBidModal = () =>
    selectedAuction && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-96 relative">
          <button
            onClick={() => setBidModal(false)}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          >
            <X size={24} />
          </button>
          <h2 className="text-2xl font-bold mb-4 text-green-900">
            Place a Bid
          </h2>
          <p className="mb-4 text-gray-700">
            Current Price:{" "}
            <span className="font-bold">
              LKR {selectedAuction.currentPrice}
            </span>
          </p>
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[1000, 5000, 10000].map((amount) => (
              <button
                key={amount}
                onClick={() => submitBid(selectedAuction.currentPrice + amount)}
                className="bg-green-100 text-green-900 py-2 rounded-md hover:bg-green-200 transition"
              >
                +{amount}
              </button>
            ))}
          </div>
        </div>
      </div>
    );

  const renderImageModal = (auction: Auction) => (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="relative max-w-4xl max-h-[90vh]">
        <button
          onClick={() => setImageModal(false)}
          className="absolute -top-10 right-0 text-white hover:text-gray-300"
        >
          <X size={32} />
        </button>
        <img
          src={auction.paintingUrl}
          alt={auction.title}
          className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
        />
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin text-green-900">
          <Clock size={48} />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {auctions.map((auction) => (
          <div
            key={auction.id}
            className="bg-white border border-green-100 rounded-lg shadow-md overflow-hidden transform transition hover:scale-105"
          >
            <div className="relative">
              <img
                src={auction.paintingUrl}
                alt={auction.title}
                className="w-full h-64 object-cover"
                onClick={() => {
                  setSelectedAuction(auction);
                  setImageModal(true);
                }}
              />
              <div className="absolute top-4 right-4 bg-white/80 px-3 py-1 rounded-full flex items-center">
                <Timer size={16} className="mr-2 text-green-900" />
                <span className="text-green-900 font-semibold">
                  {timeLeft[auction.id] || "Loading..."}
                </span>
              </div>
            </div>
            <div className="p-4">
              <h2 className="font-bold text-lg">{auction.title}</h2>
              <p className="text-gray-600">
                Current Bid: LKR {auction.currentPrice}
              </p>
              <button
                onClick={() => handlePlaceBid(auction)}
                className="bg-green-500 text-white py-2 px-4 rounded-lg mt-2 hover:bg-green-600"
              >
                Place a Bid
              </button>
            </div>
          </div>
        ))}
      </div>
      {bidModal && renderBidModal()}
      {imageModal && selectedAuction && renderImageModal(selectedAuction)}
    </div>
  );
};

export default AuctionPage;
