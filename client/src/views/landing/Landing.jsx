import React from "react";
import style from "./Landing.module.css";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className={style.landing}>
      <div className={style.container}>
        <h1>
          ¡This is a website
          <br />
          about dogs!
        </h1>
        <p>
          Below you will see a list of dogs,
          <br />I hope you like it.
        </p>
        <Link to={`/home`} className={style.link}>
          <button>Explore</button>
        </Link>
      </div>
    </div>
  ); 
}
