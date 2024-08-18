"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

export default function About() {
  const [msg, setMsg] = useState({
    email: "",
    message: "",
  });

  const onReport = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/users/about", msg);
      if (res.data.success) {
        toast.success(res.data.message);
        setMsg({ email: "", message: "" }); // Reset form on success
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <Toaster />
      <div className="max-w-full mx-auto p-6 opacity-90">
        <div className="border-2 border-sky-500 p-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-6 bg-white shadow-lg rounded-lg">
          <div className="text-lg text-gray-700 flex-1">
            <p>
              <em>
                I am <span className="font-bold">Abdo Adel Soliman</span>. I
                built this website using:
              </em>
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Next.js</li>
              <li>HTML</li>
              <li>Tailwind CSS</li>
              <li>React</li>
              <li>MongoDB</li>
              <li>TypeScript</li>
            </ul>
          </div>
          <img
            src="https://miro.medium.com/v2/resize:fit:1400/1*BQZAbczBfLYtPp-6HmN0ZQ.jpeg"
            alt="Next.js Logo"
            className="w-full md:w-1/2 rounded-lg"
          />
        </div>
        <hr className="my-4 border-t-2 border-black m-8" />
      </div>
      <div className="border-2 border-sky-500 p-5 bg-white rounded-lg max-w-4xl mx-auto my-6">
        <h1 className="text-center text-4xl mb-4">Contact Us</h1>
        <form onSubmit={onReport}>
          <label
            htmlFor="reportMsg"
            className="block mb-2 text-lg text-gray-700"
          >
            Message
          </label>
          <textarea
            id="reportMsg"
            placeholder="Write Your Message"
            className="border-2 border-gray-300 p-2 rounded-lg w-full mb-4"
            onChange={(e) => setMsg({ ...msg, message: e.target.value })}
            required
            value={msg.message}
          />
          <label htmlFor="email" className="block mb-2 text-lg text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            placeholder="Enter Your Email"
            className="border-2 border-gray-300 p-2 rounded-lg w-full mb-4"
            onChange={(e) => setMsg({ ...msg, email: e.target.value })}
            value={msg.email}
          />
          <button
            type="submit"
            className="bg-sky-500 text-white p-2 rounded-lg w-full hover:bg-sky-600 transition duration-300"
          >
            Send
          </button>
        </form>
      </div>
    </>
  );
}
