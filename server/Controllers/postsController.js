import postModel from "../Models/PostModel.js"
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

export const uploadPostImg = upload.single("postImage");

// Images Processing  and control with it name
export const resizeImage = async (req, res, next) => {
  if (req.file) {
    const fileName = `postImage-${Date.now()}.jpeg`;
    await sharp(req.file.buffer)
      .resize(1200, 800)
      .toFormat("jpeg")
      .toFile(`uploads/posts/${fileName}`);
      req.body.postImage = fileName;
  }

  next();
};



export const createPost = async(req, res ,next)=>{


    const {location , tags , caption , postImage} = req.body
    
    const post = await postModel.create( {
        userPost : req.user._id,
        location ,
        tags ,
        caption,
        postImage
    })
    res.status(200).json({data : post })
}


export const getAllPosts = async(req , res ,next)=>{
  const posts = await postModel.find().populate({path : "userPost" , select: "name userImage" }).sort({ updatedAt: -1 })
  if(!posts){
    return next(new apiError("there is no Posts" , 404))
  }

  res.status(200).json({data  : posts})
}


export const getSpecificPost = async(req , res , next)=>{
  const {id} = req.params
  const userPosts = await postModel.find({userPost : id}).populate({path : "userPost" , select: "name userImage" })
  res.status(200).json({data : userPosts}) 
}


export const likeUnLike = async(req, res ,next)=>{
  try {
    const  {id:postId} = req.params;
    const userId = req.user._id;
    const post = await postModel.findById(postId)

    if(!postId) {
      return next(new apiError("Post not found" , 404))
    }

    const userLikedPost  = post.likes.includes(userId)

  if(userLikedPost){
    // user unlike
    await postModel.updateOne({_id : postId} , {$pull :{likes : userId}})
    res.status(200).json({successMsg: "unlike post"})
  }else{
    // Like user
    await postModel.updateOne({_id : postId} , {$push :{likes : userId}})
    res.status(200).json({successMsg: "like post"})
  }
  } catch (error) {
    console.log(error)
  }
}

export const addComment = async(req ,res , next)=>{
  const {id:postId} = req.params
  const userId = req.user._id
  const {text} = req.body
  const userName = req.user.name
  const userPic = req.user.userImage
  
  if(!text){
    return next(new apiError("You must write any thing"))
  }
  const post = await postModel.findById(postId)
  if(!post){
    return (next(new apiError("post not found " , 404)))
  }

  const comment = {commentBy : userId , userName ,userPic , text}
  await postModel.updateOne({_id : postId} , {$push :{comments : comment}})
  res.status(200).json({successMsg : "comment added successfully"})

}