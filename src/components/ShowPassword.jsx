import React, { useState } from 'react';
import { Field, ErrorMessage } from 'formik';
import { LuEyeClosed } from "react-icons/lu";
import { LuEye } from "react-icons/lu";
import { RiLockPasswordFill } from "react-icons/ri";


const PasswordField = ({ name, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col w-full">
      <div className=" flex  items-center w-full  gap-3 relative">
             <RiLockPasswordFill className="text-black font-bold text-3xl" />
        <Field
          name={name}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          className=" w-full border rounded-full border-2 p-2 border-amber-500 cursor-pointer bg-amber-50 "
        />

      
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-black transition-colors"
        >
          {showPassword ? (
           <LuEye />
          ) : (
            <LuEyeClosed />
          )}
        </button>
      </div>
      <ErrorMessage 
        name={name} 
        component="div" 
        className="text-red-700 text-xs font-bold mt-1 px-2" 
      />
    </div>
  );
};

export default PasswordField;