import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { apiClient } from "../../services/apiClient";
import AuctionCreationPopup from "./AuctionCreationPopup";

interface Auction {
  id: string;
  title: string;
  description: string;
  paintingUrl: string;
  startingPrice: number;
  currentPrice: number;
  startTime: string;
  endTime: string;
  auctionStatus: "PENDING" | "ACTIVE" | "COMPLETED" | "FAILED";
}

const Button = ({
  children,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        bg-green-800 hover:bg-green-900 text-white
        px-4 py-2 rounded-lg 
        flex items-center justify-center 
        gap-2 
        transition-all duration-200 
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
        ${className}
      `}
    >
      {children}
    </button>
  );
};

const getTimeRemaining = (endTime: string) => {
  const total = new Date(endTime).getTime() - new Date().getTime();
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const seconds = Math.floor((total / 1000) % 60);

  return { total, days, hours, minutes, seconds };
};

const Auctions: React.FC = () => {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [countdowns, setCountdowns] = useState<Record<string, string>>({});

  const fetchArtistAuctions = async () => {
    const artistId = localStorage.getItem("userId");
    if (!artistId) return;

    try {
      setIsLoading(true);
      const response = await apiClient.get<Auction[]>(
        `/auctions/artist/${artistId}`,
      );
      if (response.success) {
        setAuctions(response.data || []);
      }
    } catch (error) {
      console.error("Failed to fetch auctions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArtistAuctions();
  }, []);

  useEffect(() => {
    const updateCountdowns = () => {
      const newCountdowns: Record<string, string> = {};
      auctions.forEach((auction) => {
        const { total, days, hours, minutes, seconds } = getTimeRemaining(
          auction.endTime,
        );
        if (total > 0) {
          newCountdowns[auction.id] =
            `${days}d ${hours}h ${minutes}m ${seconds}s`;
        } else {
          newCountdowns[auction.id] = "Expired";
        }
      });
      setCountdowns(newCountdowns);
    };

    updateCountdowns();
    const interval = setInterval(updateCountdowns, 1000);

    return () => clearInterval(interval);
  }, [auctions]);

  const handleAuctionCreated = () => {
    fetchArtistAuctions();
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">My Auctions</h1>
        <Button onClick={() => setIsPopupOpen(true)}>
          <Plus size={20} />
          Create New Auction
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center text-gray-500">Loading auctions...</div>
      ) : auctions.length === 0 ? (
        <div className="text-center text-gray-500">
          No auctions created yet. Start by creating your first auction!
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {auctions.map((auction) => (
            <div
              key={auction.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="relative">
                <img
                  src={auction.paintingUrl}
                  alt={auction.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 bg-white/80 px-2 py-1 rounded text-sm font-semibold">
                  {auction.auctionStatus}
                </div>
              </div>
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{auction.title}</h2>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {auction.description}
                </p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Starting Price</p>
                    <p className="font-semibold">
                      LKR {auction.startingPrice.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Current Price</p>
                    <p className="font-semibold">
                      LKR {auction.currentPrice.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex justify-between text-sm text-gray-500">
                  <span>
                    Starts: {new Date(auction.startTime).toLocaleDateString()}
                  </span>
                  <span>
                    Ends: {new Date(auction.endTime).toLocaleDateString()}
                  </span>
                </div>
                <div className="mt-2 text-center text-sm text-red-600 font-semibold">
                  {countdowns[auction.id] || "Calculating..."}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AuctionCreationPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onAuctionCreated={handleAuctionCreated}
      />
    </div>
  );
};

export default Auctions;
