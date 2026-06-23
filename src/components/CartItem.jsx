import React from "react";
import { FaTrash } from "react-icons/fa";

const CartItem = ({ item, removeFromCart, isLast }) => {
  return (
    <div className={`flex items-start gap-4 px-5 py-4 ${!isLast ? "border-b border-gray-100" : ""}`}>
      <div className="w-9 h-9 rounded-full bg-brand-orange flex items-center justify-center text-white text-sm font-extrabold shrink-0 mt-1">
        {item.quantity}x
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-brand-orange font-extrabold text-sm">£{(item.price * item.quantity).toFixed(2)}</p>
        <p className="text-[#0D0D0D] font-bold text-sm">{item.name}</p>
      </div>
      <button
        onClick={() => removeFromCart(item.id)}
        className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-red-50 flex items-center justify-center text-gray-400 hover:text-red-500 transition cursor-pointer shrink-0 mt-1"
      >
        <FaTrash className="text-xs" />
      </button>
    </div>
  );
};

export default CartItem;