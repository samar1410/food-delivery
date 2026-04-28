const TopFooterSection = () => {
  return (
    <div className=" flex flex-col lg:flex-row w-full border-b border-b-[#2c2d31] items-center lg:justify-start  pb-10  lg:gap-[60px]  lg:pt-15 lg:px-4  max-w-full">
      {/* left */}
      <div className="flex flex-col w-full max-w-full lg:w-[536px] min-w-0 shrink-0 text-center gap-y-5 pb-6 lg:text-left">
        <h1 className="text-[#FFFFFF] text-[26px] lg:text-[40px] font-semibold pb-2 lg:pb-3">
          Start learning with 67.1k students around the world.
        </h1>

        <div className="flex flex-col lg:flex-row lg:gap-3 gap-4 items-center lg:items-start">
          <button className="flex btn bg-[#FF6636] w-50 lg:w-[197px] lg:p-3 justify-center">
            Join the Family
          </button>

          <button className="flex btn  lg:w-[197px] w-50 lg:p-3 bg-gray-900 justify-center">
            Browse all courses
          </button>
        </div>
      </div>






      {/* right */}
      <div className="flex flex-col lg:flex-row  lg:gap-[35px] items-center justify-center text-center w-full lg:w-auto flex-wrap lg:flex-nowrap">
        <div className="flex flex-col gap-4 pb-4 w-auto sm:w-full">
          <h1 className="text-[#FFFFFF] text-[22px] lg:text-[40px] font-semibold">
            6.3k
          </h1>
          <p className="text-[#B7BAC7] text-[12px] lg:text-[16px] w-auto lg:w-[200px] font-medium">
            Online courses
          </p>
        </div>

        <div className="flex flex-col w-full gap-4 pb-4">
          <h1 className="text-[#FFFFFF] text-[22px] lg:text-[40px] font-semibold">
            26k
          </h1>
          <p className="text-[#B7BAC7] text-[12px] lg:text-[16px] w-auto lg:w-[200px] font-medium">
            Certified Instructor
          </p>
        </div>

        <div className="flex flex-col w-full gap-4 pb-4">
          <h1 className="text-[#FFFFFF] text-[22px] lg:text-[40px] font-semibold">
            99.9%
          </h1>
          <p className="text-[#B7BAC7] text-[12px] lg:text-[16px] w-auto lg:w-[200px] font-medium">
            Sucess Rate
          </p>
        </div>
      </div>
    </div>
  );
};

export default TopFooterSection;
