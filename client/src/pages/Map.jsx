import React, { useEffect, useState } from 'react'
import Mapbox from '../components/Mapbox'
import { MapContainer } from 'react-leaflet'

const Map = () => {

  return (
    <div>

        <h1>Map</h1>

        <div className = "flex justify-center items-center mt-8 w-[80vw] h-[80vh] ml-35 mr-35 border-4 border-blue-500">

            <Mapbox />

        </div>

    </div>
  )
}

export default Map