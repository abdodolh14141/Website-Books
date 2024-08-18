"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession, signOut } from "next-auth/react";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";

export default function Dashboard() {
  const [user, setUser] = useState({ email: "", userName: "" });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const session = await getSession();
        if (!session) {
          router.push("/login");
        } else {
          const { email, name } = session.user;
          setUser({ email, userName: name });
        }
      } catch (error) {
        console.error("Error fetching session:", error);
        toast.error("Failed to fetch user session.");
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [router]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      const response = await axios.post("/api/users/update", user);

      if (response.status === 200) {
        toast.success("User data updated successfully.");
        await signOut();
        router.push("/login");
      } else {
        toast.error("Failed to update user data.");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      toast.error("An error occurred while updating user data.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-indigo-500 h-12 w-12 mb-4"></div>
          <div className="text-3xl font-semibold text-gray-700">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <Toaster />
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl text-gray-800 font-bold mb-8 text-center">
          Dashboard
        </h1>
        <form onSubmit={handleUpdate}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, email: e.target.value }))
              }
              className="w-full px-4 py-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              value={user.userName}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, userName: e.target.value }))
              }
              className="w-full px-4 py-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-md shadow-sm text-white transition-colors ${
              updating
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            }`}
            disabled={updating}
            aria-busy={updating}
          >
            {updating ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
}
