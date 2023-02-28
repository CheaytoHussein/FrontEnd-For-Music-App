import React, { useEffect, useState } from "react";

export default function Artists() {
    const [artistData, setArtistData] = useState([])
    useEffect(() => {
        fetch("http://localhost:8080/api/artists")
          .then((data) => data.json())
          .then((jsonData) => setArtistData(jsonData));
      }, []);
  return <></>;
}
