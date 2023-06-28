/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState, useEffect } from "react";

export default function ListMovies() {
  const [movieList, setMovieList] = useState([]);
  const noImagePNG =
    "https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg";

  useEffect(() => {
    try {
      axios
        .get("https://nodejsmovieserver-production.up.railway.app/allmovies")
        .then((res) => {
          console.log(res.data);
          setMovieList(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div className="grid grid-cols-3 grid-flow-row gap-4 place-items-center">
      {movieList.map((movieItem) => (
        <div className="border w-80 h-96 relative" key={movieItem._id}>
          <div className="z-50 absolute bottom-20 left-1/2 -translate-x-1/2  p-5 bg-black">
            <h2>{movieItem.name}</h2>
            <h3>{movieItem.director}</h3>
          </div>
          <img
            className="object-cover absolute bottom-0 w-full h-full -z-10"
            src={
              movieItem.image !== null && movieItem.image.length > 2
                ? movieItem.image
                : noImagePNG
            }
            alt="movie-banner"
          />
        </div>
      ))}
    </div>
  );
}
