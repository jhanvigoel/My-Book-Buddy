import React, { useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import LOGO from '../assets/LOGO.svg';
import { FriendsNavbar } from '../components/ProfileNavbar';
import FriendInfo from '../components/FriendInfo';

const Friends = () => {

  const location = useLocation();

  return (
    <div>
      
      <FriendsNavbar /> 

      <Outlet />
      
    </div>
  )
}

export default Friends