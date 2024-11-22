<<<<<<< HEAD
=======
import React, { useState, useEffect } from 'react';
import { Clock, Gavel, Trophy } from 'lucide-react';
>>>>>>> a56be089286d34311ef0f1115fa2c55fd3fa19b5


const Auctions = () => {
  return (
<<<<<<< HEAD
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Auctions</h1>
      {/* Add your auctions content */}
=======
    <div className="flex flex-col h-screen overflow-hidden bg-gradient-to-br from-green-50 to-blue-100">
      {notification && (
        <div className="fixed flex items-center p-4 text-white bg-green-500 rounded shadow-lg top-4 right-4">
          <Trophy className="mr-2" />
          {notification}
        </div>
      )}

      <div className="container mx-auto px-4 py-6 flex-grow overflow-y-auto space-y-6">
        {/* User Context */}
        <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-md">
          <h1 className="text-3xl font-bold text-green-900 tracking-tight">Art Auction Platform</h1>
          <div className="flex items-center">
            <span className="mr-2 text-gray-600">Current User:</span>
            <span className="font-semibold text-green-600">{currentUser}</span>
          </div>
        </div>

        {/* Create Auction Section */}
        <div className="p-6 bg-white rounded-xl shadow-md">
          <h2 className="flex items-center mb-4 text-lg font-semibold text-green-900">
            <Gavel className="mr-2 text-green-500" />
            Create New Auction
          </h2>
          <form onSubmit={handleCreateAuction} className="space-y-4">
            <input
              type="text"
              name="artwork"
              placeholder="Artwork Name"
              value={formData.artwork}
              onChange={handleChange}
              className="w-full p-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-300"
              required
            />
            <textarea
              name="artworkDescription"
              placeholder="Artwork Description"
              value={formData.artworkDescription}
              onChange={handleChange}
              className="w-full h-24 p-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-300"
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
                  className="w-full p-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-300"
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
                  className="w-full p-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-300"
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
                  className="w-full p-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-300"
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
                  className="w-full p-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-300"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="
                flex 
                items-center 
                justify-center 
                w-full 
                p-2 
                text-white 
                bg-green-600 
                rounded-lg 
                hover:bg-green-700 
                transition-all 
                duration-300 
                shadow-md
              "
            >
              <Gavel className="mr-2" /> Create Auction
            </button>
          </form>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="p-6 bg-white rounded-xl shadow-md">
            <h2 className="flex items-center mb-4 text-lg font-semibold text-green-900">
              <Clock className="mr-2 text-green-500" />
              Upcoming Auctions
            </h2>
            {auctions.filter((a) => a.status === 'upcoming').length > 0 ? (
              auctions
                .filter((a) => a.status === 'upcoming')
                .map((auction) => (
                  <div key={auction.id} className="py-4 border-b border-green-200">
                    <h3 className="font-semibold text-green-800">{auction.artwork}</h3>
                    <p className="mb-2 text-sm text-green-600">{auction.artworkDescription}</p>
                    <div className="flex items-center justify-between">
                      <span>Starting Bid: Rs {auction.minimumBid}</span>
                      <span className="text-green-600">
                        Starts: {new Date(auction.startTime).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))
            ) : (
              <p className="text-gray-500">No upcoming auctions.</p>
            )}
          </div>

          <div className="p-6 bg-white rounded-xl shadow-md">
            <h2 className="flex items-center mb-4 text-lg font-semibold text-green-900">
              <Gavel className="mr-2 text-green-500" />
              Active Auctions
            </h2>
            {auctions.filter((a) => a.status === 'active').length > 0 ? (
              auctions
                .filter((a) => a.status === 'active')
                .map((auction) => (
                  <div key={auction.id} className="py-4 border-b border-green-200">
                    <h3 className="font-semibold text-green-800">{auction.artwork}</h3>
                    <p className="mb-2 text-sm text-green-600">{auction.artworkDescription}</p>
                    <div className="flex items-center justify-between">
                      <span>Highest Bid: Rs {auction.highestBid}</span>
                      <span className="text-green-600">
                        Ends: {new Date(auction.endTime).toLocaleString()}
                      </span>
                    </div>
                    <button
                      onClick={() => placeBid(auction.id, auction.highestBid + 10)}
                      className="
                        w-full 
                        p-2 
                        mt-4 
                        text-white 
                        bg-green-600 
                        rounded-lg 
                        hover:bg-green-700 
                        transition-all 
                        duration-300 
                        shadow-md
                      "
                    >
                      Place Bid (Rs {auction.highestBid + 10})
                    </button>
                  </div>
                ))
            ) : (
              <p className="text-gray-500">No active auctions.</p>
            )}
          </div>
        </div>
      </div>
>>>>>>> a56be089286d34311ef0f1115fa2c55fd3fa19b5
    </div>
  );
};

export default Auctions;