import "./card.styles.css";

function Card({ dog }) {
   const { id, image, name, temperaments, weight } = dog;
  return (
    <div className="card-container">
      <img src={image} alt="A dog" />
      <h1>{name}</h1>
      <p>{temperaments}</p>
      <p>{weight} kg</p>
    </div>
  );
}

export default Card;
