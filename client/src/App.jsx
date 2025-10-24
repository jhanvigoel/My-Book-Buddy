import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Layout from './pages/Layout'
import Friends from './pages/Friends'
import Events from './pages/Events'
import NearbyBookstore from './pages/NearbyBookstore'
import Books from './pages/Books'
import Map from './pages/Map'
import Login from './pages/login'
import Signin from './pages/Signin'
import Profile from './pages/Profile'
import ProtectedRoute from './components/ProtectedRoute'
import ReadingHistory from './pages/ReadingHistory'
import BookPage from './pages/BookPage'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path = '/' element = {<Home />} />
        <Route path = '/dashboard' element = {<ProtectedRoute><Dashboard /></ProtectedRoute>}>
            <Route path = 'friends' element = {<Friends />} />
        </Route>
        <Route path = '/events' element = {<Events />} />
        <Route path = '/books' element = {<Books />} />
        <Route path = '/nearby-bookstore' element = {<NearbyBookstore />} />
        <Route path = '/map' element = {<Map />} />
        <Route path = '/login' element = {<Login />} />
        <Route path = '/signup' element = {<Signin />} />
        <Route path = '/profile' element = {<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path = '/reading-history' element = {<ProtectedRoute><ReadingHistory /></ProtectedRoute>} />
        <Route path = '/book/:bookId' element = {<BookPage />} />
      </Routes>
    </div>
  )
}

export default App