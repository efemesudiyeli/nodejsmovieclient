import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className=" w-full h-20 bg-gradient-to-r backdrop-blur-3xl from-indigo-900/30 via-white/20  to-purple-950/10 flex flex-row justify-around items-center  text-gray-200 font-bold">
      <div className="italic font-extrabold text-xl">Movielist</div>

      <div>
        <ul className="list-none flex flex-row gap-4 text-center">
          <Link to={"/"}>
            <li className="hover:scale-105">Home</li>
          </Link>
          <Link to={"/admin"}>
            <li className="hover:scale-105">Admin</li>
          </Link>
        </ul>
      </div>

      <div>
        <ul className="list-none flex flex-row gap-4 text-center">
          <Link to={"/random"}>
            <li>Rastgele Film Önerisi</li>
          </Link>
        </ul>
      </div>
    </nav>
  );
}
