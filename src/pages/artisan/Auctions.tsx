import React, { useState, useEffect } from "react";
import { 
  Plus, 
  Eye, 
  UserIcon, 
  MailIcon, 
  PhoneIcon, 
  XIcon 
} from "lucide-react";
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
  auctionStatus: "PENDING" | "ACTIVE" | "COMPLETED" | "CANCELLED";
  winnerIds?: string[];
}

interface BidHistory {
  auctionId: string;
  userId: string;
  amount: number;
  bidTime: string;
}

interface UserDetails {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  profilePictureUrl?: string;
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

const BidsModal = ({
  isOpen, 
  onClose, 
  bids, 
  winnerDetails
}: {
  isOpen: boolean;
  onClose: () => void;
  bids: BidHistory[];
  winnerDetails: UserDetails | null;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Bid History</h2>
          <button 
            onClick={onClose} 
            className="text-gray-600 hover:text-gray-900"
          >
            <XIcon size={24} />
          </button>
        </div>
        
        {winnerDetails && (
          <div className="p-6 bg-gray-50 border-b">
            <h3 className="text-xl font-semibold mb-4 text-green-800">Winner Details</h3>
            <div className="flex items-center space-x-4">
              {winnerDetails.profilePictureUrl ? (
                <img 
                  src={winnerDetails.profilePictureUrl} 
                  alt={winnerDetails.name} 
                  className="w-16 h-16 rounded-full object-cover"
                />
              ) : (
                <UserIcon size={64} className="text-gray-400" />
              )}
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <UserIcon size={16} />
                  <span>{winnerDetails.name}</span>
                </div>
                <div className="flex items-center space-x-2 mb-1">
                  <MailIcon size={16} />
                  <span>{winnerDetails.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <PhoneIcon size={16} />
                  <span>{winnerDetails.phoneNumber}</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-4">Bid History</h3>
          {bids.length === 0 ? (
            <p className="text-gray-500 text-center">No bids yet</p>
          ) : (
            <div className="space-y-3">
              {bids.map((bid, index) => (
                <div 
                  key={index} 
                  className="bg-gray-100 p-4 rounded-lg flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold">
                      Bid Amount: LKR {bid.amount.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600">
                      {new Date(bid.bidTime).toLocaleString()}
                    </p>
                  </div>
                  <UserIcon size={20} className="text-gray-500" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Auctions: React.FC = () => {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [countdowns, setCountdowns] = useState<Record<string, string>>({});
  
  // Bid history modal state
  const [selectedAuctionBids, setSelectedAuctionBids] = useState<BidHistory[]>([]);
  const [selectedAuctionWinner, setSelectedAuctionWinner] = useState<UserDetails | null>(null);
  const [isBidsModalOpen, setIsBidsModalOpen] = useState(false);

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

  const fetchBidHistory = async (auctionId: string) => {
    try {
      const bidsResponse = await apiClient.get<BidHistory[]>(
        `/auctions/${auctionId}/bid-history`
      );
      
      if (bidsResponse.success) {
        setSelectedAuctionBids(bidsResponse.data || []);
      }
    } catch (error) {
      console.error("Failed to fetch bid history:", error);
    }
  };

  const fetchWinnerDetails = async (winnerId: string) => {
    try {
      const winnerResponse = await apiClient.get<UserDetails>(
        `/users/buyers/${winnerId}`
      );
      
      if (winnerResponse.success) {
        setSelectedAuctionWinner(winnerResponse.data || null);
      }
    } catch (error) {
      console.error("Failed to fetch winner details:", error);
    }
  };

  const handleViewBids = async (auction: Auction) => {
    await fetchBidHistory(auction.id);
    
    // If auction is completed and has a winner, fetch winner details
    if (auction.auctionStatus === "COMPLETED" && auction.winnerIds && auction.winnerIds.length > 0) {
      await fetchWinnerDetails(auction.winnerIds[0]);
    } else {
      setSelectedAuctionWinner(null);
    }
    
    setIsBidsModalOpen(true);
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

  const getTimeRemaining = (endTime: string) => {
    const total = new Date(endTime).getTime() - new Date().getTime();
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const seconds = Math.floor((total / 1000) % 60);

    return { total, days, hours, minutes, seconds };
  };

  const handleAuctionCreated = () => {
    fetchArtistAuctions();
  };

  return (
    <div className="container mx-auto p-6">
      {/* Existing header section remains the same */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">My Auctions</h1>
        <Button onClick={() => setIsPopupOpen(true)}>
          <Plus size={20} />
          Create New Auction
        </Button>
      </div>

      {/* Existing auction loading/empty state remains the same */}
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
              {/* Existing auction card details remain the same */}
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
                
                {/* New View Bids Button */}
                <div className="mt-4">
                  <Button 
                    onClick={() => handleViewBids(auction)}
                    className="w-full"
                  >
                    <Eye size={16} />
                    View Bids
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Auction Creation Popup */}
      <AuctionCreationPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onAuctionCreated={handleAuctionCreated}
      />

      {/* Bids Modal */}
      <BidsModal
        isOpen={isBidsModalOpen}
        onClose={() => setIsBidsModalOpen(false)}
        bids={selectedAuctionBids}
        winnerDetails={selectedAuctionWinner}
      />
    </div>
  );
};

export default Auctions;