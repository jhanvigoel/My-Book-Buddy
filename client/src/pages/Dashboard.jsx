import React from 'react'
import { Outlet } from 'react-router-dom'
import DashboardBook from '../components/DashboardBook';
import { useEffect } from 'react';
import History from '../components/History';
import UserNavbar from '../components/UserNavbar';

const Dashboard = () => {

  return (
    <div>

      <UserNavbar />

      {/* Child routes render here (e.g., index history, search, book page) */}
      <Outlet />

    </div>
  )
}

export default Dashboard