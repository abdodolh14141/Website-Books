"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Nav = () => {
  const router = useRouter();

  const { data: session, status } = useSession();
  const isLogin = status === "authenticated";
  const UserName = session?.user?.name;

  const handleLogout = async () => {
    await signOut();
    router.push("/login");
  };

  return (
    <nav className="bg-gray-500 bg-opacity-75 text-white p-3 flex items-center justify-between">
      <div className="flex items-center space-x-5">
        <Link href="/" className="text-lg font-bold">
          <Image
            src="/assets/images/logo.png"
            alt="logo"
            width={50}
            height={50}
            className="object-contain"
          />
        </Link>
        <Link href="/books" className="hover:text-gray-400 transition">
          Books
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        {isLogin ? (
          <>
            <h1 className="text-center m-2 p-1">
              Welcome {UserName.split(" ")[0]}
            </h1>
            <Link
              href="/about"
              className="hover:text-gray-400 transition bg-red-950 hover:bg-emerald-600 py-2 px-4 rounded transition"
            >
              About
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              href="/about"
              className="hover:bg-slate-950 py-1 px-4 rounded transition"
            >
              About
            </Link>
            <Link
              href="/login"
              className="hover:bg-slate-950 py-1 px-4 rounded  transition"
            >
              Login
            </Link>
            <Link
              href="/sign"
              className="hover:bg-slate-950 py-1 px-4 rounded transition"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
