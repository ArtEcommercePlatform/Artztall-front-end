import React, { useState } from 'react';
import { Clock, Archive, Gavel, History, LucideIcon } from 'lucide-react';

const Auction = () => {
  const [activeTab, setActiveTab] = useState('active');

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

  const handleNewAuctionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add logic to save the new auction
    setNewAuction({ title: "", startTime: "", endTime: "", minBid: "" });
  };

  interface TabButtonProps {
    value: string;
    icon: LucideIcon;
    label: string;
  }

  const TabButton: React.FC<TabButtonProps> = ({ value, icon: Icon, label }) => (
    <button
      onClick={() => setActiveTab(value)}
      className={`flex items-center justify-center p-3 flex-1 border-b-2 ${
        activeTab === value
          ? "border-blue-500 text-blue-500"
          : "border-transparent hover:border-gray-300"
      }`}
    >
      <Icon className="w-4 h-4 mr-2" />
      {label}
    </button>
  );

  return (
    <div className="w-full max-w-6xl p-4 mx-auto space-y-4">
      <h1 className="mb-6 text-3xl font-bold">Auction Management </h1>

      {/* Tabs */}
      <div className="flex border-b">
        <TabButton value="active" icon={Clock} label="Active Auctions" />
        <TabButton value="new" icon={Gavel} label="Create Auction" />
        <TabButton value="monitor" icon={Archive} label="Live Monitor" />
        <TabButton value="history" icon={History} label="History" />
      </div>

      {/* Active Auctions Tab */}
      {activeTab === "active" && (
        <div className="space-y-4">
          {activeAuctions.map((auction) => (
            <div key={auction.id} className="p-6 bg-white rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">{auction.title}</h3>
                <span className="px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded-full">
                  {new Date(auction.endTime).toLocaleString()}
                </span>
              </div>
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Minimum Bid</p>
                  <p className="font-medium">${auction.minBid}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Current Bid</p>
                  <p className="font-medium">${auction.currentBid}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Bids</p>
                  <p className="font-medium">{auction.totalBids}</p>
                </div>
                <div>
                  <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create New Auction Tab */}
      {activeTab === "new" && (
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="mb-4 text-xl font-semibold">Create New Auction</h2>
          <form onSubmit={handleNewAuctionSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium">Title</label>
              <input
                type="text"
                value={newAuction.title}
                onChange={(e) =>
                  setNewAuction({ ...newAuction, title: e.target.value })
                }
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Auction Title"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-sm font-medium">
                  Start Time
                </label>
                <input
                  type="datetime-local"
                  value={newAuction.startTime}
                  onChange={(e) =>
                    setNewAuction({ ...newAuction, startTime: e.target.value })
                  }
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">End Time</label>
                <input
                  type="datetime-local"
                  value={newAuction.endTime}
                  onChange={(e) =>
                    setNewAuction({ ...newAuction, endTime: e.target.value })
                  }
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">
                Minimum Bid ($)
              </label>
              <input
                type="number"
                value={newAuction.minBid}
                onChange={(e) =>
                  setNewAuction({ ...newAuction, minBid: e.target.value })
                }
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 text-white transition-colors bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Create Auction
            </button>
          </form>
        </div>
      )}

      {/* Live Monitor Tab */}
      {activeTab === "monitor" && (
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="mb-4 text-xl font-semibold">Live Auction Monitor</h2>
          <div className="space-y-4">
            {activeAuctions.map((auction) => (
              <div key={auction.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{auction.title}</h3>
                  <span className="px-3 py-1 text-sm text-green-600 bg-green-100 rounded-full">
                    Live
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Current Bid</p>
                    <p className="font-medium">${auction.currentBid}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Time Remaining</p>
                    <p className="font-medium">
                      {new Date(auction.endTime).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                      Manage Bids
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* History Tab */}
      {activeTab === "history" && (
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="mb-4 text-xl font-semibold">Auction History</h2>
          <div className="space-y-4">
            {pastAuctions.map((auction) => (
              <div key={auction.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{auction.title}</h3>
                  <span className="px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded-full">
                    Completed
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Final Bid</p>
                    <p className="font-medium">${auction.finalBid}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Winner</p>
                    <p className="font-medium">{auction.winner}</p>
                  </div>
                  <div>
                    <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Auction;
