import Link from "next/link";
import "../styles/page_module.css";

export default function Home() {
  return (
    <>
      <section>
        <h1 className="title">Learn Web Desgin</h1> <br />
        <div className="middle">
          <img
            className="img_web"
            src="https://99designs-blog.imgix.net/blog/wp-content/uploads/2022/01/104228210.jpg?auto=format&q=60&fit=max&w=930"
            alt="image web design"
          />
          <p>Do You Want To Know How To Learn</p>
        </div>
        <br />
        <div className="cards">
          <Link href={"/users"}>Show Users</Link>
        </div>
      </section>
    </>
  );
}
