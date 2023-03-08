import React, { useEffect, useState } from "react";
import logo from "../assets/main.svg";
import cdLogo from "../assets/cd.svg";
import { motion } from "framer-motion";

export default function Artists() {
  const [artistData, setArtistData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Music-App - Artists";
    fetch("http://localhost:8080/api/artists")
      .then((data) => data.json())
      .then((data) => {
        setArtistData(data);
        console.log(data);
      })
      .finally(() => setLoading(false));
  }, []);

  return loading ? (
    <img
      src={logo}
      alt="spinning music logo"
      className="animate-spin aspect-square h-10 absolute top-[50vh]"
    />
  ) : (
    <section className="flex flex-col bg-neutral-900 justify-around items-center">
      <input
        type="text"
        placeholder="Search by album name"
        className="sticky top-20 h-10 w-80 lg:w-96 border-none border-solid rounded-xl text-center font-bold mt-40"
      />
      <div className="mt-20 flex flex-col gap-20">
        {artistData.map((item, idx) => {
          return (
            <motion.figure
              initial={{ x: 100 }}
              whileInView={{ x: 0 }}
              // style={{
              //   height: item.description.length > 320 ? "50vh" : "30vh",
              // }}
              key={idx}
              className="flex flex-col lg:flex-row justify-around items-center h-[70vh] w-[70vw] lg:w-[50vw] lg:h-[20vh] border-transparent rounded-2xl shadow-3xl"
            >
              <img
                src={item.cover == "" ? cdLogo : item.cover}
                alt="cover image of the song"
                className="aspect-square h-20"
              />
              <figcaption className="flex flex-col lg:flex-row lg:gap-20">
                <div>
                  <span className="flex flex-row justify-center items-center gap-2 font-extrabold">
                    <span className="lg:text-xl text-md text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                      artist name
                    </span>
                    {item.artistName}
                  </span>
                  <span className="flex flex-row justify-center items-center gap-2 font-extrabold">
                    <span className="font-extrabold lg:text-xl text-md text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                      albums
                    </span>
                    {item.albumCount}
                  </span>
                </div>
                <div>
                  <span className="flex flex-row justify-center items-center gap-2 font-extrabold">
                    <span className="lg:text-xl text-md text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                      genre
                    </span>
                    {item.genre}
                  </span>
                  <span className="flex flex-row justify-center items-center gap-2 font-extrabold">
                    <span className="lg:text-xl text-md text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                      songs
                    </span>
                    {item.songCount}
                  </span>
                </div>
              </figcaption>
              {/* <h2 className="w-[70%] text-center ml-auto mr-auto font-bold leading-7">
                {item.description}
              </h2> */}
            </motion.figure>
          );
        })}
      </div>
    </section>
  );
}
