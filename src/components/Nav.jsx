import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/main.svg";

export default function Nav({ currentComponent, setCurrentComponent }) {
  const navLinks = ["Songs", "Albums", "Artists"];
  return (
    <>
      <nav
        className="
            w-screen
            h-20
            bg-neutral-900
            flex
            flex-col
            lg:flex-row
            justify-between
            items-center 
            fixed  
            top-0
            shadow-3xl
            z-10
        "
      >
        <Link to="/">
          <img
            className="lg:ml-20 aspect-square w-6 lg:w-12 cursor-pointer"
            src={logo}
            alt="Logo of the music app"
            onClick={() => setCurrentComponent("Home")}
          />
        </Link>
        <ul className="inline-flex gap-10 sm:gap-20 lg:mr-20 justify-center items-center text-white text-lg lg:text-5xl font-bold">
          {navLinks.map((item, idx) => {
            return (
              <li
                key={idx}
                onClick={() => setCurrentComponent(item)}
                className={
                  currentComponent == item
                    ? "transition color cursor-pointer text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
                    : "cursor-pointer"
                }
              >
                <Link to={"/" + item}>{item}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
