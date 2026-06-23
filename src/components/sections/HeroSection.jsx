import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  const [postcode, setPostcode] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/menu");
  };

  return (
    <section className="md:mx-6 md:mt-4">
      <div className="relative bg-[#FBFBFB]  h-auto border border-black/10 rounded-3xl overflow-hidden">
        {/* المحتوى النصي + السيرش - فوق كل حاجة */}
        <div className="grid md:grid-cols-2 items-center  gap-8 px-6 md:px-14 py-10 md:py-16 relative z-30">
          <div>
            <p className="text-xs md:text-sm text-gray-400 mb-3">
              Order Restaurant food, takeaway and groceries.
            </p>
            <h1 className="font-poppins font-extrabold text-3xl md:text-5xl leading-tight text-brand-dark">
              Feast Your Senses,
              <br />
              <span className="text-brand-orange">Fast and Fresh</span>
            </h1>
            <p className="text-xs md:text-sm text-gray-400 mt-5 mb-3">
              Enter a postcode to see what we deliver
            </p>
            <form
              onSubmit={handleSearch}
              className="flex items-center bg-white border border-gray-200 rounded-full overflow-hidden max-w-md shadow-sm"
            >
              <input
                type="text"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                placeholder="e.g. EC4R 3TE"
                className="flex-1 px-5 py-3 text-sm text-brand-dark outline-none"
              />
              <button
                type="submit"
                className="bg-brand-orange text-white px-20 py-3 font-semibold text-sm hover:opacity-90 transition cursor-pointer rounded-4xl"
              >
                Search
              </button>
            </form>
          </div>

          {/* عمود فاضي بس عشان يحجز نص المساحة للصور المطلقة تحت */}
          <div className="hidden md:block" />
        </div>

        {/* الجزء البصري بالكامل - الشكل البرتقالي + الصورتين + الكروت + الأرقام */}
        <div className="hidden md:block absolute inset-y-0 right-0 w-[54%] z-0">
          {/* الشكل البرتقالي في الخلفية */}
          <img
            src="/hero/hero3.png"
            alt=""
            className="absolute ml-60  inset-0 w-lg h-full object-cover z-0"
          />

          {/* الأرقام الشفافة الكبيرة - ديكور فوق الشكل البرتقالي */}
          <span className="absolute top-0 right-33 text-white/40 font-poppins font-extrabold text-6xl select-none z-50 pointer-events-none">
            1
          </span>
          <span className="absolute top-1/3 bottom-56 -translate-y-1/3 right-4 text-white/40 font-poppins font-extrabold text-6xl select-none z-50 pointer-events-none">
            2
          </span>
          <span className="absolute bottom-18 right-30 text-white/40 font-poppins font-extrabold text-6xl select-none z-50 pointer-events-none">
            3
          </span>

          {/* الصورة الكبيرة - البنت بتاكل بيتزا */}
          <img
            src="/hero/hero1.png"
            alt="Girl eating pizza"
            className="absolute left-0 top-1 bottom-2 flex justify-start -translate-x-55 w-[600px] object-cover rounded-2xl  z-20"
          />

          {/* الصورة الصغيرة المتراكبة - البنت بتاكل نودلز */}
          <img
            src="/hero/hero2.png"
            alt="Girl eating noodles"
            className="absolute right-70 bottom-0  w-[35%] h-[300px] object-cover rounded-2xl  z-10"
          />

          {/* كروت إشعارات الأوردر العائمة */}
          <div className="absolute top-12 right-30 bg-white rounded-xl shadow-xl p-3 w-70 text-xs z-40">
            <div className="flex justify-between items-center mb-1">
              <p className="font-bold text-brand-dark whitespace-nowrap">Order#</p>
              <span className="text-gray-400 text-[10px]">now</span>
            </div>
            <p className="text-brand-dark font-semibold">We've Received your order!</p>
            <p className="text-gray-400 text-[10px] mt-1">Awaiting Restaurant acceptance</p>
          </div>

          <div className="absolute top-1/2 -translate-y-1/3 right-2 bg-white rounded-xl shadow-xl p-3 w-70 text-xs z-40">
            <div className="flex justify-between items-center mb-1">
              <p className="font-bold text-brand-dark whitespace-nowrap">Order#</p>
              <span className="text-gray-400 text-[10px]">now</span>
            </div>
            <p className="text-brand-dark font-semibold whitespace-nowrap">
              Order Accepted! <span className="text-brand-green">✓</span>
            </p>
            <p className="text-gray-400 text-[10px] mt-1">Your order will be delivered shortly</p>
          </div>

          <div className="absolute bottom-2 right-25 bg-white rounded-xl shadow-xl p-3 w-70 text-xs z-40">
            <div className="flex justify-between items-center mb-1">
              <p className="font-bold text-brand-dark whitespace-nowrap">Order#</p>
              <span className="text-gray-400 text-[10px]">now</span>
            </div>
            <p className="text-brand-dark font-semibold whitespace-nowrap">Your rider's nearby 🛵</p>
            <p className="text-gray-400 text-[10px] mt-1">They're almost there - get ready!</p>
          </div>
        </div>

        {/* نسخة الموبايل - صورة واحدة مبسطة بدل التركيب المعقد */}
        <div className="md:hidden px-6 pb-8">
          <img
            src="/hero/hero1.png"
            alt="Girl eating pizza"
            className="w-full h-56 object-cover rounded-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;