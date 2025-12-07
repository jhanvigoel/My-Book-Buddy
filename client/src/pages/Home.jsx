import React from 'react'
import BookPurple from '../assets/book-single-purple.svg'
import BookOrange from '../assets/book-single-orange.svg'
import BookAmber from '../assets/book-single-amber.svg'
import BookTeal from '../assets/book-single-teal.svg'
import BookStack1 from '../assets/book-stack-1.svg'
import BookStack2 from '../assets/book-stack-2.svg'
import OpenBook from '../assets/open-book.svg'
import Books from '../assets/books.svg'
import BooksAlt from '../assets/books-.svg'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import WeOffer from '../components/WeOffer'
import Footer from '../components/Footer'
import BookInfo from '../components/BookInfo'
import MapInfo from '../components/MapInfo'

const Home = () => {
  return (
    <div className="home-bg min-h-screen">
       
        <div className="bg-decor hidden md:block">
          <img src={BookPurple} alt="" className="absolute top-[10%] left-[6%] w-10 md:w-12 lg:w-14 opacity-80 animate-float-delay pointer-events-none select-none" />
          <img src={BookOrange} alt="" className="absolute top-[24%] right-[8%] w-12 md:w-14 lg:w-16 opacity-80 animate-float-slow pointer-events-none select-none" />
          <img src={BookAmber} alt="" className="absolute bottom-[14%] left-[12%] w-9 md:w-10 lg:w-12 opacity-80 animate-float-delay pointer-events-none select-none" />
          <img src={BookTeal} alt="" className="absolute bottom-[22%] right-[14%] w-10 md:w-12 lg:w-14 opacity-80 animate-float pointer-events-none select-none" />
          <img src={BookStack1} alt="" className="absolute top-[16%] left-[28%] w-12 md:w-14 lg:w-16 opacity-80 animate-float-slow pointer-events-none select-none" />
          <img src={BookStack2} alt="" className="absolute bottom-[18%] right-[28%] w-12 md:w-14 lg:w-16 opacity-80 animate-float-delay pointer-events-none select-none" />
          <img src={BookAmber} alt="" className="absolute top-[38%] left-[8%] w-10 md:w-12 lg:w-14 opacity-80 brightness-110 saturate-150 animate-float pointer-events-none select-none" />
          <img src={BookOrange} alt="" className="absolute top-[12%] right-[24%] w-10 md:w-12 lg:w-14 opacity-80 brightness-110 saturate-150 animate-float-delay pointer-events-none select-none" />
          <img src={BookStack1} alt="" className="absolute bottom-[26%] left-[26%] w-10 md:w-12 lg:w-14 opacity-80 brightness-110 saturate-150 animate-float-slow pointer-events-none select-none" />
          
          <img src={BookPurple} alt="" className="absolute top-[50%] left-[4%] w-8 md:w-10 lg:w-12 opacity-80 animate-float pointer-events-none select-none" />
          <img src={BookTeal} alt="" className="absolute top-[6%] left-[38%] w-9 md:w-11 lg:w-13 opacity-80 animate-float-slow pointer-events-none select-none" />
          <img src={BookAmber} alt="" className="absolute top-[30%] right-[6%] w-8 md:w-10 lg:w-12 opacity-80 animate-float-delay pointer-events-none select-none" />
          <img src={BookStack2} alt="" className="absolute bottom-[8%] left-[8%] w-10 md:w-12 lg:w-14 opacity-80 animate-float-slow pointer-events-none select-none" />
          <img src={BookOrange} alt="" className="absolute bottom-[32%] right-[6%] w-9 md:w-11 lg:w-13 opacity-80 animate-float pointer-events-none select-none" />
          <img src={BookStack1} alt="" className="absolute top-[44%] right-[22%] w-10 md:w-12 lg:w-14 opacity-80 animate-float-delay pointer-events-none select-none" />
          <img src={BookAmber} alt="" className="absolute bottom-[40%] left-[18%] w-8 md:w-10 lg:w-12 opacity-80 animate-float pointer-events-none select-none" />
          <img src={BookTeal} alt="" className="absolute top-[26%] left-[20%] w-8 md:w-10 lg:w-12 opacity-80 animate-float-slow pointer-events-none select-none" />
          <img src={BookStack2} alt="" className="absolute bottom-[12%] right-[12%] w-9 md:w-11 lg:w-13 opacity-80 animate-float-delay pointer-events-none select-none" />
          <img src={BookPurple} alt="" className="absolute top-[55%] right-[30%] w-8 md:w-10 lg:w-12 opacity-80 animate-float pointer-events-none select-none" />
          
          <img src={BookPurple} alt="" className="absolute top-[22%] left-[14%] w-8 md:w-10 lg:w-12 opacity-80 animate-float pointer-events-none select-none" />
          <img src={BookTeal} alt="" className="absolute top-[68%] left-[10%] w-9 md:w-10 lg:w-11 opacity-80 animate-float-slow pointer-events-none select-none" />
          <img src={BookAmber} alt="" className="absolute top-[72%] right-[12%] w-9 md:w-10 lg:w-11 opacity-80 animate-float-delay pointer-events-none select-none" />
          <img src={BookOrange} alt="" className="absolute top-[58%] right-[6%] w-8 md:w-10 lg:w-12 opacity-80 animate-float-slow pointer-events-none select-none" />
          <img src={BookStack1} alt="" className="absolute bottom-[50%] left-[34%] w-10 md:w-12 lg:w-14 opacity-80 animate-float pointer-events-none select-none" />
          <img src={BookStack2} alt="" className="absolute bottom-[46%] right-[20%] w-10 md:w-12 lg:w-14 opacity-80 animate-float-delay pointer-events-none select-none" />
          <img src={BookAmber} alt="" className="absolute bottom-[30%] right-[40%] w-8 md:w-9 lg:w-10 opacity-80 animate-float-slow pointer-events-none select-none" />
          <img src={BookTeal} alt="" className="absolute bottom-[60%] left-[48%] w-8 md:w-9 lg:w-10 opacity-80 animate-float pointer-events-none select-none" />
          <img src={BookOrange} alt="" className="absolute bottom-[10%] left-[40%] w-8 md:w-9 lg:w-10 opacity-80 animate-float-delay pointer-events-none select-none" />
          <img src={BookStack2} alt="" className="absolute top-[66%] right-[32%] w-10 md:w-12 lg:w-14 opacity-80 animate-float pointer-events-none select-none" />
        </div>
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