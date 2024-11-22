import React from "react";
import { useParams } from "react-router-dom";

const AuctionInside = () => {
  // Get the itemId from the URL
  const { id } = useParams();

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="max-w-4xl overflow-hidden bg-white rounded-lg shadow-lg">
        {/* Main Container */}
        <div className="flex flex-col md:flex-row">
          {/* Left - Product Images */}
          <div className="flex flex-col w-full p-4 md:w-1/2">
            <img
              src="image-placeholder.png" // Replace with the actual image path
              alt="Product"
              className="mb-4 border rounded-md"
            />
            <div className="flex space-x-2">
              <button className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400">
                Prev
              </button>
              <button className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400">
                Next
              </button>
            </div>
          </div>

          {/* Right - Product Details */}
          <div className="flex flex-col w-full p-4 md:w-1/2">
            <h1 className="mb-2 text-2xl font-semibold text-gray-800">
              Sealed Air NewAir I.B. Flex - Item ID: {id}
            </h1>
            <p className="mb-1 text-lg font-medium text-gray-500">
              US $2,999.99
            </p>
            <p className="mb-4 text-sm text-gray-400">Condition: Brand New</p>
            <div className="space-y-2">
              <button className="w-full py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
                Place Bid
              </button>
              <button className="w-full py-2 text-white bg-green-600 rounded hover:bg-green-700">
                Buy It Now
              </button>
              <button className="w-full py-2 text-gray-800 bg-gray-200 rounded hover:bg-gray-300">
                Add to Watchlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionInside;
