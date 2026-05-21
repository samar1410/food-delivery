import { Formik, Field, ErrorMessage, Form } from "formik";
import * as yup from "yup";
import { MdEmail } from "react-icons/md";
import React from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabase";
import { FaKey, FaUser } from "react-icons/fa";
import { FaPhoneVolume } from "react-icons/fa6";
import PasswordField from "../components/PasswordField";
import ShowPassword from "../components/ShowPassword";
import RememberMe from "../components/RememberMe";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const handleSignup = async (values, { setSubmitting }, navigate) => {
  try {
    // 1. Sign up the user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
    });

    if (authError) throw authError;

    // 2. Insert the profile data into the 'profiles' table
    if (authData.user) {
      const { error: profileError } = await supabase
        .from("profiles")
        .insert([
          { 
            id: authData.user.id, 
            name: values.username, 
            phone: values.phone 
          },
        ]);
      
      if (profileError) throw profileError;
    }

    // 3. Success handling
    if (values.rememberMe) {
      localStorage.setItem("rememberedEmail", values.email);
    } else {
      localStorage.removeItem("rememberedEmail");
    }

    Swal.fire({
      title: "Account Created!",
      text: "Your account has been created successfully. Redirecting to Login...",
      icon: "success",
      confirmButtonColor: "#F59E0B",
      timer: 2500,
      showConfirmButton: false,
      customClass: { popup: "rounded-3xl" },
    });

    navigate("/");
  } catch (err) {
    console.error("Signup Error:", err);
    Swal.fire({
      title: "Registration Failed!",
      text: err.message || "Something went wrong.",
      icon: "error",
      confirmButtonColor: "#EF4444",
      customClass: { popup: "rounded-3xl" },
    });
  } finally {
    setSubmitting(false);
  }
};

const SignupSchema = yup.object().shape({
  username: yup.string().required("Full name is required").min(3, "Too short"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Must contain a lowercase letter")
    .matches(/[A-Z]/, "Must contain an uppercase letter")
    .matches(/[0-9]/, "Must contain a number")
    .matches(/[^a-zA-Z0-9]/, "Must contain a special character"),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number"),
});

const SignupPage = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-screen font-inter bg-[url('/imgs/black.jpg')] bg-center bg-cover flex flex-col justify-center items-center text-gray-900 py-8">
      <div className="container w-full flex items-center justify-center">
        <Formik
          initialValues={{
            email: localStorage.getItem("rememberedEmail") || "",
            password: "",
            rememberedEmail: !!localStorage.getItem("rememberedEmail"),
            username: "",
            phone: "",
            confirmPassword: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={(values, actions) => handleSignup(values, actions, navigate)}
        >
          {({ isSubmitting }) => (
            <Form className="w-[400px] rounded-2xl flex flex-col items-center justify-center p-6 bg-amber-300 h-auto gap-3 shadow-2xl">
              <div className="flex flex-col items-center justify-center gap-3 py-4">
                <img className="w-25" src="/imgs/order.png" alt="" />
                <p className="text-gray-600 text-sm">Create your account</p>
              </div>

              <div className="flex items-center w-full gap-3">
                <FaUser className="text-black font-bold text-2xl shrink-0" />
                <Field className="w-full border rounded-full border-2 p-2 border-amber-500 cursor-pointer bg-amber-50 text-sm pl-4" name="username" type="text" placeholder="Enter your name" />
              </div>
              <div className="w-full"><ErrorMessage name="username" component="div" className="text-red-500 text-xs mt-1 ml-12" /></div>

              <div className="flex flex-col items-start w-full">
                <div className="flex items-center w-full gap-3">
                  <FaPhoneVolume className="text-black font-bold text-2xl shrink-0" />
                  <Field className="w-full border rounded-full border-2 p-2 border-amber-500 cursor-pointer bg-amber-50 text-sm pl-4 text-gray-900" name="phone" type="text" placeholder="Enter your phone number" />
                </div>
                <ErrorMessage name="phone" component="div" className="text-red-500 text-xs mt-1 ml-12" />
              </div>

              <div className="flex items-center w-full gap-3">
                <MdEmail className="text-black font-bold text-2xl shrink-0" />
                <Field className="w-full border rounded-full border-2 p-2 border-amber-500 cursor-pointer bg-amber-50 text-sm pl-4" name="email" type="email" placeholder="Enter your email" />
              </div>
              <div className="w-full"><ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1 ml-12" /></div>

              <PasswordField name="password" placeholder="Enter your password" />
              <ShowPassword name="confirmPassword" placeholder="Confirm Your Password" />

              <div className="flex gap-12 items-center justify-between w-full mt-2">
                <RememberMe />
                <div className="flex gap-2 w-full items-center justify-end">
                  <FaKey className="text-black text-sm" />
                  <Link className="text-black hover:text-red-700 text-xs font-semibold" to="/forgot-password">Forgot Password?</Link>
                </div>
              </div>

              <div className="w-full pb-3 mt-4">
                <button type="submit" disabled={isSubmitting} className="btn border-white bg-amber-500 w-full py-2.5 text-white font-bold rounded-3xl hover:bg-amber-600 transition">
                  {isSubmitting ? "Loading ..." : "Sign Up"}
                </button>
              </div>

              <Link className="text-red-700 text-sm" to="/">
                <span className="text-black">Already have an account? </span> Login
              </Link>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignupPage;