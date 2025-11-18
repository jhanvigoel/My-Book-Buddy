import React from 'react'
import { Link } from 'react-router-dom'

const BookDisplay = ({ book }) => {
  const b = book ?? {};

  const googleId = b?.googleVolumeId || '';
  const hasInternal = Boolean(googleId);
  const hasExternal = typeof b?.infoLink === 'string' && b.infoLink.startsWith('http');

  const toHttps = (u) => (typeof u === 'string' ? u.replace(/^http:\/\//, 'https://') : u);
  const normalizeGoogleCover = (u) => {
    if (typeof u !== 'string') return u;
    let v = toHttps(u);
    v = v.replace('://books.google.com/books/content', '://books.googleusercontent.com/books/content');
    return v;
  };
  const placeholderSvg = `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns='http://www.w3.org/2000/svg' width='128' height='192'>
      <rect width='100%' height='100%' fill='#e5e7eb'/>
      <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#6b7280' font-family='Arial' font-size='12'>No Cover</text>
    </svg>
  `)}`;
  const imageSrc = normalizeGoogleCover(b?.coverUrl) || placeholderSvg;
  return (
    <div>
        <div className = 'p-4 border rounded-lg shadow-md flex items-center'>
            <img src={imageSrc} alt={b.title || 'Book cover'} className="w-32 h-48 object-cover rounded-lg" referrerPolicy="no-referrer"/>
            <div className = "ml-6">
                <div className = "text-2xl font-bold">{b.title || 'Untitled'}</div>
                <div className = "text-xl text-gray-600 mt-2">by {b.author || 'Unknown Author'}</div>

                {hasInternal ? (
                  <Link
                    to={`/dashboard/book/${googleId}`}
                    state={{ book: b }}
                    className="inline-block mt-4 px-4 py-2 rounded-full bg-[#8C87AA] text-white font-semibold hover:bg-[#8C87AA]/80 hover:-translate-y-1 transition-transform"
                  >
                    View Details
                  </Link>
                ) : (
                  <a
                    href={hasExternal ? b.infoLink : '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 px-4 py-2 rounded-full bg-[#8C87AA] text-white font-semibold hover:bg-[#8C87AA]/80 hover:-translate-y-1 transition-transform"
                    aria-disabled={!hasExternal}
                    onClick={(e) => { if (!hasExternal) e.preventDefault(); }}
                  >
                    View Details
                  </a>
                )}
            </div>
        </div>
    </div>
  )
}

export default BookDisplay