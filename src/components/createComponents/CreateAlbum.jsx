import React, { useState } from "react";
import logo from "../../assets/main.svg";

export default function CreateAlbum() {
  const [loading, setLoading] = useState(true);

  return loading ? (
    <img
      src={logo}
      alt="spinning music logo"
      className="animate-spin aspect-square h-10 absolute top-[50vh]"
    />
  ) : (
    <></>
  );
}