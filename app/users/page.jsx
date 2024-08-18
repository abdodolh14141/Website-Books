"use client";

import React from "react";
import { useState, useEffect } from "react";

const User = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const dataJson = await res.json();
      setCards(dataJson);
    };
    fetchData();
  }, []);
  return (
    <div>
      <main>
        <div className="cards">
          <ul>
            {cards.map((user) => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default User;