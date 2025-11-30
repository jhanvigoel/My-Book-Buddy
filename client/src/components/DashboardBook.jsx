import React from 'react'
import { axiosPrivate } from '../api/axios'
import { useState } from 'react'
import BookSearch from './BookSearch';
import { useEffect } from 'react';

const DashboardBook = ({bookName}) => {

    const [books,setBooks] = useState([]);

    const fetchBooks = async() => {
        if (!bookName || !bookName.trim()) return;
        try {
            const res = await axiosPrivate.get('/dashboard/book-search', {
                params: { q: bookName }
            });
            setBooks(res.data);
        } catch (err) {
            console.error('Error fetching dashboard books:', err);
        }
    }

    useEffect(() => {
        if (bookName && bookName.trim()) {
            fetchBooks();
        }
    }, [bookName])

  return (
    <div>

        <div className = 'px-6 py-5 ml-10 mr-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10'>

            {books.map((item) => (
                <div key = {item.id}> <BookSearch item = {item} /> </div>
            ))}
        </div>
    </div>
  )
}

export default DashboardBook