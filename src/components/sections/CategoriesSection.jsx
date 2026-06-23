import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabase";

const CategoriesSection = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("food_categories")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        console.error("Error fetching categories:", error.message);
      } else {
        setCategories(data);
      }
      setLoading(false);
    };
    fetchCategories();
  }, []);

  return (
    <section className="px-4 md:px-16 py-10 bg-white">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <h2 className="text-xl md:text-2xl font-extrabold text-[#0D0D0D] mb-6">
          Order.uk Popular Categories 😍
        </h2>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="rounded-2xl bg-gray-100 animate-pulse h-36" />
                <div className="h-3 bg-gray-100 animate-pulse rounded w-3/4 mx-auto" />
                <div className="h-2 bg-gray-100 animate-pulse rounded w-1/2 mx-auto" />
              </div>
            ))}
          </div>
        )}

        {/* Categories Grid */}
        {!loading && categories.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => navigate("/menu")}
                className="flex flex-col items-center gap-2 group cursor-pointer"
              >
                {/* Card Image */}
                <div className="w-full h-36 rounded-2xl overflow-hidden shadow-sm group-hover:shadow-md transition-all duration-300">
                  <img
                    src={cat.img_url}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.parentElement.style.background = "#f3f4f6";
                    }}
                  />
                </div>

                {/* Text Below Card */}
                <div className="text-center">
                  <p className="text-xs font-extrabold text-[#0D0D0D] group-hover:text-brand-orange transition-colors duration-200">
                    {cat.name}
                  </p>
                  <p className="text-[10px] text-gray-400 font-semibold mt-0.5">
                    {cat.restaurants_count} Restaurants
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && categories.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-4xl mb-3">🍽️</p>
            <p className="font-bold">No categories available</p>
          </div>
        )}

      </div>
    </section>
  );
};

export default CategoriesSection;
