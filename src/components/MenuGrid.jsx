import React from "react";
import MenuCard from "./MenuCard";

const MenuGrid = ({ filteredItems, addToCart, removeFromCart, getQty }) => {
  return (
    <div className="flex-1">
      <h2 className="text-xl font-extrabold text-[#0D0D0D] mb-4">
        {filteredItems.searchQuery
          ? `Search results for "${filteredItems.searchQuery}"`
          : filteredItems.category}
      </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {filteredItems.items.map((item) => {
          const qty = getQty(item.id);
          return (
            <MenuCard
              key={item.id}
              item={item}
              qty={qty}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
            />
          );
        })}
        {filteredItems.items.length === 0 && (
          <div className="col-span-3 text-center py-16 text-gray-400">
            <p className="text-4xl mb-3">🔍</p>
            <p className="font-bold">No items found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuGrid;
