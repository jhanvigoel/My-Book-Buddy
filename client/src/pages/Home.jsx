import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import WeOffer from '../components/WeOffer'
import Footer from '../components/Footer'
import BookInfo from '../components/BookInfo'
import MapInfo from '../components/MapInfo'

const Home = () => {
  return (
    <div>
        <Navbar />
        <Hero />
        <WeOffer />
        <BookInfo />
        <MapInfo />
        <Footer />
    </div>
  )
}

export default Home