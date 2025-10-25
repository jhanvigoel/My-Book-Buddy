import React from 'react'
import UserNavbar from '../components/UserNavbar'
import DashboardBook from '../components/DashboardBook'
import { useLocation, useParams } from 'react-router-dom'

const Search = ({}) => {

    const book = useLocation().state?.book;
    
  return (
    <div>

        <DashboardBook bookName = {book} />
    </div>
  )
}

export default Search