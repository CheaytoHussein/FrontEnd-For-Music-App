import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Songs from "./components/Songs";
import Albums from "./components/Albums";
import Artists from "./components/Artists";
import Home from "./components/Home";
import SingleSong from "./components/singleComponents/SingleSong";
import SingleAlbum from "./components/singleComponents/SingleAlbum";
import SingleArtist from "./components/singleComponents/SingleArtist";
import CreateSong from "./components/createComponents/CreateSong";
import CreateAlbum from "./components/createComponents/CreateAlbum";
import CreateArtist from "./components/createComponents/CreateArtist";

function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [currentComponent, setCurrentComponent] = useState("Home");
  const [id, setId] = useState(0);
  useEffect(() => {
    window.addEventListener("resize", () =>
      window.innerWidth < 1024 ? setIsMobile(true) : setIsMobile(false)
    );
  }, []);

  return (
    <Router>
      <Nav
        currentComponent={currentComponent}
        setCurrentComponent={(component) => setCurrentComponent(component)}
        isMobile={isMobile}
      />
      <main className="flex justify-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="Songs" element={<Songs setId={setId} />} />
          <Route path="Albums" element={<Albums setId={setId} />} />
          <Route path="Artists" element={<Artists setId={setId} />} />
          <Route path="Songs/:nameAndId" element={<SingleSong id={id} />} />
          <Route path="/Albums/:nameAndId" element={<SingleAlbum id={id} />} />
          <Route path="/Artists/:nameAndId" element={<SingleArtist id={id} />} />
          <Route path="/Create/Song" element={<CreateSong />} />
          <Route path="/Create/Album" element={<CreateAlbum />} />
          <Route path="/Create/Artist" element={<CreateArtist />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
