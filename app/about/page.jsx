"use client";

export default function About() {
  return (
    <div className="max-w-6xl mx-auto p-6 opacity-90">
      <div className="border-2 border-sky-500 p-6 flex flex-col md:flex-row items-center gap-6 bg-white shadow-lg rounded-lg">
        <div className="text-lg text-gray-700 flex-1">
          <p>
            <em>
              I am <span className="font-bold">Abdo Adel Soliman</span>. I built
              this website using:
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
          alt="Photo of Next.js"
          className="w-full md:w-1/2 rounded-lg"
        />
        <div className="flex flex-col items-center space-y-2 md:space-y-0 md:space-x-4 mt-4 md:mt-0">
          <a
            href="https://github.com/abdodolh14141"
            className="text-sky-500 hover:text-sky-700"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/abdo-adel-soliman-94665124a/"
            className="text-sky-500 hover:text-sky-700"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}
