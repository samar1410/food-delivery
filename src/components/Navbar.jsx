import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { supabase } from "../supabase";
import ProfileModal from "./ProfileModal"; // تأكدي إن المسار ده مظبوط

const Navbar = () => {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("");
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    // 1. Check current session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        fetchProfile(session.user.id);
      }
    };

    getSession();

    // 2. Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user);
          fetchProfile(session.user.id);
        } else {
          setUser(null);
          setUserName("");
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("name")
        .eq("id", userId)
        .single();

      if (data && data.name) {
        setUserName(data.name);
      } else {
        setUserName("User");
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  const navLinks = [
    { name: "Home", path: "/home" },
    { name: "Browse Menu", path: "/menu" },
    { name: "Special Offers", path: "/offers" },
    { name: "Restaurants", path: "/restaurants" },
    { name: "Track Order", path: "/track" },
  ];

  return (
    <nav className="bg-white px-4 md:px-16 py-4 flex items-center justify-between font-inter shadow-sm">
      {/* 1. Logo */}
      <Link to="/home" className="flex items-center gap-1 cursor-pointer">
        <img
          src="/imgs/order.png"
          alt="Logo"
          className="h-8 md:h-10 object-contain"
        />
      </Link>

      {/* 2. Navigation Links */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-semibold transition-colors duration-200 relative py-2 ${
                isActive ? "text-brand-orange" : "text-brand-dark hover:text-brand-orange"
              } group`}
            >
              {link.name}
              <span
                className={`absolute bottom-0 left-0 h-0.5 bg-brand-orange rounded-full transition-all duration-300 ${
                  isActive ? "w-full" : "w-0 group-hover:w-full"
                }`}
              ></span>
            </Link>
          );
        })}
      </div>

      {/* 3. Auth Section */}
      <div className="flex items-center  gap-5">
        {user ? (
          <button
            onClick={() => setIsProfileOpen(true)}
            className="bg-brand-dark hover:opacity-95 text-white pr-6 pl-1.5 py-1.5 rounded-full flex items-center gap-3 text-xs md:text-sm font-semibold transition shadow-md h-11 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-brand-orange flex items-center justify-center text-white text-sm shrink-0">
              <FaUser />
            </div>
            <span className="font-bold tracking-wide">
              Hi, {userName || "User"}
            </span>
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-brand-dark hover:opacity-95 text-white pr-6 pl-1.5 py-1.5 rounded-full flex items-center gap-3 text-xs md:text-sm font-semibold transition shadow-md h-11"
          >
            <div className="w-8 h-8 rounded-full bg-brand-orange flex items-center justify-center text-white text-sm shrink-0">
              <FaUser />
            </div>
            <span className="font-bold tracking-wide">Login / Signup</span>
          </Link>
        )}
      </div>

      {/* 4. Profile Modal */}
      <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </nav>
  );
};

export default Navbar;