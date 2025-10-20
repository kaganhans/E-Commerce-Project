const TeamNav = () => {
  return (
    <div className="flex flex-col items-center justify-center mx-auto bg-white w-full max-w-[900px] h-[180px] px-4 py-8">
      {/* py-8 → üst ve alt padding */}
      
      <p className="text-center font-montserrat font-bold text-[16px] leading-[24px] tracking-[0.1px] mb-6 text-[#737373]">
        WHAT WE DO
      </p>

      <h1 className="text-center font-montserrat font-bold tracking-[0.2px] text-dark-blue">
        <span className="hidden md:block text-[58px] leading-[80px]">
          Innovation tailored for you
        </span>
        <span className="block md:hidden text-[40px] leading-[50px]">
          Innovation<br />tailored for you
        </span>
      </h1>
      
    </div>
  );
};

export default TeamNav;