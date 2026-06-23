import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { FaArrowRight } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketShopping } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";
import CartFreeItem from "../components/CartFreeItem";
import CartCoupon from "../components/CartCoupon";
import CartDelivery from "../components/CartDelivery";

const DELIVERY_FEE = 2.5;

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useApp();
  const navigate = useNavigate();

  const [deliveryMode, setDeliveryMode] = useState("delivery");
  const [showFreeItems, setShowFreeItems] = useState(false);
  const [selectedFreeItem, setSelectedFreeItem] = useState(null);
  const [couponInput, setCouponInput] = useState("");
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponDiscount, setCouponDiscount] = useState(0);

  const subTotal = cart.reduce((t, i) => t + i.price * i.quantity, 0);
  const deliveryFee = deliveryMode === "delivery" ? DELIVERY_FEE : 0;
  const total = subTotal - couponDiscount + deliveryFee;

  const handleCheckout = () => {
    if (cart.length === 0) return;
    toast.success("Order placed successfully! 🎉");
    clearCart();
    navigate("/home");
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4 px-4">
        <div className="w-24 h-24 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green text-4xl">
          <FontAwesomeIcon icon={faBasketShopping} />
        </div>
        <h2 className="text-2xl font-extrabold text-[#0D0D0D]">Your basket is empty</h2>
        <p className="text-gray-400 text-sm">Add some delicious items to get started!</p>
        <Link to="/menu" className="bg-brand-orange text-white font-bold px-8 py-3 rounded-full mt-2 hover:opacity-90 transition">
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-16">
      <div className="max-w-2xl mx-auto">

        <div className="bg-brand-green rounded-2xl px-6 py-5 flex items-center gap-4 mb-4 shadow-md">
          <div className="text-white text-3xl">
            <FontAwesomeIcon icon={faBasketShopping} />
          </div>
          <h1 className="text-white text-2xl font-extrabold tracking-tight">My Basket</h1>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-4">
          {cart.map((item, idx) => (
            <CartItem
              key={item.id}
              item={item}
              removeFromCart={removeFromCart}
              isLast={idx === cart.length - 1}
            />
          ))}
        </div>

        <CartSummary
          subTotal={subTotal}
          couponDiscount={couponDiscount}
          appliedCoupon={appliedCoupon}
          deliveryMode={deliveryMode}
          deliveryFee={deliveryFee}
          total={total}
        />

        <CartFreeItem
          showFreeItems={showFreeItems}
          setShowFreeItems={setShowFreeItems}
          selectedFreeItem={selectedFreeItem}
          setSelectedFreeItem={setSelectedFreeItem}
        />

        <CartCoupon
          showCouponInput={showCouponInput}
          setShowCouponInput={setShowCouponInput}
          couponInput={couponInput}
          setCouponInput={setCouponInput}
          appliedCoupon={appliedCoupon}
          setAppliedCoupon={setAppliedCoupon}
          setCouponDiscount={setCouponDiscount}
        />

        <CartDelivery deliveryMode={deliveryMode} setDeliveryMode={setDeliveryMode} />

        <button
          onClick={handleCheckout}
          className="w-full bg-brand-green hover:opacity-95 text-white font-extrabold text-lg py-4 rounded-2xl flex items-center justify-center gap-3 shadow-lg transition cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <FaArrowRight className="text-sm" />
          </div>
          Checkout!
        </button>

      </div>
    </div>
  );
};

export default CartPage;