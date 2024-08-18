import React from "react";

const EndNav = () => {
  return (
    <div className="bg-slate-700 p-5 w-full mt-auto">
      <div className="container mx-auto flex justify-center items-center space-x-8">
        <a
          href="https://www.instagram.com/just_dolh/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-400 transition duration-300"
        >
          Instagram
        </a>
        <a
          href="https://github.com/abdodolh14141"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-400 transition duration-300"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/abdo-adel-soliman-94665124a/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-400 transition duration-300"
        >
          LinkedIn
        </a>
      </div>
    </div>
  );
};

export default EndNav;
