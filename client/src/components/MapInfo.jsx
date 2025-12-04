import React from 'react'
import path from '../assets/path.svg';
import { useNavigate } from 'react-router-dom';

const MapInfo = () => {

    const navigate = useNavigate();

  return (
    <div>

        <section className="mx-auto max-w-7xl px-4 md:px-8 py-16 md:py-24">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">       

        <div className="flex justify-center md:justify-start">
            <img        
            src={path}          
            alt="Map illustration" 
            className="w-full max-w-sm md:max-w-sm object-contain rounded-xl shadow-sm"
            />
        </div>

        <div className="flex flex-col md:items-start">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-3 animate-float">Find Book Stores</h1>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#6983c9] mb-6 animate-float">Near You</h2>
            <p className="text-slate-700 text-lg leading-relaxed max-w-prose">
            Discover local book fairs, author signings, and reading clubs to connect with fellow book enthusiasts in your area.
            </p>

            <button className = "mt-8 inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#EA99A1] text-white font-semibold text-lg hover:bg-[#EA99A1]/90 transition-colors"
            onClick={() => navigate('/map')}>
                Explore Map
            </button>
        </div>
      </div>
    </section>
    </div>
  )
}

export default MapInfo