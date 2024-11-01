const Newsletter = () => (
    <div className="bg-[#094129] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Join Our Art Community</h3>
          <p className="mb-6">Subscribe to get updates on new artworks and exclusive offers</p>
          <div className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-l-full focus:outline-none text-gray-800"
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