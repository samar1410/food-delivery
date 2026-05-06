import { Formik, Field, ErrorMessage, Form } from "formik";
import * as yup from "yup";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import React from "react";
import { Link } from "react-router-dom";
import { FaUnlockKeyhole } from "react-icons/fa6";
import { supabase } from "../supabase";
import { FaKey } from "react-icons/fa";
import PasswordField from "../components/PasswordField";
import ShowPassword from "../components/ShowPassword";
import RememberMe from "../components/RememberMe";
import { LuEyeClosed } from "react-icons/lu";
import { LuEye } from "react-icons/lu";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const handleSignup = async (values, { setSubmitting } , navigate ) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: {
          full_name: values.username,
         
        },
      },
    });
    if (error) {
      alert("Error: " + error.message);
    } else {
      if (values.rememberMe) {
        localStorage.setItem("rememberedEmail", values.email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }
      alert("Registration successful");
      navigate("/")
      console.log("Registered user:", data);
    }
  } catch (err) {
    console.error(err);
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
});

const SignupPage = () => {
    const navigate = useNavigate();
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
            username: "",
          }}
          validationSchema={SignupSchema}
         
          onSubmit={(values, actions) => handleSignup(values, actions, navigate)}
        >
          {({ isSubmitting }) => (
            <Form className="w-[400px] rounded-2xl flex flex-col items-center justify-center p-4 bg-amber-300 h-auto gap-3">
              <div className=" flex flex-col items-center justify-center gap-3 py-5">
                <img className="w-25" src="/imgs/order.png" alt="" />

                <p className="text-gray-600">Create your account</p>
              </div>

              <div className=" flex  items-center w-full gap-3">
                <FaUser className="text-black font-bold text-3xl " />
                <Field
                  className=" w-full border rounded-full border-2 p-2 border-amber-500 cursor-pointer bg-amber-50"
                  name="username"
                 type="text"
                  placeholder="Enter your name"
                />
              </div>
              <div className="w-full">
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-500 text-xs mt-1 ml-12 "
                />
              </div>

              <div className=" flex  items-center w-full gap-3">
                <MdEmail className="text-black font-bold text-3xl " />
                <Field
                  className=" w-full border rounded-full border-2 p-2 border-amber-500 cursor-pointer bg-amber-50"
                  name="email"
                  type="email"
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
                  placeholder="Enter your password"
                />
              </div>

              <div className="w-full">
                <ShowPassword
                  name="confirmPassword"
                  placeholder="Confirm Your Password"
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
                  {isSubmitting ? "Loading ..." : "Sign Up"}
                </button>
              </div>

              <Link className="text-red-700" to="/">
                {" "}
                <span className="text-black">
                  Already have an account?{" "}
                </span>{" "}
                Login
              </Link>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignupPage;
