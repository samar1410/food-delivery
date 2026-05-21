import { Formik, Field, ErrorMessage, Form } from "formik";
import * as yup from "yup";
import { MdEmail } from "react-icons/md";
import React from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabase";
import PasswordField from "../components/PasswordField";
import { FaKey } from "react-icons/fa";
import RememberMe from "../components/RememberMe";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const handleLogin = async (values, { setSubmitting } , navigate) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });
    if (error) {
      Swal.fire({
        title: "Login Failed!",
        text: "Invalid email or password. Please try again.",
        icon: "error",
        confirmButtonColor: "#EF4444", 
        customClass: {
          popup: "rounded-3xl", 
        },
      });
    } else {
      if (values.rememberMe) {
        localStorage.setItem("rememberedEmail", values.email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }
      Swal.fire({
        title: "Welcome Back!",
        text: "Login successful! Redirecting to home...",
        icon: "success",
        confirmButtonColor: "#F59E0B", 
        timer: 2000, 
        showConfirmButton: false, 
        customClass: {
          popup: "rounded-3xl",
        },
      });
      navigate("/home")
      console.log("User data:", data);
    }
  } catch (err) {
    console.error(err);
    Swal.fire({
      title: "Unexpected Error",
      text: "Something went wrong. Please try again.",
      icon: "error",
      confirmButtonColor: "#EF4444",
    });
  } finally {
    setSubmitting(false);
  }
};

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Must contain a lowercase letter")
    .matches(/[A-Z]/, "Must contain an uppercase letter")
    .matches(/[0-9]/, "Must contain a number")
    .matches(/[^a-zA-Z0-9]/, "Must contain a special character"),
});

const LoginPage = () => {
  const navigate = useNavigate();
  return (
    /* 🌟 التعديل هنا: شيلنا size-full وضفنا min-h-screen و flex عشان الخلفية تقفل الشاشة بالملي */
    <div className="w-full min-h-screen font-inter bg-[url('/imgs/black.jpg')] bg-center bg-cover flex flex-col justify-center items-center text-gray-900 py-8">
      <div className="container w-full flex items-center justify-center">
        <Formik
          initialValues={{
            email: localStorage.getItem("rememberedEmail") || "",
            password: "",
            rememberedEmail: localStorage.getItem("rememberedEmail") ? true : false,
          }}
          validationSchema={loginSchema}
          onSubmit={(values, actions) => handleLogin (values, actions, navigate)}
        >
          {({ isSubmitting }) => (
            <Form className="w-[400px] rounded-2xl flex flex-col items-center justify-center p-6 bg-amber-300 h-auto gap-3 shadow-2xl">
              <div className=" flex flex-col items-center justify-center gap-3 py-5">
                <img className="w-25" src="/imgs/order.png" alt="" />
                <p className="text-gray-600 text-center text-sm">
                  Welcome back! Please enter your details.
                </p>
              </div>

              <div className=" flex items-center w-full gap-3">
                <MdEmail className="text-black font-bold text-3xl " />
                <Field
                  className=" w-full border rounded-full border-2 p-2 border-amber-500 cursor-pointer bg-amber-50 text-sm pl-4"
                  name="email"
                  type="email" // 🌟 تصليح غلطة إملائية كانت tyep
                  placeholder="Enter your email"
                />
              </div>
              <div className="w-full">
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-xs mt-1 ml-12 "
                />
              </div>
              <div className=" flex items-center w-full gap-3">
                <PasswordField
                  name="password"
                  placeholder="password"
                />
              </div>

              <div className="flex gap-12 items-center justify-between w-full mt-2">
                <RememberMe />
                <div className="flex gap-2 w-full items-center justify-end">
                  <FaKey className="text-black text-sm" />
                  <Link
                    className="text-black hover:text-red-700 text-xs font-semibold"
                    to="/forgot-password"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>
              <div className="w-full pb-3 mt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn border-white bg-amber-500 w-full py-2.5 text-white font-bold rounded-3xl hover:bg-amber-600 transition"
                >
                  {isSubmitting ? "Loading ..." : "Login"}
                </button>
              </div>

              <Link className="text-red-700 text-sm" to="/signup">
                <span className="text-black">Don’t have an account?</span> Sign up for free!
              </Link>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;