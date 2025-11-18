import React, { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import axios from 'axios';

const BookPage = () => {
    const { bookId } = useParams();
    const location = useLocation();
    const passedBook = location.state?.book;
    const [info, setInfo] = useState(() => passedBook?.volumeInfo || null);
    const [loading, setLoading] = useState(!passedBook?.volumeInfo);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchById = async () => {
            if (info || !bookId) return;
            if (/^\d+$/.test(bookId)) {
                // Likely a DB numeric id, not a Google volume id; skip external fetch
                return;
            }
            try {
                setLoading(true);
                setError('');
                const res = await axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}`);
                setInfo(res.data?.volumeInfo || {});
            } catch (e) {
                console.error('Failed to fetch book by id:', e);
                setError('Failed to load book details');
                setInfo({});
            } finally {
                setLoading(false);
            }
        };
        fetchById();
    }, [bookId, info]);

    const addToReadingHistory = async (status) => {

    try{

        const token = localStorage.getItem('token');

        const payload = {
            title: info?.title,
            author: info?.authors?.join(',') || undefined,
            coverUrl: info?.imageLinks?.thumbnail,
            googleVolumeId: passedBook?.id || bookId,
            infoLink: info?.infoLink,
            status
        };

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
  
        const toHttps = (u) => (typeof u === 'string' ? u.replace(/^http:\/\//, 'https://') : u);
        const normalizeGoogleCover = (u) => {
            if (typeof u !== 'string') return u;
            let v = toHttps(u);
            v = v.replace('://books.google.com/books/content', '://books.googleusercontent.com/books/content');
            return v;
        };
        const placeholderSvg = `data:image/svg+xml;utf8,${encodeURIComponent(`
            <svg xmlns='http://www.w3.org/2000/svg' width='256' height='384'>
                <rect width='100%' height='100%' fill='#e5e7eb'/>
                <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#6b7280' font-family='Arial' font-size='18'>No Cover</text>
            </svg>
        `)}`;
        const imageUrl = normalizeGoogleCover(
            info?.imageLinks?.large ||
            info?.imageLinks?.medium ||
            info?.imageLinks?.small ||
            info?.imageLinks?.thumbnail ||
            info?.imageLinks?.smallThumbnail ||
            ''
        );

  return (
    <div>
        <div className='p-6 mt-5'>

            <div className="text-5xl font-bold mb-8 text-center">{info?.title || 'Book Details'}</div>

            <div className='flex flex-col md:flex-row gap-8'> 

                
                <div className="flex-shrink-0">
                    <img 
                        src={imageUrl || placeholderSvg} 
                        alt={info?.title || 'Book cover'}
                        className="w-64 h-96 object-cover rounded-lg shadow-lg mx-auto md:mx-0"
                        referrerPolicy="no-referrer"
                    />
                </div>

                <div className='flex flex-col flex-1'>

                    <div className="text-xl font-semibold text-gray-800 mb-2">
                        Author(s): <span className="font-normal">{info?.authors?.join(', ') || 'Unknown'}</span>
                    </div>

                    <div className="text-lg text-gray-700 mb-2">
                        <span className="font-semibold">Published:</span> {info?.publishedDate || 'N/A'}
                    </div>

                    <div className="text-lg text-gray-700 mb-4">
                        <span className="font-semibold">Publisher:</span> {info?.publisher || 'N/A'}
                    </div>

                    <div className="mt-4 text-base text-gray-700 leading-relaxed">
                        <span className="font-semibold text-lg">Description:</span>
                        <p className="mt-2">{info?.description || 'No description available.'}</p>
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