import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import { Toaster } from "react-hot-toast";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./components/ProtectedRoute";
import MenuPage from "./pages/MenuPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Layout>
          <main className="w-full overflow-x-hidden">
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route
                path="/home"
                element={
              
                    <HomePage />
                  
                }
              />
              <Route
                path="/menu"
                element={
                  <ProtectedRoute>
                    <MenuPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
        </Layout>
      </BrowserRouter>

      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
