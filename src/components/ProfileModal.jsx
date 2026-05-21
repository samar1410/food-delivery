import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { FaTimes, FaUser, FaPhone, FaEnvelope, FaSignOutAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const ProfileModal = ({ isOpen, onClose }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // دالة لجلب بيانات المستخدم من Supabase
    const fetchProfile = async () => {
      setLoading(true);
      
      // 1. جلب بيانات الـ Auth (الإيميل)
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // 2. جلب البيانات الإضافية من جدول profiles
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (data) {
          setProfile({ ...data, email: user.email });
        } else if (error) {
          console.error("Error fetching profile:", error);
        }
      }
      setLoading(false);
    };

    if (isOpen) {
      fetchProfile();
    }
  }, [isOpen]);

  // دالة تسجيل الخروج
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      onClose(); // إغلاق المودال
      Swal.fire({
        title: "Logged Out",
        text: "See you again soon!",
        icon: "info",
        timer: 2000,
        showConfirmButton: false,
      });
      // إعادة تحميل الصفحة بعد فترة وجيزة لتحديث حالة الواجهة
      setTimeout(() => window.location.reload(), 2000);
    } else {
      Swal.fire("Error", error.message, "error");
    }
  };

  // لو المودال مقفول، ميبقاش فيه حاجة في الـ DOM
  if (!isOpen) return null;

  return (
    // الخلفية المعتمة (Overlay)
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-sm transition-opacity duration-300">
      
    
      <div className="bg-white rounded-3xl shadow-2xl w-200  relative overflow-hidden animate-in fade-in  duration-300 ease-out">
        
        {/* هيدر المودال: صورة البيتزا */}
        <div className="h-40 w-full relative">
          <img 
            src="/imgs/pizza.png" // المسار المباشر من مجلد public
            alt="Pizza Header" 
            className="w-full h-full object-cover"
          />
          {/* تأثير تدرج فوق الصورة لجعل النص أوضح */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent"></div>
        </div>

        {/* زر الإغلاق (X) */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-white hover:text-amber-300 transition-colors z-10 p-1 bg-black/30 rounded-full"
        >
          <FaTimes size={20} />
        </button>
        
        {/* محتوى المودال (البيانات) */}
        <div className="p-8">
          <h2 className="text-3xl font-extrabold mb-1 text-gray-900 tracking-tight">My Profile</h2>
          <p className="text-gray-500 mb-8 text-sm">Welcome back to your account</p>
          
          {loading ? (
            <div className="flex flex-col items-center gap-3 py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
              <p className="text-gray-500 text-sm">Loading profile...</p>
            </div>
          ) : profile ? (
            <div className="space-y-6">
              {/* حقل الاسم */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="bg-amber-100 p-3 rounded-full text-amber-600">
                  <FaUser size={18} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">Full Name</p>
                  <p className="text-base font-semibold text-gray-900">{profile.name}</p>
                </div>
              </div>

              {/* حقل الإيميل */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="bg-amber-100 p-3 rounded-full text-amber-600">
                  <FaEnvelope size={18} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">Email Address</p>
                  <p className="text-base font-semibold text-gray-900">{profile.email}</p>
                </div>
              </div>

              {/* حقل التليفون */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="bg-amber-100 p-3 rounded-full text-amber-600">
                  <FaPhone size={18} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">Phone Number</p>
                  <p className="text-base font-semibold text-gray-900">{profile.phone}</p>
                </div>
              </div>
              
              {/* زر تسجيل الخروج */}
              <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-3 bg-red-50 text-red-600 py-3 rounded-full mt-10 hover:bg-red-100 transition-colors text-sm font-bold"
              >
                <FaSignOutAlt /> Sign Out
              </button>
            </div>
          ) : (
            <div className="text-center py-10 bg-red-50 rounded-2xl border border-red-100">
              <p className="text-red-600 text-sm">Failed to load profile data.</p>
              <p className="text-red-400 text-xs mt-1">Please try logging in again.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;