import React from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Layout from './pages/Layout'
import Friends from './pages/Friends'
import Events from './pages/Events'
import NearbyBookstore from './pages/NearbyBookstore'
import Books from './pages/Books'
import Map from './pages/Map'
import Login from './pages/Login'
import Signin from './pages/Signin'
import Profile from './pages/Profile'
import ProtectedRoute from './components/ProtectedRoute'
import BookPage from './pages/BookPage'
import BookSearch from './components/BookSearch'
import History from './components/History'
import Search from './pages/Search'
import FriendSearch from './pages/FriendSearch'
import FriendInfo from './components/FriendInfo'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path = '/' element = {<Home />} />
        {/* Legacy/shortcut routes to keep old links working */}
        <Route path='/friends' element={<Navigate to='/dashboard/friends' replace />} />
        <Route path='/friends/friend' element={<Navigate to='/dashboard/friends/friend' replace />} />
    <Route path = '/dashboard' element = {<ProtectedRoute><Dashboard /></ProtectedRoute>}>
      <Route index element={<History />}/>
            <Route path = 'friends' element = {<ProtectedRoute><Friends /></ProtectedRoute>} >
              <Route index element = {<ProtectedRoute><FriendInfo /></ProtectedRoute>} />
               <Route path = 'friend' element = {<ProtectedRoute><FriendSearch /></ProtectedRoute>} />
            </Route>
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