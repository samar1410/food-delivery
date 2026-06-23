import React, { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { supabase } from "../supabase";
import MenuHeader from "../components/MenuHeader";
import MenuSearch from "../components/MenuSearch";
import MenuSidebar from "../components/MenuSidebar";
import MenuGrid from "../components/MenuGrid";
import BasketSidebar from "../components/BasketSidebar";

const MenuPage = () => {
  const { cart, addToCart, removeFromCart } = useApp(); //
  const [menuData, setMenuData] = useState({}); //[cite: 48]
  const [categories, setCategories] = useState([]); //[cite: 48]
  const [activeCategory, setActiveCategory] = useState(""); //[cite: 48]
  const [search, setSearch] = useState(""); //[cite: 48]
  const [loading, setLoading] = useState(true); //[cite: 48]
  const [error, setError] = useState(null); //[cite: 48]

  useEffect(() => {
    const fetchMenu = async () => {
      setLoading(true); //[cite: 48]
      const { data, error } = await supabase
        .from("menu_items")
        .select("*")
        .order("id", { ascending: true }); //[cite: 48]

      if (error) {
        console.error("Error fetching menu:", error); //[cite: 48]
        setError(error.message); //[cite: 48]
        setLoading(false); //[cite: 48]
        return;
      }

      // تحويل البيانات من شكل Array لشكل Object مجمّع حسب الفئة[cite: 48]
      const grouped = {};
      data.forEach((item) => {
        const cat = item.category || "Other"; //[cite: 48]
        if (!grouped[cat]) grouped[cat] = [];
        grouped[cat].push({
          id: item.id,
          name: item.name,
          desc: item.description,
          price: item.price,
          img: item.image_url,
          category: cat,
        }); //[cite: 48]
      });

      // 🌟 الترتيب المثالي والمخصص للسايد بار والمنيو كاملاً
      const predefinedOrder = [
        "Breakfast",
        "Pizzas",
        "Burgers",
        "Pasta",
        "Soups",
        "Salads",
        "Garlic Bread",
        "Cold Drinks",
        "Desserts"
      ];

      // ترتيب الفئات القادمة من الداتا بيز بناءً على الترتيب المكتوب فوق
      const cats = Object.keys(grouped).sort((a, b) => {
        const indexA = predefinedOrder.indexOf(a);
        const indexB = predefinedOrder.indexOf(b);

        // لو فيه فئة جديدة ضفتيها مش مكتوبة في المصفوفة فوق، تترمى في الآخر تلقائي
        if (indexA === -1) return 1;
        if (indexB === -1) return -1;

        return indexA - indexB;
      });

      setMenuData(grouped); //[cite: 48]
      setCategories(cats); // تحديث الفئات بالترتيب الجديد المظبوط
      setActiveCategory(cats[0] || ""); //[cite: 48]
      setLoading(false); //[cite: 48]
    };

    fetchMenu();
  }, []);

  const getQty = (id) => {
    const item = cart.find((i) => i.id === id); //[cite: 48]
    return item ? item.quantity : 0; //[cite: 48]
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-inter">
        <p className="text-gray-400 font-bold">Loading menu...</p>
      </div>
    ); //[cite: 48]
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center font-inter">
        <p className="text-red-500 font-bold">Failed to load menu: {error}</p>
      </div>
    ); //[cite: 48]
  }

  const filteredItems = search
    ? {
        items: categories.flatMap((cat) =>
          menuData[cat].filter(
            (item) =>
              item.name.toLowerCase().includes(search.toLowerCase()) ||
              (item.desc && item.desc.toLowerCase().includes(search.toLowerCase()))
          ).map((item) => ({ ...item, category: cat }))
        ),
        searchQuery: search,
      } //[cite: 48]
    : {
        items: menuData[activeCategory] || [],
        category: activeCategory,
      }; //[cite: 48]

  return (
    <div className="min-h-screen font-inter bg-gray-50">
      <MenuHeader /> {/*[cite: 48] */}
      <MenuSearch search={search} setSearch={setSearch} /> {/*[cite: 48] */}

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        <div className="flex gap-6">
          {/* الـ Sidebar أوتوماتيكياً هيستلم الـ categories مرتبة وجاهزة */}
          {!search && (
            <MenuSidebar
              categories={categories}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
          )} {/*[cite: 48] */}

          <MenuGrid
            filteredItems={filteredItems}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            getQty={getQty}
          /> {/*[cite: 48] */}

          <BasketSidebar cart={cart} removeFromCart={removeFromCart} /> {/*[cite: 48] */}
        </div>
      </div>
    </div>
  );
};

export default MenuPage;