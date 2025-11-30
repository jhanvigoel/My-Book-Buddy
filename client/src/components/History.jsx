import React, { useEffect, useState } from 'react'
import { axiosPrivate } from '../api/axios'
import BookDisplay from '../components/BookDisplay'

const History = () => {

    const [history,setHistory] = useState({
        WANT_TO_READ: [],
        READING: [],
        COMPLETED: []
    })

    const fetchReadingHistory = async () => {
        try {
            const res = await axiosPrivate.get('/dashboard');
            setHistory(res.data.history);
        } catch (error) {
            console.error('Reading history error:', error);
        }
    }

    // Friends activity state
    const [friendsActivity, setFriendsActivity] = useState({ items: [], total: 0, page: 1, pageSize: 10 });

    const fetchFriendsActivity = async () => {
        try {
            const res = await axiosPrivate.get('/dashboard/friends/activity', {
                params: { status: 'READING,COMPLETED', page: 1, pageSize: 9 }
            });
            setFriendsActivity(res.data);
        } catch (e) {
            console.error('friends activity error:', e);
        }
    };

    useEffect(() => {
        fetchReadingHistory();
        fetchFriendsActivity();
    }, [])

  return (
    <div>

        <div className = 'p-6 mt-5'>

            <div className = "text-5xl font-bold mb-5 text-center">Reading History</div>

            <div className = "grid grid-cols-1 gap-6 mt-10">

                <div className = "text-3xl font-semibold mb-4">Want to Read</div>

                {history.WANT_TO_READ.length === 0 && <div className='text-xl'>No books in this category</div>}

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {history.WANT_TO_READ.length > 0 && history.WANT_TO_READ.map((book) => {
                    return <BookDisplay book = {book.book} key = {book.id} />
                })}

                </div>

            </div>

            <div className = "grid grid-cols-1 gap-6 mt-16">
                <div className = "text-3xl font-semibold mb-4">Friends Activity</div>
                {friendsActivity.items.length === 0 && (
                    <div className='text-xl'>No recent activity from friends</div>
                )}
                {friendsActivity.items.length > 0 && (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {friendsActivity.items.map((item) => {
                            return <BookDisplay book={item.book} key={item.id} />
                        })}
                    </div>
                )}
            </div>

            <div className = "grid grid-cols-1 gap-6 mt-10">

                <div className = "text-3xl font-semibold mb-4">READING</div>

                {history.READING.length === 0 && <div className='text-xl'>No books in this category</div>}

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>

                {history.READING.length > 0 && history.READING.map((book) => {
                    return <BookDisplay book = {book.book} key = {book.id} />
                })}

                </div>
                
            </div>

            <div className = "grid grid-cols-1 gap-6 mt-10">

                <div className = "text-3xl font-semibold mb-4">COMPLETED</div>

                {history.COMPLETED.length === 0 && <div className='text-xl'>No books in this category</div>}

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>

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
    </div>
  )
}

export default History