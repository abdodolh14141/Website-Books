"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaRegUser } from "react-icons/fa";

export default function Nav() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    if (session?.user) {
      setIsLogin(true);
      setName(session.user?.name);
    } else {
      setIsLogin(false);
    }
  }, [session]);

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
        <Link
          href="/books"
          className="hover:bg-slate-950 py-1 px-4 rounded transition"
        >
          Books
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        {isLogin ? (
          <>
            <div className="flex items-center space-x-2">
              <FaRegUser className="text-2xl" />
              <p className="text-lg">Welcome {name.split(" ")[0]}</p>
            </div>
            <Link
              href="/about"
              className="hover:text-gray-400 transition bg-red-950 hover:bg-emerald-600 py-2 px-4 rounded"
            >
              About
            </Link>
            <Link
              href="/dashboard"
              className="hover:text-gray-400 transition bg-red-950 hover:bg-emerald-600 py-2 px-4 rounded"
            >
              Dashboard
            </Link>
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
              className="hover:bg-slate-950 py-1 px-4 rounded transition"
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
}
