import { sidebarLinks } from '../utils/Links'
import { Link, NavLink , useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import CirclesLoader from "./CirclesLoader"
import toastMessage from '../utils/toastMessage';
import { getProfileThunk } from '../Redux/thunk/asyncThunk';

const LeftSideBar = () => {
  const {pathname} = useLocation()
  const {user  , isLoading} = useSelector(state => state.auth)

  return (
    <nav className='leftsidebar h-max '>
      <div className="flex flex-col gap-11">
        <Link to={"/"} className='flex gap-3 items-center'>
          <img
            src="/assets/images/logo.svg"
            alt='logo'
            width={170}
            height={36}
          />
        </Link>
        <Link to={`/profile/${user._id}`} className='flex gap-3 items-center'>
        {!user?.userImage || isLoading ? (<CirclesLoader width={70} height={70}/>):(<img 
              src={ `http://localhost:8000/users/${user?.userImage}`}
              alt='profile'
              className='w-[70px] h-[70] rounded-full'
            />)}
          <div className="flex flex-col">
            <p className='text_name'>
              {user?.name}
            </p>
            <p className='text_email'>
             {user?.email}
            </p>
          </div>
        </Link>
        <ul className='flex flex-col gap-6'>
          {
            sidebarLinks.map((link) => {
              const isActive = pathname === link.route ;
              return (
                <li className={`leftsidebar-link group ${isActive && 'bg-[#0072e9]'}`} key={link.label}>
                  <NavLink
                    to={link.route}
                    className="flex gap-4 items-center p-4"
                  >
                    <p 
                    className={`invert-[#222] text-2xl text-[#0062a1] group-hover:invert-white ${isActive && "invert-white"}`}>
                      {link.icon}
                    </p>
                    {link.label}
                  </NavLink>
                </li>
              )
            })
          }
        </ul>
      </div>
      <button variant="ghost"
      className='shad-button_ghost mt-12'>
        <img src="/assets/icons/logout.svg" alt="logout" />
        <p className='small-medium lg:base-medium'>logout</p>
      </button>
    </nav>
  )
}

export default LeftSideBar