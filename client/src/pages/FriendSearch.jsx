import React, { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { axiosPrivate } from '../api/axios';

const FriendSearch = () => {

    const location = useLocation();
    const qpName = new URLSearchParams(location.search).get('q') || '';
    const friendName = (location.state?.friendName || qpName).trim();

    const [results,setResults] = useState([]);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState('');

    const fetchFriend = async() => {
        try {
            setLoading(true); setError('');
            const response = await axiosPrivate.get('/dashboard/friends/search', {
                params: {
                    query: friendName,
                    page: 1,
                    pageSize: 20
                }
            });
            setResults(response.data.items || []);
        } catch (err) {
            const status = err?.response?.status;
            const serverMsg = err?.response?.data?.error;
            const msg = serverMsg || (status ? `Request failed with status ${status}` : err?.message) || 'Failed to search';
            console.error('Friend search error:', err);
            setError(msg || 'Failed to search');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (friendName) fetchFriend();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [friendName]);

    const actions = {
        async add(userId){
            await axiosPrivate.post('/dashboard/friends/request', { toUserId: userId });
            await fetchFriend();
        },
        async accept(friendshipId){
            await axiosPrivate.post('/dashboard/friends/respond', { friendshipId, action: 'ACCEPT' });
            await fetchFriend();
        },
        async decline(friendshipId){
            await axiosPrivate.post('/dashboard/friends/respond', { friendshipId, action: 'DENY' });
            await fetchFriend();
        },
        async cancel(friendshipId){
            await axiosPrivate.post('/dashboard/friends/cancel', { friendshipId });
            await fetchFriend();
        },
        async unfriend(friendshipId){
            await axiosPrivate.delete(`/dashboard/friends/${friendshipId}`);
            await fetchFriend();
        }
    };

  return (
    <div>
        <div className = 'px-6 py-4'>
            {loading && <div className='text-center mt-10'>Searching…</div>}
                        {error && <div className='text-center mt-10 text-red-600'>{error}</div>}
                        {!loading && !error && results.length === 0 && friendName && (
              <div className = 'text-5xl font-bold text-center mt-20'>No person named {friendName} found</div>
            )}
                        {!loading && !error && results.length > 0 &&

            <>
                <div className = 'text-5xl font-bold text-center mt-20'>People named {friendName} </div>
                <div className = 'mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {results.map((u) => {
                        const r = u.relation;
                        return (
                        <div key = {u.id} className = 'p-6 border rounded-lg shadow-md hover:shadow-xl transition-shadow'>
                            <div className = 'text-xl font-bold'>{u.name}</div>
                            <div className = 'text-gray-500'>{u.email}</div>
                            <div className='mt-4 flex items-center gap-3'>
                              {!r && (
                                <button className='px-4 py-2 rounded bg-[#8C87AA] text-white' onClick={() => actions.add(u.id)}>Add Friend</button>
                              )}

                              {r?.status === 'PENDING' && r.iAmInitiator && (
                                <>
                                  <span className='text-amber-600 font-medium'>Pending</span>
                                  <button className='px-4 py-2 rounded bg-gray-200' onClick={() => actions.cancel(r.friendshipId)}>Cancel</button>
                                </>
                              )}

                              {r?.status === 'PENDING' && !r.iAmInitiator && (
                                <>
                                  <button className='px-4 py-2 rounded bg-green-600 text-white' onClick={() => actions.accept(r.friendshipId)}>Accept</button>
                                  <button className='px-4 py-2 rounded bg-red-500 text-white' onClick={() => actions.decline(r.friendshipId)}>Decline</button>
                                </>
                              )}

                              {r?.status === 'ACCEPTED' && (
                                <>
                                  <span className='text-green-600 font-medium'>Friends</span>
                                  <button className='px-4 py-2 rounded bg-gray-200' onClick={() => actions.unfriend(r.friendshipId)}>Unfriend</button>
                                </>
                              )}

                              {r?.status === 'DENIED' && (
                                <button className='px-4 py-2 rounded bg-[#8C87AA] text-white' onClick={() => actions.add(u.id)}>Add Friend</button>
                              )}
                            </div>
                        </div>
                        );
                    })}
                </div>
            </>}

        </div>
    </div>
  )
}

export default FriendSearch