import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../supabase";

const ProtectedRoute = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setLoading(false);
    };
    checkSession();
  }, []);

  if (loading) return <div>Loading...</div>; // ممكن تحطي هنا Spinner

  if (!session) {
    return <Navigate to="/login" replace />; // لو مش مسجل، يرجعه للـ Login
  }

  return children;
};

export default ProtectedRoute;