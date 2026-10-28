import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const RelatedDoctors = ({ speciality, drId }) => {
  const navigate = useNavigate();

  const { doctors } = useContext(AppContext);
  const [relatedDoc, setRelatedDoc] = useState([]);

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== drId
      );
      setRelatedDoc(doctorsData);
    } else {
      setRelatedDoc([]);
    }
  }, [doctors, speciality, drId]);

  if (relatedDoc.length === 0) return null;

  return (
    <section className="mx-auto mt-16 w-full max-w-300 px-1 py-6 sm:px-2">
      {/* Heading */}
      <div className="mb-8 text-center">
        <h2 className="mb-3 text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
          Related Doctors
        </h2>
        <p className="mx-auto max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
          Simply browse through our extensive list of trusted doctors.
        </p>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,220px),1fr))] gap-5 sm:gap-6">
        {relatedDoc.map((item, index) => (
          <button
            type="button"
            key={item._id || item.id || index}
            onClick={() => {
              navigate(`/appointment/${item._id || item.id}`);
              window.scrollTo(0, 0);
            }}
            className="group block w-full cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white p-0 text-left shadow-[0_4px_15px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-200 hover:shadow-[0_16px_30px_rgba(15,23,42,0.10)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
          >
            {/* Doctor Image */}
            <div className="flex h-55 items-end justify-center overflow-hidden bg-[#edf4ff]">
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.04]"
              />
            </div>

            {/* Doctor Information */}
            <div className="p-4">
              <div className="mb-2 flex items-center gap-2 text-xs font-medium text-emerald-600">
                <span className="relative flex size-2 shrink-0">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                </span>
                Available
              </div>

              <p className="mb-1 text-base font-bold text-slate-800 transition-colors group-hover:text-emerald-700">
                {item.name}
              </p>

              <p className="text-sm text-slate-500">
                {item.speciality}
              </p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};

export default RelatedDoctors;