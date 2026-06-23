import React from "react";
import { FaSearch } from "react-icons/fa";

const MenuSearch = ({ search, setSearch }) => {
  return (
    <div className="bg-white border-b border-gray-100 px-4 md:px-16 py-3">
      <div className="max-w-6xl mx-auto">
        <div className="relative max-w-sm">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-sm" />
          <input
            type="text"
            placeholder="Search from menu..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-brand-orange transition"
          />
        </div>
      </div>
    </div>
  );
};

export default MenuSearch;
