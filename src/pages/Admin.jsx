import AddMovieForm from "../components/AddMovieForm";
import MinimizeListMovies from "../components/MinimizeListMovies";
import Navbar from "../components/Navbar";

import Helmet from "react-helmet";
import duckPng from "../assets/images/duck.png";
import axios from "axios";
import { useState } from "react";
export default function Admin() {
  const [movieList, setMovieList] = useState([]);
  const [easterEggHiddenOrVisible, setEasterEggHiddenOrVisible] =
    useState("hidden");

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      console.log("hit enter");
      if (easterEggHiddenOrVisible === "hidden") {
        setEasterEggHiddenOrVisible("visible");
      } else {
        setEasterEggHiddenOrVisible("hidden");
      }
    }
  }

  function getAllMovies() {
    try {
      axios
        .get("https://nodejsmovieserver-production.up.railway.app/allmovies")
        .then((res) => {
          setMovieList(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>MovieAPP | Admin</title>
      </Helmet>

      <Navbar />
      <div
        onKeyDown={handleKeyDown}
        className="flex justify-center flex-col items-center h-full max-lg:mt-44"
      >
        <div>
          <div className="mb-20">
            <MinimizeListMovies
              movieList={movieList}
              getAllMovies={getAllMovies}
            />
          </div>
          <div>
            <AddMovieForm getAllMovies={getAllMovies} />
          </div>
        </div>
      </div>

      <img
        src={duckPng}
        className={`animate-spin absolute w-24 right-32 top-32 ${easterEggHiddenOrVisible}`}
      />
    </>
  );
}
