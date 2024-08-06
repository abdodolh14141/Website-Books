"use client";
import "../styles/globals.css";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <img
        src="https://www.wscubetech.com/blog/wp-content/uploads/2024/05/full-stack-developer-a-good-career.webp"
        alt="Full Stack Illustration"
        width={800}
        className="rounded-md"
      />
      <h1 className="mt-4 text-3xl font-semibold text-white font-bold">
        <em>Framework Next.js</em>
      </h1>
    </div>
  );
}
