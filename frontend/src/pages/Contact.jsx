import React from "react";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div className="mx-auto my-10 flex max-w-250 flex-col items-center justify-center gap-8 px-5 py-5 min-[769px]:flex-row">
  
      <div className="flex w-full flex-1 justify-center">
        <img
          src={assets.contactUs}
          alt="Contact Us"
          className="h-auto w-full max-w-112.5 rounded-2xl object-cover"
        />
      </div>


      <div className="w-full flex-1 rounded-2xl border border-gray-800 bg-gray-900 px-6 py-8 text-gray-100 shadow-[0_20px_25px_-5px_rgba(0,0,0,0.2)] sm:px-8 sm:py-9">
        <h2 className="relative mb-7 text-[1.75rem] font-bold tracking-tight text-white after:absolute after:-bottom-2 after:left-0 after:h-0.75 after:w-10 after:rounded-sm after:bg-emerald-500 after:content-['']">
          Get In Touch
        </h2>

  
        <div className="mb-6 last:mb-0">
          <div className="mb-1.5 flex items-center gap-2 text-xs font-semibold tracking-[0.08em] text-emerald-500 uppercase before:inline-block before:size-1.5 before:shrink-0 before:rounded-full before:bg-emerald-500 before:content-['']">
            Address
          </div>

          <div className="mb-1 text-[1.1rem] font-semibold text-white">
            DocSlot Multispeciality Clinic
          </div>

          <div className="text-[0.95rem] leading-6 text-gray-400">
            Pan Bazar, ARB Road, near BSNL Office, Guwahati, Assam - 781001
          </div>
        </div>


        <div className="mb-6 last:mb-0">
          <div className="mb-1.5 flex items-center gap-2 text-xs font-semibold tracking-[0.08em] text-emerald-500 uppercase before:inline-block before:size-1.5 before:shrink-0 before:rounded-full before:bg-emerald-500 before:content-['']">
            For Home Collection &amp; Appointment
          </div>

          <div className="text-[0.95rem] leading-6 text-gray-400">
            <a
              href="tel:9287988031"
              className="font-medium text-gray-100 transition-colors duration-200 hover:text-emerald-500 hover:underline"
            >
              8724001944
            </a>
            {" | "}
            <a
              href="tel:9287988032"
              className="font-medium text-gray-100 transition-colors duration-200 hover:text-emerald-500 hover:underline"
            >
              9706131039
            </a>
          </div>
        </div>

 
        <div className="mb-6 last:mb-0">
          <div className="mb-1.5 flex items-center gap-2 text-xs font-semibold tracking-[0.08em] text-emerald-500 uppercase before:inline-block before:size-1.5 before:shrink-0 before:rounded-full before:bg-emerald-500 before:content-['']">
            Email
          </div>

          <div className="text-[0.95rem] leading-6 text-gray-400">
            <a
              href="mailto:info@docslotguwahati.in"
              className="break-all font-medium text-gray-100 transition-colors duration-200 hover:text-emerald-500 hover:underline"
            >
              info@docslotguwahati.in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;