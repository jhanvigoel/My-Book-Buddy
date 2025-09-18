import React from "react";
import { Heart, ArrowRight, Menu } from "lucide-react";
import LOGO from '../assets/LOGO.svg';

const Navbar = () => {
  return (
    <header className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-6xl px-8">
      <div className="bg-white rounded-full shadow-2xl border border-gray-100 px-12 py-6 flex items-center justify-between">
        <a href="/" className="flex items-center justify-center">
          <img src={LOGO} alt='LOGO' className='w-16 h-16'/>
          <span className="ml-4 text-3xl font-extrabold text-gray-900">My Book Buddy</span>
        </a>
        
        <div className="flex items-center gap-6">
          <button className="text-lg rounded-full px-8 py-3 font-semibold border transition"
            style={{ backgroundColor: '#8C87AA', color: 'white', borderColor: '#8C87AA' }}>
            Sign In
          </button>
          <button className="text-lg rounded-full px-8 py-3 font-semibold shadow-lg transition flex items-center"
            style={{ backgroundColor: '#8C87AA', color: 'white', borderColor: '#8C87AA' }}>
            Get Started for Free <ArrowRight className="ml-3 h-5 w-5" />
          </button>
        </div>

        <button className="lg:hidden p-3 hover:bg-gray-100 rounded-full transition">
          <Menu className="h-8 w-8" />
          <span className="sr-only">Toggle menu</span>
        </button>
      </div>
    </header>
  );
}

export default Navbar;
