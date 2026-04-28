import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { IoLogoTwitter } from "react-icons/io";
import { IoLogoYoutube } from "react-icons/io";
import { data, info, links } from "../data";
import LanguageSelect from "../LanguageSelect";

const BottomFooterSection = () => {
  return (
    <>
      <div className="dowen w-full lg:w-[1320px] flex lg:items-start justify-center lg:flex-row flex-col lg:gap-10 lg:pt-10 lg:justify-items-start border-b border-b-[#2c2d31] pb-10">
        {/* logo */}
        <div className="E-tutor  flex items-center w-full justify-center lg:w-[424px] gap-5 lg:items-start flex-col lg:gap-10 py-5 lg:px[10px] lg:mt-0 pt-0">
          <div className="flex  lg:gap-[9px]">
            <img
              className=" object-fill w-8.75 lg:w-11.5"
              src="/imgs/logoCap.png"
              alt="logo"
            />
            <h1 className=" font-semibold text-[30px] lg:text-[36.8px] text-[#FFFFFF]">
              E-tutor
            </h1>
          </div>
          <p className="font-normal flex text-center pb-3 lg:text-start text text-gray-500 text-[14px] lg:leading-5.5 ">
            Aliquam rhoncus ligula est, non pulvinar elit <br />
            convallis nec. Donec mattis odio at.
          </p>
          <div className="flex flex-row gap-3">
            <Link
              to={"https://www.facebook.com/share/1HF3NDvHWZ/"}
              className="flex items-center justify-center w-[46px] bg-[#363B4766] h-[46px] hover:bg-[#FF6636] transition-colors duration-300"
            >
              <FaFacebookF />
            </Link>
            <Link
              to={"https://www.instagram.com/"}
              className="flex items-center justify-center w-[46px] bg-[#363B4766] h-[46px] hover:bg-[#FF6636] transition-colors duration-300"
            >
              <FaInstagram />
            </Link>
            <Link
              to={"https://www.linkedin.com/"}
              className="flex items-center justify-center w-[46px] bg-[#363B4766] h-[46px] hover:bg-[#FF6636] transition-colors duration-300"
            >
              <FaLinkedinIn />
            </Link>
            <Link
              to={"https://x.com/"}
              className="flex items-center justify-center w-[46px] bg-[#363B4766] h-[46px] hover:bg-[#FF6636] transition-colors duration-300"
            >
              <IoLogoTwitter />
            </Link>
            <Link
              to={"https://www.youtube.com/"}
              className="flex items-center justify-center w-[46px] bg-[#363B4766] h-[46px] hover:bg-[#FF6636] transition-colors duration-300"
            >
              <IoLogoYoutube />
            </Link>
          </div>
        </div>

        {/* links */}
        <div className="links flex flex-col lg:flex-row gap-4 ">
          <div className=" Top flex flex-col items-center lg:items-start w-full lg:w-[200px] gap-3 pb-5">
          
            <h1 className="text-[#FFFFFF] text-[18px] lg:text-[14px] font-medium uppercase w-full text-center lg:text-start lg:pb-5 m-0 p-0">
             Top 4 Category
            </h1>

            
            <div className="flex flex-col items-center lg:items-start w-full gap-2">
              {links.map((links) => (
                <div
                  key={links.id}
                  className="group w-full flex justify-center lg:justify-start"
                >
                  <Link
                    to={links.url}
                    className="text-[#8C94A3] font-normal text-[14px] hover:text-[#FFFFFF] transition-all flex items-center"
                  >
                    {links.name}
                    <span className="text-[#FFFFFF] text-[18px] opacity-0 group-hover:opacity-100 px-1 font-bold">
                      →
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className=" Quick flex flex-col items-center lg:items-start w-full lg:w-[200px] gap-3 pb-5">
         
            <h1 className="text-[#FFFFFF] text-[18px] lg:text-[14px] font-medium uppercase w-full text-center lg:text-start lg:pb-5 m-0 p-0">
             Quick Links
            </h1>

          
            <div className="flex flex-col items-center lg:items-start w-full gap-2">
              {info.map((links) => (
                <div
                  key={links.id}
                  className="group w-full flex justify-center lg:justify-start"
                >
                  <Link
                    to={links.url}
                    className="text-[#8C94A3] font-normal text-[14px] hover:text-[#FFFFFF] transition-all flex items-center"
                  >
                    {links.name}
                    <span className="text-[#FFFFFF] text-[18px] opacity-0 group-hover:opacity-100 px-1 font-bold">
                      →
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className=" Support flex flex-col items-center lg:items-start w-full lg:w-[200px] gap-3 pb-5">
            
            <h1 className="text-[#FFFFFF] text-[18px] lg:text-[14px] font-medium uppercase w-full text-center lg:text-start lg:pb-5 m-0 p-0">
             Support
            </h1>

           
            <div className="flex flex-col items-center lg:items-start w-full gap-2">
              {data.map((links) => (
                <div
                  key={links.id}
                  className="group w-full flex justify-center lg:justify-start"
                >
                  <Link
                    to={links.url}
                    className="text-[#8C94A3] font-normal text-[14px] hover:text-[#FFFFFF] transition-all flex items-center"
                  >
                    {links.name}
                    <span className="text-[#FFFFFF] text-[18px] opacity-0 group-hover:opacity-100 px-1 font-bold">
                      →
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* media */}

          <div className="media flex flex-col items-center lg:items-start gap-3 lg:w-[200px]">
            <h1 className="text-[#FFFFFF] text-[14px] font-medium uppercase pb-5">
              Download our app
            </h1>
            <img src="/imgs/apple.png" alt="apple" className="cursor-pointer" />
            <img
              src="/imgs/android.png"
              alt="android"
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Third section */}
      <div className="Edu flex items-center gap-5 justify-center w-full lg:justify-between lg:flex-row flex-col ">
        <p className="text-center ">
          @ 2021 - Eduflex. Designed by <span>Templatecookie</span>. All rights
          reserved
        </p>

        <LanguageSelect />
      </div>
    </>
  );
};

export default BottomFooterSection;
