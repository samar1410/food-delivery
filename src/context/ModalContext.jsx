import React, { createContext, useContext, useState } from "react";
import { useApp } from "./AppContext";

const ModalContext = createContext();

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used within ModalProvider");
  return context;
};

export const ModalProvider = ({ children }) => {
  const { addToCart } = useApp();

  const [modals, setModals] = useState({
    addRequest: { isOpen: false, data: null },
    pizzaCustomize: { isOpen: false, data: null },
    mealDeals: { isOpen: false, data: null },
    freeItem: { isOpen: false, data: null },
  });

  const openModal = (modalName, data = null) => {
    setModals((prev) => ({
      ...prev,
      [modalName]: { isOpen: true, data },
    }));
  };

  const closeModal = (modalName) => {
    setModals((prev) => ({
      ...prev,
      [modalName]: { isOpen: false, data: null },
    }));
  };

  const closeAllModals = () => {
    setModals({
      addRequest: { isOpen: false, data: null },
      pizzaCustomize: { isOpen: false, data: null },
      mealDeals: { isOpen: false, data: null },
      freeItem: { isOpen: false, data: null },
    });
  };

  return (
    <ModalContext.Provider value={{ modals, openModal, closeModal, closeAllModals, addToCart }}>
      {children}
    </ModalContext.Provider>
  );
};