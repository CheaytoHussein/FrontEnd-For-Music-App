import React, { useEffect, useState } from "react";
import logo from "../assets/main.svg";
import defaultLogo from "../assets/guitar.svg";
const Song = ({ isMobile }) => {
  const [songData, setSongData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/songs")
      .then((data) => data.json())
      .then((data) => {
        setSongData(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function handleArtists(song) {
    return song.artists.length == 0 ? "unknown artist" : song.artists.join(", ");
  }
  function handleAlbum(song) {
    return song.album == null ? "no album" : song.album;
  }

  return loading ? (
    <img
      src={logo}
      alt="spinning music logo"
      className="animate-spin aspect-square h-10"
    />
  ) : (
    <section className="h-screen w-screen flex flex-col bg-neutral-900 justify-around items-center">
      <input
        type="text"
        placeholder="Search by song name"
        className="h-10 w-96 border-none border-solid rounded-xl text-center font-bold"
      />
      <div className="bg-neutral-900">
        {songData.map((item, idx) => {
          return (
            <figure key={idx} className="flex flex-row drop-shadow-2xl w-max border-2">
              <img src={item.cover == "" ? defaultLogo : item.cover} alt="cover image of the song" className="aspect-square h-10"/>
              <figcaption className="flex flex-row justify-around">
                <span>{item.songName}</span>
                <span>{handleArtists(item)}</span>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
};
export default Song;
