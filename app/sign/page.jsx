"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignIn() {
  const [user, setUser] = useState({
    email: "",
    userName: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkEffect = async () => {
      const res = await axios.get("/api/auth/session");

      if (res.data.session) {
        router.replace("/");
      }
    };
    checkEffect();
  }, [router]);

  const onSignup = async (e) => {
    e.preventDefault(); // Prevent form submission
    if (user.email === "" || user.userName === "" || user.password === "") {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("/api/users/signin", user);

      if (res.status === 200) {
        console.log("Success SignIn", res.data);
        router.push("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-10 opacity-75">
      <div className="bg-white p-7 rounded-lg shadow-lg w-full max-w-4xl">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Sign In
        </h1>
        <form onSubmit={onSignup}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Your Email"
              required
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="userName"
              className="block text-gray-700 font-medium mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="userName"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Your Username"
              required
              onChange={(e) => setUser({ ...user, userName: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Your Password"
              required
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
        </form>
        <div className="flex items-center space-x-4 p-2">
          <Link
            className="hover:text-green-700 hover:bg-red-950 rounded-md py-1 px-4 rounded transition"
            href="/login"
          >
            Do You Have Account ?
          </Link>
        </div>
      </div>
    </div>
  );
}
