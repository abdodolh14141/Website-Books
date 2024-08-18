import { Inter } from "next/font/google";
import "../styles/globals.css";
import Nav from "../components/Nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Courses Coding",
  description: "How To Learn Coding",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Nav />
        <main className="app">{children}</main>
      </body>
    </html>
  );
}
