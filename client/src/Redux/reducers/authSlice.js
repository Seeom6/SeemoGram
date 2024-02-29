import { createSlice } from "@reduxjs/toolkit";
import { signUpThunk, logInThunk, getProfileThunk, followingUsersThunk } from "../thunk/asyncThunk";

const user =
  JSON.parse(localStorage.getItem("user")) !== undefined
    ? JSON.parse(localStorage.getItem("user"))
    : null;

const initialState = {
  user: user ? user : null,
  isLoading: false,
  isError: null,
  isLogInLoading: false,
  isGetProfileLoading: false,
  specificUser: null,
  isFollowingLoading: false,
  followingMessage: null,
  isFollowing: false,
  following: null,
};

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    isFollow: ( state , user1Id , user2Id) => {
        state.following = user1Id + user2Id
        console.log(state.following)
    },
  },
  extraReducers: (builder) => {
    builder
      ////// sign-up processing //////
      .addCase(signUpThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(signUpThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.isError = null;
      })
      .addCase(signUpThunk.rejected, (state, action) => {
        state.isError = action.payload;
        state.isLoading = false;
      })

      ////// Logging in processing //////
      .addCase(logInThunk.pending, (state, action) => {
        state.isLogInLoading = true;
      })
      .addCase(logInThunk.fulfilled, (state, action) => {
        state.isLogInLoading = false;
        state.user = action.payload;
      })
      .addCase(logInThunk.rejected, (state, action) => {
        state.isLogInLoading = false;
      })

      ////// get user profile  processing //////
      .addCase(getProfileThunk.pending, (state, action) => {
        state.isGetProfileLoading = true;
      })
      .addCase(getProfileThunk.fulfilled, (state, action) => {
        state.isGetProfileLoading = false;
        state.specificUser = action.payload;
      })
      .addCase(getProfileThunk.rejected, (state, action) => {
        state.isGetProfileLoading = false;
      })
      ////// get user profile  processing //////
      .addCase(followingUsersThunk.pending, (state, action) => {
        state.isFollowingLoading = true;
      })
      .addCase(followingUsersThunk.fulfilled, (state, action) => {
        state.followingMessage = action.payload;
        state.isFollowingLoading = false;
      });
  },
});

export const { isFollow } = authSlice.actions;

export default authSlice.reducer;
