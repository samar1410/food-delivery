import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FaUser, FaEnvelope, FaSignOutAlt, FaTimes } from "react-icons/fa";

const ProfileModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isOpen) return;
    const fetchData = async () => {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return;
      setEmail(session.user.email);
      const { data } = await supabase
        .from("profiles")
        .select("name")
        .eq("id", session.user.id)
        .single();
      setProfile(data);
      setLoading(false);
    };
    fetchData();
  }, [isOpen]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out successfully!");
    onClose();
    navigate("/login");
  };

  if (!isOpen) return null;

  const initials = profile?.name
    ? profile.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl w-full max-w-xs shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - برتقالي جريء */}
        <div className="bg-brand-orange px-6 pt-10 pb-16 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition cursor-pointer"
          >
            <FaTimes className="text-xs" />
          </button>
          <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-1">My Account</p>
          <h2 className="text-white text-2xl font-extrabold tracking-tight">
            {loading ? "..." : profile?.name || "User"}
          </h2>
        </div>

        {/* Avatar فوق الفاصل */}
        <div className="relative px-6 -mt-10 mb-4">
          <div className="w-20 h-20 rounded-2xl bg-[#0D0D0D] flex items-center justify-center text-white text-2xl font-black shadow-xl border-4 border-white">
            {loading ? <FaUser /> : initials}
          </div>
        </div>

        {/* بيانات */}
        <div className="px-6 space-y-3 mb-6">
          {/* الاسم */}
          <div className="flex items-center gap-3 bg-gray-50 rounded-2xl px-4 py-3">
            <div className="w-9 h-9 rounded-xl bg-brand-orange/10 flex items-center justify-center shrink-0">
              <FaUser className="text-brand-orange text-sm" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Name</p>
              <p className="text-sm font-extrabold text-[#0D0D0D]">
                {loading ? "..." : profile?.name || "User"}
              </p>
            </div>
          </div>

          {/* الإيميل */}
          <div className="flex items-center gap-3 bg-gray-50 rounded-2xl px-4 py-3">
            <div className="w-9 h-9 rounded-xl bg-brand-orange/10 flex items-center justify-center shrink-0">
              <FaEnvelope className="text-brand-orange text-sm" />
            </div>
            <div className="overflow-hidden">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Email</p>
              <p className="text-sm font-extrabold text-[#0D0D0D] truncate">
                {loading ? "..." : email}
              </p>
            </div>
          </div>
        </div>

        {/* Sign Out */}
        <div className="px-6 pb-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-[#0D0D0D] hover:bg-red-600 text-white font-extrabold text-sm py-4 rounded-2xl transition-all duration-300 cursor-pointer group"
          >
            <FaSignOutAlt className="group-hover:rotate-12 transition-transform duration-300" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;