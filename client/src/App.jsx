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
import BookPage from './pages/BookPage'
import BookSearch from './components/BookSearch'
import History from './components/History'
import Search from './pages/Search'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path = '/' element = {<Home />} />
    <Route path = '/dashboard' element = {<ProtectedRoute><Dashboard /></ProtectedRoute>}>
      <Route index element={<ProtectedRoute><History /></ProtectedRoute>} />
            <Route path = 'friends' element = {<Friends />} />
            <Route path = 'book/:bookId' element = {<ProtectedRoute><BookPage /></ProtectedRoute>} />
            <Route path = 'profile' element = {<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path = 'book-search' element = {<ProtectedRoute><Search/></ProtectedRoute>} />
        </Route>
        <Route path = '/events' element = {<Events />} />
        <Route path = '/books' element = {<Books />} />
        <Route path = '/nearby-bookstore' element = {<NearbyBookstore />} />
        <Route path = '/map' element = {<Map />} />
        <Route path = '/login' element = {<Login />} />
        <Route path = '/signup' element = {<Signin />} />
      </Routes>
    </div>
  )
}

export default App