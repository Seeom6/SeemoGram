import React, { useEffect } from 'react'
import EditPost from './EditPost'
import { useDispatch, useSelector } from 'react-redux';
import { getPostsThunk } from '../../Redux/thunk/asyncThunk';

const Home = () => {
  const dispatch = useDispatch();
  const { posts, isLoading: loading } = useSelector((state) => state.posts);

  const getAllPosts = () => {
    dispatch(getPostsThunk())
  };

  useEffect(() => {
    getAllPosts();
  }, []);
  return (
    <div className=' h-screen'>
      <EditPost posts={posts}/>
    </div>
  )
}

export default Home