import {createSlice} from "@reduxjs/toolkit"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { authService } from "../api/authServices"



const initialState = {
    posts : null,
    isLoading: false,
    isSuccess : false,
    message: null,
    userPosts: null
}


export const createPost = createAsyncThunk("posts/create" , async(data , thunkAPI)=>{
    try{
        return await authService.createPosts(data)
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


export const getPosts = createAsyncThunk("posts/get-posts" , async(thunkAPI)=>{
    try{
        return await authService.getPosts()
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


export const getUserPosts = createAsyncThunk("posts/get-user-posts" , async(id , thunkAPI)=>{
    try{
        return await authService.getUserPosts(id)
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})



const getPostsSlice = createSlice({
    name : "Posts" ,
    initialState,
    extraReducers: (builder)=>{
        builder.addCase(getPosts.pending , (state )=>{
            state.isLoading = true
        })
        .addCase(getPosts.fulfilled , (state , action)=>{
            state.isLoading = false
            state.posts = action.payload
        })
        .addCase(createPost.fulfilled , (state , action)=>{
            state.isSuccess = true
        })
        .addCase(getUserPosts.fulfilled , (state , action )=>{
            state.userPosts = action.payload
        })
    }
})


export default getPostsSlice.reducer