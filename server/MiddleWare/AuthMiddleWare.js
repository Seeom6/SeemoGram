import jwt from "jsonwebtoken";
import userModel from "../Models/userModel.js";
import asyncHandler from "express-async-handler";
import apiError from "../utils/apiError.js";

const protect = asyncHandler(async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const token = req.cookies.jwt;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await userModel.findById(decoded.userId).select("-password")
      if(!user){
        return next(new apiError("you have deleted or you are not authenticated!"))
      }
      req.user = user
      next()
    } catch (error) {
        next(new apiError("Something went wrong , Please check if your are register or not",401))
    }
  } else {
    next(
      new apiError(
        "your not authorized , Please check if your are register or not" ,401
      )
    );
  }
});

export { protect };


