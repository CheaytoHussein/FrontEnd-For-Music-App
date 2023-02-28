import React, { useEffect, useState } from "react";

export default function Albums() {
    const [albumData, setAlbumData] = useState([])
    useEffect(() => {
    fetch("http://localhost:8080/api/albums")
      .then((data) => data.json())
      .then((jsonData) => setAlbumData(jsonData));
  }, []);
  return <></>;
}
