import React from "react";

const MenuSidebar = ({ categories, activeCategory, setActiveCategory }) => {
  return (
    <div className="hidden md:flex flex-col gap-1 w-44 shrink-0">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setActiveCategory(cat)}
          className={`text-left px-4 py-2.5 rounded-xl text-sm font-bold transition cursor-pointer ${
            activeCategory === cat
              ? "bg-brand-orange text-white shadow-md"
              : "text-[#0D0D0D] hover:bg-gray-100"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default MenuSidebar;