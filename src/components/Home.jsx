import React from "react";
import headphones from "../assets/headphones.svg";
import { motion } from "framer-motion";
export default function Home() {
  document.title = "Music App - Home"
  return (
    <motion.main
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="h-screen w-screen flex flex-col lg:flex-row lg:justify-around justify-evenly items-center"
    >
      <span className="flex flex-col ">
        <h1 className="flex flex-col font-extrabold lg:text-8xl text-4xl text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          <span>WELCOME</span>
          <span>TO THE</span>
          <span>MUSIC WORLD.</span>
        </h1>
        <h2></h2>
      </span>
      <img
        className="aspect-square lg:h-80 h-40 animate-spin-slow"
        src={headphones}
        alt=""
      />
    </motion.main>
  );
}
