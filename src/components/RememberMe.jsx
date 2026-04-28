import React from 'react'
import { Field } from 'formik'


const RememberMe = () => {
  return (
        <div className="flex  items-center justify-between w-full gap-3 my-4 ">
                    <div>
                      <label
                        htmlFor="remMe"
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <Field
                          id="remMe"
                          type="checkbox"
                          name="rememberMe"
                          className="checkbox text-white bg-[#FC8A06] w-4.5 h-4.5 rounded-none text-2xl"
                        />
                        Remember me
                      </label>
                    </div>
                  
                  </div>
  )
}

export default RememberMe