import React, { useEffect, useState } from "react";
import logo from "../assets/main.svg";
import cdLogo from "../assets/cd.svg";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";

const Song = ({ setId }) => {
  const [songData, setSongData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [failedFetch, setFailedFetch] = useState(false);
  useEffect(() => {
    document.title = "Music-App - Songs";
    axios
      .get("http://localhost:8080/api/songs")
      .then((data) => setSongData(data.data))
      .catch(() => setFailedFetch(true))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function handleArtists(song) {
    return song.artists.length == 0
      ? "unknown artist"
      : song.artists.join(", ");
  }
  function handleAlbum(song) {
    return song.album == null ? "no album" : song.album;
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
    <section className="flex flex-col bg-neutral-900 justify-around items-center">
      <input
        type="text"
        placeholder="Search by song name"
        className="sticky top-[10vh] h-10 w-80 lg:w-96 border-none border-solid rounded-xl text-center font-bold mt-40"
      />
      <div className="mt-20 flex flex-col gap-20">
        {songData.map((item, idx) => {
          return (
            <Link
              to={
                "/Songs/" +
                item.songName.replace(".", "").split(" ").join("") +
                "-" +
                item.songId
              }
              key={idx}
              onClick={() => setId(item.songId)}
            >
              <motion.figure
                initial={{ x: 100 }}
                whileInView={{ x: 0 }}
                className="flex flex-col lg:flex-row justify-evenly items-center w-[70vw] h-[70vh] lg:w-[50vw] lg:h-[20vh] border-transparent rounded-2xl shadow-3xl"
              >
                <img
                  src={item.cover == "" ? cdLogo : item.cover}
                  alt="cover image of the song"
                  className="aspect-square h-20"
                />
                <figcaption className="flex flex-col lg:flex-row lg:gap-20">
                  {[
                    { text: "song name", variable: item.songName },
                    { text: "artist(s)", variable: handleArtists(item) },
                    { text: "album", variable: handleAlbum(item) },
                  ].map((element, idx) => {
                    return (
                      <span
                        className="flex flex-col justify-center items-center gap-2 font-extrabold"
                        key={idx}
                      >
                        <span className="lg:text-xl text-md text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                          {element.text}
                        </span>
                        {element.variable}
                      </span>
                    );
                  })}
                </figcaption>
              </motion.figure>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
export default Song;
