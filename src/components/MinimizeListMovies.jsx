/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";

import { AiFillDelete } from "react-icons/ai";
import { GrUpdate } from "react-icons/gr";
import UpdateMenu from "./UpdateMenu";

export default function MinimizeListMovies({ getAllMovies, movieList }) {
  // const [movieList, setMovieList] = useState([]);
  const [updateMenuStatus, setUpdateMenuStatus] = useState("hidden");
  const [showingItemID, setShowingItemID] = useState(null);

  const [placeholderName, setPlaceholderName] = useState("");
  const [placeholderDirector, setPlaceholderDirector] = useState("");
  const [placeholderImage, setPlaceholderImage] = useState("");

  useEffect(() => {
    getAllMovies();
  }, []);

  function deleteMovie(_id) {
    const data = {
      id: _id,
    };

    axios
      .post(
        "https://nodejsmovieserver-production.up.railway.app/deletemovie",
        data
      )
      .then(() => {
        getAllMovies();
      })
      .catch((error) => {
        console.error("POST isteği sırasında bir hata oluştu:", error);
        if (error.response) {
          console.log("Hata", error.response.data);
        }
      });
  }

  function updateMenuShow(_id) {
    updateMenuStatus === "hidden"
      ? setUpdateMenuStatus("visible")
      : setUpdateMenuStatus("hidden");

    axios
      .post("https://nodejsmovieserver-production.up.railway.app/findonebyid", {
        _id: _id,
      })
      .then((res) => {
        console.log(res.data[0].name);
        setPlaceholderName(res.data[0].name);
        setPlaceholderDirector(res.data[0].director);
        setPlaceholderImage(res.data[0].image);
        console.log(placeholderName, placeholderDirector, placeholderImage);
        getAllMovies();
      })
      .catch((error) => {
        console.log("Update Menu Show Error", error);
      });

    setShowingItemID(_id);
  }

  return (
    <div>
      <div className={updateMenuStatus}>
        <UpdateMenu
          setUpdateMenuStatus={setUpdateMenuStatus}
          showingItemID={showingItemID}
          placeholderName={placeholderName}
          placeholderDirector={placeholderDirector}
          placeholderImage={placeholderImage}
          getAllMovies={getAllMovies}
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
                <button
                  onClick={() => {
                    deleteMovie(movieItem._id);
                  }}
                >
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
