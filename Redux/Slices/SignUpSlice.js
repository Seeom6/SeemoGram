import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../api/authServices";

// get user from localeStorage
const user = JSON.parse(localStorage.getItem("user")) 


const initialState = {
    user : user  ? user : null ,
    isLoading : false,
    isSuccess: false,
    isError : null
}

export const register = createAsyncThunk("Auth/register" , async(user, thunkAPI)=>{
    try{
        return await authService.register(user)
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})



const AuthSlice = createSlice({
    name : "Auth",
    initialState,
    reducers:{
         reset : (state)=>{
            state.isError = null;
            state.user = null ;
            state.isLoading = false;
            state.isSuccess = false
        }
    },
    extraReducers: (builder)=>{
        builder
        .addCase(register.pending , (state)=>{
            state.isLoading = true
        })
        .addCase(register.fulfilled , (state , action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(register.rejected , (state , action)=>{
            state.isLoading = false 
            state.isSuccess = false
            state.user = null
            state.isError = action.payload
        })
    }
})

export const {reset} = AuthSlice.actions

export default AuthSlice.reducer