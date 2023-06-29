import AddMovieForm from "../components/AddMovieForm";
import MinimizeListMovies from "../components/MinimizeListMovies";
import Navbar from "../components/Navbar";

import Helmet from "react-helmet";

import axios from "axios";
import { useState } from "react";
export default function Admin() {
  const [movieList, setMovieList] = useState([]);
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
      <div className="flex justify-center flex-col items-center h-full">
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
    </>
  );
}
