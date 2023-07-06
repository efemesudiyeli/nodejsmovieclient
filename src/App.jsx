/* eslint-disable no-unused-vars */
import "./App.css";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
// pages

import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Random from "./pages/Random";

import WatchedMovies from "./pages/WatchedMovies";

function App() {
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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/admin"
          element={<Admin getAllMovies={getAllMovies} movieList={movieList} />}
        />
        <Route
          path="/random"
          element={<Random getAllMovies={getAllMovies} movieList={movieList} />}
        />
        <Route path="/watched" element={<WatchedMovies />} />
      </Routes>
    </>
  );
}

export default App;
