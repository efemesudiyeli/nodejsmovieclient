import { useState, useEffect } from "react";
import axios from "axios";

export default function RandomMovieConfirm({
  getAllMovies,
  movieList,
  getRandomMovieNumber,
}) {
  const [randomMovie, setRandomMovie] = useState({
    _id: "",
    name: "",
    director: "",
    image: "",
  });

  useEffect(() => {
    showRandomMovie();
  }, []);

  function showRandomMovie() {
    const randomInt = getRandomMovieNumber();

    setRandomMovie({
      _id: movieList[randomInt]._id,
      name: movieList[randomInt].name,
      director: movieList[randomInt].director,
      image: movieList[randomInt].image,
    });
  }

  function addMovieToWatchedList(_id) {
    const data = {
      name: randomMovie.name.replace(
        randomMovie.name[0],
        randomMovie.name[0].toUpperCase()
      ),
      director: randomMovie.director.replace(
        randomMovie.director[0],
        randomMovie.director[0].toUpperCase()
      ),
      image: randomMovie.image,
    };
    axios
      .post(
        "https://nodejsmovieserver-production.up.railway.app/addmovietowatchedlist",
        data
      )
      .then(() => {
        console.log("added", data);

        axios
          .post(
            "https://nodejsmovieserver-production.up.railway.app/deletemovie",
            { id: _id }
          )
          .then(() => {
            console.log("deleted", _id);
          });
      });
  }

  return (
    <div className="flex flex-col w-[34rem]  justify-center items-center absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2  text-white">
      {/* Loading */}
      {movieList.length > 0 ? (
        <></>
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
      {/* Random Movie */}
      {movieList.length > 0 ? (
        <div className="bg-purple-900 w-full ">
          <div>
            <img src={randomMovie.image} alt="" />
          </div>
          <div>
            <div>{randomMovie.name}</div>
            <div>{randomMovie.director}</div>
          </div>
          <div className="flex justify-evenly gap-1">
            <button
              className="w-full p-5 bg-purple-600"
              onClick={() => showRandomMovie()}
            >
              Tekrar Seç
            </button>
            <button
              className="w-full p-5 bg-purple-600"
              onClick={() => {
                addMovieToWatchedList(randomMovie._id);
                showRandomMovie();
              }}
            >
              İzleyeceğim
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
