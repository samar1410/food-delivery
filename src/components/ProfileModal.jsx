import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#0D0D0D] text-white py-16">
      <div className="container mx-auto px-6">
        {/* الجزء العلوي: اللوجو والاشتراك */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* عمود اللوجو والتحميل */}
          <div className="space-y-4">
            <h1 className="text-3xl font-extrabold text-brand-orange">Order<span className="text-black bg-white px-1 rounded">.uk</span></h1>
            <div className="flex flex-col gap-3">
              <img src="/app-store.png" alt="App Store" className="w-32 cursor-pointer" />
              <img src="/google-play.png" alt="Google Play" className="w-32 cursor-pointer" />
            </div>
            <p className="text-gray-400 text-xs mt-4">Company # 490039-445, Registered with House of companies.</p>
          </div>

          {/* اشتراك الإيميل */}
          <div className="lg:col-span-2 bg-[#1A1A1A] p-6 rounded-2xl flex flex-col justify-center">
            <h3 className="font-bold text-lg mb-4">Get Exclusive Deals in your Inbox</h3>
            <div className="flex bg-white rounded-full p-1 max-w-md">
              <input type="email" placeholder="youremail@gmail.com" className="w-full px-4 py-2 text-black rounded-full outline-none" />
              <button className="bg-brand-orange text-white px-6 py-2 rounded-full font-bold">Subscribe</button>
            </div>
            <p className="text-gray-500 text-xs mt-3">we won't spam, read our email policy</p>
          </div>

          {/* روابط قانونية وروابط مهمة */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold mb-4">Legal Pages</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>Terms and conditions</li>
                <li>Privacy</li>
                <li>Cookies</li>
                <li>Modern Slavery Statement</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Important Links</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>Get help</li>
                <li>Add your restaurant</li>
                <li>Sign up to deliver</li>
                <li>Create a business account</li>
              </ul>
            </div>
          </div>
        </div>

        {/* الجزء السفلي: الحقوق والسوشيال */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs">
          <p>© 2024 Order.uk Copyright 2024, All Rights Reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <span>Privacy Policy</span>
            <span>Terms</span>
            <span>Pricing</span>
            <span>Do not sell or share my personal information</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;