import { createSlice  } from "@reduxjs/toolkit";
import { getPostsThunk ,likeUnLikeThunk ,  createPostThunk , getUserPostsThunk} from "../thunk/asyncThunk";



const initialState = {
    posts : null,
    isLoading: false,
    isSuccess : false,
    message: null,
    userPosts: null,
    isUserPostLoading: false,
    userPostsError: null,
    isLiked : false,
}



const getPostsSlice = createSlice({
    name : "Posts" ,
    initialState,
    extraReducers: (builder)=>{
        builder.addCase(getPostsThunk.pending , (state )=>{
            state.isLoading = true
        })
        .addCase(getPostsThunk.fulfilled , (state , action)=>{
            state.isLoading = false
            state.posts = action.payload
        })
        .addCase(createPostThunk.fulfilled , (state , action)=>{
            state.isSuccess = true
        })
        .addCase(getUserPostsThunk.pending , (state , action )=>{
            state.isUserPostLoading = true
        })
        .addCase(getUserPostsThunk.fulfilled , (state , action )=>{
            state.userPosts = action.payload
            state.isUserPostLoading = false
        })
        .addCase(getUserPostsThunk.rejected , (state , action )=>{
            state.userPostsError = action.payload
            state.isUserPostLoading = false
        })


        .addCase(likeUnLikeThunk.fulfilled , (state , action )=>{
            state.isLiked = true
        })
        .addCase(likeUnLikeThunk.rejected , (state , action )=>{
            state.isLiked = false
        })
    }
})

export default getPostsSlice.reducer

