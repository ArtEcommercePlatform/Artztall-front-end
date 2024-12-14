import React, { useState, useEffect } from "react";
import { Timer, Clock, X, CheckCircle, CreditCard, List, Award } from "lucide-react";
import { apiClient } from "../../services/apiClient";

// Type Definitions
type PaymentStatus = 'PENDING' | 'COMPLETED';
type AuctionView = 'ACTIVE' | 'WON';

interface Auction {
  id: string;
  title: string;
  description: string;
  paintingUrl: string;
  startingPrice?: number;
  currentPrice?: number;
  finalPrice?: number;
  startTime?: string;
  endTime: string;
  bidsCount?: number;
  winnerId?: string;
  paymentStatus?: PaymentStatus;
}


const AuctionPage: React.FC = () => {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [wonAuctions, setWonAuctions] = useState<Auction[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAuction, setSelectedAuction] = useState<Auction | null>(null);
  const [timeLeft, setTimeLeft] = useState<Record<string, string>>({});
  const [bidModal, setBidModal] = useState(false);
  const [imageModal, setImageModal] = useState(false);
  const [paymentModal, setPaymentModal] = useState(false);
  const [currentView, setCurrentView] = useState<AuctionView>('ACTIVE');

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('User ID not found');
      setLoading(false);
      return;
    }

    const fetchAuctions = async () => {
      setLoading(true);
      try {
        // Fetch active auctions
        const activeResponse = await apiClient.get<Auction[]>("/auctions/active");
        if (activeResponse.success) {
          setAuctions(activeResponse.data);
        }

        // Fetch won auctions
        const wonResponse = await apiClient.get<Auction[]>(`/auctions/completed/winner/${userId}`);
        if (wonResponse.success) {
          setWonAuctions(wonResponse.data);
        }

        setLoading(false);
      } catch (error) {
        const errorMessage = (error as Error).message || "Unknown error occurred";
        console.error(errorMessage);
        setLoading(false);
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
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor(
            (difference % (1000 * 60 * 60)) / (1000 * 60)
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
      const userId = localStorage.getItem('userId');
      const response = await apiClient.post("/auctions/bid", {
        auctionId: selectedAuction.id,
        amount,
        userId
      });

      if (response.success) {
        setBidModal(false);
        // Refresh auctions to update the latest bid
        const updatedAuctions = auctions.map((auction) =>
          auction.id === selectedAuction.id
            ? { ...auction, currentPrice: amount }
            : auction
        );
        setAuctions(updatedAuctions);
      } else {
        console.error("Failed to place bid");
      }
    } catch (error) {
      const errorMessage = (error as Error).message || "Unknown error occurred";
      console.error(errorMessage);
    }
  };

  const handlePayment = async (auction: Auction) => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await apiClient.post("/auctions/pay", {
        auctionId: auction.id,
        userId
      });

      if (response.success) {
        // Update the payment status in won auctions
        const updatedWonAuctions = wonAuctions.map(wonAuction => 
          wonAuction.id === auction.id 
            ? { ...wonAuction, paymentStatus: 'COMPLETED' as PaymentStatus } 
            : wonAuction
        );
        setWonAuctions(updatedWonAuctions);
        setPaymentModal(false);
      } else {
        console.error("Payment failed");
      }
    } catch (error) {
      const errorMessage = (error as Error).message || "Unknown error occurred";
      console.error(errorMessage);
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
              LKR {selectedAuction.currentPrice || selectedAuction.startingPrice}
            </span>
          </p>
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[1000, 5000, 10000].map((amount) => (
              <button
                key={amount}
                onClick={() => submitBid((selectedAuction.currentPrice || selectedAuction.startingPrice || 0) + amount)}
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

  const renderPaymentModal = (auction: Auction) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 relative">
        <button
          onClick={() => setPaymentModal(false)}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-green-900">
          Complete Payment
        </h2>
        <div className="mb-4">
          <img 
            src={auction.paintingUrl} 
            alt={auction.title} 
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <p className="text-gray-700">
            Artwork: <span className="font-bold">{auction.title}</span>
          </p>
          <p className="text-gray-700">
            Final Price: <span className="font-bold">LKR {auction.finalPrice}</span>
          </p>
        </div>
        <button
          onClick={() => handlePayment(auction)}
          className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition flex items-center justify-center"
        >
          <CreditCard size={20} className="mr-2" />
          Pay Now
        </button>
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
      {/* Navigation Tabs */}
      <div className="flex justify-center mb-8">
        <div className="flex bg-gray-100 rounded-full p-1">
          <button 
            onClick={() => setCurrentView('ACTIVE')}
            className={`flex items-center px-6 py-2 rounded-full transition ${
              currentView === 'ACTIVE' 
                ? 'bg-green-500 text-white' 
                : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            <List size={20} className="mr-2" />
            Active Auctions
          </button>
          <button 
            onClick={() => setCurrentView('WON')}
            className={`flex items-center px-6 py-2 rounded-full transition ${
              currentView === 'WON' 
                ? 'bg-green-500 text-white' 
                : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Award size={20} className="mr-2" />
            Won Auctions
          </button>
        </div>
      </div>

      {/* Conditional Rendering Based on Current View */}
      {currentView === 'ACTIVE' ? (
        <>
          <h1 className="text-3xl font-bold mb-6 text-green-900">Active Auctions</h1>
          {auctions.length === 0 ? (
            <p className="text-gray-600 text-center">No active auctions at the moment.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
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
                      Current Bid: LKR {auction.currentPrice || auction.startingPrice}
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
          )}
        </>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-6 text-green-900">Won Auctions</h1>
          {wonAuctions.length === 0 ? (
            <p className="text-gray-600 text-center">You haven't won any auctions yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wonAuctions.map((auction) => (
                <div
                  key={auction.id}
                  className="bg-white border border-green-100 rounded-lg shadow-md overflow-hidden"
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
                    {auction.paymentStatus === 'COMPLETED' && (
                      <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full flex items-center">
                        <CheckCircle size={16} className="mr-2" />
                        <span className="font-semibold">Paid</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h2 className="font-bold text-lg">{auction.title}</h2>
                    <p className="text-gray-600">
                      Final Price: LKR {auction.finalPrice}
                    </p>
                    <p className="text-gray-600 mb-2">
                      Ended on: {new Date(auction.endTime).toLocaleDateString()}
                    </p>
                    {auction.paymentStatus === 'PENDING' && (
                      <button
                        onClick={() => {
                          setSelectedAuction(auction);
                          setPaymentModal(true);
                      }}
                        className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600"
                      >
                        Pay Now
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Modals */}
      {bidModal && renderBidModal()}
      {imageModal && selectedAuction && renderImageModal(selectedAuction)}
      {paymentModal && selectedAuction && renderPaymentModal(selectedAuction)}
    </div>
  );
};

export default AuctionPage;