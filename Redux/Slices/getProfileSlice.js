import {createSlice , createAsyncThunk} from "@reduxjs/toolkit"
import { authService } from "../api/authServices";

const user = JSON.parse(localStorage.getItem("user"))

const initialState = {
    user : user ? user : null,
    isLoading : false,
}

export const getProfile = createAsyncThunk("login/logging-in" , async(user, thunkAPI)=>{
    try{
        return await authService.getProfile()
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

const getProfileSlice = createSlice({
    name :"getProfile",
    initialState,
    reducers: {

    },
    extraReducers: (builder)=>{
        builder.addCase(getProfile.fulfilled , (state , action)=>{
            state.user = action.payload
        })
        builder.addCase(getProfile.rejected , (state , action)=>{
            console.log(action.payload)
        })
    }

})  

export default getProfileSlice.reducer