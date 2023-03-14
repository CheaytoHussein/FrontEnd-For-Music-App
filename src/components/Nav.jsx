import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/main.svg";
import bars from "../assets/bars.svg";
import { motion } from "framer-motion";

export default function Nav({
  currentComponent,
  setCurrentComponent,
  isMobile,
}) {
  const navLinks = ["Songs", "Albums", "Artists"];
  const [createOpen, setCreateOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  return (
    <>
      <nav
        className="w-screen bg-gradient-to-r from-purple-600 to-pink-400 fixed top-0 shadow-3xl z-10 flex flex-col lg:flex-row items-center lg:justify-between transition-all"
        style={{ height: navOpen ? "100vh" : "10vh" }}
      >
        <div className="lg:w-max w-screen flex flex-row justify-evenly mt-[2.5vh] lg:mt-0">
          <Link to="/">
            <img
              className="lg:ml-20 aspect-square w-8 lg:w-12 cursor-pointer"
              src={logo}
              alt="Logo of the music app"
              onClick={() => {
                setCurrentComponent("Home");
                setCreateOpen(false);
                setNavOpen(false);
              }}
            />
          </Link>
          {isMobile && ( //the hamburger button that is present only when the website is loaded on mobile
            <img
              className="lg:ml-20 aspect-square w-8 lg:w-12 cursor-pointer"
              src={bars}
              alt="hamburger button"
              onClick={() => {
                setNavOpen((oldState) => !oldState);
                setCreateOpen(false);
              }}
            />
          )}
        </div>
        {(!isMobile || (isMobile && navOpen)) && ( //the 4 options songs,albums,artists,create are available on desktop or on mobile if the nav's hamburger button is pressed
          <motion.ul
            className="flex flex-col lg:flex-row gap-10 sm:gap-20 lg:mr-20 justify-center items-center text-white text-4xl font-bold mt-40 lg:mt-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            {navLinks.map((item, idx) => {
              return (
                <li
                  key={idx}
                  onClick={() => {
                    setCurrentComponent(item);
                    setCreateOpen(false);
                    setNavOpen(false);
                  }}
                  className={
                    currentComponent == item
                      ? "transition-colors cursor-pointer underline"
                      : "cursor-pointer"
                  }
                >
                  <Link to={"/" + item}>{item}</Link>
                </li>
              );
            })}
            <li
              className="cursor-pointer"
              onClick={() => setCreateOpen((oldState) => !oldState)}
            >
              Create
            </li>
          </motion.ul>
        )}
      </nav>
      {createOpen && (
        <motion.ul
          className="absolute lg:right-20 w-screen bottom-0 lg:top-[10vh] lg:w-60 h-40 bg-zinc-600 z-10 text-center text-xl flex flex-col justify-around font-bold lg:rounded-xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          {navLinks.map((item, idx) => {
            return (
              <Link key={idx} to={"/Create/" + item.slice(0, -1)}>
                {/*the slice method is used to remove the "s" from the component name, because we're creating an element not many elements*/}
                <li
                  className="cursor-pointer hover:text-purple-400 transition-colors"
                  onClick={() => setCreateOpen(false)}
                >
                  {item}
                </li>
              </Link>
            );
          })}
        </motion.ul>
      )}
    </>
  );
}
