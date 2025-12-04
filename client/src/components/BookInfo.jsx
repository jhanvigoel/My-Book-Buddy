import React from 'react'
import { useNavigate } from 'react-router-dom'
import books from '../assets/books.svg'

const BookInfo = () => {
  const navigate = useNavigate()
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-8 py-16 md:py-24">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">

        <div className="flex flex-col md:items-start">

          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-3 animate-float">Discover Everything</h1>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#6983c9] mb-6 animate-float">About Any Book</h2>
          <p className="text-slate-700 text-lg leading-relaxed max-w-prose">
            Get ratings, reviews, summaries, author info, and where to buy — all in one place.
          </p>

          <div className="mt-8">
            <button
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#EA99A1] text-white font-semibold text-lg hover:bg-[#EA99A1]/90 transition-colors"
              onClick={() => navigate('/books')}
            >
              Explore Books
            </button>
          </div>
        </div>
        <div className="flex justify-center md:justify-end">
          <img
            src={books}
            alt="Books illustration"
            className="w-full max-w-sm md:max-w-sm object-contain rounded-xl shadow-sm"
          />
        </div>
      </div>
    </section>
  )
}

export default BookInfo