import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { supabase } from "../supabase.js";
import { useNavigate } from "react-router-dom";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import ShowPassword from "../components/ShowPassword";

const ResetPassword = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    password: Yup.string()
      .min(6, " it must be at least 6 characters")
      .required("This field is required"),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords do not match")
      .required("You must confirm your password"),
  });

  const handleReset = async (values, { setSubmitting }) => {
    const { data, error } = await supabase.auth.updateUser({
      password: values.password,
    });

    if (data) {
      alert("Password changed successfully! Try logging in now");
      navigate("/login");
    }
    if (error) alert("An error occurred: " + error.message);
    setSubmitting(false);
  };

  return (
    <div className="w-full font-inter  bg-[url('/imgs/black.jpg')] bg-center bg-cover size-full flex justify-center gap-2 items-center text-gray-900">
      <div className="bg-[#FFC107] p-8 rounded-[40px] w-full max-w-md shadow-2xl">
        <div className=" flex flex-col items-center text-center mb-8">
          <img className="w-25" src="/imgs/order.png" alt="" />

          <p className="text-black font-semibold mt-2">Update your password!</p>
        </div>

        <Formik
          initialValues={{ password: "", confirmPassword: "" }}
          validationSchema={validationSchema}
          onSubmit={handleReset}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-5">
              <div className="flex  flex-col">
                <div className=" flex items-center justify-center gap-2 relative">
                  <RiLockPasswordFill className="text-black font-bold text-3xl" />
                  <ShowPassword name="password" placeholder="New Password" />
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center justify-center gap-2 relative">
                  <RiLockPasswordFill className="text-black font-bold text-3xl" />
                  <ShowPassword
                    name="confirmPassword"
                    placeholder="Confirm Password"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn border-white bg-amber-500   rounded-3xl"
              >
                {isSubmitting ? "Updating..." : "Update Password"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ResetPassword;
