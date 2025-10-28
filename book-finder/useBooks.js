import { useState, useEffect, useRef } from "react";

const API_BASE = "https://openlibrary.org/search.json";

export default function useBooks(query, page = 1, limit = 20) {
  const [books, setBooks] = useState([]);
  const [numFound, setNumFound] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const controllerRef = useRef(null);

  useEffect(() => {
    if (!query) {
      setBooks([]);
      setNumFound(0);
      setLoading(false);
      setError(null);
      return;
    }

    if (controllerRef.current) controllerRef.current.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    setLoading(true);
    setError(null);

    const offset = (page - 1) * limit;
    const url = `${API_BASE}?title=${encodeURIComponent(query)}&limit=${limit}&offset=${offset}`;

    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((json) => {
        setBooks(json.docs || []);
        setNumFound(json.numFound || 0);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError(err.message || "Failed to fetch");
        setLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, [query, page, limit]);

  return { books, numFound, loading, error };
}
