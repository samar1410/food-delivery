import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("menu_items").select("*");
      if (data) {
        setMenuItems(data);
      }
      setLoading(false);
    };
    fetchMenu();
  }, []);

  if (loading) return <div className="text-center py-20">Loading menu...</div>;

  return (
    <div className="px-4 md:px-16 py-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Our Menu</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {menuItems.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-4">
            <img src={item.image_url} alt={item.name} className="w-full h-40 object-cover rounded-xl mb-4" />
            <h3 className="font-bold text-lg">{item.name}</h3>
            <p className="text-gray-500 text-sm mb-2">{item.description}</p>
            <div className="flex justify-between items-center mt-4">
              <span className="font-bold text-brand-orange">£{item.price}</span>
              <button className="bg-brand-dark text-white px-4 py-2 rounded-full text-sm hover:bg-black">
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;