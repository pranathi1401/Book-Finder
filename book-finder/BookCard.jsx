import React from "react";

function getCoverUrl(cover_i) {
  return cover_i ? `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg` : null;
}

export default function BookCard({ book }) {
  const title = book.title || "Untitled";
  const author = (book.author_name && book.author_name.join(", ")) || "Unknown author";
  const year = book.first_publish_year || "—";
  const cover = getCoverUrl(book.cover_i);

  return (
    <div className="flex gap-4 p-3 bg-white rounded shadow-sm">
      <div className="w-28 h-36 flex-shrink-0 bg-slate-100 rounded overflow-hidden flex items-center justify-center">
        {cover ? (
          <img src={cover} alt={`${title} cover`} className="w-full h-full object-cover" />
        ) : (
          <div className="text-sm text-slate-400 px-2 text-center">No cover</div>
        )}
      </div>
      <div className="flex-1">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-slate-600">{author}</p>
        <p className="text-xs text-slate-500 mt-2">First published: {year}</p>
        {book.isbn && book.isbn[0] && (
          <a
            className="text-xs text-sky-600 inline-block mt-2"
            href={`https://openlibrary.org/isbn/${book.isbn[0]}`}
            target="_blank"
            rel="noreferrer"
          >
            View on Open Library
          </a>
        )}
      </div>
    </div>
  );
}
