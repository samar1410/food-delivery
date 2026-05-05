import React, { useState } from 'react';
import { Field, ErrorMessage } from 'formik';
import { LuEyeClosed } from "react-icons/lu";
import { LuEye } from "react-icons/lu";
import { RiLockPasswordFill } from "react-icons/ri";
const PasswordField = ({ name, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full mb-4">
      <div className="flex items-center w-full gap-3">
        <RiLockPasswordFill className="text-black font-bold text-3xl" />
        <div className="relative w-full">
          <Field
            name={name}
            type={showPassword ? "text" : "password"}
            placeholder={placeholder}
            className="w-full border rounded-full border-2 p-2 border-amber-500 cursor-pointer bg-amber-50"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-gray-600"
          >
           {showPassword ? (
                      <LuEye />
                     ) : (
                       <LuEyeClosed />
                     )}
          </button>
        </div>
      </div>
      <ErrorMessage name={name} component="div" className="text-red-500 text-xs mt-1 ml-12" />
    </div>
  );
};

export default PasswordField;