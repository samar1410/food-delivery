import { Formik, Field, ErrorMessage, Form } from "formik";
import * as yup from "yup";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import React from "react";
import { Link } from "react-router-dom";
import { FaUnlockKeyhole } from "react-icons/fa6";
import { supabase } from "../supabase";
import PasswordField from "../components/PasswordField";
import { FaKey } from "react-icons/fa";
import RememberMe from "../components/RememberMe";
import { LuEyeClosed } from "react-icons/lu";
import { LuEye } from "react-icons/lu";

const handleLogin = async (values, { setSubmitting }) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });
    if (error) {
      alert("Invalid email or password" + error.message);
    } else {
      if (values.rememberMe) {
        localStorage.setItem("rememberedEmail", values.email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }
      alert("Login successful");
      console.log("User data:", data);
    }
  } catch (err) {
    console.error(err);
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
  return (
    <div className="w-full font-inter  bg-[url('/imgs/black.jpg')] bg-center bg-cover size-full justify-center items-center text-gray-900">
      <div className="container w-full h-full flex items-center justify-center">
        <Formik
          initialValues={{
            email: localStorage.getItem("rememberedEmail") || "",
            password: "",
            rememberedEmail: localStorage.getItem("rememberedEmail")
              ? true
              : false,
          }}
          validationSchema={loginSchema}
          onSubmit={handleLogin}
        >
          {({ isSubmitting }) => (
            <Form className="w-[400px] rounded-2xl flex flex-col items-center justify-center p-4 bg-amber-300 h-auto gap-3">
              <div className=" flex flex-col items-center justify-center py-5">
                <img className="w-25" src="/imgs/order.png" alt="" />

                <p className="text-gray-600">
                  Welcome back! Please enter your details.
                </p>
              </div>

              <div className=" flex  items-center w-full gap-3">
                <MdEmail className="text-black font-bold text-3xl " />
                <Field
                  className=" w-full border rounded-full border-2 p-2 border-amber-500 cursor-pointer bg-amber-50"
                  name="email"
                  tyep="email"
                  placeholder="Enter your email"
                />
              </div>
              <div className="w-full">
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-xs mt-1   ml-12 "
                />
              </div>
              <div className=" flex  items-center w-full gap-3">
              
                <PasswordField
                    name="password"
                    placeholder="password"
                  />
              </div>
            

              <div className="flex gap-12  items-center justify-between w-full mt-2">
                <RememberMe />
                <div className="flex gap-2 w-full items-center ">
                  <FaKey className="text-black text-xl" />

                  <Link
                    className="text-black hover:text-red-700 text-sm "
                    to="/forgot-password"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>
              <div className="w-full pb-3">
                <button
                type="submit"
                disabled={isSubmitting}
                className="btn border-white bg-amber-500    w-full  rounded-3xl"
              >
                {isSubmitting ? "Loading ..." : "Login"}
              </button>
              </div>

              <Link className="text-red-700" to="/">
                {" "}
                <span className="text-black">Don’t have an account?</span> Sign
                up fo free!
              </Link>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;
