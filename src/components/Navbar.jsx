import { Link } from "react-router-dom";
import { color, motion } from "framer-motion";
import { FiBook, FiBookOpen, FiShuffle, FiPocket } from "react-icons/fi";
export default function Navbar() {
  return (
    <nav className="w-full h-20 mb-8 bg-gradient-to-r backdrop-blur-3xl from-indigo-900/30 via-white/20  to-purple-950/10 flex flex-row justify-around items-center  text-gray-200 font-bold">
      <Link to={"/"}>
        <div className="italic font-extrabold text-xl">Movielist</div>
      </Link>

      <div>
        <ul className="list-none flex flex-row gap-4 text-center ">
          <Link to={"/"}>
            <motion.li
              className="flex justify-center items-center gap-2 group/willwatch "
              whileHover={{
                y: -5,
                transition: { duration: 1, type: "spring", stiffness: "400" },
              }}
            >
              <FiBookOpen className="scale-125 group-hover/willwatch:text-yellow-400" />
              İzleyeceklerim
            </motion.li>
          </Link>
          <Link to={"/watched"}>
            <motion.li
              className="flex justify-center items-center gap-2 group/watched"
              whileHover={{
                y: -5,
                transition: { duration: 1, type: "spring", stiffness: "400" },
              }}
            >
              <FiBook className="scale-125 group-hover/watched:text-yellow-400" />
              İzlediklerim
            </motion.li>
          </Link>
          <Link to={"/random"}>
            <motion.li
              className="flex justify-center items-center gap-2 group/random"
              whileHover={{
                y: -5,
                transition: { duration: 1, type: "spring", stiffness: "400" },
              }}
            >
              <FiShuffle className="scale-125 group-hover/random:text-yellow-400" />
              Rastgele
            </motion.li>
          </Link>
        </ul>
      </div>

      <div>
        <ul className="list-none flex flex-row gap-4 text-center">
          <Link to={"/admin"}>
            <motion.li
              className="flex justify-center items-center gap-2 group/admin"
              whileHover={{
                y: -5,
                transition: { duration: 1, type: "spring", stiffness: "400" },
              }}
            >
              <FiPocket className="scale-105 group-hover/admin:text-yellow-400 " />
              Yönet
            </motion.li>
          </Link>
        </ul>
      </div>
    </nav>
  );
}
