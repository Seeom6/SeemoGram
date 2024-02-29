import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  registration,
  LoggingIn,
  getUserProfile,
  getAllPosts,
  createPosts,
  getUserPosts,
  followAndUnFollow,
  likeUnLike
} from "./api";

export const returnErrorMsg = (error) => {
  const message =
    (error.response && error.response.data && error.response.data.message) ||
    error.message ||
    error.toString();
  return message;
};

/////##### creating async thunk for sing-up #####////
export const signUpThunk = createAsyncThunk(
  "auth/sign-up",
  async (user, thunkAPI) => {
    try {
      return await registration(user, thunkAPI);
    } catch (error) {
      return thunkAPI.rejectWithValue(await returnErrorMsg(error));
    }
  }
);

/////##### creating async thunk for log-in #####////
export const logInThunk = createAsyncThunk(
  "auth/log-in",
  async (user, thunkAPI) => {
    try {
      return await LoggingIn(user, thunkAPI);
    } catch (error) {
      return thunkAPI.rejectWithValue(await returnErrorMsg(error));
    }
  }
);

/////##### creating async thunk for get user Profile #####////
export const getProfileThunk = createAsyncThunk(
  "auth/user-profile",
  async (id ,thunkAPI) => {
    try {
      return await getUserProfile(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(await returnErrorMsg(error));
    }
  }
);

/////##### creating async thunk for get All posts #####////
export const getPostsThunk = createAsyncThunk(
  "post/getPost",
  async (thunkAPI) => {
    try {
      return await getAllPosts();
    } catch (error) {
      return thunkAPI.rejectWithValue(await returnErrorMsg(error));
    }
  }
);

/////##### creating async thunk for creating post #####////
export const createPostThunk = createAsyncThunk(
  "post/create-post",
  async (formData, thunkAPI) => {
    try {
      return await createPosts(formData);
    } catch (error) {
      return thunkAPI.rejectWithValue(await returnErrorMsg(error));
    }
  }
);

/////##### creating async thunk for creating post #####////
export const getUserPostsThunk = createAsyncThunk("posts/get-user-posts" , async(id , thunkAPI)=>{
    try{
        return await getUserPosts(id)
    }catch(error){
        return thunkAPI.rejectWithValue(await returnErrorMsg(error));
    }
})

/////##### creating async thunk for creating post #####////
export const followingUsersThunk = createAsyncThunk("user/followers" , async(id , thunkAPI)=>{
    try{
        return await followAndUnFollow(id)
    }catch(error){
        return thunkAPI.rejectWithValue(await returnErrorMsg(error));
    }
})
/////##### creating async thunk for creating post #####////
export const likeUnLikeThunk = createAsyncThunk("posts/likes" , async(id , thunkAPI)=>{
    try{
        return await likeUnLike(id)
    }catch(error){
        return thunkAPI.rejectWithValue(await returnErrorMsg(error));
    }
})