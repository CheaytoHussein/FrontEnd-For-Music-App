import { motion } from "framer-motion";
import React, { useState } from "react";
import logo from "../../assets/main.svg";

export default function CreateAlbum() {
  const [loading, setLoading] = useState(false);

  return loading ? (
    <img
      src={logo}
      alt="spinning music logo"
      className="animate-spin aspect-square h-10 absolute top-[50vh]"
    />
  ) : (
    <motion.form
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="w-screen h-screen flex flex-row items-center justify-around gap-40"
    >
      <div>
        <input type="file"/>
      </div>
      <div className="flex flex-col gap-10">
        {["Album Name", "Artist(s)", "Songs", "Genre"].map((item, idx) => {
          return (
            <span
              className="flex flex-row justify-end items-center gap-8 text-xl lg:text-4xl font-extrabold"
              key={idx}
            >
              <span className="text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                {item}
              </span>
              <span className="w-max h-max pb-1 bg-gradient-to-r from-purple-400 to-pink-600">
                <input
                  type="text"
                  className="appearance-none bg-neutral-900 focus:outline-none w-[20vw] "
                />
              </span>
            </span>
          );
        })}
      </div>
    </motion.form>
  );
}
