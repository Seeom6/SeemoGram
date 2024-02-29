import express from "express";

import { protect } from "../MiddleWare/AuthMiddleWare.js";
import {
  createPost,
  resizeImage,
  getSpecificPost,
  getAllPosts,
  uploadPostImg,
  likeUnLike,
  addComment,
} from "../Controllers/postsController.js";
const router = express.Router();

router.route("/")
  .post(protect, uploadPostImg, resizeImage, createPost)
  .get(getAllPosts);
router.route("/:id").get(protect , getSpecificPost)
router.route("/likes/:id").put(protect , likeUnLike)
router.route("/comments/:id").put(protect , addComment)
export default router;
