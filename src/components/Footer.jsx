import React from "react";

import TopFooterSection from "../sections/TopFooterSection";
import BottomFooterSection from "../sections/BottomFooterSection";

export default function Footer() {
  return (
    <>
      <div className=" flex justify-center w-full bg-gray-900  font-inter h-auto">
        <div className=" container bg-gray-900  flex gap-y-10 px-4 py-4 flex-col">
          <TopFooterSection />
          <BottomFooterSection />
        </div>
      </div>
    </>
  );
}
