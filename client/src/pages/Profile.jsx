import React, { useContext } from 'react'
import femaleavatar from '../assets/femaleavatar.svg'
import maleavatar from '../assets/maleavatar.svg'
import UserInfo from '../components/UserInfo'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext.jsx'

const Profile = () => {

  const navigate = useNavigate();

  const {logout} = useContext(AuthContext);

  const handleLogout = async () => {

    try{

      const res = await logout();

      if (res?.success){
        navigate('/');
        return res.status(200).json({ message: "Logged out successfully" });
      }
      else{
        return res.status(500).json({ error: 'Logout failed' });
      }

    }catch(err){

      console.error('Logout failed:', err);
      return res.status(500).json({ error: 'Logout failed' });
    }

  }

  return (
    <div>

        <div className = 'p-6 mt-5'>

            <div className = "text-5xl font-bold mb-5 text-center">User Profile</div>

      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start gap-12 mt-20">
    
        <div className="w-full md:w-1/3 flex flex-col items-center md:items-start gap-4">

          <img src={maleavatar} alt="User avatar" className="w-48 h-48 md:w-56 md:h-56 object-cover rounded-full" />

          <button className="px-12 py-3 rounded-full bg-[#8C87AA] font-bold text-white hover:bg-[#8C87AA]/80 hover:-translate-y-1 transition-transform">Change Avatar</button>

        </div>

    
        <div className="w-full md:flex-1">
          <UserInfo />
        </div>
      </div>

      <div className = "mt-auto flex justify-end">

        <button className = 'px-8 py-4 rounded-full bg-red-600 font-bold text-white hover:bg-red-500 hover:-translate-y-1 transition-transform ' onClick={handleLogout}>Logout</button>
      </div>

        </div>
    </div>
  )
}

export default Profile