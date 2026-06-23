import React from "react";

const CartSummary = ({ subTotal, couponDiscount, appliedCoupon, deliveryMode, deliveryFee, total }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm px-5 py-4 mb-4 space-y-2">
      <div className="flex justify-between text-sm font-semibold text-[#0D0D0D]">
        <span>Sub Total:</span>
        <span>£{subTotal.toFixed(2)}</span>
      </div>
      {couponDiscount > 0 && (
        <div className="flex justify-between text-sm font-semibold text-green-600">
          <span>Discount ({appliedCoupon}):</span>
          <span>-£{couponDiscount.toFixed(2)}</span>
        </div>
      )}
      <div className="flex justify-between text-sm font-semibold text-[#0D0D0D]">
        <span>Delivery Fee:</span>
        <span>{deliveryMode === "delivery" ? `£${deliveryFee.toFixed(2)}` : "Free"}</span>
      </div>
      <div className="border-t border-gray-100 pt-3 mt-2">
        <div className="bg-brand-orange rounded-xl px-5 py-3.5 flex justify-between items-center">
          <span className="text-white font-bold text-sm">Total to pay</span>
          <span className="text-white font-extrabold text-xl">£{total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;