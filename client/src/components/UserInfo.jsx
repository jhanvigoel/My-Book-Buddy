import React, { useEffect, useState } from 'react'
import { axiosPrivate } from '../api/axios';
import { useAuth } from '../context/AuthContext.jsx';

 
const UserInfo = () => {

    const [userData,setUserData] = useState(null);

    const { accessToken, loading } = useAuth();

    useEffect(() => {
        if (loading) return; // wait for initial refresh attempt
        if (!accessToken) return; // not logged in
        let cancelled = false;
        (async () => {
            try {
                const res = await axiosPrivate.get('/dashboard/profile');
                if (!cancelled) setUserData(res.data.user);
            } catch (error) {
                if (!cancelled) console.error('Error fetching user data:', error);
            }
        })();
        return () => { cancelled = true; };
    }, [accessToken, loading]);

  return (
    <div>
        <div className='flex flex-col mt-20 justify-center ml-15 gap-5'>

            <div className = 'text-3xl font-semibold'> Name: {userData?.name} </div>
            <div className = 'text-3xl font-semibold'> Email: {userData?.email} </div>
            <div className = 'text-3xl font-semibold'> Phone: {userData?.phone} </div>
        </div>
    </div>
  )
}

export default UserInfo