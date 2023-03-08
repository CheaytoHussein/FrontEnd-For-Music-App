import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import cdLogo from "../assets/cd.svg";
import logo from "../assets/main.svg";

export default function SingleSong({ id }) {
  const [song, setSong] = useState({});
  const [loading, setLoading] = useState(true);
  const [failedFetch, setFailedFetch] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8080/api/songs/${id}`)
      .then((data) => data.json())
      .then((data) => setSong(data))
      .catch(() => setFailedFetch(true))
      .finally(() => setLoading(false));
  }, []);

  function handleArtists(song) {
    return song.artists.length == 0
      ? "unknown artist"
      : song.artists.join(", ");
  }
  function handleAlbum(song) {
    return song.album == null ? "no album" : song.album;
  }

  //this function takes the duration in seconds and returns a string that represents that duration in minutes
  function handleDuration(duration) {
    let minutes = ~~(duration / 60); //fastest way to do integer division in JavaScript
    let seconds = duration % 60;
    return `${minutes}:${(seconds < 10 ? "0" : "") + seconds}`;
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
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="w-screen h-screen flex flex-col lg:flex-row justify-center lg:justify-around gap-10 items-center"
    >
      <img
        src={song.cover != "" ? song.cover : cdLogo}
        alt="song cover image"
        className="aspect-square w-40 lg:w-60 "
      />
      <figcaption className="flex flex-col lg:gap-20 gap-10 items-center justify-around">
        <div className="flex flex-col lg:gap-5 gap-2">
          {[
            { text: "song name", variable: song.songName },
            { text: "artist(s)", variable: handleArtists(song) },
            { text: "album", variable: handleAlbum(song) },
            { text: "release date", variable: song.releaseDate },
            { text: "genre", variable: song.genre },
            { text: "duration", variable: handleDuration(song.duration) },
            { text: "plays", variable: song.plays + "000" },
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
        <a
          href={song.youtubeLink}
          target="_blank"
          className="bg-gradient-to-r from-purple-400 to-pink-600 text-2xl lg:text-4xl h-10 lg:h-20 w-40 lg:w-60 flex items-center justify-center border-transparent rounded-xl font-bold"
        >
          Play Song
        </a>
      </figcaption>
    </motion.section>
  );
}
