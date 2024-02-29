
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { FaRegBookmark } from "react-icons/fa";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Loader from "../../components/Loader";
import ActionsButtons from "../../components/ActionsButtons";

// const socket = io("http://localhost:8000",{
//   reconnection: true
// })

const EditPost = ({ posts }) => {
  // useEffect(()=>{
  //   console.log(socket)
  // },[])


          


  const { user, isLoading } = useSelector((state) => state.auth);
  const { isUserPostLoading } = useSelector((state) => state.posts);

  // const handleLike = () => {
  //   setLiked(!liked);
  // };

  return (
    <>
      {isUserPostLoading ? (
        <div className="mt-[70px]">
          <Loader width={100} height={100} />
        </div>
      ) : posts?.length > 0 ? (
        posts.map((item) => {

          return (
            <div 
              key={item?._id}
              className="flex flex-col w-full px-2 md:px-12 py-4 "
            >
              <div className="flex flex-col justify-start p-2 md:p-5 gap-5 button_shadow bg-[#ffffff1a] rounded-lg">
                <div className=" w-full flex items-center">
                  <Link
                    to={`/profile/${item?.userPost?._id}`}
                    className=" w-full flex items-between "
                  >
                    <img
                      src={`http://localhost:8000/users/${item?.userPost?.userImage}`}
                      alt=""
                      className="w-[70px] h-[70] rounded-full"
                    />
                    <div className=" mt-2 px-4 text-center">
                      <p className="  text_name "> {item?.userPost?.name} </p>
                      <p className="  text_email ">Fep 2024</p>
                    </div>
                  </Link>
                  <button className="button_primary px-6 py-3"> Follow </button>
                </div>
                {item?.caption && (
                  <div className="">
                    <p>{item?.caption}</p>
                  </div>
                )}

                <div className="flex w-full  justify-center items-center overflow-hidden">
                  {item?.postImage && (
                    <div className=" flex justify-center items-center ">
                      <img
                        src={`http://localhost:8000/posts/${item?.postImage}`}
                        alt=""
                        className=" file_uploader-img image_shadow m-5"
                      />
                    </div>
                  )}
                </div>
                <div className="w-full flex text-2xl md:text-3xl text-blue-2">
                  <div className="flex flex-col flex-1 ">
                    <div >
                      <ActionsButtons postInfo={item}/>
                    </div>

                    <div className="flex">
                      <p className="text-[12px] text-gray-500">
                        {" "}
                        (
                        <span className="text-white">
                          {" "}
                          {item?.likes.length}{" "}
                        </span>
                        ) likes{" "}
                      </p>
                      <p className="text-[12px] text-gray-500">
                        {" "}
                        , (
                        <span className="text-white">
                          {" "}
                          {item?.comments.length}{" "}
                        </span>
                        ) comments{" "}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-1 justify-end">
                    <FaRegBookmark className="" />
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div>hello</div>
      )}
    </>
  );
};

export default EditPost;
