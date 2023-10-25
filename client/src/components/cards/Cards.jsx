import Card from "../card/Card";

import './cards.styles.css'

function Cards({ dogs }) {
  console.log(dogs)
  return (
    <div className="card-list">
      {dogs.map((dog) => {
        return <Card key={dog.id} dog={dog} />;
      })}
    </div>
  );
}

export default Cards;
