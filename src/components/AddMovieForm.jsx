import { useState } from "react";
import axios from "axios";

export default function AddMovieForm() {
  const [movieName, setMovieName] = useState(null);
  const [directorName, setDirectorName] = useState(null);
  const [imageLink, setImageLink] = useState(null);
  // Post Movie after submit
  const submitFunc = () => {
    const data = {
      name: movieName,
      director: directorName,
      image: imageLink,
    };

    axios
      .post(
        "https://nodejsmovieserver-production.up.railway.app/addmovie",
        data
      )
      .then(() => {
        console.log("Posted");
      });
  };
  return (
    <form className="flex flex-col items-center justify-center ">
      <label htmlFor="_moviename" className="my-2 font-bold w-full ">
        Film
      </label>
      <input
        className="w-full text-center text-xl py-2"
        type="text"
        id="_moviename"
        placeholder="Avatar"
        name="name"
        onChange={(e) => {
          setMovieName(e.target.value);
        }}
      />
      <label htmlFor="_moviedirector" className="my-2 font-bold w-full">
        Yönetmen
      </label>
      <input
        className="w-full text-center text-xl py-2"
        type="text"
        id="_moviedirector"
        placeholder="James Cameron"
        name="director"
        onChange={(e) => {
          setDirectorName(e.target.value);
        }}
      />
      <label htmlFor="_movieimg" className="my-2 font-bold w-full">
        Resim
      </label>
      <input
        className="w-full text-center text-xl py-2"
        type="text"
        id="_movieimg"
        placeholder="https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_.jpg"
        name="image"
        onChange={(e) => {
          setImageLink(e.target.value);
        }}
      />

      <button className="w-full" type="button" onClick={() => submitFunc()}>
        ONAYLA
      </button>
    </form>
  );
}
