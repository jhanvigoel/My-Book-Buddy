import React from 'react'


const fallbackImage = "https://via.placeholder.com/128x192?text=No+Image";

const BookSearch = ({ item }) => {
  const info = item.volumeInfo || {};
  const imageUrl = info.imageLinks?.smallThumbnail || fallbackImage;
  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 m-4 max-w-xs w-full flex flex-col hover:shadow-2xl hover:-translate-y-2 transition-transform border border-[#8C87AA]/20 text-left">
      <div className="flex-1 flex flex-col items-center">
        <img
          src={imageUrl}
          alt={info.title || 'No Title'}
          className="w-28 h-40 object-cover mb-4 rounded-lg shadow-sm border border-gray-200"
        />
        <h2 className="text-lg font-bold text-[#8C87AA] mb-1 text-center line-clamp-2">{info.title || 'No Title'}</h2>
        <p className="text-xs text-gray-600 mb-3 text-center line-clamp-4 min-h-[3.5rem]">{info.description || 'No description available.'}</p>
      </div>
      <div className="mt-auto pt-2 flex justify-center">
        {info.infoLink ? (
          <a
            href={info.infoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#8C87AA] text-white text-xs px-4 py-2 rounded-full font-medium shadow hover:bg-[#6c6699] transition"
          >
            Checkout the Main Website
          </a>
        ) : null}
      </div>
    </div>
  );
};

export default BookSearch