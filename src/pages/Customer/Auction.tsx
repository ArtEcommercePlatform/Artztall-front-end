import React from "react";
import img from '../../assets/images/Ele.jpg'

const AuctionPage = () => {
  const item = {
    title: "Elephant wall Art",
    price: "Rs. 20 000",
    bids: "0 bids",
    timeLeft: "4d 20h",
    imageUrl: "https://i.pinimg.com/control2/736x/ba/dd/b9/baddb9ef421c96bd27a89784568e6f85.jpg", 
  };

  return (
    <div className="max-w-screen-lg p-6 mx-auto">
      {/* Filters Section */}
      <div className="flex items-center justify-between mb-4">
       
        <div className="flex items-center space-x-4">
          <select className="px-3 py-2 border rounded">
            <option value={0}>Buying Format</option>
            <option>Best Offer</option>
            <option>Auction</option>
            <option>Buy It Now</option>
          </select>
          <select className="px-3 py-2 border rounded">
            <option>Condition</option>
            <option>New</option>
            <option>Not Specified</option>
          </select>
          <select className="px-1 py-2 border rounded">
            <option>Price</option>
            <option>Under Rs.30000</option>
            <option>Rs.30000 - Rs.100000</option>
            <option>Over Rs.100 000</option>
          </select>
        </div>
      </div>

      {/* Results Section */}
      <div className="p-4 border rounded shadow-sm">
        <div className="flex">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="object-cover w-40 h-40 mr-4 rounded"
          />
          <div className="flex flex-row space-x-96">
            <div>
            <h2 className="text-xl font-semibold">{item.title}</h2>
            <p className="text-2xl font-bold text-green-600">{item.price}</p>
            </div>
            <div className="items-end mt-2 text-gray-500">
              <p>{item.bids}</p>
              <p>{item.timeLeft}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionPage;
