import React, { useEffect, useState } from "react";
import CirclesLoader from "./CirclesLoader";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineLocationOn } from "react-icons/md";
import { CgCalendarDates } from "react-icons/cg";
import toastMessage from "../utils/toastMessage";
import { IoSettingsOutline } from "react-icons/io5";
import { followingUsersThunk } from "../Redux/thunk/asyncThunk";
import Loader from "./Loader";
import { io } from "socket.io-client";

const socket = io("http://localhost:8000", {
  reconnection: true,
});


const UserHeader = ({ specificUser }) => {
  const dispatch = useDispatch();
  const { isLoading, isFollowingLoading, isGetProfileLoading, user } =
    useSelector((state) => state.auth);

  const [thisIsMe, setThisIsMe] = useState(false);
  const [following, setFollowing] = useState(
    specificUser?.followers.includes(user?._id)
  );
  const [followersNumber , setFollowersNumber] = useState(0)

  const handelFollow = (userId) => {
    dispatch(followingUsersThunk(userId)).then((res) => {
        socket.emit("following" , res?.payload.userTarget.followers.length)
        socket.on("numberOfFollowers" ,(result)=>{
            setFollowersNumber(result)
        })
      if (res) {
        toastMessage.successMessage(res?.payload.followMessage);
        setFollowing(!following);
      }
    });
  };
  useEffect(() => {
    if (specificUser?._id === user?._id) {
      return setThisIsMe(true);
    }
  }, []);
  let followNumber = followersNumber > 0 ? followersNumber : specificUser?.followers.length

  return (
    <div className="flex flex-col items-center w-full md:p-2 ">
      <div className="h-[300px] w-full flex justify-center items-center bg-gradient-to-l from-[#00d8dd] to-[#0055f1] relative rounded-md">
        {!specificUser?.userImage || isLoading ? (
          <CirclesLoader width={120} height={120} />
        ) : (
          <img
            src={`http://localhost:8000/users/${specificUser?.userImage}`}
            alt="profile"
            className="w-[120px] h-[120px] top-[240px] left-2 md:profile-image-resp rounded-full absolute"
          />
        )}
      </div>
      <div className="w-full flex justify-end p-3">
        {thisIsMe ? (
          <button type="submit" className="px-10 py-2 button_primary">
            <IoSettingsOutline />
          </button>
        ) : isFollowingLoading ? (
          <div className="px-10 py-2">
            {" "}
            <Loader />{" "}
          </div>
        ) : (
          <button
            onClick={() => handelFollow(specificUser?._id)}
            type="submit"
            className="px-10 py-2 button_primary"
          >
            {following ? "Unfollow" : "follow"}
          </button>
        )}
      </div>
      <div className="md:mt-[30px] flex flex-col w-full px-5">
        <p className="text_name">{specificUser?.name}</p>
        <p className="text_email">{specificUser?.email}</p>
        <p className=" text-md w-full py-4 tracking-normal leading-tight">
          {specificUser?.desc} It is a long established fact that a reader will
          be distracted by the readable content of a page when looking at its
          layout. The{" "}
        </p>
        <div className="flex w-full justify-start ">
          <MdOutlineLocationOn className="text-2xl p-0 text-[#0062a1]" />
          <p className="text-[#9dc6f7]">Syria-Damascus</p>
        </div>
        <div className="flex w-full justify-start py-2">
          <CgCalendarDates className="text-2xl p-0 text-[#0062a1]" />
          <p className="text-[#9dc6f7]">Joined Feb 2024</p>
        </div>
        <div className="flex gap-3 mt-5">
          <button type="button" className="disabled-button flex-1">
            ( {followNumber} ) Followers
          </button>
          <button type="button" className="disabled-button flex-1">
            ( {specificUser?.following.length} ) Following
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserHeader;
