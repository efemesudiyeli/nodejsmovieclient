import { useEffect } from "react";
import RandomMovieDraw from "../components/RandomMovieDraw";
import Navbar from "../components/Navbar";

export default function Random({ getAllMovies, movieList }) {
  useEffect(() => {
    getAllMovies();
  }, []);

  return (
    <div>
      <Navbar />

      <RandomMovieDraw getAllMovies={getAllMovies} movieList={movieList} />
    </div>
  );
}
