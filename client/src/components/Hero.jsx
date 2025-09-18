import React from 'react'
import BOOKSTORE from '../assets/BOOKSTORE.svg';

const Hero = () => {
  return (
    <div>

        <section className="mt-28 min-h-screen flex flex-col md:flex-row items-center justify-between px-6 md:px-16 ">

        <div className="flex-1 space-y-6 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
             Start Your Reading Journey Today
            </h1>
            <p className="text-gray-600 text-lg max-w-md mx-auto md:mx-0">
             Track your reads, explore new genres, and connect with readers who share your passion.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button className="px-6 py-3 bg-indigo-600 text-white rounded-full shadow hover:bg-indigo-700 transition">
                Get Started
            </button>
            <button className="px-6 py-3 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-full hover:bg-indigo-100 transition">
                Explore Books
            </button>
            </div>
        </div>

        <div className="flex-1 mt-10 md:mt-0 flex justify-center">
            <img
            src={BOOKSTORE}
            alt="Bookstore"
            className="w-full max-w-md md:max-w-lg"
            />
        </div>
        </section>
    </div>
  )
}

export default Hero