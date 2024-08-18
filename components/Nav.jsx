"use client"; // This directive ensures the component is rendered on the client side

import React, { useState, useEffect } from "react";
import style from "./Nav.module.css"; // Importing CSS module
import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession(); // Get current session state
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    // Fetch authentication providers when component mounts
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    fetchProviders();
  }, []);

  return (
    <nav className={style.navbar}>
      <div className={style.navbarLogo}>
        <Link href="/">
          <Image src="/images/logo.png" alt="logoHome" width={30} height={30} />
        </Link>
      </div>
      <ul className={style.navbarLinks}>
        {session ? (
          // If the user is logged in, show create post, profile, and sign out button
          <div>
            <Link href="/create-post">Create Post</Link>
            <Link href="/profile">Profile</Link>
            <button type="button" onClick={signOut}>
              Sign Out
            </button>
          </div>
        ) : (
          // If the user is not logged in, show sign in buttons for available providers
          providers &&
          Object.values(providers).map((provider) => (
            <button
              type="button"
              key={provider.name}
              onClick={() => signIn(provider.id)}
            >
              Sign In with {provider.name}
            </button>
          ))
        )}
      </ul>
    </nav>
  );
};

export default Nav;
