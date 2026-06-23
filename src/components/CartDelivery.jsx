import React from "react";
import { MdDeliveryDining, MdStorefront } from "react-icons/md";

const CartDelivery = ({ deliveryMode, setDeliveryMode }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm px-5 py-4 mb-4">
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => setDeliveryMode("delivery")}
          className={`flex flex-col items-center gap-1.5 border-2 rounded-xl py-3 cursor-pointer transition ${
            deliveryMode === "delivery" ? "border-brand-green" : "border-gray-100 hover:border-gray-300"
          }`}
        >
          <MdDeliveryDining className={`text-2xl ${deliveryMode === "delivery" ? "text-brand-green" : "text-gray-400"}`} />
          <span className={`text-sm font-extrabold ${deliveryMode === "delivery" ? "text-[#0D0D0D]" : "text-gray-400"}`}>Delivery</span>
          <span className="text-xs text-gray-400">Starts at 17:50</span>
        </button>
        <button
          onClick={() => setDeliveryMode("collection")}
          className={`flex flex-col items-center gap-1.5 border-2 rounded-xl py-3 cursor-pointer transition ${
            deliveryMode === "collection" ? "border-brand-green" : "border-gray-100 hover:border-gray-300"
          }`}
        >
          <MdStorefront className={`text-2xl ${deliveryMode === "collection" ? "text-brand-green" : "text-gray-400"}`} />
          <span className={`text-sm font-extrabold ${deliveryMode === "collection" ? "text-[#0D0D0D]" : "text-gray-400"}`}>Collection</span>
          <span className="text-xs text-gray-400">Starts at 16:50</span>
        </button>
      </div>
    </div>
  );
};

export default CartDelivery;