import {configureStore} from "@reduxjs/toolkit"
import  AuthReducer  from "./Slices/SignUpSlice";
import  LoginReducer  from "./Slices/LogInSlice";
import getProfileReducer from "./Slices/getProfileSlice";
import  getPostsReducer  from "./Slices/getAllPosts";

const store = configureStore({
    reducer:{
        auth : AuthReducer,
        logIn : LoginReducer,
        getProfile: getProfileReducer,
        posts: getPostsReducer
    }
})


export default store;