import React from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { useModal } from "../context/ModalContext";

const MenuCard = ({ item, qty, addToCart, removeFromCart }) => {
  const { openModal } = useModal();

  // معالجة ذكية للسعر لضمان عدم حدوث crash لو كان مقروءاً كنص
  const itemPrice = typeof item.price === "number" ? item.price : parseFloat(item.price) || 0;

  // معالجة مرنة للصور (يقرأ العمود سواء كان اسمه image_url أو image أو img)
  const itemImage = item.image_url || item.image || item.img || "https://placehold.co/600x400?text=No+Image";

  // معالجة مرنة للوصف (يقرأ description أو desc)
  const itemDesc = item.description || item.desc || "No description available";

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden">
      {/* Image */}
      <div className="h-52 overflow-hidden bg-gray-50 flex items-center justify-center">
        <img
          src={itemImage}
          alt={item.name}
          className="h-full w-full object-cover"
          onError={(e) => {
            e.target.src = "https://placehold.co/600x400?text=Food+Image";
          }}
        />
      </div>

      <div className="p-5">
        <h3 className="font-extrabold text-[#0D0D0D] text-base mb-1">{item.name}</h3>
        <p className="text-gray-400 text-xs mb-4 line-clamp-2">{itemDesc}</p>

        {/* أزرار 2x2 - الديزاين الأصلي */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <button
            onClick={() => openModal("pizzaCustomize", { name: item.name, price: itemPrice, img: itemImage, category: item.category })}
            className="text-xs bg-orange-50 text-brand-orange border border-orange-200 font-bold py-2 rounded-xl hover:bg-orange-100 transition cursor-pointer"
          >
            🍕 Customize
          </button>
          <button
            onClick={() => openModal("mealDeals", { name: item.name, price: itemPrice, img: itemImage, title: `${item.category} Deal`, selectText: item.category, category: item.category })}
            className="text-xs bg-green-50 text-brand-green border border-green-200 font-bold py-2 rounded-xl hover:bg-green-100 transition cursor-pointer"
          >
            🍱 Meal Deal
          </button>
          <button
            onClick={() => openModal("freeItem", { name: item.name, price: itemPrice, img: itemImage, maxItems: 1, itemName: item.name })}
            className="text-xs bg-blue-50 text-blue-600 border border-blue-200 font-bold py-2 rounded-xl hover:bg-blue-100 transition cursor-pointer"
          >
            🎁 Free Item
          </button>
          <button
            onClick={() => openModal("addRequest", { name: item.name, price: itemPrice, img: itemImage })}
            className="text-xs bg-gray-50 text-gray-600 border border-gray-200 font-bold py-2 rounded-xl hover:bg-gray-100 transition cursor-pointer"
          >
            📝 Request
          </button>
        </div>

        {/* Price & Add to Cart */}
        <div className="flex items-center justify-between">
          <p className="text-[#0D0D0D] font-extrabold text-base">
            GBP {itemPrice.toFixed(2)}
          </p>
          {qty === 0 ? (
            <button
              onClick={() => {
                addToCart({ ...item, price: itemPrice });
                toast.success(`${item.name} added!`, { duration: 1500 });
              }}
              className="w-9 h-9 rounded-full bg-[#0D0D0D] hover:bg-brand-orange flex items-center justify-center text-white transition cursor-pointer"
            >
              <FaPlus className="text-xs" />
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => removeFromCart(item.id)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-red-100 flex items-center justify-center text-gray-600 hover:text-red-500 transition cursor-pointer"
              >
                <FaMinus className="text-xs" />
              </button>
              <span className="font-extrabold text-sm w-4 text-center">{qty}</span>
              <button
                onClick={() => addToCart({ ...item, price: itemPrice })}
                className="w-8 h-8 rounded-full bg-[#0D0D0D] hover:bg-brand-orange flex items-center justify-center text-white transition cursor-pointer"
              >
                <FaPlus className="text-xs" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuCard;