"use client";

import React, { useEffect, useState } from "react";

export default function GetBook({ params }) {
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const resBook = await fetch("https://gutendex.com/books");
        if (!resBook.ok) {
          throw new Error("Failed to fetch books");
        }
        const jsonBooks = await resBook.json();
        setBooks(jsonBooks.results);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    if (books.length > 0) {
      const foundBook = books.find((b) => b.id.toString() === params.id);
      setBook(foundBook);
    }
  }, [books, params.id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
          <div className="text-3xl font-semibold text-gray-700">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-5">
      {book ? (
        <div className="bg-white bg-opacity-75 shadow-md rounded-lg p-8 w-auto">
          <img
            src="https://img.freepik.com/free-photo/book-composition-with-open-book_23-2147690555.jpg"
            alt="image book"
            width={800}
            className="mx-auto m-6"
          />
          <hr />
          <h2 className="text-4xl text-center font-bold font-semibold mb-2">
            {book.title}
          </h2>
          <hr />
          <p className="mb-2">
            <span className="font-semibold">Authors:</span>{" "}
            {book.authors.map((author) => author.name).join(", ")}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Language:</span>{" "}
            {book.languages.join(", ")}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Download Count:</span>{" "}
            {book.download_count}
          </p>{" "}
          <hr />
          <p className="mb-2">
            <span className="font-semibold">Bookshelves:</span>{" "}
            {book.bookshelves.join(", ")}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Subjects:</span>{" "}
            {book.subjects.join(", ")}
          </p>{" "}
          <hr />
          <p className="mb-2">
            <span className="font-semibold">Formats:</span>{" "}
            {Object.keys(book.formats).join(", ")}
          </p>
        </div>
      ) : (
        <h1 className="text-center mt-4 text-3xl">Loading...</h1>
      )}
    </div>
  );
}
