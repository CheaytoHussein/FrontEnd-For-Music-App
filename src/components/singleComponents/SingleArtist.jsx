import React, { useEffect, useState } from "react";
import logo from "../../assets/main.svg";
import cdLogo from "../../assets/cd.svg";
import { motion } from "framer-motion";

export default function SingleArtist({ id }) {
  const [artist, setArtist] = useState({});
  const [loading, setLoading] = useState(true);
  const [failedFetch, setFailedFetch] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8080/api/artists/${id}`)
      .then((data) => data.json())
      .then((data) => setArtist(data))
      .finally(() => setLoading(false))
      .catch(() => setFailedFetch(true));
  }, []);

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
      className="w-screen h-screen flex flex-col justify-evenly items-center"
    >
      <div className="flex flex-col lg:flex-row justify-around w-screen">
        <img
          src={artist.cover != "" ? artist.cover : cdLogo}
          alt="cover image of the artist"
          className="aspect-square w-40 lg:w-60"
        />
        <figcaption>
          {[
            { text: "artist name", variable: artist.artistName },
            { text: "songs", variable: artist.songCount },
            { text: "albums", variable: artist.albumCount },
            { text: "genre", variable: artist.genre },
            { text: "plays", variable: artist.plays },
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
        </figcaption>
      </div>
      <div className="flex flex-col w-[50vw] items-center text-center gap-5">
        <span className="text-xl lg:text-4xl w-max font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          description
        </span>
        <span className="text-2xl ">{artist.description}</span>
      </div>
    </motion.figure>
  );
}
