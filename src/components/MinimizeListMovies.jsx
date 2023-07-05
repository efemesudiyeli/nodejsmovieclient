/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";

import { AiFillDelete } from "react-icons/ai";
import { GrUpdate } from "react-icons/gr";
import UpdateMenu from "./UpdateMenu";

import { motion } from "framer-motion";

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

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        // delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="flex justify-center items-center">
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

        <motion.table
          variants={container}
          initial="hidden"
          animate="visible"
          className="table lg:text-xl "
        >
          <thead className="bg-indigo-950">
            <tr className="text-center">
              {window.screen.width < 1024 ? (
                <></>
              ) : (
                <th className="p-5 rounded-tl-lg">ID</th>
              )}
              <th className="py-5">Film</th>
              <th className="py-5">Yönetmen</th>
              {window.screen.width < 1024 ? (
                <></>
              ) : (
                <>
                  <th className="py-5">Oluşturma</th>
                  <th className="py-5">Güncelleme</th>
                </>
              )}

              <th className="p-5 rounded-tr-lg">Eylemler</th>
            </tr>
          </thead>

          <tbody className="bg-white/20 backdrop-blur-2xl text-black text-left lg:text-2xl text-sm">
            {movieList.map((movieItem) => (
              <motion.tr
                variants={item}
                className="odd:bg-purple-400/20"
                key={movieItem._id}
              >
                {window.screen.width < 1024 ? (
                  <></>
                ) : (
                  <td className="p-2">
                    {movieItem._id.slice(
                      movieItem._id.length - 6,
                      movieItem._id.length
                    )}
                  </td>
                )}
                <td className="p-2">{movieItem.name}</td>
                <td className="p-2">{movieItem.director}</td>
                {window.screen.width < 1024 ? (
                  <></>
                ) : (
                  <>
                    <td className="p-2">
                      {new Date(movieItem.createdAt).toLocaleString("tr-TR")}
                    </td>
                    <td className="p-2">
                      {new Date(movieItem.updatedAt).toLocaleString("tr-TR")}
                    </td>
                  </>
                )}
                <td className="p-2 flex justify-end items-center gap-3 text-2xl text-right">
                  <button className="">
                    {
                      <GrUpdate
                        className="hover:scale-125 transition-all"
                        onClick={() => updateMenuShow(movieItem._id)}
                      />
                    }
                  </button>
                  <button
                    className="text-3xl"
                    onClick={() => {
                      deleteMovie(movieItem._id);
                    }}
                  >
                    <AiFillDelete className="hover:scale-125 transition-all" />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </motion.table>
      </div>
    </div>
  );
}
