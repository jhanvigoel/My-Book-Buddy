import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Layout from './pages/Layout'
import ReadingCalender from './pages/ReadingCalender'
import Friends from './pages/Friends'
import Events from './pages/Events'
import NearbyBookstore from './pages/NearbyBookstore'
import Books from './pages/Books'
import Map from './pages/Map'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path = '/' element = {<Home />} />
        <Route path = '/dashboard' element = {<Dashboard />}>
            <Route path = 'reading-calender' element = {<ReadingCalender />} />
            <Route path = 'friends' element = {<Friends />} />
        </Route>
        <Route path = '/events' element = {<Events />} />
        <Route path = '/books' element = {<Books />} />
        <Route path = '/nearby-bookstore' element = {<NearbyBookstore />} />
        <Route path = '/map' element = {<Map />} />
      </Routes>
    </div>
  )
}

export default App