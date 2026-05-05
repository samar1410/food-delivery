import { Field, Form, Formik, ErrorMessage } from "formik";
import React from "react";
import * as Yup from "yup";
import { supabase } from "../supabase";
import { MdEmail } from "react-icons/md";

const ForgotPassword = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const handleReset = async (values, { setSubmitting }) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(
        values.email,
        {
          redirectTo: "http://localhost:5173/reset-password",
        },
      );

      if (error) {
        alert("Error: " + error.message);
      } else {
        alert("Check your email for the password reset link!");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full  bg-[url('/imgs/black.jpg')] bg-center bg-cover size-full bg-black text-white p-4">
      <div className="bg-[#FFC107] p-8 rounded-3xl w-full max-w-md text-black text-center">
     <div className="flex flex-col items-center justify-center gap-2">
         <img className="w-25" src="/imgs/order.png" alt="" />

        <h2 className="text-2xl font-bold mb-4">Forgot Password?</h2>
        <p className="mb-6 text-sm text-gray-700">
          Enter your email and we'll send you a link to reset your password.
        </p>
     </div>

        <Formik
          initialValues={{ email: "" }}
          validationSchema={validationSchema}
          onSubmit={handleReset}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-4">
              <div className="w-full flex flex-col items-start">
                <div className="flex items-center w-full gap-3">
                  <MdEmail className="text-black text-3xl" />
                  <Field
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className="w-full border-2 border-amber-500 rounded-full p-2 bg-amber-50"
                  />
                </div>
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-600 text-xs mt-1 ml-12 text-left"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className=" bg-orange-500 text-white font-bold py-2 px-4 rounded-full mt-4 hover:bg-orange-600 transition"
              >
                {isSubmitting ? "Sending..." : "Send Reset Link"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ForgotPassword;
