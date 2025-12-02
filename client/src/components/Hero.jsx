import React, { useState } from 'react'
import BOOKSTORE from '../assets/BOOKSTORE.svg';

const Hero = () => {

    const [complete1,setComplete1] = useState(false);
    const [complete2,setComplete2] = useState(false);

  return (
    <div>

        <section className="relative flex flex-col md:flex-row items-start md:items-center justify-between px-6 md:px-16 py-16 md:py-24">

        <div className="flex-1 flex flex-col justify-center space-y-6 text-left">

            <h1 className="text-8xl md:text-6xl font-bold text-gray-900 leading-tight">
                <span className = 'cursor typewriter-animation' onAnimationEnd = {() => setComplete1(true)}>
                Start Your Reading 
                </span>

                {complete1 &&   <><br /><span className = 'cursor typewriter-animation text-[#6983c9]' onAnimationEnd = {() => setComplete2(true)}>
                    Journey Today !!
                    </span></>}
            </h1>
            

            
                         {complete2 && <p className="text-gray-600 text-lg max-w-md mx-0 md:mx-0">
             Track your reads, explore new genres, and connect with readers who share your passion.
            </p>}
            
        
        </div>


        <div className="flex-1 mt-10 md:mt-0 flex justify-end">

            <div className = 'bg-white p-6 rounded-3xl'>
                <img
                src={BOOKSTORE}
                alt="Bookstore"
                className="w-full max-w-md md:max-w-lg"
                />
            </div>
        </div>
        </section>
    </div>
  )
}

export default Hero