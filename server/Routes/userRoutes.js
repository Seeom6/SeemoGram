import express from "express";
import {
  registerUserValidator,
  loginValidator,
} from "../utils/validators/registerValidator.js";
import {
  authUser,
  logoutUser,
  registerUser,
  getUserProfile,
  followAndUnFollow,
  updateUserProfile,
  resizeImage,
  uploadUserImg,
} from "../Controllers/userController.js";
import { protect } from "../MiddleWare/AuthMiddleWare.js";
const router = express.Router();

router.post("/", registerUserValidator, registerUser);
router.post("/auth", loginValidator, authUser);
router.post("/logout", logoutUser);
router.route("/profile").put(protect, uploadUserImg, resizeImage, updateUserProfile);
router.route("/profile/:id").get(protect, getUserProfile);
router.post("/follow/:id", protect, followAndUnFollow);
export default router;
