import React from "react";
import { FaCheck } from "react-icons/fa";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { toast } from "react-hot-toast";

const FREE_ITEMS = [
  { id: "free1", name: "Garlic Bread", emoji: "🍞" },
  { id: "free2", name: "Coke 330ml", emoji: "🥤" },
  { id: "free3", name: "cold drink", emoji: "🍦" },
];

const CartFreeItem = ({ showFreeItems, setShowFreeItems, selectedFreeItem, setSelectedFreeItem }) => {
  return (
    <div className="mb-2">
      <button
        onClick={() => setShowFreeItems(!showFreeItems)}
        className="w-full bg-white rounded-xl px-5 py-3.5 flex items-center justify-between text-sm font-semibold text-[#0D0D0D] shadow-sm hover:shadow-md transition cursor-pointer"
      >
        <span>
          {selectedFreeItem ? `✅ Free item: ${selectedFreeItem.name}` : "Choose your free item.."}
        </span>
        {showFreeItems ? <FiChevronUp className="text-gray-400" /> : <FiChevronDown className="text-gray-400" />}
      </button>
      {showFreeItems && (
        <div className="bg-white rounded-xl shadow-sm mt-1 overflow-hidden border border-gray-100">
          {FREE_ITEMS.map((freeItem) => (
            <button
              key={freeItem.id}
              onClick={() => {
                setSelectedFreeItem(freeItem);
                setShowFreeItems(false);
                toast.success(`${freeItem.name} added for free! 🎁`);
              }}
              className={`w-full flex items-center gap-3 px-5 py-3 text-sm font-semibold hover:bg-orange-50 transition cursor-pointer ${
                selectedFreeItem?.id === freeItem.id ? "bg-orange-50 text-brand-orange" : "text-[#0D0D0D]"
              }`}
            >
              <span className="text-xl">{freeItem.emoji}</span>
              {freeItem.name}
              {selectedFreeItem?.id === freeItem.id && <FaCheck className="ml-auto text-brand-orange text-xs" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartFreeItem;