import React from 'react'
import maleavatar from '../assets/maleavatar.svg'

const BookReview = ({data}) => {
  return (
    <div>
        <div className = "p-6 mt-4 border rounded-lg">

          <div className="flex items-center gap-3">

            <img src = {data.user.photoUrl || maleavatar } className = "rounded-lg w-12 h-12 object-cover" />
            <span className = "text-lg font-semibold">{data.user.name}</span>
          </div>

            <div className = "mt-3 text-base">{data.content}
            </div>
        </div>
    </div>
  )
}

export default BookReview