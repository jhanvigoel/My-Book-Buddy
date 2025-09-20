import React from 'react'
import axios from 'axios';
import EventSearch from '../components/EventSearch';
import { useState,useEffect } from 'react';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Events = () => {

  console.log('Base URL:', import.meta.env.VITE_BASE_URL);

  const [Events,setEvents] = useState([]);

    const fetchEvents = async() => {

        try{

            const res = await axios.get('/events');
            setEvents(res.data);

        }
        catch(err){
            console.log(err);
        }
    }

  useEffect(() => {
      fetchEvents();
  }, [])

  return (
    <div>

      <h1>Discover Book Events Around You </h1>
      <p>Stay up-to-date with book launches, author meetups, literary festivals, and reading clubs happening near you. </p>

      

            <div className="mt-28 min-h-screen flex flex-col justify-center items-center">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl px-4">
                    {Events.map((event) => 
                        <EventSearch key={event.id || event.etag} item={event} />
                    )}
                </div>
            </div>

    </div>
  )
}

export default Events