import React from "react";
import { FaTag, FaArrowRight, FaCheck } from "react-icons/fa";
import { toast } from "react-hot-toast";

const VALID_COUPONS = { ORDER5: 5, SAVE10: 10 };

const CartCoupon = ({
  showCouponInput, setShowCouponInput,
  couponInput, setCouponInput,
  appliedCoupon, setAppliedCoupon,
  setCouponDiscount,
}) => {
  const handleApplyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (VALID_COUPONS[code]) {
      setCouponDiscount(VALID_COUPONS[code]);
      setAppliedCoupon(code);
      setShowCouponInput(false);
      toast.success(`Coupon "${code}" applied! -£${VALID_COUPONS[code]}`);
    } else {
      toast.error("Invalid coupon code!");
    }
  };

  return (
    <div className="mb-4">
      {!appliedCoupon ? (
        <>
          <button
            onClick={() => setShowCouponInput(!showCouponInput)}
            className="w-full bg-white rounded-xl px-5 py-3.5 flex items-center justify-between text-sm font-semibold text-[#0D0D0D] shadow-sm hover:shadow-md transition cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <FaTag className="text-brand-green text-xs" />
              Apply Coupon Code here
            </span>
            <div className="w-8 h-8 rounded-full bg-brand-green flex items-center justify-center text-white">
              <FaArrowRight className="text-xs" />
            </div>
          </button>
          {showCouponInput && (
            <div className="bg-white rounded-xl shadow-sm mt-1 px-4 py-3 flex gap-2 border border-gray-100">
              <input
                type="text"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
                placeholder="Enter coupon code..."
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-orange transition"
              />
              <button
                onClick={handleApplyCoupon}
                className="bg-brand-green text-white text-sm font-bold px-4 py-2 rounded-lg hover:opacity-90 transition cursor-pointer"
              >
                Apply
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="bg-green-50 border border-green-200 rounded-xl px-5 py-3.5 flex items-center justify-between">
          <span className="text-green-700 text-sm font-bold flex items-center gap-2">
            <FaCheck /> Coupon "{appliedCoupon}" applied!
          </span>
          <button
            onClick={() => { setAppliedCoupon(null); setCouponDiscount(0); setCouponInput(""); }}
            className="text-red-400 text-xs hover:text-red-600 cursor-pointer font-semibold"
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
};

export default CartCoupon;