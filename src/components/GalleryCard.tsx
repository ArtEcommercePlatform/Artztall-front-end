import React, { useState } from "react";
import logo2 from "../assets/images/ima2.jpg";
import logo3 from "../assets/images/logo4.jpg";
import logo4 from "../assets/images/logo3.jpg";
import Card from "../components/Card";
import Search from "../components/Search";

function GalleryCard() {
  const [data] = useState([
    { title: "Hiroosha Madhushan", image: logo2, category: "Management", price: 150 },
    { title: "Haritha Nmawarathna", image: logo3, category: "Development", price: 200 },
    { title: "Nimal Kodagoda", image: logo4, category: "Design", price: 100 },
    { title: "Hiroosha Madhushan", image: logo2, category: "Management", price: 180 },
    { title: "Haritha Nmawarathna", image: logo3, category: "Development", price: 220 },
    { title: "Nimal Kodagoda", image: logo4, category: "Design", price: 90 },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 300]); // Price range filter
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  // Filter data based on search query, category, and price range
  const filteredData = data.filter(
    (item) =>
      (selectedCategory === "All" || item.category === selectedCategory) &&
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      item.price >= priceRange[0] &&
      item.price <= priceRange[1]
  );

  // Open the modal with selected card details
  const handleReadMore = (item) => {
    setModalData(item);
    setIsModalOpen(true);
  };

  return (
    <div className="dark:bg-slate-300">
      <Search setSearchQuery={setSearchQuery} />

      {/* Category Selection */}
      <div className="flex justify-center gap-20">
      <div className="flex justify-center mt-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border rounded-lg shadow-sm dark:bg-gray-800 dark:text-white"
        >
          <option value="All">All Categories</option>
          <option value="Management">Management</option>
          <option value="Development">Development</option>
          <option value="Design">Design</option>
        </select>
      </div>

      {/* Price Range Selection */}
      
      <div className="flex justify-center mt-4">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-white">
            Price Range: ${priceRange[0]} - ${priceRange[1]}
          </label>
          <input
            type="range"
            min="0"
            max="300"
            step="10"
            value={priceRange[0]}
            onChange={(e) =>
              setPriceRange([parseInt(e.target.value), priceRange[1]])
            }
            className="w-full mb-2 bg-cyan-500"
          />
          <input
            type="range"
            min="0"
            max="300"
            step="10"
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], parseInt(e.target.value)])
            }
            className="w-full"
          />
        </div>
      </div>
      </div>

      {/* Modal */}
      {isModalOpen && modalData && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
          <div className="relative w-full max-w-lg bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 border-b dark:border-gray-600">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {modalData.title}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex items-center justify-center w-8 h-8 text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"
                  />
                </svg>
              </button>
            </div>

            <div className="p-4 space-y-4">
              <img
                src={modalData.image}
                alt={modalData.title}
                className="w-full rounded-md"
              />
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                {modalData.title} is in the {modalData.category} category with a price
                of ${modalData.price}.
              </p>
            </div>

            <div className="flex items-center p-4 border-t dark:border-gray-600">
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cards */}
      <div className="flex justify-center mt-5 mb-5">
        <div className="grid grid-cols-1 gap-4 mt-5 mb-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredData.map((detail, index) => (
            <div key={index} className="items-center justify-between w-full m-3">
              <Card data={detail} onReadMore={() => handleReadMore(detail)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GalleryCard;
