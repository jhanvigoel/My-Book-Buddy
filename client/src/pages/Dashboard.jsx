import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import DashboardBook from '../components/DashboardBook';
import { useEffect } from 'react';
import History from '../components/History';
import UserNavbar from '../components/UserNavbar';
import ProfileNavbar from '../components/ProfileNavbar';

const Dashboard = () => {
  const location = useLocation();
  
  const isProfile = location.pathname === '/dashboard/profile' || location.pathname.endsWith('/profile');
  const isFriends = location.pathname === '/dashboard/friends' || location.pathname.startsWith('/dashboard/friends');

  return (
    <div>
  {!isFriends && (isProfile ? <ProfileNavbar /> : <UserNavbar />)}
      {/* Child routes render here (e.g., index history, search, book page) */}
      <Outlet />
    </div>
  )
}

export default Dashboard