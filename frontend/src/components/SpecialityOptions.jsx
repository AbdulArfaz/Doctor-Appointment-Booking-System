import React from "react";
import { specialityData } from "../assets/assets";
import { Link } from "react-router-dom";

const SpecialityOptions = () => {
  return (
    <section
      id="speciality"
      className="flex flex-col items-center gap-4 px-4 py-16 text-center text-gray-800"
    >
      <h1 className="m-0 text-2xl font-medium text-gray-800 sm:text-3xl">
        Find by Speciality
      </h1>

      <p className="m-0 w-[90%] max-w-125 text-sm leading-relaxed text-gray-500">
        Simply browse through our extensive list of trusted doctors,
        schedule your appointment hassle-free.
      </p>

      <div className="scrollbar-hide flex w-full items-start justify-start gap-6 overflow-x-auto pt-8 sm:justify-center">
        {specialityData.map((item, index) => (
          <Link
            key={index}
            to={`/doctors/${item.speciality}`}
            onClick={() => window.scrollTo(0, 0)}
            className="group flex w-25 shrink-0 cursor-pointer flex-col items-center text-gray-600 no-underline transition-transform duration-300 ease-in-out hover:-translate-y-2"
          >
            <div className="mb-3 flex h-22.5 w-22.5 items-center justify-center overflow-hidden rounded-full bg-indigo-100">
              <img
                src={item.image}
                alt={item.speciality}
                className="h-[60%] w-[60%] object-contain"
              />
            </div>

            <p className="m-0 text-center text-[0.85rem] leading-tight text-gray-600">
              {item.speciality}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default SpecialityOptions;