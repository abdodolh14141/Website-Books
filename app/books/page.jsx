"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Post() {
  const [data, setData] = useState([]);
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://gutendex.com/books");
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const resJson = await res.json();
        setData(resJson.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

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

  if (error) {
    return <div className="text-center mt-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-5  text-center">Books</h1>
      {/* <img
        src="https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg?ixlib=rb-4.1.0&q=45&auto=format&w=1356&h=668&fit=crop"
        alt="image books"
        width={1000}
        className="mx-auto mb-6"
      /> */}
      <h2 className="text-xl mb-6 text-center">{time}</h2>
      <hr className="my-4" />
      <div className="flex flex-wrap -mx-1">
        {data.map((book) => (
          <div key={book.id} className="w-full sm:w-1/2 md:w-2/5 lg:w-1/5 p-3">
            <Link href={`/books/${book.id}`} passHref>
              <div className="cursor-pointer bg-blue-200 shadow-md rounded-lg p-2 text-center hover:bg-blue-300 transition duration-300 h-full flex flex-col justify-between">
                <div>
                  <img
                    src="https://static.vecteezy.com/system/resources/thumbnails/022/242/738/small/smart-learning-education-book-shop-store-logo-design-template-free-vector.jpg"
                    alt="image book"
                    className="w-full"
                  />
                  <p className="text-lg text-gray-700 font-semibold">
                    Title: {book.title}
                  </p>
                  <hr className="my-4 border-0 h-1 bg-teal-400 rounded" />
                  <p className="text-lg text-gray-700">
                    Authors:{" "}
                    {book.authors.map((author) => author.name).join(", ")}
                  </p>
                  <p className="text-lg text-gray-700">
                    Language: {book.languages.join(", ")}
                  </p>
                </div>
                <p className="text-lg text-gray-700 mt-4">
                  Download Count: {book.download_count}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
