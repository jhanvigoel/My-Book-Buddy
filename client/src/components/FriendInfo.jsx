import React, { useEffect, useState } from 'react';
import { axiosPrivate } from '../api/axios';
import maleavatar from '../assets/maleavatar.svg'

const FriendInfo = () => {

    const [info,setInfo] = useState(null);
    const [error,setError] = useState('');
    const [loading,setLoading] = useState(false);

    const fetchInfo = async () => {
        try {
            setLoading(true);
            setError('');
            const response = await axiosPrivate.get('/dashboard/friends');
            setInfo(response.data);
        } catch (err) {
            console.error('fetchInfo error:', err);
            const msg = err.response?.data?.error || err.message || 'Failed to load Friend Info';
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInfo();
    }, [])

    const actions = {
        async add(userId) {
            await axiosPrivate.post('/dashboard/friends/request', { toUserId: userId });
            await fetchInfo();
        },
        async accept(friendshipId) {
            await axiosPrivate.post('/dashboard/friends/respond', { friendshipId, action: 'ACCEPT' });
            await fetchInfo();
        },
        async decline(friendshipId) {
            await axiosPrivate.post('/dashboard/friends/respond', { friendshipId, action: 'DENY' });
            await fetchInfo();
        },
        async cancel(friendshipId) {
            await axiosPrivate.post('/dashboard/friends/cancel', { friendshipId });
            await fetchInfo();
        },
        async unfriend(friendshipId) {
            await axiosPrivate.delete(`/dashboard/friends/${friendshipId}`);
            await fetchInfo();
        }
    };

    if (loading){
        return <div> Loading Friend Info ...</div>
    }

    if (error){
        return <div className="text-red-500"> {error} </div>
    }

    if (!info){
        return null;
    }

    const {
        friendshipRecieved = [], // keep original key; server typo tolerated
        friendshipInitiated = [],
        friendsList = [],
        myId
    } = info;

    // Safe helpers to access user objects regardless of payload variations
    const getId = (item) => item?.id ?? item?.friendshipId;
    const getFrom = (item) => item?.fromUser || item?.friend1 || item?.user1 || null;
    const getTo = (item) => item?.toUser || item?.friend2 || item?.user2 || null;
    const pickFriend = (item) => {
        const u1 = item?.friend1 || item?.fromUser;
        const u2 = item?.friend2 || item?.toUser;
        if (!u1 && !u2) return item?.user || null;
        if (!myId) return u1 || u2;
        if (u1?.id === myId) return u2;
        if (u2?.id === myId) return u1;
        return u1 || u2;
    };

    
  return (
    <div>

        <div className = 'px-6 py-4 space-y-10'>

            <section>
                <h3 className = 'text-2xl font-semibold mb-4'>Requests Recieved</h3>
                {friendshipRecieved.length === 0 ? (
                    <div className = 'text-gray-500'>No requests recieved</div>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                        {friendshipRecieved.map((it) => {
                            const from = getFrom(it);
                            const id = getId(it);
                            return (
                                <div key={id} className='p-4 border rounded'>
                                    <img 
                                        src={from?.photoUrl || maleavatar} 
                                        alt={from?.name}
                                        className="rounded-lg w-16 h-16 object-cover mb-2"
                                        referrerPolicy="no-referrer"
                                        onError={(e) => e.target.src = maleavatar}
                                    />
                                    <div className='text-xl font-bold'>{from?.name || 'Unknown'}</div>
                                    <div className='text-gray-500'>{from?.email || ''}</div>
                                    <div className='mt-4 flex items-center gap-3'>
                                        <button
                                            className='px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition'
                                            onClick={() => actions.accept(id)}
                                        >
                                            Accept
                                        </button>
                                        <button
                                            className='px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition'
                                            onClick={() => actions.decline(id)}
                                        >
                                            Decline
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>

            <section>
                <h3 className = 'text-2xl font-semibold mb-4'>Requests Sent</h3>
                {friendshipInitiated.length === 0 ? (
                    <div className = 'text-gray-500'>No requests sent</div> 
                ) : (
                    <div className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                        {friendshipInitiated.map((it) => {      
                            const to = getTo(it);
                            const id = getId(it);
                            return (
                                <div key={id} className='p-4 border rounded'>
                                    <img 
                                        src={to?.photoUrl || maleavatar} 
                                        alt={to?.name}
                                        className="rounded-lg w-16 h-16 object-cover mb-2"
                                        referrerPolicy="no-referrer"
                                        onError={(e) => e.target.src = maleavatar}
                                    />
                                    <div className='text-xl font-bold'>{to?.name || 'Unknown'}</div>
                                    <div className='text-gray-500'>{to?.email || ''}</div>
                                    <div className = 'mt-4 flex items-center gap-3'>
                                        <button
                                            className='px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition'
                                            onClick={() => actions.cancel(id)}
                                        >   
                                            Cancel Request
                                        </button>
                                    </div>  
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>

            <section> 
                <h3 className = 'text-2xl font-semibold mb-4'>Friends List</h3>
                {friendsList.length === 0 ? (
                    <div className = 'text-gray-500'>No friends yet</div>
                ) : (
                    <div className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                        {friendsList.map((it) => {
                            const friend = pickFriend(it);
                            const id = getId(it);
                            return (
                                <div key={id} className='p-4 border rounded'>     
                                    <img 
                                        src={friend?.photoUrl || maleavatar} 
                                        alt={friend?.name}
                                        className="rounded-lg w-16 h-16 object-cover mb-2"
                                        referrerPolicy="no-referrer"
                                        onError={(e) => e.target.src = maleavatar}
                                    />
                                    <div className='text-xl font-bold'>{friend?.name || 'Unknown'}</div>
                                    <div className='text-gray-500'>{friend?.email || ''}</div>
                                    <div className = 'mt-4 flex items-center gap-3'>    
                                        <button
                                            className='px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition'
                                            onClick={() => actions.unfriend(id)}
                                        >   
                                            Unfriend
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </section>
        </div>

    </div>
  )
}

export default FriendInfo