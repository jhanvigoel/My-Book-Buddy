import React from 'react'
import path from '../assets/path.svg';
import { useNavigate } from 'react-router-dom';

const MapInfo = () => {

    const navigate = useNavigate();

  return (
    <div>

        <div className = "min-h-screen flex flex-col md:flex-row items-center justify-center p-8">
            <div className = "flex-1 flex flex-col items-center justify-center p-8"> 
                <img src = {path} className = "w-100 object-contain rounded-lg"/>
            </div>

            <div className = "flex-1 flex flex-col items-center justify-center p-8">
                <h1 className = "text-6xl font-bold mb-5 text-center">Want To Find Bookstores And Libraries Near You?</h1>
                <button className = "mt-4 px-6 py-4 rounded-full bg-[#7FBADC] font-bold text-3xl hover:bg-[#7FBADC]/80 hover:-translate-y-2 transition-transform" onClick = {() => navigate("/map")}>Click Here</button>
            </div>
        </div>
    </div>
  )
}

export default MapInfo