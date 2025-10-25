import React, { useEffect, useState } from 'react'
import axios from 'axios'
import BookDisplay from '../components/BookDisplay'

const History = () => {

    const [history,setHistory] = useState({
        WANT_TO_READ: [],
        READING: [],
        COMPLETED: []
    })

    const fetchReadingHistory = async () => {

        try{

            const token = localStorage.getItem('token');

            if (!token){

                console.error('No token found');
                return;
            }

            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/dashboard`,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })

            setHistory(res.data.history);

        }
        catch(error){
            console.error(error);
        }

    }

    useEffect(() => {
        fetchReadingHistory();
    }, [])

  return (
    <div>

        <div className = 'p-6 mt-5'>

            <div className = "text-5xl font-bold mb-5 text-center">Reading History</div>

            <div className = "grid grid-cols-1 gap-6 mt-10">

                <div className = "text-3xl font-semibold mb-4">Want to Read</div>

                {history.WANT_TO_READ.length === 0 && <div className='text-xl'>No books in this category</div>}

                {history.WANT_TO_READ.length > 0 && history.WANT_TO_READ.map((book) => {
                    return <BookDisplay book = {book.book} key = {book.id} />
                })}

            </div>

            <div className = "grid grid-cols-1 gap-6 mt-10">

                <div className = "text-3xl font-semibold mb-4">READING</div>

                {history.READING.length === 0 && <div className='text-xl'>No books in this category</div>}

                {history.READING.length > 0 && history.READING.map((book) => {
                    return <BookDisplay book = {book.book} key = {book.id} />
                })}
                
            </div>

            <div className = "grid grid-cols-1 gap-6 mt-10">

                <div className = "text-3xl font-semibold mb-4">COMPLETED</div>

                {history.COMPLETED.length === 0 && <div className='text-xl'>No books in this category</div>}

                {history.COMPLETED.length > 0 && history.COMPLETED.map((book) => {
                    return (
                        <div key = {book.id}>
                            <BookDisplay book = {book.book} />
                            <div className = "ml-auto flex">
                                <div className = "text-2xl font-semibold">Started At : {book.startedAt}</div>
                                <div className = "ml-8 text-2xl font-semibold">Finished At : {book.finishedAt}</div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    </div>
  )
}

export default History