import React, { useEffect, useState} from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

function RecenterMap({ center }) {
    const map = useMapEvents({});
    useEffect(() => {
        map.setView(center);
    }, [center, map]);
    return null;
}

function FetchBookStores({ setBookStores, center }) {
    const debounceRef = React.useRef();
    
    const map = useMapEvents({
        moveend: () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
            debounceRef.current = setTimeout(fetchStores, 700); // 700ms debounce
        }
    });

    async function fetchStores() {
        const bounds = map.getBounds();
        const minLat = bounds.getSouth();
        const maxLat = bounds.getNorth();
        const minLon = bounds.getWest();
        const maxLon = bounds.getEast();

        console.log("Fetching bookstores within bounds:", { minLat, maxLat, minLon, maxLon });

        const apikey = import.meta.env.VITE_GEOAPIFY_API_KEY;
        const url = `https://api.geoapify.com/v2/places?categories=commercial.books,education.library&filter=rect:${minLon},${minLat},${maxLon},${maxLat}&limit=500&apiKey=${apikey}`;
        try {
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error(`Overpass error: ${res.status}`);
            }
            const data = await res.json();
            const stores = data.features.map((element) => ({
                id: element.id,
                name: element.properties.name || "Unnamed Bookstore",
                Lat: element.geometry.coordinates[1],
                Lon: element.geometry.coordinates[0],
                opening_hours: element.properties.opening_hours || "Not available",
            }));
            setBookStores(stores);
        } catch (err) {
            console.error("Error fetching bookstores:", err);
        }
    }

    React.useEffect(() => {
        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
    }, []);

     React.useEffect(() => {
        if (map && center) {
        const timeout = setTimeout(() => {
            fetchStores();
        }, 300);
        return () => clearTimeout(timeout);
        }
    }, [map, JSON.stringify(center)]);

    return null;
}

const Mapbox = () => {

    const [currLocation,setLocation] = useState([28.6315, 77.2167]);

    const [bookStores,setBookStores] = useState([]);
    
    useEffect(() => {
            
        if ('geolocation' in navigator){

           
            navigator.geolocation.getCurrentPosition((postion) => {
    
                setLocation([postion.coords.latitude,postion.coords.longitude]);
                console.log("Curr Latitude:", postion.coords.latitude, "Curr Longitude:", postion.coords.longitude);
    
            },(err) =>{
                console.log("No Position",err);
            });

        
        }
        else{

            console.log("Geolocation not available");
        }

    },[]);

  return (
    <div>

    <MapContainer center={currLocation} zoom={14} style = {{height:"80vh",width :"65vw"}} className="border-4 black">
    <RecenterMap center={currLocation} />
        <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

         <Marker key = {'Home'} position = {{lat:currLocation[0],lng: currLocation[1]}} icon = {L.icon({iconUrl:`https://api.geoapify.com/v2/icon?type=awesome&icon=home&color=%230099ff&size=64&apiKey=${import.meta.env.VITE_GEOAPIFY_API_KEY}`,iconSize:[45,45]})}>
            <Popup>Your currLocation </Popup>
         </Marker>

        <FetchBookStores setBookStores = {setBookStores} center={currLocation} />
                
        {bookStores.map((store) => (
            <Marker key = {store.id || `${store.Lat},${store.Lon}`} position = {{lat: store.Lat, lng: store.Lon}} icon = {L.icon({
                iconUrl: `https://api.geoapify.com/v2/icon?type=material&color=%23ff5722&size=64&apiKey=${import.meta.env.VITE_GEOAPIFY_API_KEY}`,iconSize: [45, 45]
            })}>
            <Popup><p> Store Name : {store.name} </p> <p> Store Opening Hours : {store.opening_hours} </p></Popup>
            </Marker>
        ))}

        </MapContainer>
        
    </div>
  )
}

export default Mapbox