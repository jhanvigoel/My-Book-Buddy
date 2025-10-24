import React from 'react'
import LOGO from '../assets/LOGO.svg'
import { useState } from 'react'
import DashboardBook from '../components/DashboardBook';

const Dashboard = () => {

  const [bookName,setBookName] = useState('');

  const [used,setUsed] = useState(false);

  const [lastSearch,setLastSearch] = useState('');

  const handleSearch = () => {

    setUsed(true);
    setLastSearch(bookName);

  }

  return (
    <div>

      <div className = "p-6 mt-3 flex items-center justify-between">

        <div className = "flex md:justify-start items-center gap-4">

           <img src = {LOGO} alt = "Logo" className = "w-16 h-16 mb-4"/>

          <span className = "text-3xl font-bold mb-5 justify-left text-left">My Book Buddy</span>
        </div>

        <div className = "flex md:justify-start items-center gap-4">

          <input className = "justify-right px-6 py-3 rounded-full bg-[#8C87AA] font-bold text-white hover:bg-[#8C87AA]/80 hover:-translate-y-1 transition-transform" 
          type = 'text' placeholder='Search Books' value = {bookName}
          onChange = {(e) => setBookName(e.target.value)}  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}/>
          <button className = "justify-right ml-auto px-6 py-3 rounded-full bg-[#8C87AA] font-bold text-white hover:bg-[#8C87AA]/80 hover:-translate-y-1 transition-transform">Profile</button>
        </div>

      </div>

      {used && <DashboardBook bookName = {lastSearch} />}
    </div>
  )
}

export default Dashboard