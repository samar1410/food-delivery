import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketShopping } from "@fortawesome/free-solid-svg-icons";
import { FiChevronDown } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { useFormik } from "formik";

const TopNav = () => {
  const { cart } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [address, setAddress] = useState("Regent Street, A4, A4201, London");

  // State داخلية للـ Modal عشان نحدث الخريطة لايف وإنتي بتكتبي قبل ما تدوسي حفظ
  const [mapQuery, setMapQuery] = useState("Regent Street, London");

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const handleCopyPromo = () => {
    navigator.clipboard.writeText("ORDER5");
    toast.success("Promo code copied to clipboard! 🎉", {
      duration: 3000,
      position: "top-center",
    });
  };

  // إعداد فورميك
  const formik = useFormik({
    initialValues: {
      newAddress: address,
    },
    onSubmit: (values) => {
      setAddress(values.newAddress);
      setIsModalOpen(false);
      toast.success("Location updated successfully! 📍");
    },
  });

  // فانكشن لتحديث الخريطة لايف لما العميل يغير الكلام في الـ Input
  const handleInputChange = (e) => {
    formik.handleChange(e);
    // بنعمل تحديث للخريطة بس بعد ما يكتب عشان الأداء يكون سريع
    setMapQuery(e.target.value);
  };

  return (
    <div className="bg-white text-brand-dark text-xs md:text-sm py-2 px-4 md:px-16 flex flex-col md:flex-row items-center justify-between gap-3 border-b border-gray-100 font-inter relative">
      {/* 1. البروموكود */}
      <div className="flex items-center gap-2 font-medium text-brand-gray">
        <img
          src="/imgs/star.png"
          alt="Star"
          className="w-5 h-5 object-contain"
        />
        <span>Get 5% Off your first order,</span>
        <span
          onClick={handleCopyPromo}
          className="text-brand-orange font-bold underline cursor-pointer decoration-2 underline-offset-4 hover:opacity-80 transition"
        >
          Promo: ORDER5
        </span>
      </div>

      {/* 2. العنوان الجاري */}
      <div className="flex items-center gap-2 font-medium text-brand-gray">
        <img
          src="/imgs/Location.png"
          alt="Location"
          className="w-4 h-5 object-contain"
        />
        <span>{address}</span>
        <button
          onClick={() => {
            formik.setFieldValue("newAddress", address);
            setMapQuery(address);
            setIsModalOpen(true);
          }}
          className="text-brand-orange underline font-bold ml-1 cursor-pointer hover:opacity-80 transition decoration-2 underline-offset-4 whitespace-nowrap"
        >
          Change Location
        </button>
      </div>

      {/* 3. كبسولة السلة (اليمين) */}
      <Link
        to="/cart"
        className="bg-brand-green hover:opacity-95 text-white transition rounded-b-xl px-6 py-3 flex items-center gap-4 font-semibold shadow-sm"
      >
        {/* الـ container ده واخد relative عشان الدائرة تتربط بيه بالظبط */}
        <div className="flex items-center border-r border-white/20 pr-3 text-3xl relative pb-1">
          {/* أيقونة السلة الأساسية من Font Awesome */}
          <FontAwesomeIcon icon={faBasketShopping} />

          {/* 🔴 دائرة الـ Badge البرتقالي - متموضعة بالظبط أسفل اليمين زي الفيجما */}
          <span className="absolute -bottom-2  flex h-6 w-6">
            {/* تأثير النبض أو الرادار الشغال علطول لفت الانتباه */}
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>

            {/* الدائرة الثابتة المكتوب جواها علامة الـ + أو عدد الوجبات */}
            <span className="relative inline-flex rounded-full h-4 w-4 bg-brand-orange text-[9px] font-bold items-center justify-center text-white shadow-sm">
              {totalItems > 0 ? totalItems : "+"}
            </span>
          </span>
        </div>

        {/* تفاصيل البيانات */}
        <span className="text-xs whitespace-nowrap">{totalItems} items</span>
        <span className="text-xs whitespace-nowrap text-white">
          GBP {totalPrice ? totalPrice.toFixed(2) : "0.00"}
        </span>

        {/* السهم الصغير */}
        <FiChevronDown className="text-xs opacity-90 border-l border-white/20 pl-2.5 h-4 w-6 shrink-0" />
      </Link>

      {/* 4. الـ Modal بالخريطة اللايف الحقيقية تفاعلية 100% */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 relative shadow-2xl border border-gray-50 animate-fadeIn">
            {/* زرار القفل */}
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-brand-dark transition cursor-pointer text-base"
            >
              ✕
            </button>

            {/* الهيدر */}
            <div className="flex items-center gap-2 mb-5">
              <span className="text-brand-orange text-xl">📍</span>
              <h3 className="text-lg font-bold text-brand-dark font-poppins">
                Change Delivery Location
              </h3>
            </div>

            {/* الفورم */}
            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-brand-gray mb-1.5">
                  Enter your full address
                </label>
                <input
                  type="text"
                  name="newAddress"
                  value={formik.values.newAddress}
                  onChange={handleInputChange} // بيشغل الـ التحديث المباشر
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-brand-dark focus:outline-none focus:border-brand-orange transition font-medium"
                  placeholder="e.g. London, Cairo, Paris..."
                  required
                />
              </div>

              {/* 🌟 الخريطة الحقيقية اللايف التفاعلية المدعومة من Google Maps */}
              <div className="w-full h-44 bg-gray-100 rounded-xl relative overflow-hidden border border-gray-200 shadow-inner">
                {mapQuery ? (
                  <iframe
                    title="Google Map Live"
                    width="100%"
                    height="100%"
                    border="0"
                    marginHeight="0"
                    marginWidth="0"
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                    className="rounded-xl border-0"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-brand-gray font-medium">
                    Please enter an address to load the map...
                  </div>
                )}
              </div>

              {/* الأزرار */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 border border-gray-200 text-brand-dark font-semibold text-sm py-2.5 rounded-xl hover:bg-gray-50 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-brand-orange text-white font-semibold text-sm py-2.5 rounded-xl hover:opacity-90 transition shadow-md shadow-orange-500/10 cursor-pointer"
                >
                  Save Location
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopNav;
