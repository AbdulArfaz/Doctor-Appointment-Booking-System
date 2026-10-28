import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import "../styles/MyProfile.css";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const MyProfile = () => {
  const {
    backendurl,
    loadUserProfileImage,
    userData,
    setUserData,
  } = useContext(AppContext);

  const [image, setImage] = useState(false);
  const [edit, setEdit] = useState(false);

  // Use HTTPS for Cloudinary images and provide a fallback.
  const secureImageUrl = (url) => {
    if (!url) return assets.profile_pic;

    return url.replace(/^http:\/\//i, "https://");
  };

  const fetchProfile = async () => {
    try {
      const response = await axios.get(
        `${backendurl}/api/user/get-profile`,
        { withCredentials: true }
      );

      const profileData = response.data.data || response.data.user;

      if (profileData) {
        let parsedAddress = profileData.address;

        if (typeof parsedAddress === "string") {
          try {
            parsedAddress = JSON.parse(parsedAddress);
          } catch {
            parsedAddress = { line1: "", line2: "" };
          }
        }

        if (
          !parsedAddress ||
          typeof parsedAddress !== "object" ||
          Array.isArray(parsedAddress)
        ) {
          parsedAddress = { line1: "", line2: "" };
        }

        setUserData({
          name: profileData.name || "",
          email: profileData.email || "",
          phone: profileData.phone || "",
          address: {
            line1: parsedAddress.line1 || "",
            line2: parsedAddress.line2 || "",
          },
          gender: profileData.gender || "Male",
          dob: profileData.dob || "",
          image: profileData.image || "",
        });
      }
    } catch (error) {
      console.error(
        "Error fetching profile:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSave = async (e) => {
    if (e) e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);

      if (image) {
        formData.append("image", image);
      }

      const response = await axios.put(
        `${backendurl}/api/user/update-profile`,
        formData,
        { withCredentials: true }
      );

      if (response.data.success) {
        setEdit(false);
        setImage(false);

        await fetchProfile();
        await loadUserProfileImage();
      }
    } catch (error) {
      console.error(
        "Error updating profile:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="mx-auto my-7.5 w-[95%] max-w-200 rounded-2xl border border-gray-800 bg-gray-900 p-5 font-[system-ui,-apple-system,sans-serif] text-gray-100 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.3)] sm:w-[80%] sm:p-8">
      <div className="flex flex-col gap-4">
        {edit ? (
          <label htmlFor="image" className="w-fit cursor-pointer">
            <img
              src={
                image
                  ? URL.createObjectURL(image)
                  : secureImageUrl(userData.image)
              }
              alt="User profile"
              className="size-25 rounded-[14px] border-2 border-emerald-500 object-cover"
            />

            <input
              type="file"
              id="image"
              hidden
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || false)}
            />
          </label>
        ) : (
          <img
            src={secureImageUrl(userData.image)}
            alt="User profile"
            className="size-25 rounded-[14px] border-2 border-emerald-500 object-cover"
          />
        )}

        {edit ? (
          <input
            type="text"
            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-2.5 py-2 text-xl font-semibold text-white outline-none focus:border-emerald-500"
            value={userData.name || ""}
            onChange={(e) =>
              setUserData((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
          />
        ) : (
          <h2 className="m-0 text-2xl font-bold text-white">
            {userData.name}
          </h2>
        )}
      </div>

      <hr className="my-5 h-px border-0 bg-gray-800" />

      <div className="mb-6">
        <p className="mb-3.5 text-xs font-bold tracking-[0.08em] text-gray-400 underline underline-offset-4">
          CONTACT INFORMATION
        </p>

        <div className="grid grid-cols-1 items-center gap-x-5 gap-y-1 min-[481px]:grid-cols-[160px_minmax(0,1fr)] min-[481px]:gap-y-3.5">
          <p className="m-0 text-sm font-semibold text-gray-300">
            Email id:
          </p>

          <p className="m-0 break-all text-[0.92rem] text-sky-400">
            {userData.email}
          </p>

          <p className="m-0 text-sm font-semibold text-gray-300">
            Phone:
          </p>

          {edit ? (
            <input
              type="text"
              className="box-border w-full rounded-lg border border-gray-700 bg-gray-800 px-2.5 py-2 text-sm text-white outline-none focus:border-emerald-500"
              value={userData.phone || ""}
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  phone: e.target.value,
                }))
              }
            />
          ) : (
            <p className="m-0 text-[0.92rem] text-white">
              {userData.phone}
            </p>
          )}

          <p className="m-0 text-sm font-semibold text-gray-300">
            Address:
          </p>

          {edit ? (
            <div className="flex flex-col gap-1.5">
              <input
                type="text"
                className="box-border w-full rounded-lg border border-gray-700 bg-gray-800 px-2.5 py-2 text-sm text-white outline-none focus:border-emerald-500"
                value={userData.address?.line1 || ""}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: {
                      ...(prev.address || {}),
                      line1: e.target.value,
                    },
                  }))
                }
              />

              <input
                type="text"
                className="box-border w-full rounded-lg border border-gray-700 bg-gray-800 px-2.5 py-2 text-sm text-white outline-none focus:border-emerald-500"
                value={userData.address?.line2 || ""}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: {
                      ...(prev.address || {}),
                      line2: e.target.value,
                    },
                  }))
                }
              />
            </div>
          ) : (
            <p className="m-0 text-[0.92rem] text-white">
              {userData.address?.line1}
              <br />
              {userData.address?.line2}
            </p>
          )}
        </div>
      </div>

      <div className="mb-6">
        <p className="mb-3.5 text-xs font-bold tracking-[0.08em] text-gray-400 underline underline-offset-4">
          BASIC INFORMATION
        </p>

        <div className="grid grid-cols-1 items-center gap-x-5 gap-y-1 min-[481px]:grid-cols-[160px_minmax(0,1fr)] min-[481px]:gap-y-3.5">
          <p className="m-0 text-sm font-semibold text-gray-300">
            Gender:
          </p>

          {edit ? (
            <select
              className="box-border w-full rounded-lg border border-gray-700 bg-gray-800 px-2.5 py-2 text-sm text-white outline-none focus:border-emerald-500"
              value={userData.gender || "Male"}
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  gender: e.target.value,
                }))
              }
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p className="m-0 text-[0.92rem] text-white">
              {userData.gender}
            </p>
          )}

          <p className="m-0 text-sm font-semibold text-gray-300">
            Birth date:
          </p>

          {edit ? (
            <input
              type="date"
              className="box-border w-full rounded-lg border border-gray-700 bg-gray-800 px-2.5 py-2 text-sm text-white scheme-dark outline-none focus:border-emerald-500"
              value={
                !userData.dob || userData.dob === "Not Selected"
                  ? ""
                  : String(userData.dob).slice(0, 10)
              }
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  dob: e.target.value,
                }))
              }
            />
          ) : (
            <p className="m-0 text-[0.92rem] text-white">
              {userData.dob || "Not Selected"}
            </p>
          )}
        </div>
      </div>

      <div className="mt-6">
        {edit ? (
          <button
            type="button"
            className="cursor-pointer rounded-lg border-none bg-emerald-500 px-5.5 py-2.5 text-[0.95rem] font-semibold text-white transition-colors duration-200 hover:bg-emerald-600"
            onClick={handleSave}
          >
            Save Information
          </button>
        ) : (
          <button
            type="button"
            className="cursor-pointer rounded-lg border border-emerald-500 bg-transparent px-5.5 py-2.5 text-[0.95rem] font-semibold text-emerald-500 transition-colors duration-200 hover:bg-emerald-500 hover:text-white"
            onClick={() => setEdit(true)}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;