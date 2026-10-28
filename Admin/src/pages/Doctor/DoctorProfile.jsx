import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AdminAppContext";

const DoctorProfile = () => {
  const {
    profileData,
    setProfileData,
    getProfileData,
    backendurl,
  } = useContext(DoctorContext);

  const { currency } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isChangingAvailability, setIsChangingAvailability] =
    useState(false);

  useEffect(() => {
    getProfileData();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      setImageFile(file);
    }
  };

  const updateProfile = async () => {
    try {
      setIsSaving(true);

      const formData = new FormData();

      formData.append("name", profileData.name || "");
      formData.append("degree", profileData.degree || "");
      formData.append("about", profileData.about || "");
      formData.append("fees", profileData.fees ?? "");
      formData.append("available", String(profileData.available));
      formData.append(
        "address",
        JSON.stringify(profileData.address || {})
      );

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const { data } = await axios.post(
        `${backendurl}/api/doctors/update-profile`,
        formData,
        { withCredentials: true }
      );

      if (data.success) {
        toast.success(data.message || "Profile updated successfully!");

        const updatedDoc = data.data;

        if (updatedDoc && typeof updatedDoc.address === "string") {
          try {
            updatedDoc.address = JSON.parse(updatedDoc.address || "{}");
          } catch {
            updatedDoc.address = {};
          }
        }

        if (updatedDoc) {
          setProfileData(updatedDoc);
        }

        setImageFile(null);
        setIsEdit(false);
      } else {
        toast.error(data.message || "Unable to update profile");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to update profile"
      );
    } finally {
      setIsSaving(false);
    }
  };

  const changeAvailability = async () => {
    if (!profileData?._id || isChangingAvailability) return;

    try {
      setIsChangingAvailability(true);

      const { data } = await axios.post(
        `${backendurl}/api/doctors/change-availability`,
        { docId: profileData._id },
        { withCredentials: true }
      );

      if (data.success) {
        toast.success(data.message || "Availability updated!");
        await getProfileData();
      } else {
        toast.error(data.message || "Unable to change availability");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to update availability"
      );
    } finally {
      setIsChangingAvailability(false);
    }
  };

  const updateField = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateAddress = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      address: {
        ...(prev.address || {}),
        [field]: value,
      },
    }));
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100";

  if (!profileData) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-slate-50 px-4">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600" />
          <p className="text-sm font-medium text-slate-500">
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  const photoPreview = imageFile
    ? URL.createObjectURL(imageFile)
    : profileData.image;

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 text-slate-800 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto max-w-5xl">
  
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
              DocSlot Healthcare
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">
              Doctor{" "}
              <span className="bg-linear-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                Profile
              </span>
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
              Manage your professional information and appointment availability.
            </p>
          </div>

          <span
            className={`inline-flex w-fit items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold ${
              profileData.available
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border-rose-200 bg-rose-50 text-rose-700"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                profileData.available ? "bg-emerald-500" : "bg-rose-500"
              }`}
            />
            {profileData.available ? "Available for Appointments" : "Currently Unavailable"}
          </span>
        </div>

  
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
       
          <div className="relative h-32 overflow-hidden bg-linear-to-r from-indigo-600 via-violet-600 to-blue-500 sm:h-40">
            <div className="absolute -right-10 -top-20 h-56 w-56 rounded-full border-28 border-white/10" />
            <div className="absolute -bottom-20 left-1/3 h-48 w-48 rounded-full bg-white/10 blur-2xl" />

            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-white">
  <p className="text-xs font-medium tracking-[0.2em] text-white/80">
    PROFESSIONAL PROFILE
  </p>

  <p className="mt-2 text-lg font-semibold sm:text-xl">
    Your Information, Your Way
  </p>
