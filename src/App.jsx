import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import { Toaster } from "react-hot-toast";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./components/ProtectedRoute";
import MenuPage from "./pages/MenuPage";
import CartPage from "./pages/CartPage";
import { ModalProvider } from "./context/ModalContext";
import AddRequestModal from "./components/modals/AddRequestModal";
import PizzaCustomize from "./components/modals/PizzaCustomize";
import MealDealsModal from "./components/modals/MealDealsModal";
import FreeItemModal from "./components/modals/FreeItemModal";


function App() {
  return (
    <>
      
        <ModalProvider>
          <BrowserRouter>
            <Layout>
              <main className="w-full overflow-x-hidden">
                <Routes>
                  <Route path="/" element={<LoginPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignupPage />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  <Route path="/home" element={<HomePage />} />
                  <Route
                    path="/menu"
                    element={
                      <ProtectedRoute>
                        <MenuPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/cart"
                    element={
                      <ProtectedRoute>
                        <CartPage />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
                
                <AddRequestModal />
                <PizzaCustomize />
                <MealDealsModal />
                <FreeItemModal />

              </main>
            </Layout>
          </BrowserRouter>

          <Toaster position="top-center" reverseOrder={false} />
        </ModalProvider>
      
    </>
  );
}

export default App;
