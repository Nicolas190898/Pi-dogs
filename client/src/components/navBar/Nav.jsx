import React from "react";
import { Link } from "react-router-dom";
import { allTemperaments } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import style from "../navBar/Nav.module.css";
import SearchBar from "../searchBar/SearchBar";
import Origin from "../origin/Origin";
import Temperament from "../temperament/Temperament";
import Sort from "../sort/Sort";

export default function Nav() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allTemperaments());
  }, [dispatch]);

  return (
    <div className={style.nav}>
      <Link to={`/`}>
        <button>🡰</button>
      </Link>
      <Link to={`/create`}>
        <button>Create</button>
      </Link>
      <Sort />
      <Temperament />
      <Origin />
      <SearchBar />
    </div>
  );
}
