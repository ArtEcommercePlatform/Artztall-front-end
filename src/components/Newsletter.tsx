import React from "react"
const Newsletter = () => (
  <div className="bg-[#094129] text-white">
    <div className="px-4 py-16 mx-auto max-w-7xl sm:px-6">
      <div className="text-center">
        <h3 className="mb-4 text-2xl font-bold">Join Our Art Community</h3>
        <p className="mb-6">
          Subscribe to get updates on new artworks and exclusive offers
        </p>
        <div className="flex max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 text-gray-800 rounded-l-full focus:outline-none"
          />
          <button className="bg-white text-[#094129] px-6 py-2 rounded-r-full font-semibold hover:bg-opacity-90">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default Newsletter;
