import React, { useEffect, useState } from "react";
import logo from "../assets/main.svg";
import cdLogo from "../assets/cd.svg";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Albums({ setId }) {
  const [albumData, setAlbumData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [failedFetch, setFailedFetch] = useState(false);

  useEffect(() => {
    document.title = "Music-App - Albums";
    axios
      .get("http://localhost:8080/api/albums")
      .then((data) => setAlbumData(data.data))
      .catch(() => setFailedFetch(true))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function handleArtists(album) {
    return album.albumArtists.length == 0
      ? "unknown artist(s)"
      : album.albumArtists.join(", ");
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
        placeholder="Search by album name"
        className="sticky top-[10vh] h-10 w-80 lg:w-96 border-none border-solid rounded-xl text-center font-bold mt-40"
      />
      <div className="mt-20 flex flex-col gap-20">
        {albumData.map((item, idx) => {
          return (
            <Link
              key={idx}
              to={
                "/Albums/" +
                item.albumName.replace(".","").split(" ").join("") +
                "-" +
                item.albumId
              }
              onClick={() => setId(item.albumId)}
            >
              <motion.figure
                initial={{ x: 100 }}
                whileInView={{ x: 0 }}
                className="flex flex-col lg:flex-row justify-around items-center h-[70vh] w-[70vw] lg:w-[50vw] lg:h-[20vh] border-transparent rounded-2xl shadow-3xl"
              >
                <img
                  src={item.cover == "" ? cdLogo : item.cover}
                  alt="cover image of the song"
                  className="aspect-square h-20"
                />
                <figcaption className="flex flex-col lg:flex-row lg:gap-10">
                  {[
                    { text: "album name", variable: item.albumName },
                    { text: "artist(s)", variable: handleArtists(item) },
                  ].map((album, idx) => {
                    return (
                      <span
                        key={idx}
                        className="flex flex-col justify-center items-center gap-2 font-extrabold"
                      >
                        <span className="lg:text-xl text-md text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                          {album.text}
                        </span>
                        {album.variable}
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
}
