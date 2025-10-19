import React from 'react'
import { useNavigate } from 'react-router-dom'
import books from '../assets/books.svg';

const BookInfo = () => {

    const navigate = useNavigate();
  return (
    <div>

        <div className = "min-h-screen flex flex-col md:flex-row items-center justify-center p-8">

            <div className="flex-1 flex flex-col items-center justify-center p-8">
                <h1 className="text-6xl font-bold mb-5 text-center">Want Info about your Favourite Book?</h1>
                <button className = "px-6 py-7 rounded-full bg-[#EA99A1] font-bold text-3xl hover:bg-[#EA99A1]/80 hover:-translate-y-2 transition-transform" onClick = {() => navigate('/books')}>Click Here</button>
            </div>

            <div className="flex-1 flex items-center justify-center p-8" >
                <img src = {books} className = "w-100  object-contain rounded-lg"/>
            </div>

        </div>

    </div>
  )
}

export default BookInfo