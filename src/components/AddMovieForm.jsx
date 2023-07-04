/* eslint-disable react/prop-types */
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function AddMovieForm({ getAllMovies }) {
  const [movieName, setMovieName] = useState("");
  const [directorName, setDirectorName] = useState("");
  const [imageLink, setImageLink] = useState("");

  const [addedAlertStatus, setAddedAlertStatus] = useState("hidden");
  // Post Movie after submit

  const addMovieButton = useRef(null);
  const movieNameInput = useRef(null);
  const directorNameInput = useRef(null);
  const imageLinkInput = useRef(null);

  useEffect(() => {
    if (movieName.length < 1) {
      addMovieButton.current.setAttribute("disabled", "");
    } else {
      addMovieButton.current.removeAttribute("disabled");
    }
  }, [movieName]);

  function sendAddedAlert() {
    setAddedAlertStatus("visible");
    setTimeout(() => {
      setAddedAlertStatus("hidden");
    }, 3000);
  }

  const addMovie = () => {
    let directorNameFormatted;
    if (directorName) {
      directorNameFormatted = directorName.replace(
        directorName[0],
        directorName[0].toUpperCase()
      );
    } else {
      directorNameFormatted = directorName;
    }

    const data = {
      name: movieName.replace(movieName[0], movieName[0].toUpperCase()),
      director: directorNameFormatted,
      image: imageLink,
    };

    axios
      .post(
        "https://nodejsmovieserver-production.up.railway.app/addmovie",
        data
      )
      .then(() => {
        getAllMovies();
        console.log("Added");
        sendAddedAlert();
        clearInputValues();
      });
  };

  function clearInputValues() {
    movieNameInput.current.value = "";
    directorNameInput.current.value = "";
    imageLinkInput.current.value = "";
  }

  return (
    <motion.form
      initial={{ opacity: 0, translateY: 900 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "spring", stiffness: 35 }}
      className="flex flex-col items-center justify-center w-full "
    >
      <label htmlFor="_moviename" className="my-2 font-bold w-full ">
        Film
      </label>
      <input
        ref={movieNameInput}
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
        ref={directorNameInput}
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
        ref={imageLinkInput}
        className="w-full text-center text-xl py-2"
        type="text"
        id="_movieimg"
        placeholder="https://örnekresim.com/avatar.jpg"
        name="image"
        onChange={(e) => {
          setImageLink(e.target.value);
        }}
      />

      <button
        ref={addMovieButton}
        className="w-full bg-slate-900 mt-3 p-2 transition-all hover:scale-105 duration-200 disabled:hover:scale-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl"
        type="button"
        onClick={() => addMovie()}
      >
        ONAYLA
      </button>

      <div
        className={`w-full border mt-3 p-2 bg-green-500 font-bold transition-all animate-fadein  ${addedAlertStatus}`}
      >
        Added Successfully
      </div>
    </motion.form>
  );
}
