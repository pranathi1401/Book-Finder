import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import BookList from "./components/BookList";
import useBooks from "./hooks/useBooks";

export default function App() {
  const [query, setQuery] = useState("");
  const { books, numFound, loading, error } = useBooks(query);

  return (
    <div className="min-h-screen">
      <header className="bg-white shadow p-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold">Book Finder</h1>
          <p className="text-sm text-slate-600">Search books by title (Open Library API)</p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-6">
        <SearchBar onSearch={setQuery} initial={query} debounceMs={400} />

        <section className="mt-6">
          {loading && <div className="p-4 text-slate-600">Searching…</div>}
          {error && <div className="p-4 text-red-600">Error: {error}</div>}
          {!loading && !error && (
            <div className="mb-4 text-sm text-slate-600">
              {query ? `${numFound} results found` : "Enter a book title to search."}
            </div>
          )}

          {!loading && !error && <BookList books={books} />}
        </section>
      </main>

      <footer className="text-center p-4 text-xs text-slate-500">
        Data from Open Library — <a className="text-sky-600" href="https://openlibrary.org" target="_blank" rel="noreferrer">openlibrary.org</a>
      </footer>
    </div>
  );
}
