import React, { useState } from "react";
import logo from "../../assets/main.svg";

export default function CreateSong() {
  const [loading, setLoading] = useState(false);

  return loading ? (
    <img
      src={logo}
      alt="spinning music logo"
      className="animate-spin aspect-square h-10 absolute top-[50vh]"
    />
  ) : (
    <form className="w-screen h-screen flex items-center">
      <label>
        Song Name :
        <input type="text" />
      </label>
      <label>
        Album : 
        <input type="text" />
      </label>
      <label>
        Duration in Seconds: 
        <input type="text" />
      </label>
      <label>
        Genre : 
        <input type="text" />
      </label>
      <label>
        Release Date :
        <input type="text" placeholder="DD-MM-YY"/>
      </label>
    </form>
  );
}
