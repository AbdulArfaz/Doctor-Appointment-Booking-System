import React, { useContext, useState } from 'react';
import { assets } from '../../assets_admin/assets';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const AdminAddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [experience, setExperience] = useState('1 Year');
  const [fees, setFees] = useState('');
  const [speciality, setSpeciality] = useState('General Physician');
  const [degree, setDegree] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [about, setAbout] = useState('');

  const { backendurl, adminToken } = useContext(AdminContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (!docImg) {
        return toast.error('Please upload a doctor picture.');
      }

      const formData = new FormData();

      formData.append('image', docImg);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('experience', experience);
      formData.append('fees', Number(fees));
      formData.append('speciality', speciality);
      formData.append('degree', degree);
      formData.append(
        'address',
        JSON.stringify({ line1: address1, line2: address2 })
      );
      formData.append('about', about);

      const { data } = await axios.post(
        backendurl + '/api/admin/add-doctor',
        formData,
        { withCredentials: true }
      );

      if (data.success) {
        toast.success(data.message);
        setDocImg(false);
        setName('');
        setPassword('');
        setEmail('');
        setAddress1('');
        setAddress2('');
        setDegree('');
        setAbout('');
        setFees('');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const inputClass =
    'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition duration-200 placeholder:text-slate-400 hover:border-indigo-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100';

  const labelClass =
    'mb-2 block text-sm font-semibold text-slate-700';

  const sectionClass =
    'rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6';

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-indigo-50/40 to-violet-50/50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl">

        <div className="relative mb-7 overflow-hidden rounded-3xl bg-linear-to-r from-indigo-700 via-indigo-600 to-violet-600 p-6 text-white shadow-xl shadow-indigo-200/60 sm:p-8">
          <div className="pointer-events-none absolute -right-10 -top-24 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-28 right-1/4 h-52 w-52 rounded-full bg-fuchsia-400/20 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-indigo-50 backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-300" />
                DOCTOR MANAGEMENT
              </div>

              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Add a new doctor
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-indigo-100 sm:text-base">
                Expand your healthcare team by adding a doctor's profile,
                qualifications and appointment details.
              </p>
            </div>

            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/10 shadow-inner backdrop-blur-md sm:h-16 sm:w-16">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                className="h-8 w-8 sm:h-9 sm:w-9"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v10m-5-5h10" />
                <circle cx="12" cy="12" r="9" />
              </svg>
            </div>
          </div>
        </div>

        <form onSubmit={onSubmitHandler} className="space-y-6">

      
          <section className={sectionClass}>
            <div className="mb-5">
              <h2 className="text-lg font-bold text-slate-900">
                Doctor profile
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Start with a professional profile picture and basic information.
              </p>
            </div>

            <div className="flex flex-col items-center gap-5 rounded-2xl border border-dashed border-indigo-200 bg-linear-to-br from-indigo-50/80 to-violet-50/80 p-5 sm:flex-row sm:p-6">
              <label
                htmlFor="doc-img"
                className="group relative flex h-32 w-32 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-white bg-white shadow-md ring-1 ring-indigo-100 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-100"
              >
                <img
                  src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
                  alt="Doctor profile preview"
                  className="h-full w-full object-cover"
                />

                <span className="absolute inset-x-0 bottom-0 bg-slate-900/70 py-2 text-center text-xs font-semibold text-white opacity-0 transition group-hover:opacity-100">
                  Change photo
                </span>
              </label>

              <input
                onChange={(e) => setDocImg(e.target.files[0])}
                type="file"
                id="doc-img"
                accept="image/*"
                hidden
              />

              <div className="text-center sm:text-left">
                <p className="font-bold text-slate-800">
                  Upload doctor picture
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Choose a clear, professional photo to help patients recognise
                  their doctor.
                </p>
                <label
                  htmlFor="doc-img"
                  className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-200"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16V4m0 0L7 9m5-5 5 5M5 16v3a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3" />
                  </svg>
                  Choose image
                </label>
                <p className="mt-2 text-xs text-slate-400">
                  Please select an image file.
                </p>
              </div>
            </div>
          </section>

      
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">

            <section className={sectionClass}>
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br from-indigo-100 to-violet-100 text-indigo-700">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-5 w-5" aria-hidden="true">
                    <circle cx="12" cy="8" r="4" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 21a8 8 0 0 1 16 0" />
                  </svg>
                </div>
                <div>
                  <h2 className="font-bold text-slate-900">Personal details</h2>
                  <p className="text-xs text-slate-500">Identity and login information</p>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <label className={labelClass}>Doctor name</label>
                  <input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    type="text"
                    placeholder="e.g. Dr. John Smith"
                    autoComplete="name"
                    className={inputClass}
                    required
                  />
                </div>

                <div>
                  <label className={labelClass}>Doctor email</label>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="email"
                    placeholder="doctor@example.com"
                    autoComplete="email"
                    className={inputClass}
                    required
                  />
                </div>

                <div>
                  <label className={labelClass}>Doctor password</label>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type="password"
                    placeholder="Create a secure password"
                    autoComplete="new-password"
                    className={inputClass}
                    required
                  />
                  <p className="mt-2 text-xs text-slate-400">
                    Use a strong password for the doctor's account.
                  </p>
                </div>

                <div>
                  <label className={labelClass}>Address line 1</label>
                  <input
                    onChange={(e) => setAddress1(e.target.value)}
                    value={address1}
                    type="text"
                    placeholder="Street, building or clinic"
                    autoComplete="address-line1"
                    className={inputClass}
                    required
                  />
                </div>

                <div>
                  <label className={labelClass}>Address line 2</label>
                  <input
                    onChange={(e) => setAddress2(e.target.value)}
                    value={address2}
                    type="text"
                    placeholder="Area, city or additional details"
                    autoComplete="address-line2"
                    className={inputClass}
                    required
                  />
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br from-emerald-100 to-teal-100 text-emerald-700">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-5 w-5" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m-9-9h18" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 5h14v14H5z" />
                  </svg>
                </div>
                <div>
                  <h2 className="font-bold text-slate-900">Professional details</h2>
                  <p className="text-xs text-slate-500">Speciality, experience and fees</p>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <label className={labelClass}>Speciality</label>
                  <select
                    onChange={(e) => setSpeciality(e.target.value)}
                    value={speciality}
                    className={inputClass}
                  >
                    <option value="General Physician">General Physician</option>
                    <option value="Gynecologist">Gynecologist</option>
                    <option value="Dermatologist">Dermatologist</option>
                    <option value="Pediatricians">Pediatricians</option>
                    <option value="Neurologist">Neurologist</option>
                    <option value="Gastroenterologist">Gastroenterologist</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Experience</label>
                  <select
                    onChange={(e) => setExperience(e.target.value)}
                    value={experience}
                    className={inputClass}
                  >
                    {Array.from({ length: 30 }, (_, i) => (
                      <option key={i + 1} value={`${i + 1} Year`}>
                        {i + 1} {i === 0 ? 'Year' : 'Years'}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Education / degree</label>
                  <input
                    onChange={(e) => setDegree(e.target.value)}
                    value={degree}
                    type="text"
                    placeholder="e.g. MBBS, MD"
                    className={inputClass}
                    required
                  />
                </div>

                <div>
                  <label className={labelClass}>Consultation fees (₹)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
                      ₹
                    </span>
                    <input
                      onChange={(e) => setFees(e.target.value)}
                      value={fees}
                      type="number"
                      min="0"
                      placeholder="e.g. 500"
                      className={`${inputClass} pl-9`}
                      required
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>

     
          <section className={sectionClass}>
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br from-amber-100 to-orange-100 text-orange-700">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-5 w-5" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
                </svg>
              </div>
              <div>
                <h2 className="font-bold text-slate-900">About the doctor</h2>
                <p className="text-xs text-slate-500">Write a short professional introduction</p>
              </div>
            </div>

            <label className={labelClass}>Biography</label>
            <textarea
              onChange={(e) => setAbout(e.target.value)}
              value={about}
              placeholder="Describe the doctor's expertise, experience and approach to patient care..."
              rows={5}
              className={`${inputClass} min-h-32 resize-y leading-6`}
              required
            />
          </section>

      
          <div className="flex flex-col-reverse gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <p className="text-xs leading-5 text-slate-500">
              Please check the details before creating the doctor's profile.
              <br className="hidden sm:block" />
              Required fields must be completed.
            </p>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-indigo-600 via-indigo-600 to-violet-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition duration-200 hover:-translate-y-0.5 hover:from-indigo-700 hover:to-violet-700 hover:shadow-xl hover:shadow-indigo-200 focus:outline-none focus:ring-4 focus:ring-indigo-200 active:translate-y-0 sm:w-auto"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m-7-7h14" />
              </svg>
              Add doctor
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AdminAddDoctor;