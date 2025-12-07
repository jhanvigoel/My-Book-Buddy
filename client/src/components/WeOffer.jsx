import React from 'react'
import BOOKS from '../assets/books.svg'
import PEN from '../assets/PEN.svg'
import FRIENDS from '../assets/FRIENDS.svg'
import EYES from '../assets/eyes.svg'

const WeOffer = () => {
  return (
        <div className="min-h-screen w-full py-16 px-4">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-black mb-14">What We Offer</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
                
                <div className="relative bg-blue-50 p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-transform text-center border border-[#8C87AA]/10">
                    <span aria-hidden className="pointer-events-none absolute top-2 left-2 right-6 h-3 rounded-full bg-blue-500"></span>
                    <img src={BOOKS} alt="" className="w-16 h-16 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-blue-600 mb-2">Get Recommended Books</h3>
                    <p className="text-gray-600 text-lg">
                        Discover books you’ll love based on your taste and reading history.
                    </p>
                </div>
                <div className="relative bg-green-50 p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-transform text-center border border-[#8C87AA]/10">
                    <span aria-hidden className="pointer-events-none absolute top-2 left-2 right-6 h-3 rounded-full bg-green-500"></span>
                    <img src = {PEN} alt = '' className='w-16 h-16 mx-auto mb-4'/>
                    <h3 className="text-2xl font-bold text-green-600 mb-2">Track Your Reads</h3>
                    <p className="text-gray-600 text-lg">
                        Keep track of what you’ve read, what you’re reading, and what’s next.
                    </p>
                </div>
                <div className="relative bg-orange-50 p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-transform text-center border border-[#8C87AA]/10">
                    <span aria-hidden className="pointer-events-none absolute top-2 left-2 right-6 h-3 rounded-full bg-orange-500"></span>
                    <img src = {FRIENDS} alt = '' className='w-16 h-16 mx-auto mb-4'/>
                    <h3 className="text-2xl font-bold text-orange-600 mb-2">Make Friends</h3>
                    <p className="text-gray-600 text-lg">
                        Connect with readers who share your favorite genres and authors.
                    </p>
                </div>
                <div className="relative bg-pink-50 p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-transform text-center border border-[#8C87AA]/10">
                    <span aria-hidden className="pointer-events-none absolute top-2 left-2 right-6 h-3 rounded-full bg-pink-500"></span>
                    <img src = {EYES} alt = '' className='w-16 h-16 mx-auto mb-4'/>
                    <h3 className="text-2xl font-bold text-pink-600 mb-2">See What Friends Are Reading</h3>
                    <p className="text-gray-600 text-lg">
                        Stay inspired by following your friends reading activity in real time.
                    </p>
                </div>
            </div>
        </div>
  )
}

export default WeOffer