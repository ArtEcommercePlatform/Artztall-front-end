import React, { useState, useEffect } from "react";
import { Clock, Gavel, Trophy } from "lucide-react";

// Types remain the same
interface Auction {
  id: number;
  artwork: string;
  artworkDescription: string;
  minimumBid: number;
  reservePrice: number;
  startTime: string;
  endTime: string;
  highestBid: number;
  bidder: string;
  status: "upcoming" | "active" | "completed" | "failed";
  bids: Bid[];
}

interface Bid {
  bidder: string;
  amount: number;
  timestamp: number;
}

const Auctions: React.FC = () => {
  const [formData, setFormData] = useState({
    artwork: "",
    artworkDescription: "",
    minimumBid: 0,
    reservePrice: 0,
    startTime: "",
    endTime: "",
  });
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [notification, setNotification] = useState("");
  const [currentUser, setCurrentUser] = useState("Guest");

  // Existing useEffect hooks remain the same
  useEffect(() => {
    const randomUsernames = [
      "ArtCollector123",
      "GalleryOwner",
      "CultureVulture",
      "ModernArtFan",
    ];
    setCurrentUser(
      randomUsernames[Math.floor(Math.random() * randomUsernames.length)]
    );
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const updatedAuctions = auctions.map((auction) => {
        const startTime = new Date(auction.startTime);
        const endTime = new Date(auction.endTime);

        let updatedStatus: "upcoming" | "active" | "completed" | "failed";

        if (now < startTime) {
          updatedStatus = "upcoming";
        } else if (now > endTime) {
          updatedStatus =
            auction.highestBid >= auction.reservePrice ? "completed" : "failed";
        } else {
          updatedStatus = "active";
        }

        return { ...auction, status: updatedStatus };
      });

      setAuctions(updatedAuctions);
    }, 60000);

    return () => clearInterval(timer);
  }, [auctions]);

  // Existing handlers remain the same
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreateAuction = (e: React.FormEvent) => {
    e.preventDefault();
    const newAuction: Auction = {
      ...formData,
      id: Date.now(),
      highestBid: formData.minimumBid,
      bidder: "None",
      status: "upcoming",
      bids: [],
    };

    setAuctions([...auctions, newAuction]);
    showNotification(
      `Auction for "${newAuction.artwork}" created successfully!`
    );
    resetForm();
  };

  const placeBid = (auctionId: number, bidAmount: number) => {
    const auction = auctions.find((a) => a.id === auctionId);

    if (!auction || auction.status !== "active") {
      showNotification("Cannot bid on this auction.");
      return;
    }

    if (bidAmount <= auction.highestBid) {
      showNotification("Bid must be higher than current highest bid.");
      return;
    }

    const updatedAuctions = auctions.map((a) =>
      a.id === auctionId
        ? {
            ...a,
            highestBid: bidAmount,
            bidder: currentUser,
            bids: [
              ...a.bids,
              { bidder: currentUser, amount: bidAmount, timestamp: Date.now() },
            ],
          }
        : a
    );

    setAuctions(updatedAuctions);
    showNotification(`Bid of $${bidAmount} placed successfully!`);
  };

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 3000);
  };

  const resetForm = () => {
    setFormData({
      artwork: "",
      artworkDescription: "",
      minimumBid: 0,
      reservePrice: 0,
      startTime: "",
      endTime: "",
    });
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-100 to-gray-200">
      {notification && (
        <div className="fixed flex items-center p-4 text-white bg-green-500 rounded shadow-lg top-4 right-4">
          <Trophy className="mr-2" />
          {notification}
        </div>
      )}

      <div className="container mx-auto space-y-6">
        {/* User Context */}
        <div className="flex items-center justify-between p-4 bg-white rounded shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h1 className="text-2xl font-bold text-gray-800">
            Art Auction Platform
          </h1>
          <div className="flex items-center">
            <span className="mr-2 text-gray-600">Current User:</span>
            <span className="font-semibold text-green-600">{currentUser}</span>
          </div>
        </div>

        {/* Create Auction Section */}
        <div className="p-6 bg-white rounded shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="flex items-center mb-4 text-lg font-bold">
            <Gavel className="mr-2 text-green-600" />
            Create New Auction
          </h2>
          <form onSubmit={handleCreateAuction} className="space-y-4">
            <input
              type="text"
              name="artwork"
              placeholder="Artwork Name"
              value={formData.artwork}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <textarea
              name="artworkDescription"
              placeholder="Artwork Description"
              value={formData.artworkDescription}
              onChange={handleChange}
              className="w-full h-24 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Minimum Budget</p>
                <input
                  type="number"
                  name="minimumBid"
                  placeholder="Minimum Bid"
                  value={formData.minimumBid}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  min="0"
                  required
                />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Maximum Budget</p>
                <input
                  type="number"
                  name="reservePrice"
                  placeholder="Reserve Price"
                  value={formData.reservePrice}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  min="0"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Start Date</p>
                <input
                  type="datetime-local"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">End Date</p>
                <input
                  type="datetime-local"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="flex items-center justify-center w-full p-2 text-white bg-green-600 rounded hover:bg-green-700 transition-colors duration-300"
            >
              <Gavel className="mr-2" /> Create Auction
            </button>
          </form>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="p-6 bg-white rounded shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="flex items-center mb-4 text-lg font-bold">
              <Clock className="mr-2 text-yellow-500" />
              Upcoming Auctions
            </h2>
            {auctions.filter((a) => a.status === "upcoming").length > 0 ? (
              auctions
                .filter((a) => a.status === "upcoming")
                .map((auction) => (
                  <div
                    key={auction.id}
                    className="p-4 border border-gray-100 rounded-lg hover:border-green-200 transition-all duration-300"
                  >
                    <h3 className="font-semibold text-gray-800">
                      {auction.artwork}
                    </h3>
                    <p className="mb-2 text-sm text-gray-600">
                      {auction.artworkDescription}
                    </p>
                    <div className="flex items-center justify-between">
                      <span>Starting Bid: ${auction.minimumBid}</span>
                      <span className="text-yellow-600">
                        Starts: {new Date(auction.startTime).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))
            ) : (
              <p className="text-gray-500">No upcoming auctions.</p>
            )}
          </div>

          <div className="p-6 bg-white rounded shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="flex items-center mb-4 text-lg font-bold">
              <Gavel className="mr-2 text-green-600" />
              Active Auctions
            </h2>
            {auctions.filter((a) => a.status === "active").length > 0 ? (
              auctions
                .filter((a) => a.status === "active")
                .map((auction) => (
                  <div
                    key={auction.id}
                    className="p-4 border border-gray-100 rounded-lg hover:border-green-200 transition-all duration-300"
                  >
                    <h3 className="font-semibold text-gray-800">
                      {auction.artwork}
                    </h3>
                    <p className="mb-2 text-sm text-gray-600">
                      {auction.artworkDescription}
                    </p>
                    <div className="flex items-center justify-between">
                      <span>Highest Bid: ${auction.highestBid}</span>
                      <span className="text-green-600">
                        Ends: {new Date(auction.endTime).toLocaleString()}
                      </span>
                    </div>
                    <button
                      onClick={() =>
                        placeBid(auction.id, auction.highestBid + 10)
                      }
                      className="w-full p-2 mt-4 text-white bg-green-600 rounded hover:bg-green-700 transition-colors duration-300"
                    >
                      Place Bid (${auction.highestBid + 10})
                    </button>
                  </div>
                ))
            ) : (
              <p className="text-gray-500">No active auctions.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auctions;