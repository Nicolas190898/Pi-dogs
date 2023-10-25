
import Cards from "../../components/cards/Cards";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {allDogs} from '../../redux/actions'
import "./Home.styles.css";
import Paginator from "../../components/paginator/Paginator";
import Nav from "../../components/navBar/Nav";

function Home() {
  const dispatch = useDispatch();
  const dogs = useSelector((state) => state.filteredData);
  //Escucha los cambios y los despacha
  useEffect(() => {
    dispatch(allDogs());
  }, [dispatch]);

  return (
    <div className="home">
      <Nav/>
      <Cards dogs={dogs} />
      {dogs.length > 0 ? <Paginator /> : <h1>Dogs not found</h1>}
    </div>
  );
}

export default Home;
