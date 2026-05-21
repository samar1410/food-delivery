import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../supabase";

// 1. بنعمل الصندوق نفسه
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // 2. بنجهز الأماكن الفاضية جوه الصندوق (المستخدم والسلة)
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  // 3. مراقب سوبابيز: أول ما الموقع يفتح بيشوف مين عامل Login ويثبته
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // 4. دالة الـ CRUD (إضافة أكل جديد أو تزويد الكمية)
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  // 5. دالة الـ CRUD (تقليل الكمية أو الحذف خالص لو وصلت 0)
  const removeFromCart = (itemId) => {
  setCart((prevCart) => {
    // 1. بنقلل كمية الوجبة اللي اخترناها بمقدار 1
    const updatedCart = prevCart.map((item) =>
      item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
    );

    // 2. بنعمل فلترة ونطرد أي وجبة كميتها وصلت لـ 0 أو أقل
    return updatedCart.filter((item) => item.quantity > 0);
  });
};

  // دالة مسح السلة كلها (بعد ما يشتري)
  const clearCart = () => setCart([]);

  return (
    // 6. بنفتح الصندوق ونباصي كل الحاجات دي للموقع كله
    <AppContext.Provider value={{ user, cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </AppContext.Provider>
  );
};

// الـ Hook اللي هنستدعيه في أي صفحة عشان نفتح الصندوق بكلمة واحدة
export const useApp = () => useContext(AppContext);