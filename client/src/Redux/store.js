import {configureStore} from "@reduxjs/toolkit"
import authReducer from "./reducers/authSlice"
import postsReducer from "./reducers/postsSlice";

const store = configureStore({
    reducer:{
        auth: authReducer,
        posts: postsReducer
    }
})

export default store;