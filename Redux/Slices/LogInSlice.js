import {createSlice , createAsyncThunk} from "@reduxjs/toolkit"
import { authService } from "../api/authServices";


const initialState = {
    user : null,
    isLoading : false,
    isSuccess: false,
    isError : null
}


export const loginUser = createAsyncThunk("login/logging-in" , async(user, thunkAPI)=>{
    try{
        return await authService.loginUser(user)
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

const loginSlice = createSlice({
    name : 'login',
    initialState,
    reducers:{

    },
    extraReducers: (builder)=>{
        builder
        .addCase(loginUser.pending , (state)=>{
            state.isLoading = true
        })
        .addCase(loginUser.fulfilled , (state , action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(loginUser.rejected , (state , action)=>{
            state.isLoading = false 
            state.isSuccess = false
            state.user = null
            state.isError = action.payload
        })
    }
})


export default loginSlice.reducer