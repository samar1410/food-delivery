import { Formik, Field, ErrorMessage, Form } from "formik";
import * as yup from "yup";
import { MdEmail } from "react-icons/md";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import { FaUser, FaKey } from "react-icons/fa";
import PasswordField from "../components/PasswordField";
import ShowPassword from "../components/ShowPassword";
import RememberMe from "../components/RememberMe";

/**
 * دالة التعامل مع إنشاء الحساب
 * تشرح كيفية ربط الواجهة بقاعدة بيانات Supabase
 */
const handleSignup = async (values, { setSubmitting }, navigate) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: {
          full_name: values.username, // حفظ الاسم في بيانات المستخدم الإضافية
        },
      },
    });

    if (error) {
      alert("Error: " + error.message);
    } else {
      // منطق "تذكرني": تخزين البريد في المتصفح لاسترجاعه لاحقاً
      if (values.rememberMe) {
        localStorage.setItem("rememberedEmail", values.email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }
      alert("Registration successful! Please check your email.");
      navigate("/");
    }
  } catch (err) {
    console.error("Unexpected Error:", err);
  } finally {
    setSubmitting(false); // إعادة تفعيل الزر بعد انتهاء العملية
  }
};

/**
 * مخطط التحقق (Validation Schema)
 * يشرح القيود البرمجية لضمان جودة البيانات المدخلة
 */
const SignupSchema = yup.object().shape({
  username: yup.string().required("Full name is required").min(3, "Too short"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "At least 8 characters")
    .matches(/[a-z]/, "Must contain lowercase")
    .matches(/[A-Z]/, "Must contain uppercase")
    .matches(/[0-9]/, "Must contain a number")
    .matches(/[^a-zA-Z0-9]/, "Must contain special character"),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const SignupPage = () => {
  const navigate = useNavigate();

  return (
    // استخدام دور "main" لتحسين إمكانية الوصول لذوي الاحتياجات الخاصة (Accessibility)
    <div className="w-full font-inter bg-[url('/imgs/black.jpg')] bg-center bg-cover size-full min-h-screen flex justify-center items-center text-gray-900" role="main">
      <div className="container w-full h-full flex items-center justify-center">
        <Formik
          initialValues={{
            email: localStorage.getItem("rememberedEmail") || "",
            password: "",
            rememberMe: !!localStorage.getItem("rememberedEmail"),
            username: "",
            confirmPassword: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={(values, actions) => handleSignup(values, actions, navigate)}
        >
          {({ isSubmitting }) => (
            <Form className="w-[400px] rounded-2xl flex flex-col items-center justify-center p-6 bg-amber-300 h-auto gap-3 shadow-2xl">
              <header className="flex flex-col items-center justify-center gap-3 py-5">
                <img className="w-25" src="/imgs/order.png" alt="App Logo" />
                <h1 className="text-xl font-bold">Create Account</h1>
                <p className="text-gray-600">Join our community</p>
              </header>

              {/* حقل إدخال الاسم مع مراعاة ربط التسمية بالمدخل (Accessibility) */}
              <div className="flex items-center w-full gap-3">
                <label htmlFor="username"><FaUser className="text-black text-2xl" /></label>
                <Field
                  id="username"
                  className="w-full border rounded-full border-2 p-2 border-amber-500 bg-amber-50 focus:ring-2 focus:ring-amber-600 outline-none"
                  name="username"
                  placeholder="Full Name"
                />
              </div>
              <ErrorMessage name="username" component="div" className="text-red-600 text-xs w-full px-10" />

              {/* حقل البريد الإلكتروني */}
              <div className="flex items-center w-full gap-3">
                <label htmlFor="email"><MdEmail className="text-black text-2xl" /></label>
                <Field
                  id="email"
                  className="w-full border rounded-full border-2 p-2 border-amber-500 bg-amber-50 focus:ring-2 focus:ring-amber-600 outline-none"
                  name="email"
                  type="email"
                  placeholder="Email Address"
                />
              </div>
              <ErrorMessage name="email" component="div" className="text-red-600 text-xs w-full px-10" />

              <div className="w-full">
                <PasswordField name="password" placeholder="Password" />
                <ErrorMessage name="password" component="div" className="text-red-600 text-xs w-full px-10" />
              </div>

              <div className="w-full">
                <ShowPassword name="confirmPassword" placeholder="Confirm Password" />
                <ErrorMessage name="confirmPassword" component="div" className="text-red-600 text-xs w-full px-10" />
              </div>

              <div className="flex gap-4 items-center justify-between w-full mt-2 text-sm">
                <RememberMe />
                <div className="flex gap-2 items-center">
                  <FaKey className="text-black" />
                  <Link className="text-black hover:text-red-700" to="/forgot-password">
                    Forgot Password?
                  </Link>
                </div>
              </div>

              <div className="w-full py-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 w-full rounded-3xl transition-all disabled:bg-gray-400"
                >
                  {isSubmitting ? "Loading..." : "Sign Up"}
                </button>
              </div>

              <p className="text-sm">
                Already have an account?{" "}
                <Link className="text-red-700 font-bold" to="/">Login</Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignupPage;