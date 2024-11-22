import React, { useState } from "react";

function Search({ setSearchQuery }) {
  const [inputValue, setInputValue] = useState("");

  const handleSearchClick = () => {
    setSearchQuery(inputValue); // Update parent state with the input value
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value); // Update local input state
  };

  return (
    <div className="max-w-full mx-auto mt-5 sm:px-6 lg:px-8">
      
      <div className="relative px-6 py-20 overflow-hidden text-center bg-green-900 isolate sm:px-16 sm:shadow-sm">
      
        <p className="max-w-3xl mx-auto text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Find the Art you were looking for?
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault(); // Prevent page reload
            handleSearchClick(); // Trigger search on form submission
          }}
        >
          <label
            htmlFor="search-bar"
            className="relative flex flex-col items-center justify-center max-w-2xl gap-2 px-2 py-2 mx-auto mt-8 bg-white border shadow-2xl min-w-sm md:flex-row rounded-2xl focus-within:border-gray-300"
          >
            {/* Input Field */}
            <input
              id="search-bar"
              type="text"
              placeholder="Search by name..."
              value={inputValue}
              onChange={handleInputChange}
              className="flex-1 w-full px-6 py-2 bg-white rounded-md outline-none"
            />

            {/* Search Button */}
            <button
              type="submit"
              className="relative px-6 py-3 overflow-hidden text-white transition-all duration-100 bg-black border border-black md:w-auto fill-white active:scale-95 will-change-transform rounded-xl"
            >
              <span className="text-sm font-semibold truncate whitespace-nowrap">
                Search
              </span>
            </button>
          </label>
        </form>
      </div>
      
    </div>
  );
}

export default Search;
