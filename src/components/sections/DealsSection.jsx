import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getDeals } from "../../supabaseQueries";

const FILTERS = ["Vegan", "Sushi", "Pizza & Fast food", "Others"];

const DealsSection = () => {
  const [activeFilter, setActiveFilter] = useState("Pizza & Fast food");
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeals = async () => {
      setLoading(true);
      const data = await getDeals(activeFilter);
      setDeals(data);
      setLoading(false);
    };
    fetchDeals();
  }, [activeFilter]); // بيتشغل كل ما activeFilter يتغير

  return (
    <section className="px-4 md:px-16 py-10 bg-white">
      <div className="max-w-6xl mx-auto">

        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h2 className="text-xl md:text-2xl font-extrabold text-[#0D0D0D]">
            Up to -40% 🏷️ Order.uk exclusive deals
          </h2>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 flex-wrap">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition cursor-pointer whitespace-nowrap ${
                  activeFilter === filter
                    ? "bg-brand-orange text-white border-brand-orange"
                    : "bg-white text-[#0D0D0D] border-gray-200 hover:border-brand-orange hover:text-brand-orange"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-2xl bg-gray-100 animate-pulse"
                style={{ height: "200px" }}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && deals.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-4xl mb-3">🍽️</p>
            <p className="font-bold">No deals available right now</p>
          </div>
        )}

        {/* Deal Cards Grid */}
        {!loading && deals.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {deals.map((deal) => (
              <Link
                to="/menu"
                key={deal.id}
                className="relative rounded-2xl overflow-hidden group cursor-pointer block"
                style={{ height: "200px" }}
              >
                {/* Background Image */}
                {deal.img_url ? (
                  <img
                    src={deal.img_url}
                    alt={deal.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.parentElement.style.background =
                        "linear-gradient(135deg, #1a1a1a, #333)";
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900" />
                )}

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10" />

                {/* Discount Badge */}
                <div className="absolute top-3 left-3 bg-[#0D0D0D] text-white text-xs font-extrabold px-3 py-1 rounded-md">
                  {deal.discount}
                </div>

                {/* Restaurant Info */}
                <div className="absolute bottom-4 left-4">
                  <p className="text-brand-orange text-xs font-semibold mb-0.5">
                    {deal.category}
                  </p>
                  <p className="text-white font-extrabold text-base leading-tight">
                    {deal.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default DealsSection;
