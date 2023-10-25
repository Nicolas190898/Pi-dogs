import NavBar from "../../components/navBar/NavBar";
import Cards from "../../components/cards/Cards";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {allDogs} from '../../redux/actions'
import "./Home.styles.css";

function Home() {
  const dispatch = useDispatch();
  const dogs = useSelector((state) => state.filteredData);
  //Escucha los cambios y los despacha
  useEffect(() => {
    dispatch(allDogs());
  }, [dispatch]);

  return (
    <div className="home">
      <h2 className="home-title">home</h2>
      <Cards dogs={dogs} />
    </div>
  );
}

export default Home;
