import React from "react";

const MenuHeader = () => {
  return (
    <div className="bg-[#0D0D0D] px-4 md:px-16 py-8">
      <div className="max-w-6xl mx-auto flex items-end justify-between gap-6">
        <div>
          <p className="text-gray-400 text-xs mb-1">I'm lovin' it 🍔</p>
          <h1 className="text-white text-3xl md:text-4xl font-extrabold mb-3">
            McDonald's East London
          </h1>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1.5 text-white text-xs font-semibold">
              🛒 Minimum Order: 12 GBP
            </div>
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1.5 text-white text-xs font-semibold">
              🚴 Delivery in 20–25 Minutes
            </div>
          </div>
          <div className="mt-4">
            <span className="bg-brand-orange text-white text-xs font-bold px-4 py-1.5 rounded-full">
              ✅ Open until 3:00 AM
            </span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-3 bg-white/10 rounded-2xl px-5 py-3 shrink-0">
          <div>
            <p className="text-white text-3xl font-extrabold">3.4</p>
            <div className="text-brand-orange text-sm">★★★★☆</div>
            <p className="text-gray-400 text-xs">1,360 reviews</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuHeader;
