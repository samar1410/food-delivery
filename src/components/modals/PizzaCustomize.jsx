import React, { useState } from "react";
import { useModal } from "../../context/ModalContext";
import { toast } from "react-hot-toast";
import { customizationOptions, defaultCustomization } from "./customizationOptions";

const PizzaCustomize = () => {
  const { modals, closeModal, addToCart } = useModal();
  const { isOpen, data } = modals.pizzaCustomize;
  const [selectedOptions, setSelectedOptions] = useState([]);

  if (!isOpen) return null;

  const config = customizationOptions[data?.category] || defaultCustomization;
  const maxOptions = config.max;
  const optionGroups = config.groups;

  const toggleOption = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((o) => o !== option));
    } else if (selectedOptions.length < maxOptions) {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleAdd = () => {
    addToCart({ ...data, toppings: selectedOptions });
    toast.success(`${data.name} added with your options!`, { duration: 1500 });
    closeModal("pizzaCustomize");
    setSelectedOptions([]);
  };

  const canSelectMore = selectedOptions.length < maxOptions;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full my-6 relative">
        <div className="absolute top-4 right-4 z-10">
          <button onClick={() => closeModal("pizzaCustomize")} className="w-10 h-10 bg-brand-orange rounded-full flex items-center justify-center text-white text-xl font-bold hover:bg-orange-600 transition">✕</button>
        </div>

        <div className="h-48 bg-gradient-to-b from-orange-200 to-yellow-100 overflow-hidden">
          {data?.img && <img src={data.img} alt={data.name} className="h-full w-full object-cover" />}
        </div>

        <div className="p-6">
          <div className="mb-4 text-sm font-bold text-gray-600">Special Offers &gt; Customize {data?.name}</div>

          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-extrabold text-[#0D0D0D] mb-1">Customise your {data?.name}</h2>
              <p className="text-orange-500 font-bold text-lg">Please select up to {maxOptions} options free!</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-gray-600">{selectedOptions.length}/{maxOptions} Selected</p>
            </div>
          </div>

          <div className="space-y-4 max-h-96 overflow-y-auto">
            {Object.entries(optionGroups).map(([groupName, options]) => (
              <div key={groupName}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-brand-orange rounded-full flex items-center justify-center text-white text-sm font-bold">+</div>
                  <h3 className="font-bold text-white bg-[#0D0D0D] px-4 py-2 rounded-lg">{groupName}</h3>
                </div>
                <div className="grid grid-cols-3 gap-3 pl-11 mb-4">
                  {options.map((option) => (
                    <label key={option} className={`flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition ${selectedOptions.includes(option) ? "border-brand-orange bg-orange-50" : "border-gray-200 hover:border-gray-300"} ${!canSelectMore && !selectedOptions.includes(option) ? "opacity-50 cursor-not-allowed" : ""}`}>
                      <input type="checkbox" checked={selectedOptions.includes(option)} onChange={() => toggleOption(option)} disabled={!canSelectMore && !selectedOptions.includes(option)} className="w-4 h-4 cursor-pointer" />
                      <span className="text-sm font-bold text-[#0D0D0D]">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <button onClick={() => closeModal("pizzaCustomize")} className="text-gray-600 font-bold underline cursor-pointer hover:text-gray-800">Take me back</button>
              <div className="flex items-center gap-3">
                <div className="bg-brand-orange px-4 py-2 rounded-lg">
                  <span className="text-white text-sm font-bold">£{data?.price.toFixed(2)}</span>
                </div>
                <button onClick={handleAdd} className="bg-brand-green text-white font-bold py-2.5 px-8 rounded-xl hover:opacity-90 transition">→ Add</button>
              </div>
            </div>
            <p className="text-gray-400 text-xs mt-3 text-center">Delivery & Tax will be calculated in the next step</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PizzaCustomize;