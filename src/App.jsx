/* eslint-disable no-unused-vars */
import "./App.css";
import axios from "axios";
import { useState } from "react";

function App() {
  const [movieName, setMovieName] = useState(null);
  const [directorName, setDirectorName] = useState(null);
  const [imageLink, setImageLink] = useState(null);

  axios
    .get("https://nodejsmovieserver-production.up.railway.app/")
    .then((res) => {
      console.log(
        `${res.status + res.statusText} | *DATA CAN BE REACHABLE FROM API*`
      );
    })
    .catch((err) => {
      console.log(`ERROR: ${err}`);
    });

  const submitFunc = () => {
    const data = {
      name: movieName,
      director: directorName,
      image: imageLink,
    };

    axios
      .post("https://nodejsmovieserver-production.up.railway.app/movie", data)
      .then(() => {
        console.log(data, JSON.stringify(data));
        console.log("posted");
      });
  };

  return (
    <>
      <div>Merhaba Client</div>

      <form>
        <input
          type="text"
          placeholder="name"
          name="name"
          onChange={(e) => {
            setMovieName(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="director name"
          name="director"
          onChange={(e) => {
            setDirectorName(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="imagelink"
          name="image"
          onChange={(e) => {
            setImageLink(e.target.value);
          }}
        />

        <button type="button" onClick={() => submitFunc()}>
          Submit
        </button>
      </form>
    </>
  );
}

export default App;
