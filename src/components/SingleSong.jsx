import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import cdLogo from "../assets/cd.svg";
import logo from "../assets/main.svg";

export default function SingleSong({ id }) {
  const [song, setSong] = useState({});
  const [loading, setLoading] = useState(true);
  const [failedFetch, setFailedFetch] = useState(false);
  console.log(id);
  useEffect(() => {
    fetch(`http://localhost:8080/api/songs/${id}`)
      .then((data) => data.json())
      .then((data) => setSong(data))
      .finally(() => setLoading(false))
      .catch(() =>setFailedFetch(true))
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
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="w-screen h-screen"
      >
        <img
          src={song.cover != "" ? song.cover : cdLogo}
          alt="song cover image"
          className="aspect-square w-60 mt-40"
        />
        <div>
          <h1>{song.songName}</h1>
        </div>
      </motion.section>
    );
}
