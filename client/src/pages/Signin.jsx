import React from 'react'
import LoginForm from '../components/LoginForm'
import LOGO from '../assets/LOGO.svg'
import SignInForm from '../components/SignInForm'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Signin = () => {

  const navigate = useNavigate();
  
  return (
    <div>
      <div className = "grid min-h-svh lg:grid-cols-2">
        <div className='flex flex-col gap-4 p-6 md:p-10'>
          <div className='flex items-center justify-center gap-2 md:justify-start'>
            <ArrowLeft className = "cursor-pointer w-6"onClick = {() => navigate(-1)} />
            <img src = {LOGO} alt = "Logo" className = "w-10 h-10"/>
            <span className="text-lg font-medium">My Book Buddy</span>
          </div>

          <div className = "flex flex-1 items-center justify-center">
            <div className = "w-full max-w-xs">
              <SignInForm />
            </div>
          </div>
        </div>

        <div className = "flex flex-col gap-4 p-6 md:p-10 bg-[#9AC3DA] items-center justify-center min-h-[50vh]">
          <img src = {LOGO} alt="Logo" className = "rounded-3xl w-56 h-48 object-cover mx-auto"/>
        </div>
      </div>
    </div>
  )
}

export default Signin