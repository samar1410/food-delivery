import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { Toaster } from "react-hot-toast";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";





function App() {
  return (
    <>
      <main className="w-full h-screen flex items-center justify-center overflow-x-hidden">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword/>} />
            <Route path="/home" element={<HomePage />} />
          

        
          </Routes>
        </BrowserRouter>
        <Toaster position="top-center" reverseOrder={false} />
      </main>
    </>
  );
}

export default App;
