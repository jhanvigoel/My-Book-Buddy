import React from 'react'
import { useParams, useLocation } from 'react-router-dom'
import axios from 'axios';

const BookPage = () => {
  const { bookId } = useParams();
  const location = useLocation();
  const book = location.state?.book;

  const info = book.volumeInfo || {};

  const addToReadingHistory = async (status) => {

    try{

        const token = localStorage.getItem('token');

        const payload = {

            title: info.title,
            author: info.authors?.join(','),
            coverUrl: info.imageLinks?.thumbnail,
            status: status
        }

        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/dashboard`,payload,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        
        alert('Book added to your reading list!');
        
    }
    catch(error){
        console.error(error);
        alert(error.response?.data?.error || 'Failed to add book');
    }
  }
  
  const imageUrl = info.imageLinks?.large ||    
                 info.imageLinks?.medium ||     
                 info.imageLinks?.small ||     
                 info.imageLinks?.thumbnail ||  
                 info.imageLinks?.smallThumbnail || 
                 'placeholder';   

  return (
    <div>
        <div className='p-6 mt-5'>

            <div className="text-5xl font-bold mb-8 text-center">{info.title}</div>

            <div className='flex flex-col md:flex-row gap-8'> 

                
                <div className="flex-shrink-0">
                    <img 
                        src={imageUrl} 
                        alt={info.title}
                        className="w-64 h-96 object-cover rounded-lg shadow-lg mx-auto md:mx-0"
                    />
                </div>

                <div className='flex flex-col flex-1'>

                    <div className="text-xl font-semibold text-gray-800 mb-2">
                        Author(s): <span className="font-normal">{info.authors?.join(', ') || 'Unknown'}</span>
                    </div>

                    <div className="text-lg text-gray-700 mb-2">
                        <span className="font-semibold">Published:</span> {info.publishedDate || 'N/A'}
                    </div>

                    <div className="text-lg text-gray-700 mb-4">
                        <span className="font-semibold">Publisher:</span> {info.publisher || 'N/A'}
                    </div>

                    <div className="mt-4 text-base text-gray-700 leading-relaxed">
                        <span className="font-semibold text-lg">Description:</span>
                        <p className="mt-2">{info.description || 'No description available.'}</p>
                    </div>

                    <div className="mt-8 flex flex-col gap-4 md:flex-row md:gap-4">
                        <button className="px-6 py-3 rounded-full bg-[#8C87AA] font-bold text-white hover:bg-[#8C87AA]/80 hover:-translate-y-1 transition-transform"
                        onClick={() => addToReadingHistory('WANT_TO_READ')}>
                            WANT TO READ
                        </button>
                        <button className="px-6 py-3 rounded-full bg-[#8C87AA] font-bold text-white hover:bg-[#8C87AA]/80 hover:-translate-y-1 transition-transform"
                        onClick={() => addToReadingHistory('READING')}>
                            READING
                        </button>
                        <button className="px-6 py-3 rounded-full bg-[#8C87AA] font-bold text-white hover:bg-[#8C87AA]/80 hover:-translate-y-1 transition-transform"
                        onClick={() => addToReadingHistory('COMPLETED')}>
                            COMPLETED
                        </button>
                    </div>

                </div>

            </div>

        </div>
    </div>
  )
}

export default BookPage