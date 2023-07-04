/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
export default function ListMovies() {
  const [movieList, setMovieList] = useState([]);
  const noImagePNG =
    "https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg";

  useEffect(() => {
    try {
      axios
        .get("https://nodejsmovieserver-production.up.railway.app/allmovies")
        .then((res) => {
          setMovieList(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 90, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <motion.ul
      variants={container}
      initial="hidden"
      animate="visible"
      className="flex basis-1/6 flex-row flex-wrap justify-center items-center gap-16 max-lg:pb-20"
    >
      {movieList.length > 0 ? (
        movieList.map((movieItem) => (
          <motion.li
            variants={item}
            className="border w-80 h-96 relative"
            key={movieItem._id}
          >
            <div className="z-50 absolute bottom-20 left-1/2 -translate-x-1/2  w-full py-5 backdrop-blur-3xl border-y-2">
              <h2 className="font-extrabold">{movieItem.name}</h2>
              <h3 className="font-light">{movieItem.director}</h3>
            </div>
            <img
              className="object-cover absolute bottom-0 w-full h-full"
              src={
                movieItem.image !== null && movieItem.image.length > 2
                  ? movieItem.image
                  : noImagePNG
              }
              alt="movie-banner"
            />
          </motion.li>
        ))
      ) : (
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-8 h-8 mr-2 text-black animate-spin dark:text-black fill-white"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      )}
    </motion.ul>
  );
}
