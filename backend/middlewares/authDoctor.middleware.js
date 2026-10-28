import jwt from "jsonwebtoken";
import { Doctor } from "../models/doctor.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const verifyDoctorJWT = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.doctorAccessToken;

  if (!token) {
    throw new ApiError(401, "Unauthorized: Doctor cookie missing");
  }

  let decodedToken;

  try {
    decodedToken = jwt.verify(
      token,
      process.env.DOCTOR_ACCESS_TOKEN_SECRET
    );
  } catch {
    throw new ApiError(401, "Invalid or expired doctor token");
  }

  const doctor = await Doctor.findById(decodedToken?._id).select(
    "-password -refreshToken"
  );

  if (!doctor) {
    throw new ApiError(401, "Doctor not found");
  }

  req.doctor = doctor;
  next();
});