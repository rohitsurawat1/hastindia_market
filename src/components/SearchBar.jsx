/* eslint-disable jsx-a11y/role-has-required-aria-props */
import React, { useState } from "react";

const SearchBar = () => {
  // State for the search term
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Search Term Submitted: ", searchTerm);
    // You can add your search logic here
  };

  return (
    <form
      onSubmit={handleSearchSubmit}
      className="relative flex items-center w-full max-w-lg mx-auto rounded-xl bg-gray-100 shadow-sm"
    >
      {/* Search Input */}
      <input
        id="global-enhancements-search-query"
        type="text"
        name="search_query"
        placeholder="Search for anything"
        value={searchTerm} // Bound to state
        onChange={(e) => setSearchTerm(e.target.value)} // Update state
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        role="combobox"
        aria-autocomplete="both"
        aria-expanded="false"
        className="w-full py-2 pl-4 pr-10 text-gray-700 placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Clear Button */}
      {searchTerm && (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => setSearchTerm("")} // Clear search input
          className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-5 w-5"
          >
            <path
              d="M13.414,12l6.293-6.293a1,1,0,0,0-1.414-1.414L12,10.586,5.707,4.293A1,1,0,0,0,4.293,5.707L10.586,12,4.293,18.293a1,1,0,1,0,1.414,1.414L12,13.414l6.293,6.293a1,1,0,0,0,1.414-1.414Z"
              fill="currentColor"
            />
          </svg>
        </button>
      )}

      {/* Submit/Search Button */}
      <button
        type="submit"
        aria-label="Search"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-all"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="h-5 w-5"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.5 19a8.46 8.46 0 0 0 5.262-1.824l4.865 4.864 1.414-1.414-4.865-4.865A8.5 8.5 0 1 0 10.5 19m0-2a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13"
            fill="currentColor"
          />
        </svg>
      </button>
    </form>
  );
};

export default SearchBar;
