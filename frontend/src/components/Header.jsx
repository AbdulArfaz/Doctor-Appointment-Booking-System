import React from "react";
import logo from "../assets/groupDoctors.png";

const Header = () => {
  return (
    <div className="mx-auto my-8 flex max-w-300 flex-col items-center justify-between gap-8 rounded-[20px] bg-[#abd5f7] px-5 py-6 font-[Poppins,sans-serif] md:flex-row md:px-4">
      {/* Left Section */}
      <div className="flex flex-1 flex-col justify-center text-center md:text-left">
        <div>
          <h1 className="mb-4 text-[2rem] leading-tight font-bold text-[#2b2b2b] sm:text-[2.5rem]">
            Find a <span className="text-[#2b8ce0]">Doctor</span> And
            <br />
            Book An <span className="text-[#2b8ce0]">Appointment</span>
          </h1>
        </div>

        <div>
          <p className="mb-8 text-[0.95rem] leading-[1.6] text-[#171818]">
            A Healthier Tommorrow Starts Today. Schedule Your Appointment
            <br className="hidden md:block" />
            Your Wellness, Our Expertise: Set Up Your Appointment Today.
          </p>
        </div>

        <div>
          <a
            href="#speciality"
            className="inline-block rounded-lg bg-[#2b8ce0] px-[1.8rem] py-[0.8rem] text-[0.95rem] font-medium text-white no-underline transition-colors duration-200 hover:bg-[#1d72ba]"
          >
            Book An Appointment
          </a>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex w-full flex-1 items-center justify-center md:justify-end">
        <img
          src={logo}
          alt="doctors-group"
          className="h-auto max-w-full object-contain"
        />
      </div>
    </div>
  );
};

export default Header;