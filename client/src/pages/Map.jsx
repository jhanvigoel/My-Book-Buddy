import React, { useEffect, useState } from 'react'
import Mapbox from '../components/Mapbox'
import { MapContainer } from 'react-leaflet'

const Map = () => {

  return (
    <div>

       <div className = "mt-15">

        <h1 className="text-4xl font-extrabold text-[#8C87AA] mb-6 drop-shadow-lg tracking-tight text-center">Your BookStore Map</h1>

        <div className = "flex justify-center items-center mt-8 ml-35 mr-35 mb-20 ">

            <Mapbox />

        </div>

      </div>

    </div>
  )
}

export default Map