import React, { useState } from "react";
import { useModal } from "../../context/ModalContext";
import { FaCheck } from "react-icons/fa";
import { toast } from "react-hot-toast";

const FreeItemModal = () => {
  const { modals, closeModal, addToCart } = useModal();
  const { isOpen, data } = modals.freeItem;
  const [selectedItems, setSelectedItems] = useState({});

  if (!isOpen) return null;

  const freeItems = data?.items || [
    { id: 1, name: "Coca Cola", img: "/drinks/drink1.jpg" },
    { id: 2, name: "Mango Juice", img: "/drinks/drink2.jpg" },
    { id: 3, name: "Iced Latte", img: "/drinks/drink3.jpg" },
    { id: 4, name: "Cold Brew", img: "/drinks/drink5.jpg" },
    { id: 5, name: "Lemonade", img: "/drinks/drink6.jpg" },
    { id: 6, name: "Pineapple Juice", img: "/drinks/drink8.jpg" },
  ];

  const maxItems = data?.maxItems || 1;
  const selectedCount = Object.keys(selectedItems).length;

  const toggleItem = (itemId) => {
    if (selectedItems[itemId] !== undefined) {
      setSelectedItems((prev) => { const n = { ...prev }; delete n[itemId]; return n; });
    } else if (selectedCount < maxItems) {
      setSelectedItems((prev) => ({ ...prev, [itemId]: 1 }));
    }
  };

  const handleAdd = () => {
    if (selectedCount === 0) {
      toast.error("Please select a free item!");
      return;
    }
    const selected = freeItems.filter((i) => selectedItems[i.id] !== undefined);
    addToCart({ ...data, freeItems: selected, price: data.price });
    toast.success("Added with free item! 🎁", { duration: 1500 });
    closeModal("freeItem");
    setSelectedItems({});
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full my-6 relative">
        <div className="absolute top-4 right-4 z-10">
          <button onClick={() => closeModal("freeItem")} className="w-10 h-10 bg-brand-orange rounded-full flex items-center justify-center text-white text-xl font-bold hover:bg-orange-600 transition">✕</button>
        </div>

        <div className="h-48 bg-gradient-to-b from-orange-200 to-yellow-100 overflow-hidden">
          {data?.img && <img src={data.img} alt={data.name} className="h-full w-full object-cover" />}
        </div>

        <div className="p-6">
          <div className="mb-4 text-sm font-bold text-gray-600">Special Offers &gt; {data?.itemName || "Free Item"}</div>

          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-extrabold text-[#0D0D0D]">Choose your free item</h2>
              <p className="text-orange-500 font-bold text-lg mt-1">Select up to {maxItems} free!</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-gray-600">{selectedCount}/{maxItems} Selected</p>
              {selectedCount < maxItems && (
                <p className="text-xs text-blue-600 font-bold mt-1">You can select {maxItems - selectedCount} more free</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto">
            {freeItems.map((item) => {
              const selected = selectedItems[item.id] !== undefined;
              return (
                <div key={item.id} onClick={() => toggleItem(item.id)}
                  className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition cursor-pointer ${selected ? "bg-gray-100 border-brand-orange" : "bg-white border-gray-200 hover:border-gray-300"} ${!selected && selectedCount >= maxItems ? "opacity-50 cursor-not-allowed" : ""}`}>
                  <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-extrabold text-[#0D0D0D]">{item.name}</h3>
                  </div>
                  {selected && <FaCheck className="text-brand-orange text-lg flex-shrink-0" />}
                </div>
              );
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <button onClick={() => closeModal("freeItem")} className="text-gray-600 font-bold underline cursor-pointer hover:text-gray-800">Take me back</button>
              <div className="flex items-center gap-3">
                <div className="bg-brand-orange px-4 py-2 rounded-lg">
                  <span className="text-white text-sm font-bold">£{data?.price.toFixed(2)}</span>
                </div>
                <button onClick={handleAdd} className="bg-brand-green text-white font-bold py-2.5 px-8 rounded-xl hover:opacity-90 transition">✓ Add</button>
              </div>
            </div>
            <p className="text-gray-400 text-xs mt-3 text-center">Delivery & Tax will be calculated in the next step</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeItemModal;