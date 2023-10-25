import "./card.styles.css";
import { Link } from "react-router-dom";
function Card({ dog }) {
   const { id, image, name, temperaments, weight } = dog;
  return (
    <div className="card-container">
      <Link to={`/detail/${id}`} className="card-link" >
        <img src={image} alt="A dog" />
        <h1>{name}</h1>
        <p>{temperaments}</p>
        <p>{weight} kg</p>
      </Link>
    </div>
  );
}

export default Card;
