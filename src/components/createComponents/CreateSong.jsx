import React, { useState } from "react";
import logo from "../../assets/main.svg";
import { motion } from "framer-motion";

export default function CreateSong() {
  const [loading, setLoading] = useState(false);
  const [unacceptable, setUnacceptable] = useState(false);
  const [obj, setObj] = useState({
    songName: "",
    album: null,
    artists: [],
    duration: 0,
    genre: "",
    date: "",
  });
  return loading ? (
    <img
      src={logo}
      alt="spinning music logo"
      className="animate-spin aspect-square h-10 absolute top-[50vh]"
    />
  ) : (
    <>
      <motion.form
        className="w-screen h-screen flex flex-col lg:flex-row items-center justify-around lg:gap-40"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
      >
        <div className="mt-20 flex felx-row justify-center items-center">
          <input type="file" className="w-max" />
        </div>
        <div className="flex flex-col items-center lg:items-end gap-10">
          {[
            {
              text: "Song Name",
              inputType: "text",
              placeholder: "no special character only",
              inputName: "name",
            },
            {
              text: "Album",
              inputType: "text",
              placeholder: "select album",
              inputName: "album",
            },
            {
              text: "Artist(s)",
              inputType: "text",
              placeholder: "select artist",
              inputName: "artists",
            },
            {
              text: "Duration in Seconds",
              inputType: "number",
              placeholder: "duration can't be 0",
              inputName: "duration",
            },
            {
              text: "Genre",
              inputType: "text",
              placeholder: "length between 2 and 10",
              inputName: "genre",
            },
          ].map((item, idx) => {
            return (
              <span
                className="w-max flex flex-col lg:flex-row justify-end items-center lg:gap-8 text-xl lg:text-4xl font-extrabold"
                key={idx}
              >
                <span className="text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                  {item.text}
                </span>
                <span className="w-max h-max pb-1 bg-gradient-to-r from-purple-400 to-pink-600">
                  <input
                    name={item.inputName}
                    type={item.inputType}
                    placeholder={item.placeholder}
                    onChange={(e) => handleFormFilling(e)}
                    className="appearance-none bg-neutral-900 focus:outline-none w-60 lg:w-[20vw] placeholder:text-sm"
                  />
                </span>
              </span>
            );
          })}
          <button
            className="text-2xl lg:text-4xl font-extrabold w-40 lg:w-60 h-10 lg:h-20 bg-gradient-to-r from-purple-400 to-pink-600 text-center rounded-xl"
            onClick={(e) => {
              e.preventDefault();
              handleSubmission();
            }}
          >
            Create
          </button>
        </div>
      </motion.form>
      {unacceptable && <motion.h2></motion.h2>}
    </>
  );
  function handleFormFilling(e) {
    switch (e.target.name) {
      case "name":
        if (e.target.value.length <= 30) {
          setObj((oldObj) => ({
            ...oldObj,
            songName: e.target.value,
          }));
        }
        break;
      case ("album", "artist"):
        break;
      case "duration":
        setObj((oldObj) => ({
          ...oldObj,
          duration: parseInt(e.target.value),
        }));
        break;
      case "genre":
        if (e.target.value.length <= 10) {
          setObj((oldObj) => ({
            ...oldObj,
            genre: e.target.value,
          }));
        }
        break;
    }
  }
  function handleSubmission() {
    console.log(obj);
  }
}
