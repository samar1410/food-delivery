import { Formik, Field, ErrorMessage, Form } from "formik";
import * as yup from "yup";
import { MdEmail } from "react-icons/md";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import { FaKey } from "react-icons/fa";
import PasswordField from "../components/PasswordField";
import RememberMe from "../components/RememberMe";

/**
 * دالة تسجيل الدخول (Login Function)
 * توضح كيفية التحقق من بيانات المستخدم عبر Supabase Auth
 */
const handleLogin = async (values, { setSubmitting }, navigate) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (error) {
      alert("Invalid email or password: " + error.message);
    } else {
      // تطبيق مهارة إدارة البيانات: حفظ البريد الإلكتروني في التخزين المحلي عند اختيار "تذكرني"
      if (values.rememberMe) {
        localStorage.setItem("rememberedEmail", values.email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }
      alert("Login successful");
      navigate("/home"); // التوجيه لصفحة الرئسية بعد النجاح
      console.log("User data:", data);
    }
  } catch (err) {
    console.error("Login Error:", err);
  } finally {
    setSubmitting(false); // إعادة زر الإرسال للوضع النشط
  }
};

/**
 * قواعد التحقق (Validation Schema)
 * تضمن أن المدخلات مطابقة للمعايير الأمنية قبل إرسالها للسيرفر
 */
const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    // استخدام الهيكل التنظيمي (Semantic HTML) لتعزيز إمكانية الوصول
    <div className="w-full font-inter bg-[url('/imgs/black.jpg')] bg-center bg-cover min-h-screen flex justify-center items-center text-gray-900" role="main">
      <div className="container w-full h-full flex items-center justify-center">
        <Formik
          initialValues={{
            email: localStorage.getItem("rememberedEmail") || "",
            password: "",
            rememberMe: !!localStorage.getItem("rememberedEmail"),
          }}
          validationSchema={loginSchema}
          onSubmit={(values, actions) => handleLogin(values, actions, navigate)}
        >
          {({ isSubmitting }) => (
            <Form className="w-[400px] rounded-2xl flex flex-col items-center justify-center p-6 bg-amber-300 h-auto gap-3 shadow-xl">
              <header className="flex flex-col items-center justify-center gap-3 py-5">
                <img className="w-25" src="/imgs/order.png" alt="Company Logo" />
                <h1 className="text-xl font-bold">Welcome Back!</h1>
                <p className="text-gray-600 text-center">Please enter your details to login.</p>
              </header>

              {/* حقل البريد الإلكتروني مع أيقونة توضيحية */}
              <div className="flex items-center w-full gap-3">
                <label htmlFor="email"><MdEmail className="text-black text-3xl" /></label>
                <Field
                  id="email"
                  className="w-full border rounded-full border-2 p-2 border-amber-500 bg-amber-50 focus:ring-2 focus:ring-amber-600 outline-none"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                />
              </div>
              <ErrorMessage name="email" component="div" className="text-red-500 text-xs w-full px-12" />

              {/* حقل كلمة المرور المخصص */}
              <div className="flex items-center w-full gap-3">
                <PasswordField name="password" placeholder="Password" />
              </div>
              <ErrorMessage name="password" component="div" className="text-red-500 text-xs w-full px-12" />

              {/* خيارات إضافية: تذكرني ونسيان كلمة المرور */}
              <div className="flex gap-4 items-center justify-between w-full mt-2 text-sm">
                <RememberMe name="rememberMe" />
                <div className="flex gap-2 items-center">
                  <FaKey className="text-black" />
                  <Link className="text-black hover:text-red-700" to="/forgot-password">
                    Forgot Password?
                  </Link>
                </div>
              </div>

              {/* زر الإرسال مع حالة التحميل */}
              <div className="w-full py-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 w-full rounded-3xl transition-all shadow-md disabled:bg-gray-400"
                >
                  {isSubmitting ? "Loading ..." : "Login"}
                </button>
              </div>

              <footer className="text-sm">
                Don’t have an account?{" "}
                <Link className="text-red-700 font-bold hover:underline" to="/signup">
                  Sign up for free!
                </Link>
              </footer>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;