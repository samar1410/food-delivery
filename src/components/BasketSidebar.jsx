import React from "react";

const BasketSidebar = ({ cart, removeFromCart }) => {
  const subTotal = cart.reduce((t, i) => t + i.price * i.quantity, 0);

  return (
    <div className="hidden lg:block w-64 shrink-0">
      <div className="bg-brand-green rounded-2xl px-4 py-3 flex items-center gap-3 mb-3">
        <span className="text-white text-xl">🧺</span>
        <h3 className="text-white font-extrabold">My Basket</h3>
      </div>
      {cart.length === 0 ? (
        <div className="bg-white rounded-2xl p-4 text-center text-gray-400 text-sm">
          Your basket is empty
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {cart.map((item, idx) => (
            <div
              key={item.id}
              className={`flex items-center gap-2 px-3 py-2.5 ${
                idx !== cart.length - 1 ? "border-b border-gray-100" : ""
              }`}
            >
              <span className="w-7 h-7 rounded-full bg-brand-orange flex items-center justify-center text-white text-xs font-extrabold shrink-0">
                {item.quantity}x
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-[#0D0D0D] truncate">
                  {item.name}
                </p>
                <p className="text-brand-orange text-xs font-bold">
                  £{(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-gray-300 hover:text-red-400 transition cursor-pointer text-xs"
              >
                ✕
              </button>
            </div>
          ))}
          <div className="px-3 py-3 border-t border-gray-100">
            <div className="bg-brand-orange rounded-xl px-3 py-2 flex justify-between items-center">
              <span className="text-white text-xs font-bold">Total</span>
              <span className="text-white text-sm font-extrabold">
                £{subTotal.toFixed(2)}
              </span>
            </div>
            <a
              href="/cart"
              className="mt-2 w-full bg-brand-green text-white text-xs font-extrabold py-2.5 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition"
            >
              Checkout →
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default BasketSidebar;
