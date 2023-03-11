import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/main.svg";
import { motion } from "framer-motion";

export default function Nav({ currentComponent, setCurrentComponent }) {
  const navLinks = ["Songs", "Albums", "Artists"];
  const [createOpen, setCreateOpen] = useState(false);
  return (
    <>
      <nav className="w-screen h-20 bg-neutral-900 flex flex-col lg:flex-row justify-between items-center fixed top-0 shadow-3xl z-10">
        <Link to="/">
          <img
            className="lg:ml-20 aspect-square w-6 lg:w-12 cursor-pointer"
            src={logo}
            alt="Logo of the music app"
            onClick={() => {
              setCurrentComponent("Home");
              setCreateOpen(false)
            }}
          />
        </Link>
        <ul className="inline-flex gap-10 sm:gap-20 lg:mr-20 justify-center w-max items-center text-white text-lg lg:text-5xl font-bold">
          {navLinks.map((item, idx) => {
            return (
              <li
                key={idx}
                onClick={() => {
                  setCurrentComponent(item);
                  setCreateOpen(false);
                }}
                className={
                  currentComponent == item
                    ? "transition color cursor-pointer text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
                    : "cursor-pointer"
                }
              >
                <Link to={"/" + item}>{item}</Link>
              </li>
            );
          })}
          <li
            className="cursor-pointer"
            onClick={() => setCreateOpen((oldState) => !oldState)}
          >
            Create +
          </li>
        </ul>
      </nav>
      {createOpen && (
        <ul className="absolute right-20 top-20 w-60 h-40 bg-zinc-600 z-10 text-center text-xl flex flex-col justify-around font-bold rounded-xl">
          {navLinks.map((item, idx) => {
            return (
              <motion.li
                key={idx}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="cursor-pointer hover:text-purple-400 transition-colors"
              >
                {item}
              </motion.li>
            );
          })}
        </ul>
      )}
    </>
  );
}
