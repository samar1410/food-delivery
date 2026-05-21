import React from "react";
import { useLocation } from "react-router-dom";
import TopNav from "./TopNav"; // استدعاء التوب ناف الجديد
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  const location = useLocation();

  // يظهر فيها الـ Navbar والـ TopNav مش عاوزين الـ Auth لستة صفحات الـ
  const authRoutes = ["/", "/login" , "/signup", "/forgot-password", "/reset-password"];

  // هل الصفحة الحالية واحدة من صفحات الـ Auth؟
  const isAuthRoute = authRoutes.includes(location.pathname);

  return (
    <>
      {/* هيظهر بس لو إحنا مش في صفحات الـ Auth */}
      {!isAuthRoute && <TopNav />}

      {/* هيظهر بس لو إحنا مش في صفحات الـ Auth */}
      {!isAuthRoute && <Navbar />}

      {/* هنا باقي محتوى الصفحات هيتعرض عادي تبيكال زي صورتك */}
      {children}
    </>
  );
};

export default Layout;