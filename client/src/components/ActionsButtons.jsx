import { useState  } from "react";
import { useSelector , useDispatch } from "react-redux";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { FaRegComment } from "react-icons/fa6";
import { FiSend } from "react-icons/fi";
import { likeUnLikeThunk } from "../Redux/thunk/asyncThunk";

const ActionsButtons = ({postInfo}) => {
    const dispatch = useDispatch()
    const {user} = useSelector(state => state.auth)
    console.log(postInfo)
    const [liked, setLiked] = useState(postInfo?.likes.includes(user?._id));

    const handleLike = async() => {
        dispatch(likeUnLikeThunk(postInfo?._id)).then((conn)=>{
            setLiked(!liked)
        })
      };
  return (
    <>
    <div className="flex justify-start gap-[15px]">
        <div onClick={handleLike}>
            {
                liked ? <IoIosHeart/> : <IoIosHeartEmpty/>
            }
        </div>
        <FaRegComment/>
        <FiSend/>
    </div>
    </>
  )
}

export default ActionsButtons