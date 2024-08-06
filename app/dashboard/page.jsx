"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut, getSession } from "next-auth/react";

export default function Dashboard() {
  const [user, setUser] = useState({
    Id: null,
    Email: "",
    UserName: "",
  });
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();

      if (!session) {
        router.push("/login");
      } else {
        const { id, email, name } = session.user;
        setUser({ Id: id, Email: email, UserName: name });
      }
    };
    fetchSession();
  }, [router]);

  const handleLogout = async () => {
    await signOut();
    router.push("/login");
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Welcome Back, {user.UserName}
      </h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
      >
        Logout
      </button>
    </div>
  );
}
