import React, { useEffect, useState } from 'react'
import { axiosPrivate } from '../api/axios'
import BookDisplay from '../components/BookDisplay'

function StatCard({color, title, value}){

    return (
        

        <div className = {`w-full flex items-center p-4 rounded-lg border border-gray-300 gap-5 ${color} shadow-sm hover:shadow-2xl hover:-translate-y-1`}>

            <div>

                <div>
                    <div className = "font-bold text-gray-500 text-2xl">{title}</div>
                    <div className = "text-gray-700 font-semibold text-xl">{value}</div>
                </div>
            </div>

        </div>
    );

}

const History = () => {

    const [history,setHistory] = useState({
        WANT_TO_READ: [],
        READING: [],
        COMPLETED: []
    })

    const [state,setState] = useState("ALL");

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

            <div className = "text-6xl font-bold mb-5 text-center">Reading History</div>

            <div className = "text-4xl mb-5 text-center text-[#6983c9] mx-auto">Track your reading journey, discover what inspires you, and celebrate your literary achievements</div>
            
            <div className = "max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-20 mb-8 gap-6 ">

                <StatCard color="bg-purple-100" title="Want to Read" value={history.WANT_TO_READ.length} />
                <StatCard color="bg-pink-100" title="Reading" value={history.READING.length} />
                <StatCard color="bg-green-100" title="Completed" value={history.COMPLETED.length} />

            </div>

            <div className = "grid grid-cols-1 gap-6 mt-10">

                <div className = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">

                    <button className = "text-2xl border border-gray-300 rounded-xl p-4 shadow-sm" onClick={() => setState("ALL")}>All</button>
                    <button className = "text-2xl border border-gray-300 rounded-xl p-4 shadow-sm" onClick={() => setState("READING")}>Reading</button>
                    <button className = "text-2xl border border-gray-300 rounded-xl p-4 shadow-sm" onClick={() => setState("COMPLETED")}>Completed</button>
                    <button className = "text-2xl border border-gray-300 rounded-xl p-4 shadow-sm" onClick={() => setState("WANT_TO_READ")}>Want To Read</button>
                    <button className = "text-2xl border border-gray-300 rounded-xl p-4 shadow-sm" onClick={() => setState("FRIENDS_ACTIVITY")}>Friends Activity</button>
                </div>

                <div className = "grid grid-cols-1 gap-6 mt-10 justify-items-center">

                {state == "ALL" && ( 
                    <div> 
                        {history.WANT_TO_READ.length > 0 && history.WANT_TO_READ.map((book) => {
                            return <BookDisplay book={book.book} key={book.id} tag = {"Want to Read"} />
                        })}
                        {history.READING.length > 0 && history.READING.map((book) => {
                            return <BookDisplay book={book.book} key={book.id} tag = {"Reading"} />
                        })}
                        {history.COMPLETED.length > 0 && history.COMPLETED.map((book) => {
                            return <BookDisplay book={book.book} key={book.id} tag = {"Completed"} />
                        })}
                        {friendsActivity.items.length > 0 && friendsActivity.items.map((item) => {
                            return <BookDisplay book={item.book} key={item.id} tag = {"Friends Activity"} />
                        })}
                    </div>
                )}

                {state == "READING" && ( 
                    <div> 
                        {history.READING.length == 0 ? <div className = "text-xl">No books in this category</div> : history.READING.map((book) => {
                            return <BookDisplay book={book.book} key={book.id} tag = {"Reading"} />
                        })}
                    </div>
                )}

                {state == "COMPLETED" && ( 
                    <div> 
                        {history.COMPLETED.length == 0 ? <div className = "text-xl">No books in this category</div> : history.COMPLETED.map((book) => {
                            return <BookDisplay book={book.book} key={book.id} tag = {"Completed"} />
                        })}
                    </div>
                )}

                {state == "WANT_TO_READ" && ( 
                    <div> 
                        {history.WANT_TO_READ.length == 0 ? <div className = "text-xl">No books in this category</div> : history.WANT_TO_READ.map((book) => {
                            return <BookDisplay book={book.book} key={book.id} tag = {"Want to Read"} />
                        })}
                    </div>
                )}

                {state == "FRIENDS_ACTIVITY" && ( 
                    <div> 
                        {friendsActivity.items.length == 0 ? <div className = "text-xl">No books in this category</div> : friendsActivity.items.map((item) => {
                            return <BookDisplay book={item.book} key={item.id} tag = {"Friends Activity"} />
                        })}
                    </div>
                )}

                </div>


            </div>

        </div>
    </div>
  )
}

export default History