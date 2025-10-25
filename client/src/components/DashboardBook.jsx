import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import BookSearch from './BookSearch';
import { useEffect } from 'react';

const DashboardBook = ({bookName}) => {

    const [books,setBooks] = useState([]);

    const fetchBooks = async() => {

        try{

            const token = localStorage.getItem('token');

            if (!token) {
                console.error('No token found');
                return;
            }

            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/dashboard/book-search`, {
                params: { q: bookName },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setBooks(res.data);

        }catch(err){
            console.error(err);
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