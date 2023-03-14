import React, { useState } from "react";
import logo from "../../assets/main.svg";
import { motion } from "framer-motion";

export default function CreateSong() {
  const [loading, setLoading] = useState(false);

  return loading ? (
    <img
      src={logo}
      alt="spinning music logo"
      className="animate-spin aspect-square h-10 absolute top-[50vh]"
    />
  ) : (
    <motion.form
      className="w-screen h-screen flex flex-row items-center justify-around gap-40"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
    >
      <div>
        <input type="file" />
      </div>
      <div className="flex flex-col gap-10">
        {[
          { text: "Song Name ", inputType: "text" },
          { text: "Album", inputType: "text" },
          { text: "Artist", inputType: "text" },
          { text: "Duration in Seconds", inputType: "number" },
          { text: "Genre", inputType: "text" },
        ].map((item, idx) => {
          return (
            <span
              className="flex flex-row justify-end items-center gap-8 text-xl lg:text-4xl font-extrabold"
              key={idx}
            >
              <span className="text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                {item.text}
              </span>
              <span className="w-max h-max pb-1 bg-gradient-to-r from-purple-400 to-pink-600">
                <input
                  type={item.inputType}
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
