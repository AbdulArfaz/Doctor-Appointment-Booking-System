import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Admin } from "../models/admin.model.js";
import { ApiError } from "../utils/ApiError.js";

const authAdmin = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.adminAccessToken;

  if (!token) {
    throw new ApiError(401, "Unauthorized: Admin cookie missing");
  }

  let decodedToken;

  try {
    decodedToken = jwt.verify(
      token,
      process.env.ADMIN_ACCESS_TOKEN_SECRET
    );
  } catch {
    throw new ApiError(401, "Invalid or expired admin token");
  }

  const adminId = decodedToken?._id || decodedToken?.id;
  const admin = await Admin.findById(adminId).select("-password");

  if (!admin) {
    throw new ApiError(401, "Admin not found");
  }

  req.admin = admin;
  next();
});

export default authAdmin;