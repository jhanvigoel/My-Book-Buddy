import React from 'react';

const EventSearch = ({ item }) => {
  const info = item.volumeInfo;
  return (
    <div className="bg-white rounded-xl shadow-md p-6 m-4 max-w-md w-full flex flex-col hover:shadow-2xl hover:-translate-y-2 transition-transform text-center border border-[#8C87AA]/10">
      <div className="flex-1 flex flex-col">
        {info.imageLinks?.smallThumbnail && (
          <img
            src={info.imageLinks.smallThumbnail}
            alt={info.title}
            className="w-32 h-44 object-cover mx-auto mb-4 rounded"
          />
        )}
        <h2 className="text-base font-semibold text-[#8C87AA] mb-1">{info.title}</h2>
        <p className="text-xs text-gray-700 mb-2 line-clamp-4">{info.description}</p>
      </div>
      <div className="mt-auto pt-2">
        <a
          href={info.infoLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-[#8C87AA] text-white text-xs px-3 py-1.5 rounded-full hover:bg-[#6c6699] transition"
        >
          Checkout the Main Website
        </a>
      </div>
    </div>
  );
};

export default EventSearch;