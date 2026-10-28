import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer
      className="mt-20 box-border w-full bg-[linear-gradient(135deg,#024b66_0%,#086b75_45%,#62a321_100%)] px-[6%] pt-10 pb-5 font-[Inter,-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,sans-serif] text-white shadow-[0_-10px_25px_rgba(0,0,0,0.08)] md:px-[8%] md:pt-15 md:pb-6.25"
      id="footer"
    >
      <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:gap-12.5">
        {/* Left Section */}
        <div className="w-full min-w-0 md:max-w-105 md:flex-2">
          <img
            src={assets.docslot}
            alt="DocSlot logo"
            className="mb-5 inline-block w-42.5 rounded-xl bg-white px-4 py-2.5 shadow-[0_4px_15px_rgba(0,0,0,0.12)] transition-transform duration-300 hover:-translate-y-0.5"
          />

          <p className="text-sm leading-[1.7] font-normal tracking-[0.2px] text-[#e3f2f7]">
            At DocSlot, we believe accessing quality healthcare should be
            straightforward and stress-free. Book routine checkups,
            specialist consultations, and follow-ups with trusted doctors in
            just a few click.
          </p>
        </div>

        {/* Center Section */}
        <div className="w-full min-w-0 md:min-w-55 md:flex-1">
          <h2 className="relative mb-5.5 inline-block text-base font-bold tracking-[1.2px] text-white uppercase after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-8 after:rounded-sm after:bg-[#b0f538] after:content-['']">
            QUICK LINKS
          </h2>

          <ul className="m-0 list-none space-y-3.5 p-0">
            <li className="w-fit cursor-pointer text-sm text-[#e3f2f7] transition-all duration-250 hover:translate-x-1.25 hover:text-[#b0f538]">
              Home
            </li>
            <li className="w-fit cursor-pointer text-sm text-[#e3f2f7] transition-all duration-250 hover:translate-x-1.25 hover:text-[#b0f538]">
              About Us
            </li>
            <li className="w-fit cursor-pointer text-sm text-[#e3f2f7] transition-all duration-250 hover:translate-x-1.25 hover:text-[#b0f538]">
              Contact
            </li>
            <li className="w-fit cursor-pointer text-sm text-[#e3f2f7] transition-all duration-250 hover:translate-x-1.25 hover:text-[#b0f538]">
              Privacy Policy
            </li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="w-full min-w-0 md:min-w-55 md:flex-1">
          <h2 className="relative mb-5.5 inline-block text-base font-bold tracking-[1.2px] text-white uppercase after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-8 after:rounded-sm after:bg-[#b0f538] after:content-['']">
            CONTACT INFO
          </h2>

          <ul className="m-0 flex list-none flex-col gap-4 p-0 text-sm leading-[1.6] text-[#e3f2f7]">
            <li>
              <a
                href="tel:+918724001944"
                className="group inline-flex items-start gap-3 font-medium text-[#e3f2f7] no-underline transition-all duration-250 hover:translate-x-1 hover:text-[#b0f538] hover:[text-shadow:0_0_8px_rgba(176,245,56,0.4)]"
              >
                <i className="fa-solid fa-phone mt-0.75 w-4.5 shrink-0 text-center text-[15px] transition-transform duration-250 group-hover:scale-110" />
                <span>+91-872-400-1944</span>
              </a>
            </li>

            <li>
              <a
                href="tel:+919706131039"
                className="group inline-flex items-start gap-3 font-medium text-[#e3f2f7] no-underline transition-all duration-250 hover:translate-x-1 hover:text-[#b0f538] hover:[text-shadow:0_0_8px_rgba(176,245,56,0.4)]"
              >
                <i className="fa-solid fa-phone mt-0.75 w-4.5 shrink-0 text-center text-[15px] transition-transform duration-250 group-hover:scale-110" />
                <span>+91-970-613-1039</span>
              </a>
            </li>

            <li>
              <a
                href="mailto:abdularfaz00@gmail.com"
                className="group inline-flex items-start gap-3 font-medium text-[#e3f2f7] no-underline transition-all duration-250 hover:translate-x-1 hover:text-[#b0f538] hover:[text-shadow:0_0_8px_rgba(176,245,56,0.4)]"
              >
                <i className="fa-solid fa-envelope mt-0.75 w-4.5 shrink-0 text-center text-[15px] transition-transform duration-250 group-hover:scale-110" />
                <span className="break-all">reachdocslot@gmail.com</span>
              </a>
            </li>

            <li className="flex items-start gap-3">
              <i className="fa-solid fa-location-dot mt-0.75 w-4.5 shrink-0 text-center text-[15px]" />
              <span>Cotton College Road, Panbazar, near BSNL Office</span>
            </li>

            <li className="flex items-start gap-3 font-medium text-green-50">
              <i className="fa-solid fa-clock mt-0.75 w-4.5 shrink-0 text-center text-[15px]" />
              <div>
                <span>Monday to Saturday</span>
                <br />
                <span>10:00 AM to 8:00 PM</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <hr className="my-5.5 mt-10 border-0 border-t border-solid border-white/20" />

      <p className="text-center text-[13px] tracking-[0.3px] text-[#d1ecf4]">
        Copyright 2026 @ DocSlot - All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;