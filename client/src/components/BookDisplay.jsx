import React from 'react'
import bookImage from '../assets/bookImage.png'

const BookDisplay = ({ book }) => {
  return (
    <div>
        <div className = 'p-4 border rounded-lg shadow-md flex items-center'>
            <img src = {book.coverUrl || bookImage} className = "w-32 h-48 object-cover rounded-lg"/>
            <div className = "ml-6">
                <div className = "text-2xl font-bold">{book.title}</div>
                <div className = "text-xl text-gray-600 mt-2">by {book.author}</div>
            </div>
        </div>
    </div>
  )
}

export default BookDisplay