import React, { useEffect, useState, useMemo } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import axios from 'axios';
import { axiosPrivate } from '../api/axios';
import DOMPurify from 'dompurify';
import BookReview from '../components/BookReview';

const BookPage = () => { 
    const {bookId} = useParams();
    const location = useLocation();
    const passedBook = location.state?.book;
    const [info, setInfo] = useState(() => passedBook?.volumeInfo || null);

    const id = info?.googleVolumeId || passedBook.googleVolumeId;
    const [cover,setCover] = useState(passedBook?.coverUrl || '');
    const [loading, setLoading] = useState(!passedBook?.volumeInfo);
    const [error, setError] = useState('');
    const [addReview,setAddReview] = useState(false);
    const [reviewContent,setReviewContent] = useState('');
    const [newState,setSate] = useState(false);
    const [reviews,getReviews] = useState([]);

    useEffect(() => {
        const fetchById = async () => {

            if (!bookId){
                return;
            }

            try {
                setLoading(true);
                setError('');
            
                const res = await axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}`);
                setInfo(res.data?.volumeInfo || {});
                
                try {
                    const reviewsRes = await axiosPrivate.get(`/dashboard/book/${bookId}/reviews`);
                    getReviews(reviewsRes.data);
                } catch (reviewError) {
                    if (reviewError.response?.status !== 404) {
                        console.error('Error fetching reviews:', reviewError);
                    }
                    getReviews([]);
                }
            } catch (e) {
                console.error('Failed to fetch book by id:', e);
                setError('Failed to load book details');
                setInfo({});
            } finally {
                setLoading(false);
            }
        };
        fetchById();
    }, [bookId]);

    const addToReadingHistory = async (status) => {
        try {
            const payload = {
                title: info?.title,
                author: info?.authors?.join(',') || 'Unknown Author',
                coverUrl: passedBook?.coverUrl || info?.imageLinks?.thumbnail || '',
                googleVolumeId: bookId,
                infoLink: info?.infoLink,
                status
            };
            await axiosPrivate.post(`/dashboard/book/${bookId}`, payload);
            alert('Book added to your reading list!');
        } catch (error) {
            console.error('Add to reading history error:', error);
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
        
        const imageUrl = normalizeGoogleCover(
            info?.imageLinks?.smallThumbnail || cover
        );

        const handleReview = async () => {

            try{


                const payload = {
                    title: info?.title,
                    author: info?.authors?.join(',') || 'Unknown Author',
                    coverUrl: passedBook?.coverUrl || info?.imageLinks?.thumbnail || '',
                    googleVolumeId : bookId,
                    text : reviewContent,
                    rating : 1,
                    infoLink: info?.infoLink,
                }

                await axiosPrivate.post(`/dashboard/book/${bookId}/reviews`,payload);
                alert("Review added successfully");
                
                const reviewsRes = await axiosPrivate.get(`/dashboard/book/${bookId}/reviews`);
                getReviews(reviewsRes.data);
                
                setReviewContent('');
                setAddReview(false);
            }
            catch(err){
                console.error('error adding review:', err);
                alert('Failed to add review');
            }
        }

  return (
    <div>
        <div className='p-6 mt-5'>

            <div className="text-5xl font-bold mb-8 text-center">{info?.title || 'Book Details'}</div>

            <div className='flex flex-col md:flex-row gap-8'> 

                
                <div className="flex-shrink-0">
                    <img 
                        src={imageUrl === '' ? cover : imageUrl} 
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

                    <DescriptionBlock raw={info?.description} />

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

            <div className="mt-6 mr-10 flex justify-end items-center">
                    <button className = "p-4 text-3xl font-semibold text-gray-800 border rounded-xl" onClick = {() => {setAddReview(!addReview) ; setSate(false)}}>ADD REVIEW</button>
            </div>

            {addReview && <div> 
                 <div className = "text-lg font-semibold text-gray-800">ADD REVIEW HERE</div>
                 <div className = "mt-4">
                    <textarea className = "w-full h-32 p-4 border border-gray-300 rounded-lg" onChange={(e) => setReviewContent(e.target.value)} placeholder='Write Review'></textarea>
                 </div>
 
                 <button className = "text-lg font-semibold" onClick= {handleReview}>POST REVIEW</button>
                </div>}

                <div className = "mt-6 ">
                    {reviews.length > 0 && reviews.map((review,index) => (
                        <BookReview data = {review} key = {index} />
                    ))}
                </div>
        </div>
    </div>
  )
}


const allowedTags = ['p','b','i','em','strong','br','ul','ol','li'];
const DescriptionBlock = ({ raw }) => {
    const safeHtml = useMemo(() => {
        if (!raw) return '<p>No description available.</p>';
        
        return DOMPurify.sanitize(raw, { ALLOWED_TAGS: allowedTags, ALLOWED_ATTR: [] });
    }, [raw]);

    
    return (
        <div className="mt-4 text-base text-gray-700 leading-relaxed">
            <span className="font-semibold text-lg">Description:</span>
            <div className="mt-2 space-y-3" dangerouslySetInnerHTML={{ __html: safeHtml }} />
        </div>
    );
};

export default BookPage