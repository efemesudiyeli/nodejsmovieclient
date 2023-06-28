import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <nav className="w-full h-20 bg-gray-900 flex justify-center items-center">
      <ul className="list-none flex flex-row gap-4 text-center">
        <li className="p-5 bg-black cursor-pointer hover:scale-105">
          <Link to={"/"}>Home</Link>
        </li>
        <li className="p-5 bg-black cursor-pointer hover:scale-105">
          {" "}
          <Link to={"/admin"}>Admin</Link>
        </li>
      </ul>
    </nav>
  );
}