</div>
          </div>

          <div className="px-5 pb-6 sm:px-8 sm:pb-8">
         
            <div className="-mt-10 flex flex-col gap-5 sm:-mt-12 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                <div className="relative h-28 w-28 shrink-0 sm:h-32 sm:w-32">
                  <img
                    src={photoPreview || ""}
                    alt={profileData.name || "Doctor"}
                    onError={(e) => {
                      e.currentTarget.style.visibility = "hidden";
                    }}
                    className="h-full w-full rounded-2xl border-4 border-white bg-slate-100 object-cover shadow-md"
                  />

                  {isEdit && (
                    <label
                      htmlFor="image-upload"
                      className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl bg-slate-900/60 text-white opacity-0 transition hover:opacity-100 focus-within:opacity-100"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        className="h-7 w-7"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 7h3l2-3h6l2 3h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1Z"
                        />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                      <span className="text-xs font-semibold">Change Photo</span>
                      <input
                        type="file"
                        id="image-upload"
                        accept="image/*"
                        className="sr-only"
                        onChange={handleImageChange}
                      />
                    </label>
                  )}

                  {isEdit && (
                    <span className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-indigo-600 text-white shadow-sm">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="h-4 w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L9 17l-4 1 1-4Z"
                        />
                      </svg>
                    </span>
                  )}
                </div>

                <div className="pb-1">
                  {isEdit ? (
                    <div className="w-full sm:min-w-64">
                      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Full Name
                      </label>
                      <input
                        type="text"
                        className={inputClass}
                        value={profileData.name || ""}
                        onChange={(e) => updateField("name", e.target.value)}
                        placeholder="Enter your full name"
                      />
                    </div>
                  ) : (
                    <>
                      <h2 className="wrap-break-word text-2xl font-bold text-slate-800 sm:text-3xl">
                        {profileData.name}
                      </h2>
                      <p className="mt-1 text-sm text-slate-500">
                        {profileData.degree} · {profileData.speciality}
                      </p>
                    </>
                  )}
                </div>
              </div>

              {!isEdit && (
                <button
                  type="button"
                  onClick={() => setIsEdit(true)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 sm:w-auto"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L9 17l-4 1 1-4Z"
                    />
                  </svg>
                  Edit Profile
                </button>
              )}
            </div>

        
            <div className="my-7 border-t border-slate-100 sm:my-8" />

            
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
             
              <div className="space-y-6 lg:col-span-2">
                <section className="rounded-2xl border border-slate-100 bg-slate-50/70 p-5 sm:p-6">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        className="h-5 w-5"
                      >
                        <circle cx="12" cy="8" r="4" />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 21v-2a8 8 0 0 1 16 0v2"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800">
                        Professional Information
                      </h3>
                      <p className="mt-0.5 text-xs text-slate-500">
                        Your qualifications and introduction
                      </p>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Degree
                      </label>
                      {isEdit ? (
                        <input
                          type="text"
                          className={inputClass}
                          value={profileData.degree || ""}
                          onChange={(e) =>
                            updateField("degree", e.target.value)
                          }
                          placeholder="e.g. MBBS, MD"
                        />
                      ) : (
                        <p className="rounded-xl border border-slate-100 bg-white px-4 py-3 text-sm text-slate-700">
                          {profileData.degree || "Not provided"}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        About
                      </label>
                      {isEdit ? (
                        <textarea
                          rows={5}
                          className={`${inputClass} resize-y`}
                          value={profileData.about || ""}
                          onChange={(e) =>
                            updateField("about", e.target.value)
                          }
                          placeholder="Write a short professional introduction..."
                        />
                      ) : (
                        <p className="whitespace-pre-line rounded-xl border border-slate-100 bg-white px-4 py-3 text-sm leading-7 text-slate-600">
                          {profileData.about || "No introduction added yet."}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Clinic Address
                      </label>

                      {isEdit ? (
                        <div className="space-y-3">
                          <input
                            type="text"
                            className={inputClass}
                            value={profileData.address?.line1 || ""}
                            onChange={(e) =>
                              updateAddress("line1", e.target.value)
                            }
                            placeholder="Address line 1"
                          />
                          <input
                            type="text"
                            className={inputClass}
                            value={profileData.address?.line2 || ""}
                            onChange={(e) =>
                              updateAddress("line2", e.target.value)
                            }
                            placeholder="Address line 2"
                          />
                        </div>
                      ) : (
                        <div className="rounded-xl border border-slate-100 bg-white px-4 py-3 text-sm leading-6 text-slate-600">
                          <p>{profileData.address?.line1 || "Address not provided"}</p>
                          {profileData.address?.line2 && (
                            <p>{profileData.address.line2}</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </section>
              </div>

            
              <aside className="space-y-5">
             
                <div className="rounded-2xl border border-violet-100 bg-linear-to-br from-violet-50 to-white p-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-violet-600">
                    Experience
                  </p>
                  <p className="mt-3 text-2xl font-bold text-slate-800">
                    {profileData.experience || "Not specified"}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Professional experience
                  </p>
                </div>

            
                <div className="rounded-2xl border border-blue-100 bg-linear-to-br from-blue-50 to-white p-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                    Appointment Fee
                  </p>

                  {isEdit ? (
                    <div className="mt-3 flex items-center gap-2 rounded-xl border border-blue-100 bg-white px-3 py-2 focus-within:ring-4 focus-within:ring-blue-100">
                      <span className="font-semibold text-slate-500">
                        {currency}
                      </span>
                      <input
                        type="number"
                        min="0"
                        className="min-w-0 flex-1 bg-transparent text-xl font-bold text-slate-800 outline-none"
                        value={profileData.fees ?? ""}
                        onChange={(e) => updateField("fees", e.target.value)}
                        placeholder="0"
                      />
                    </div>
                  ) : (
                    <p className="mt-3 wrap-break-word text-3xl font-bold tracking-tight text-slate-800">
                      {currency}
                      {profileData.fees ?? 0}
                    </p>
                  )}

                  <p className="mt-2 text-xs text-slate-500">
                    Per appointment
                  </p>
                </div>

             
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Availability
                  </p>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        Accepting bookings
                      </p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        {profileData.available
                          ? "Patients can book appointments."
                          : "New bookings are currently disabled."}
                      </p>
                    </div>

                    <button
                      type="button"
                      role="switch"
                      aria-checked={Boolean(profileData.available)}
                      disabled={isChangingAvailability}
                      onClick={changeAvailability}
                      className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors focus:outline-none focus:ring-4 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:opacity-60 ${
                        profileData.available
                          ? "bg-emerald-500"
                          : "bg-slate-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
                          profileData.available
                            ? "translate-x-6"
                            : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>

                  {isChangingAvailability && (
                    <p className="mt-3 text-xs text-indigo-600">
                      Updating availability...
                    </p>
                  )}
                </div>
              </aside>
            </div>

       
            {isEdit && (
              <div className="mt-7 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setIsEdit(false);
                    setImageFile(null);
                    getProfileData();
                  }}
                  disabled={isSaving}
                  className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-60 sm:min-w-32"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={updateProfile}
                  disabled={isSaving}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 disabled:cursor-not-allowed disabled:opacity-60 sm:min-w-40"
                >
                  {isSaving ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          DocSlot · Doctor Workspace
        </p>
      </div>
    </div>
  );
};

export default DoctorProfile;