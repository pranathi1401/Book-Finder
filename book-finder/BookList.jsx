import React from "react";
import BookCard from "./BookCard";

export default function BookList({ books }) {
  if (!books || books.length === 0) {
    return <div className="p-4 text-center text-slate-600">No results found.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {books.map((b) => (
        <BookCard key={`${b.key}-${b.cover_i || "nocover"}`} book={b} />
      ))}
    </div>
  );
}
