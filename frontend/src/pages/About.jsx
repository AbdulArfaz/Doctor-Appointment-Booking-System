import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div className="mx-auto max-w-300 px-5 py-10 font-[Inter,Arial,sans-serif] text-[#333333]">

      <section className="mb-17.5 flex flex-col items-center gap-8 text-center min-[993px]:flex-row min-[993px]:justify-between min-[993px]:gap-12.5 min-[993px]:text-left">
        <div className="flex-1">
          <p className="mb-3 text-[20px] font-bold tracking-[1.5px] text-[#386184] sm:text-[26px]">
            WELCOME TO DOCSLOT
          </p>

          <h1 className="mb-6 text-[36px] leading-[1.15] font-extrabold text-[#2b4964] min-[993px]:text-[48px]">
            Healthcare
            <br />
            Redefined in
            <br />
            <span className="text-[#7ca856]">Guwahati.</span>
          </h1>

          <p className="mx-auto max-w-130 text-base leading-[1.7] text-[#5a6e7f] min-[993px]:mx-0">
            Established with a vision to bring world-class healthcare to the
            heart of Assam, Swasthyam Multispeciality Clinic stands as a beacon
            of hope, healing, and absolute medical excellence.
          </p>
        </div>

        <div className="flex w-full flex-1 justify-center min-[993px]:justify-end">
          <img
            src={assets.stetAbout}
            alt="Swasthyam Clinic"
            className="w-full max-w-130 rounded-[20px] object-cover shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
          />
        </div>
      </section>

  
      <section className="mb-20">
        <div className="rounded-2xl bg-[linear-gradient(135deg,#1b5380_0%,#2b6a9e_100%)] px-5 py-8.75 text-center text-white shadow-[0_8px_25px_rgba(27,83,128,0.15)] sm:px-10 sm:py-12.5">
          <h2 className="mb-5 text-[26px] font-extrabold text-white md:text-[34px]">
            Seeking <span className="text-[#a3e635]">Cure</span> With{" "}
            <span className="text-[#a3e635]">Care</span>
          </h2>

          <p className="mx-auto max-w-225 text-base leading-[1.7] font-normal text-[#e2f1f8]">
            At DocSlot, we believe that medicine is both a science and an art.
            Our guiding philosophy dictates that while advanced medical science
            provides the <strong>Cure</strong>, it is the human touch, empathy,
            and compassion that provides the <strong>Care</strong>. We don't
            just treat illnesses; we heal people.
          </p>
        </div>
      </section>

    
      <section className="mb-20 text-center">
        <h2 className="mb-10 text-[26px] font-extrabold tracking-[-0.5px] text-[#2b4964] sm:text-[32px]">
          Our Two Pillars of Healing
        </h2>

        <div className="flex flex-col items-stretch justify-center gap-7.5 md:flex-row">
          <div className="flex-1 rounded-2xl border border-[#e5eaef] bg-white p-6 text-left shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] sm:p-10 sm:px-8.75">
            <div className="mb-6 flex size-12.5 items-center justify-center rounded-full bg-[#edf5fa] text-[22px] text-[#3b7197]">
              <i className="fa-solid fa-cube" aria-hidden="true"></i>
            </div>

            <h3 className="mb-4 text-[22px] font-bold text-[#2b4964]">
              The Cure
            </h3>

            <p className="m-0 text-[14.5px] leading-[1.7] text-[#6b7c8e]">
              We leverage highly advanced, state-of-the-art diagnostic
              machinery, fully automated pathology labs, and evidence-based
              medical protocols. Our team consists of leading MD/MS specialists
              who bring decades of clinical excellence to ensure highly
              accurate diagnoses and highly effective treatments.
            </p>
          </div>

          <div className="flex-1 rounded-2xl border border-[#e5eaef] bg-white p-6 text-left shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] sm:p-10 sm:px-8.75">
            <div className="mb-6 flex size-12.5 items-center justify-center rounded-full bg-[#f1f7ec] text-[22px] text-[#7ca856]">
              <i className="fa-regular fa-heart" aria-hidden="true"></i>
            </div>

            <h3 className="mb-4 text-[22px] font-bold text-[#2b4964]">
              The Care
            </h3>

            <p className="m-0 text-[14.5px] leading-[1.7] text-[#6b7c8e]">
              Medical journeys can be overwhelming. We ensure a warm, hygienic,
              and stress-free environment. From our polite reception staff to
              our empathetic doctors who take the time to listen to your
              concerns, every step of your journey is handled with absolute
              dignity, respect, and emotional support.
            </p>
          </div>
        </div>
      </section>

     
      <section className="mb-15 text-center">
        <h2 className="mb-10 text-[26px] font-extrabold tracking-[-0.5px] text-[#2b4964] sm:text-[32px]">
          Our Core Values
        </h2>

        <div className="grid grid-cols-1 items-stretch justify-center gap-6 sm:grid-cols-2 min-[993px]:grid-cols-4">
          <div className="rounded-xl border-t-4 border-[#386184] bg-[linear-gradient(180deg,#f9fbfd_0%,#ffffff_100%)] px-6 pt-10 pb-8.75 text-center shadow-[0_4px_15px_rgba(0,0,0,0.03)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1.25 hover:shadow-[0_10px_25px_rgba(0,0,0,0.08)]">
            <h3 className="mb-4 text-xl font-bold text-[#386184]">
              Integrity
            </h3>
            <p className="m-0 text-sm leading-[1.6] text-[#6b7c8e]">
              We maintain absolute transparency in our pricing, diagnoses, and
              treatment plans.
            </p>
          </div>

          <div className="rounded-xl border-t-4 border-[#7ca856] bg-[linear-gradient(180deg,#f9fbfd_0%,#ffffff_100%)] px-6 pt-10 pb-8.75 text-center shadow-[0_4px_15px_rgba(0,0,0,0.03)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1.25 hover:shadow-[0_10px_25px_rgba(0,0,0,0.08)]">
            <h3 className="mb-4 text-xl font-bold text-[#7ca856]">
              Excellence
            </h3>
            <p className="m-0 text-sm leading-[1.6] text-[#6b7c8e]">
              We continuously upgrade our technology and knowledge to provide
              premium healthcare.
            </p>
          </div>

          <div className="rounded-xl border-t-4 border-[#386184] bg-[linear-gradient(180deg,#f9fbfd_0%,#ffffff_100%)] px-6 pt-10 pb-8.75 text-center shadow-[0_4px_15px_rgba(0,0,0,0.03)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1.25 hover:shadow-[0_10px_25px_rgba(0,0,0,0.08)]">
            <h3 className="mb-4 text-xl font-bold text-[#386184]">
              Compassion
            </h3>
            <p className="m-0 text-sm leading-[1.6] text-[#6b7c8e]">
              We treat every patient as a member of our own family, with deep
              empathy.
            </p>
          </div>

          <div className="rounded-xl border-t-4 border-[#7ca856] bg-[linear-gradient(180deg,#f9fbfd_0%,#ffffff_100%)] px-6 pt-10 pb-8.75 text-center shadow-[0_4px_15px_rgba(0,0,0,0.03)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1.25 hover:shadow-[0_10px_25px_rgba(0,0,0,0.08)]">
            <h3 className="mb-4 text-xl font-bold text-[#7ca856]">
              Accessibility
            </h3>
            <p className="m-0 text-sm leading-[1.6] text-[#6b7c8e]">
              We strive to make top-tier medical consultations available to
              everyone.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;