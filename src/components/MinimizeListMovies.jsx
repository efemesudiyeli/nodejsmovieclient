/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";

import { AiFillDelete } from "react-icons/ai";
import { GrUpdate } from "react-icons/gr";
import UpdateMenu from "./UpdateMenu";

export default function MinimizeListMovies() {
  const [movieList, setMovieList] = useState([]);
  const [updateMenuStatus, setUpdateMenuStatus] = useState("hidden");
  const [showingItemID, setShowingItemID] = useState(null);

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
  }, []);

  const deleteMovie = (_id) => {
    const data = {
      id: _id,
    };
    try {
      axios
        .post(
          "https://nodejsmovieserver-production.up.railway.app/deletemovie",
          data
        )
        .then(() => {
          console.log(`Request posted for delete this id: ${data}`);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const updateMenuShow = (_id) => {
    updateMenuStatus == "hidden"
      ? setUpdateMenuStatus("visible")
      : setUpdateMenuStatus("hidden");

    setShowingItemID(_id);
  };

  return (
    <div>
      <div className={updateMenuStatus}>
        <UpdateMenu
          setUpdateMenuStatus={setUpdateMenuStatus}
          showingItemID={showingItemID}
        />
      </div>

      <table className="table table-auto border-collapse border border-slate-500">
        <caption className="caption-top">Table 1: All movies.</caption>
        <thead>
          <tr>
            <th className="border border-slate-600">ID</th>
            <th className="border border-slate-600">Name</th>
            <th className="border border-slate-600">Director</th>
            <th className="border border-slate-600">createdAt</th>
            <th className="border border-slate-600">updatedAt</th>
            <th className="border border-slate-600">Buttons</th>
          </tr>
        </thead>
        <tbody>
          {movieList.map((movieItem) => (
            <tr key={movieItem._id}>
              <td className="border border-slate-700 ">{movieItem._id}</td>
              <td className="border border-slate-700 ">{movieItem.name}</td>
              <td className="border border-slate-700 ">{movieItem.director}</td>
              <td className="border border-slate-700 ">
                {movieItem.createdAt}
              </td>
              <td className="border border-slate-700 ">
                {movieItem.updatedAt}
              </td>
              <td className="flex justify-center gap-3 border border-slate-700 ">
                <button>
                  {<GrUpdate onClick={() => updateMenuShow(movieItem._id)} />}
                </button>
                <button onClick={() => deleteMovie(movieItem._id)}>
                  <AiFillDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
