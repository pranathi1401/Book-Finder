import React, { useState, useEffect } from "react";

export default function SearchBar({ onSearch, initial = "", debounceMs = 400 }) {
  const [value, setValue] = useState(initial);

  useEffect(() => {
    const trimmed = value.trim();
    const id = setTimeout(() => {
      onSearch(trimmed);
    }, debounceMs);

    return () => clearTimeout(id);
  }, [value, onSearch, debounceMs]);

  return (
    <div className="w-full max-w-3xl">
      <label htmlFor="search" className="sr-only">Search books by title</label>
      <div className="flex gap-2">
        <input
          id="search"
          className="flex-1 px-4 py-2 rounded border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
          placeholder="Search books by title (e.g. 'To Kill a Mockingbird')"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          aria-label="Book title"
        />
        <button
          type="button"
          onClick={() => onSearch(value.trim())}
          className="px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700"
        >
          Search
        </button>
      </div>
      <p className="text-xs text-slate-500 mt-2">Searching as you type (debounced {debounceMs}ms)</p>
    </div>
  );
}
