import asyncHandler from "express-async-handler";
import userModel from "../Models/userModel.js";

import generateToken from "../utils/GenerateToken.js";
import multer from "multer";
import apiError from "../utils/apiError.js";
import sharp from "sharp";

const multerStorage = multer.memoryStorage();

const multerFilter = function (req, file, cb) {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new apiError("Only images are allowed", 400));
  }
};
// Upload a single image by using multer
const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

export const uploadUserImg = upload.single("userImage");

// Images Processing  and control with it name
export const resizeImage = async (req, res, next) => {
  if (req.file) {
    const fileName = `userImage-${Date.now()}.jpeg`;
    await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat("jpeg")
      .jpeg({quality: 90})
      .toFile(`uploads/users/${fileName}`);
    req.body.userImage = fileName;
  }

  next();
};

// #################### Posting ############################

// #desc    Auth user/set token
// rout     POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(200).json({data : user});
  } else {
    return next(new apiError("Invalid email or password"), 400);
  }
});

// #################### Posting ############################

// #desc    register a new User
// rout     POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  const userExist = await userModel.findOne({ email });
  if (userExist) {
    return next(new apiError("User already exists", 400));
  }
  const user = await userModel.create({
    name,
    email,
    password,
  });
  if (user) {
    generateToken(res, user._id);
    return res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    return next(new apiError("Something went wrong"), 400);
  }
});

// #################### Updating ############################

// #desc    logout user
// rout     POST /api/users/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", { httpOnly: true });
  res.status(200).json({ message: "User logged out" });
});

// #################### getting ############################

// #desc    Get user profile
// rout     GEt /api/users/profile
// @access  Private
const getUserProfile = async (req, res,next) => {
  const {id} =  req.params;
  const user = await userModel.findById(id)
  if (!user) {
    next(new apiError("you are not authenticated ! ", 401));
  }
  res.status(200).json({user });
};

// #################### Updating ############################

// #desc    update user profile
// rout     PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const user = await userModel
    .findOneAndUpdate({ _id: id }, req.body, { new: true })
    .select("-password");
  if (!user) {
    next(new apiError("you are not authenticated ! ", 401));
  }
  res.status(200).json({ user });
});

const followAndUnFollow = async(req , res , next)=>{
  try {
    const {id} = req.params
    const currentUser = req.user.id
    const userToModify = await userModel.findById(id);
    var followMessage = ''
    if(id === currentUser){
      return next( new apiError("you can't follow/unfollow yourself" , 400))
    }
    if(!userToModify || !currentUser){
      return next( new apiError("User not found" , 400))
    }

     const isFollowing = req.user.following.includes(id)
    if(isFollowing){
     // UnFollow user
     // modify current user following , modify followers of userToModify
     await userModel.findByIdAndUpdate(currentUser , {$pull: {following : id}})
     await userModel.findByIdAndUpdate(id , {$pull: {followers : currentUser}})
     followMessage = "unFollow successfully"
    }else{
       // UnFollow user
      await userModel.findByIdAndUpdate(currentUser , {$push: {following : id}})
      await userModel.findByIdAndUpdate(id , {$push: {followers : currentUser}})
      followMessage = "follow successfully"
    }
    const userTarget = await userModel.findById(id).select("followers -_id")
    res.status(200).json({userTarget , followMessage})
  } catch (error) {
    console.log(error)
  }
}

// #################### Exporting ############################
export {
  authUser,
  logoutUser,
  followAndUnFollow,
  registerUser,
  getUserProfile,
  updateUserProfile,
};
