import React, { useEffect, useState } from "react";
import logo from "../../assets/main.svg";
import cdLogo from "../../assets/cd.svg";
import { motion } from "framer-motion";
import axios from "axios";

export default function SingleAlbum({ id }) {
  const [album, setAlbum] = useState({});
  const [loading, setLoading] = useState(true);
  const [failedFetch, setFailedFetch] = useState(false);
  useEffect(() => {
    console.log(getIdFromPath())
    if (id == 0) id = getIdFromPath();
    axios
      .get(`http://localhost:8080/api/albums/${id}`)
      .then((data) => setAlbum(data.data))
      .catch(() => setFailedFetch(true))
      .finally(() => setLoading(false));
  }, []);
  function handleArtists(album) {
    return album.albumArtists.length == 0
      ? "unknown artist(s)"
      : album.albumArtists.join(", ");
  }
  function getIdFromPath() {
    return parseInt(
      encodeURIComponent(window.location.pathname).replace(".","").split("/").at(-1).split("-").at(-1)
    );
    //cuts the path name by slashes, then takes the last element (name of the album + id), splits it and takes last element (id)
  }
  return loading ? (
    <img
      src={logo}
      alt="spinning music logo"
      className="animate-spin aspect-square h-10 absolute top-[50vh]"
    />
  ) : failedFetch ? (
    <motion.h2
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="text-2xl font-ultrabold text-pink-600 mt-40"
    >
      Failed to load , try refreshing the page
    </motion.h2>
  ) : (
    <motion.figure
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="w-screen h-screen flex flex-col lg:flex-row justify-center lg:justify-around gap-10 items-center"
    >
      <img
        src={album.cover != "" ? album.cover : cdLogo}
        alt="album cover image"
        className="aspect-square w-40 lg:w-60"
      />
      <figcaption className="flex flex-col lg:gap-20 gap-10 items-center justify-around">
        <div className="flex flex-col lg:gap-5 gap-2">
          {[
            { text: "album name", variable: album.albumName },
            { text: "artist(s)", variable: handleArtists(album) },
            { text: "tracks", variable: album.tracks },
            { text: "release date", variable: album.releaseDate },
            { text: "genre", variable: album.genre },
            { text: "duration", variable: album.duration + " minutes" },
            { text: "plays", variable: album.albumPlays },
          ].map((item, idx) => {
            return (
              <span
                className="flex flex-row justify-center items-center gap-8 text-xl lg:text-4xl font-extrabold"
                key={idx}
              >
                <span className="text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                  {item.text}
                </span>
                {item.variable}
              </span>
            );
          })}
        </div>
      </figcaption>
    </motion.figure>
  );
}
