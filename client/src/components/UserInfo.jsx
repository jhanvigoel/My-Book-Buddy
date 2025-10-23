import React, { useEffect, useState } from 'react'
import axios from 'axios';

 
const UserInfo = () => {

    const [userData,setUserData] = useState(null);

    const fetchUserData = async() => {

        try{

            const token = localStorage.getItem('token');

            if (!token) {
                console.error('No token found');
                return;
            }

            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/profile`,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })

            setUserData(res.data.user);

        }catch(error){
            console.error('Error fetching user data:', error);
        }
    }

    useEffect(() => {
        fetchUserData();
    }, [])

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