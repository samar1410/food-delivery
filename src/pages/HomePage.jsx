import React, { useState } from "react";
import { Link } from "react-router-dom";
import HeroSection from "../components/sections/HeroSection";
import DealsSection from "../components/sections/DealsSection";
import CategoriesSection from "../components/sections/CategoriesSection";

const HomePage = () => {
  const [email, setEmail] = useState("");

  return (
    <div className="bg-white font-inter">
      <HeroSection />
      <DealsSection />
        <CategoriesSection />
      
    </div>
  );
};

export default HomePage;
