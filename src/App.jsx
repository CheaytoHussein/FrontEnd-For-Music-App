import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Songs from "./components/Songs";
import Albums from "./components/Albums";
import Artists from "./components/Artists";
import Home from "./components/Home";
import SingleSong from "./components/SingleSong";
import SingleAlbum from "./components/SingleAlbum";

function App() {
  const [currentComponent, setCurrentComponent] = useState("Home");
  const [id, setId] = useState(0);

  return (
    <Router>
      <Nav
        currentComponent={currentComponent}
        setCurrentComponent={(component) => setCurrentComponent(component)}
      />
      <main className="flex justify-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="Songs" element={<Songs setId={setId} />} />
          <Route path="Albums" element={<Albums setId={setId} />} />
          <Route path="Artists" element={<Artists setId={setId} />} />
          <Route path="Songs/:nameAndId" element={<SingleSong id={id} />} />
          <Route path="/Albums/:nameAndId" element={<SingleAlbum id={id} />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
