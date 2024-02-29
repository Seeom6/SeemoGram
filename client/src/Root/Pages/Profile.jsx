import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserHeader } from "../../components";

import EditPost from "./EditPost";
import Loader from "../../components/Loader";
import {
  getProfileThunk,
  getUserPostsThunk,
} from "../../Redux/thunk/asyncThunk";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";


const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { userPosts, isLoading: loading } = useSelector((state) => state.posts);
  const { specificUser, isGetProfileLoading } = useSelector(
    (state) => state.auth
  );

  const getData = async (userId) => {
    dispatch(getProfileThunk(userId));
    dispatch(getUserPostsThunk(userId));
  };

  useEffect(() => {
    getData(id);
  }, [id]);

  return isGetProfileLoading ? (
    <Loader />
  ) : (
    <>
      <UserHeader specificUser={specificUser} />
      <EditPost posts={userPosts} />
    </>
  );
};

export default Profile;
