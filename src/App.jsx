import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Songs from "./components/Songs";
import Albums from "./components/Albums";
import Artists from "./components/Artists";
import Home from "./components/Home";

function App() {
  const [currentComponent, setCurrentComponent] = useState("Home");
  const [isMobile, setIsMobile] = useState(false);
  useEffect(
    () =>
      window.addEventListener("resize", () =>
        window.innerWidth > 768 ? setIsMobile(false) : setIsMobile(true)
      ),
    []
  );
  return (
    <Router>
      <Nav
        currentComponent={currentComponent}
        setCurrentComponent={(component) => setCurrentComponent(component)}
      />
      <main className="flex justify-center items-center">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="Songs" element={<Songs isMobile={isMobile} />} />
          <Route exact path="Albums" element={<Albums />} />
          <Route exact path="Artists" element={<Artists />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
