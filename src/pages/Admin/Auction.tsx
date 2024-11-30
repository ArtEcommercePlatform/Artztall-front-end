import React, { useState } from "react";
import {
  Clock,
  Archive,
  Gavel,
  History,
  LucideIcon,
  ChevronUp,
} from "lucide-react";

const Auction = () => {
  const [activeTab, setActiveTab] = useState("active");

  const [activeAuctions, setActiveAuctions] = useState([
    {
      id: 1,
      title: "Vintage Watch Collection",
      startTime: "2024-11-24T10:00",
      endTime: "2024-11-24T22:00",
      minBid: 500,
      currentBid: 750,
      totalBids: 5,
      status: "active",
      growth: 12.5,
    },
    {
      id: 2,
      title: "Art Deco Furniture Set",
      startTime: "2024-11-24T12:00",
      endTime: "2024-11-25T12:00",
      minBid: 1000,
      currentBid: 1200,
      totalBids: 3,
      status: "active",
      growth: 8.3,
    },
  ]);

  const [pastAuctions] = useState([
    {
      id: 3,
      title: "Classic Car Collection",
      endTime: "2024-11-23T18:00",
      finalBid: 25000,
      totalBids: 12,
      winner: "John Doe",
      status: "completed",
    },
  ]);

  const [newAuction, setNewAuction] = useState({
    title: "",
    startTime: "",
    endTime: "",
    minBid: "",
  });

  // Add new function to handle bid updates
  const handleBidUpdate = (auctionId: number, newBid: number) => {
    setActiveAuctions((prevAuctions) =>
      prevAuctions.map((auction) => {
        if (auction.id === auctionId) {
          const increase =
            ((newBid - auction.currentBid) / auction.currentBid) * 100;
          return {
            ...auction,
            currentBid: newBid,
            totalBids: auction.totalBids + 1,
            growth: parseFloat(increase.toFixed(1)),
          };
        }
        return auction;
      }),
    );
  };

  const handleNewAuctionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAuctionItem = {
      id: activeAuctions.length + 1,
      title: newAuction.title,
      startTime: newAuction.startTime,
      endTime: newAuction.endTime,
      minBid: parseFloat(newAuction.minBid),
      currentBid: parseFloat(newAuction.minBid),
      totalBids: 0,
      status: "active",
      growth: 0,
    };

    setActiveAuctions((prev) => [...prev, newAuctionItem]);
    setNewAuction({ title: "", startTime: "", endTime: "", minBid: "" });
  };

  interface TabButtonProps {
    value: string;
    icon: LucideIcon;
    label: string;
  }

  const TabButton: React.FC<TabButtonProps> = ({
    value,
    icon: Icon,
    label,
  }) => (
    <button
      onClick={() => setActiveTab(value)}
      className={`flex items-center justify-center p-3 flex-1 border-b-2 transition-all duration-300 ${
        activeTab === value
          ? "border-green-600 text-green-600 bg-green-50"
          : "border-transparent hover:border-gray-300 hover:bg-gray-50"
      }`}
    >
      <Icon className="w-4 h-4 mr-2" />
      {label}
    </button>
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 ring-1 ring-green-200";
      case "completed":
        return "bg-blue-100 text-blue-800 ring-1 ring-blue-200";
      default:
        return "bg-gray-100 text-gray-800 ring-1 ring-gray-200";
    }
  };

  // Add quick bid function for testing
  const handleQuickBid = (auctionId: number) => {
    const auction = activeAuctions.find((a) => a.id === auctionId);
    if (auction) {
      const newBid = auction.currentBid * 1.1; // 10% increase
      handleBidUpdate(auctionId, parseFloat(newBid.toFixed(2)));
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <div className="w-full max-w-6xl p-4 mx-auto space-y-4">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-green-900 tracking-tight">
              Auction Management
            </h1>
            <p className="text-gray-600 text-sm mt-2">
              Monitor and manage your auctions
            </p>
          </div>
        </div>

        <div className="flex border-b bg-white rounded-t-xl shadow-sm">
          <TabButton value="active" icon={Clock} label="Active Auctions" />
          <TabButton value="new" icon={Gavel} label="Create Auction" />
          <TabButton value="monitor" icon={Archive} label="Live Monitor" />
          <TabButton value="history" icon={History} label="History" />
        </div>

        {activeTab === "active" && (
          <div className="space-y-4">
            {activeAuctions.map((auction) => (
              <div
                key={auction.id}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {auction.title}
                  </h3>
                  <span
                    className={`px-3 py-1 text-sm rounded-full ${getStatusColor(auction.status)}`}
                  >
                    {auction.status}
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-6">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Minimum Bid</p>
                    <p className="font-medium text-gray-800">
                      ${auction.minBid}
                    </p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Current Bid</p>
                    <div className="flex items-center">
                      <p className="font-medium text-gray-800">
                        ${auction.currentBid}
                      </p>
                      <span className="text-green-600 flex items-center ml-2 text-sm">
                        <ChevronUp className="w-4 h-4" />
                        {auction.growth}%
                      </span>
                    </div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Total Bids</p>
                    <p className="font-medium text-gray-800">
                      {auction.totalBids}
                    </p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg relative">
                    <p className="text-sm text-gray-500">End Time</p>
                    <p className="font-medium text-gray-800">
                      {new Date(auction.endTime).toLocaleTimeString()}
                    </p>
                    <button
                      onClick={() => handleQuickBid(auction.id)}
                      className="absolute bottom-2 right-2 text-sm text-green-600 hover:text-green-700"
                    >
                      Quick Bid
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "new" && (
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
            <h2 className="text-xl font-semibold text-green-900 mb-6">
              Create New Auction
            </h2>
            <form onSubmit={handleNewAuctionSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  value={newAuction.title}
                  onChange={(e) =>
                    setNewAuction({ ...newAuction, title: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Auction Title"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Start Time
                  </label>
                  <input
                    type="datetime-local"
                    value={newAuction.startTime}
                    onChange={(e) =>
                      setNewAuction({
                        ...newAuction,
                        startTime: e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    End Time
                  </label>
                  <input
                    type="datetime-local"
                    value={newAuction.endTime}
                    onChange={(e) =>
                      setNewAuction({ ...newAuction, endTime: e.target.value })
                    }
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Minimum Bid ($)
                </label>
                <input
                  type="number"
                  value={newAuction.minBid}
                  onChange={(e) =>
                    setNewAuction({ ...newAuction, minBid: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="0"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors duration-300"
              >
                Create Auction
              </button>
            </form>
          </div>
        )}

        {activeTab === "monitor" && (
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
            <h2 className="text-xl font-semibold text-green-900 mb-6">
              Live Auction Monitor
            </h2>
            <div className="space-y-4">
              {activeAuctions.map((auction) => (
                <div
                  key={auction.id}
                  className="p-4 border rounded-lg hover:border-green-200 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-800">
                      {auction.title}
                    </h3>
                    <span className="px-3 py-1 text-sm text-green-600 bg-green-100 rounded-full ring-1 ring-green-200">
                      Live
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-500">Current Bid</p>
                      <p className="font-medium text-gray-800">
                        ${auction.currentBid}
                      </p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-500">Time Remaining</p>
                      <p className="font-medium text-gray-800">
                        {new Date(auction.endTime).toLocaleString()}
                      </p>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-500">Total Bids</p>
                      <p className="font-medium text-gray-800">
                        {auction.totalBids}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "history" && (
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
            <h2 className="text-xl font-semibold text-green-900 mb-6">
              Auction History
            </h2>
            <div className="space-y-4">
              {pastAuctions.map((auction) => (
                <div
                  key={auction.id}
                  className="p-4 border rounded-lg hover:border-blue-200 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-800">
                      {auction.title}
                    </h3>
                    <span className="px-3 py-1 text-sm text-blue-600 bg-blue-100 rounded-full ring-1 ring-blue-200">
                      Completed
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-500">Final Bid</p>
                      <p className="font-medium text-gray-800">
                        ${auction.finalBid}
                      </p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-500">Winner</p>
                      <p className="font-medium text-gray-800">
                        {auction.winner}
                      </p>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-500">Total Bids</p>
                      <p className="font-medium text-gray-800">
                        {auction.totalBids}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auction;
