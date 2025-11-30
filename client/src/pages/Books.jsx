import { axiosPublic } from '../api/axios';
import React, { useEffect, useState } from 'react'
import BookSearch from '../components/BookSearch';

const Books = () => {

    const [books,setBooks] = useState([]);

    const [search,setSearch] = useState('');

    const [used,setUsed] = useState(false);

    const [lastSearch,setLastSearch] = useState('');

    const handleInputChange = (e) => setSearch(e.target.value);

    const fetchBooks = async (signal) => {
        try {
            const response = await axiosPublic.get('/books', { signal });
            setBooks(response.data);
        } catch (error) {
            if (error.name === 'CanceledError') return;
            console.error("Error fetching books:", error);
        }
    }

    const handleSearch = async () => {
        const term = search.trim();
        
        if (!term) {
            setUsed(false);
            setLastSearch('');
            const controller = new AbortController();
            await fetchBooks(controller.signal);
            return () => controller.abort();
        }
        try {
            const response = await axiosPublic.get(`/books`, { params: { q: term } });
            setLastSearch(term);
            setBooks(response.data);
            setUsed(true);
        } catch (error) {
            console.error("Error searching books:", error);
        }
    }

    useEffect(() => {
        const controller = new AbortController();
        fetchBooks(controller.signal);
        return () => controller.abort();
    }, [])

    useEffect(() => {
        if (search.trim() === '') {
            const controller = new AbortController();
            fetchBooks(controller.signal);
            setUsed(false);
            setLastSearch('');
            return () => controller.abort();
        }
    }, [search])

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-[#f3e8ff] via-[#e0e7ff] to-[#f8fafc] py-16 px-4 flex flex-col items-center">
            <div className="w-full max-w-2xl flex flex-col items-center mb-12">
                <h1 className="text-4xl font-extrabold text-[#8C87AA] mb-6 drop-shadow-lg tracking-tight text-center">Book Search</h1>
                <div className="flex items-center border gap-2 border-[#8C87AA]/30 h-[50px] rounded-full bg-white shadow-md px-4 w-full max-w-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 30 30" fill="#8C87AA">
                        <path d="M13 3C7.489 3 3 7.489 3 13s4.489 10 10 10a9.95 9.95 0 0 0 6.322-2.264l5.971 5.971a1 1 0 1 0 1.414-1.414l-5.97-5.97A9.95 9.95 0 0 0 23 13c0-5.511-4.489-10-10-10m0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8"/>
                    </svg>
                    <input
                        type="text"
                        placeholder="Find books..."
                        className="w-full h-full outline-none placeholder-gray-400 text-gray-700 bg-transparent text-base px-2"
                        value={search}
                        onChange={handleInputChange}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                handleSearch();
                            }
                        }}
                    />
                    <button
                        type="button"
                        className="bg-[#8C87AA] w-28 h-9 rounded-full text-sm text-white font-semibold hover:bg-[#6c6699] transition"
                        onClick={() => { handleSearch(); }}
                    >
                        Search
                    </button>
                </div>
            </div>

            <div className="w-full flex flex-col items-center">
                <div className="w-full max-w-6xl">
                    <div className="mb-8 text-center">
                        {used && (
                            books.length === 0 ? (
                                <p className="text-lg text-gray-500">No results found for <span className="font-semibold text-[#8C87AA]">"{lastSearch}"</span></p>
                            ) : (
                                <p className="text-lg text-gray-600">Showing results for <span className="font-semibold text-[#8C87AA]">{lastSearch}</span></p>
                            )
                        )}
                        {!used && (
                            <p className="text-lg text-[#8C87AA] font-semibold">Popular Books</p>
                        )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {books.map((book) =>
                            <BookSearch key={book.id || book.etag || book.title} item={book} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Books