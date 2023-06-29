/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";

export default function UpdateMenu({
  setUpdateMenuStatus,
  showingItemID,
  placeholderName,
  placeholderDirector,
  placeholderImage,
  getAllMovies,
}) {
  const [movieName, setMovieName] = useState();
  const [directorName, setDirectorName] = useState();
  const [imageLink, setImageLink] = useState();

  useEffect(() => {
    setMovieName(placeholderName);
    setDirectorName(placeholderDirector);
    setImageLink(placeholderImage);
  }, [placeholderName, placeholderDirector, placeholderImage]);

  const updateMovie = (_id) => {
    try {
      const data = {
        id: _id,
        name: movieName,
        director: directorName,
        image: imageLink,
      };

      axios
        .post(
          "https://nodejsmovieserver-production.up.railway.app/updatemovie",
          data
        )
        .then(() => {
          console.log(
            `Request posted for update this id: ${JSON.stringify(data.id)} `
          );
          getAllMovies();
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="w-96 p-5 border absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 backdrop-blur-md">
        <form className="flex flex-col items-center justify-center h-full ">
          <label>{showingItemID}</label>
          <label
            htmlFor="_moviename"
            className="my-2 font-bold w-full bg-slate-950 "
          >
            Film
          </label>
          <input
            className="w-full text-center text-xl py-2"
            type="text"
            id="_moviename"
            placeholder="Avatar"
            defaultValue={placeholderName}
            name="name"
            onChange={(e) => {
              setMovieName(e.target.value);
            }}
          />
          <label
            htmlFor="_moviedirector"
            className="my-2 font-bold w-full bg-slate-950"
          >
            Yönetmen
          </label>
          <input
            className="w-full text-center text-xl py-2"
            type="text"
            id="_moviedirector"
            placeholder="James Cameron"
            defaultValue={placeholderDirector}
            name="director"
            onChange={(e) => {
              setDirectorName(e.target.value);
            }}
          />
          <label
            htmlFor="_movieimg"
            className="my-2 font-bold w-full bg-slate-950"
          >
            Resim
          </label>
          <input
            className="w-full text-center text-xl py-2"
            type="text"
            id="_movieimg"
            placeholder="https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_.jpg"
            defaultValue={placeholderImage}
            name="image"
            onChange={(e) => {
              setImageLink(e.target.value);
            }}
          />

          <button
            className="w-full bg-slate-950"
            type="button"
            onClick={() => {
              updateMovie(showingItemID);
              setUpdateMenuStatus("hidden");
            }}
          >
            ONAYLA
          </button>
        </form>
      </div>
    </div>
  );
}
