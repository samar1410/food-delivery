import React, { useState } from "react";
import { useModal } from "../../context/ModalContext";
import { toast } from "react-hot-toast";

const AddRequestModal = () => {
  const { modals, closeModal, addToCart } = useModal();
  const { isOpen, data } = modals.addRequest;
  const [request, setRequest] = useState("");

  if (!isOpen) return null;

  const handleAdd = () => {
    addToCart({ ...data, specialRequest: request });
    toast.success(`${data.name} added!`, { duration: 1500 });
    closeModal("addRequest");
    setRequest("");
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-screen overflow-y-auto relative">
        <div className="absolute top-4 right-4 z-10">
          <button onClick={() => closeModal("addRequest")} className="w-10 h-10 bg-brand-orange rounded-full flex items-center justify-center text-white text-xl font-bold hover:bg-orange-600 transition">✕</button>
        </div>

        <div className="h-48 bg-gradient-to-b from-orange-200 to-yellow-100 overflow-hidden">
          {data?.img && <img src={data.img} alt={data.name} className="h-full w-full object-cover" />}
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-extrabold text-[#0D0D0D] mb-2">Add your special request</h2>
          <p className="text-gray-500 text-sm mb-6">Tell us if you have any special instructions</p>

          <div className="flex items-center gap-3 mb-6">
            {data?.img && <img src={data.img} alt={data.name} className="w-12 h-12 rounded-full object-cover" />}
            <div>
              <h3 className="font-bold text-[#0D0D0D]">{data?.name}</h3>
              <p className="text-brand-orange font-bold">£{data?.price.toFixed(2)}</p>
            </div>
          </div>

          <textarea
            value={request}
            onChange={(e) => setRequest(e.target.value)}
            placeholder="Write your special instructions here..."
            className="w-full h-40 p-4 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-orange resize-none text-sm"
          />

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button onClick={() => closeModal("addRequest")} className="text-gray-600 font-bold underline cursor-pointer hover:text-gray-800">Take me back</button>
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
  );
};

export default AddRequestModal;