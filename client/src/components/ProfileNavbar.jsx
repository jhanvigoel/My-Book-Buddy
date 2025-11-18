import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LOGO from '../assets/LOGO.svg';

const ProfileNavbar = () => {
  const navigate = useNavigate();
  return (
    <div className="p-6 mt-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <a href="/" className="flex items-center justify-center">
            <img src={LOGO} alt='LOGO' className='w-16 h-16'/>
            <span className="ml-4 text-3xl font-extrabold text-gray-900">My Book Buddy</span>
        </a>
      </div>
      <div className="flex items-center gap-4">

  <button className="px-6 py-3 rounded-full bg-[#8C87AA] font-bold text-white hover:bg-[#8C87AA]/80 hover:-translate-y-1 transition-transform" onClick= {() => navigate('/dashboard/friends')}>Friends</button>
        <button
          className="px-6 py-3 rounded-full bg-[#8C87AA] font-bold text-white hover:bg-[#8C87AA]/80 hover:-translate-y-1 transition-transform"
          onClick={() => navigate('/dashboard')}
        >
          Go back to Dashboard
        </button>
      </div>
    </div>
  )
}

const FriendsNavbar = () => {

    const navigate = useNavigate();
    
    const [FriendName,setFriendName] = useState('');

    const handleClick = () => {

        if (FriendName.trim() === ''){
            navigate('/dashboard/friends');
            return;
        }

  navigate({
    pathname: '/dashboard/friends/friend',
    search: `?q=${encodeURIComponent(FriendName)}`,
    state: { friendName: FriendName }
  });
    }
    

    return (
        <div className="p-6 mt-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <a href="/" className="flex items-center justify-center">
                    <img src={LOGO} alt='LOGO' className='w-16 h-16'/>
                        <span className="ml-4 text-3xl font-extrabold text-gray-900">My Book Buddy</span>
                </a>
            </div>
            <div className="flex items-center gap-4">
              
                <input className = "justify-right px-6 py-3 rounded-full bg-[#8c87AA] font-bold text-white hover:bg-[#8C87AA]/80 hover:-translate-y-1 transition-transform" 
                type="text" placeholder="search Friends" value = {FriendName} onChange = {(e) => setFriendName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleClick()}/>
                <button
                className="px-6 py-3 rounded-full bg-[#8C87AA] font-bold text-white hover:bg-[#8C87AA]/80 hover:-translate-y-1 transition-transform"
                onClick={() => navigate('/dashboard')}
                >
                Go back to Dashboard
                </button>
            </div>
        </div>
    )
}

export default ProfileNavbar
export { FriendsNavbar }
