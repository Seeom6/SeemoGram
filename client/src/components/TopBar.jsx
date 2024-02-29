import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from '@reduxjs/toolkit';
import {CirclesLoader} from '../components';
import { useEffect } from 'react';
import { getProfileThunk } from '../Redux/thunk/asyncThunk';
import toastMessage from '../utils/toastMessage';

const TopBar = () => {
  
     const  {user, isLoading} = useSelector(state => state?.auth)



  return (
    isLoading ?
    <div> hello welcome</div>
    : <section className='topbar'>
      <div className='flex-between py-1 px-5'>
        <Link to={''} className='flex gap-3 item-center'>
          <img
          src='/assets/images/logo.svg'
          alt="logo"
          width={130}
          height={325}
          />
        </Link>
        <div className='flex gap-4'>
          <button variant={'ghost'} className='shad-button_ghost'>
            <img src="/assets/icons/logout.svg" alt="logout" />
          </button>
          <Link to={`/profile/${user?._id}`} className='flex-center gap-3'>
            {isLoading || !user?.userImage? (<CirclesLoader width={50} height={50}/>):(<img 
              src={`http://localhost:8000/users/${user?.userImage}`}
              alt='profile'
              className='w-[50px] h-[50] rounded-full'
            />)}
            
          </Link>
        </div>
      </div>
    </section>
  )
}

export default TopBar