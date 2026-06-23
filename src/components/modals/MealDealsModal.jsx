import React, { useState, useEffect } from "react";
import { useModal } from "../../context/ModalContext";
import { supabase } from "../../supabase";
import { FaPlus, FaMinus } from "react-icons/fa";
import { toast } from "react-hot-toast";

const MealDealsModal = () => {
  const { modals, closeModal, addToCart } = useModal();
  const { isOpen, data } = modals.mealDeals;
  const [selectedItems, setSelectedItems] = useState({});
  const [dealItems, setDealItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen || !data?.category) return;

    const fetchSameCategoryItems = async () => {
      setLoading(true);
      const { data: items, error } = await supabase
        .from("menu_items")
        .select("*")
        .eq("category", data.category)
        .order("id", { ascending: true });

      if (error) {
        console.error("Error fetching deal items:", error);
        setDealItems([]);
      } else {
        setDealItems(
          items.map((item) => ({
            id: item.id,
            name: item.name,
            img: item.image_url,
          }))
        );
      }
      setLoading(false);
    };

    fetchSameCategoryItems();
  }, [isOpen, data?.category]);

  if (!isOpen) return null;

  const handleQuantityChange = (itemId, delta) => {
    setSelectedItems((prev) => ({
      ...prev,
      [itemId]: Math.max(1, (prev[itemId] || 1) + delta),
    }));
  };

  const getQuantity = (itemId) => selectedItems[itemId] || 1;
  const isSelected = (itemId) => selectedItems[itemId] !== undefined;

  const handleAdd = () => {
    const selected = dealItems.filter((i) => isSelected(i.id)).map((i) => ({ ...i, quantity: getQuantity(i.id) }));
    if (selected.length === 0) {
      toast.error("Please select at least one item!");
      return;
    }
    addToCart({ ...data, mealDealItems: selected });
    toast.success("Meal Deal added!", { duration: 1500 });
    closeModal("mealDeals");
    setSelectedItems({});
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full my-6 relative">
        <div className="absolute top-4 right-4 z-10">
          <button onClick={() => closeModal("mealDeals")} className="w-10 h-10 bg-brand-orange rounded-full flex items-center justify-center text-white text-xl font-bold hover:bg-orange-600 transition">✕</button>
        </div>

        <div className="h-48 bg-gradient-to-b from-orange-200 to-yellow-100 overflow-hidden">
          {data?.img && <img src={data.img} alt={data.title} className="h-full w-full object-cover" />}
        </div>

        <div className="p-6">
          <div className="mb-4 text-sm font-bold text-gray-600">Special Offers &gt; {data?.title || "Meal Deal"}</div>
          <h2 className="text-2xl font-extrabold text-[#0D0D0D] mb-6">Please select your {data?.selectText || "item"}</h2>

          {loading ? (
            <p className="text-gray-400 text-sm text-center py-8">Loading options...</p>
          ) : dealItems.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-8">No other items found in this category.</p>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {dealItems.map((item) => {
                const qty = getQuantity(item.id);
                const selected = isSelected(item.id);
                return (
                  <div key={item.id} className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition cursor-pointer ${selected ? "bg-[#0D0D0D] border-brand-orange" : "bg-gray-100 border-transparent hover:bg-gray-200"}`}
                    onClick={() => { if (!selected) setSelectedItems((prev) => ({ ...prev, [item.id]: 1 })); }}>
                    <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-white">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.src = "https://placehold.co/100x100?text=Food"; }}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-extrabold text-lg ${selected ? "text-brand-orange" : "text-[#0D0D0D]"}`}>{item.name}</h3>
                    </div>
                    {selected && (
                      <div className="flex items-center gap-3">
                        <button onClick={(e) => { e.stopPropagation(); handleQuantityChange(item.id, -1); }} className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-[#0D0D0D]"><FaMinus className="text-xs" /></button>
                        <span className="text-white font-extrabold text-lg w-8 text-center">{qty}</span>
                        <button onClick={(e) => { e.stopPropagation(); handleQuantityChange(item.id, 1); }} className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-[#0D0D0D]"><FaPlus className="text-xs" /></button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <button onClick={() => closeModal("mealDeals")} className="text-gray-600 font-bold underline cursor-pointer hover:text-gray-800">Take me back</button>
              <div className="flex items-center gap-3">
                <div className="bg-brand-orange px-4 py-2 rounded-lg">
                  <span className="text-white text-sm font-bold">£{data?.price.toFixed(2)}</span>
                </div>
                <button onClick={handleAdd} className="bg-brand-green text-white font-bold py-2.5 px-8 rounded-xl hover:opacity-90 transition">→ Next Step</button>
              </div>
            </div>
            <p className="text-gray-400 text-xs mt-3 text-center">Delivery & Tax will be calculated in the next step</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealDealsModal;