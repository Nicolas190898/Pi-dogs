import React from "react";
import Card from "../card/Card";
import './cards.styles.css'
import { connect } from "react-redux";


function Cards({ currentPage, dogsPerPage, dogs }) {
  
    //Se calculan los índices de inicio y final para determinar qué perros deben mostrarse en la página
    const startIndex = (currentPage - 1) * dogsPerPage;
    const endIndex = startIndex + dogsPerPage;
    const dogsToShow = dogs.slice(startIndex, endIndex);

    return (
      <div className="card-list">
        {dogsToShow.map((dog) => {
          return <Card key={dog.id} dog={dog} />;
        })}
      </div>
    );
}

const mapStateToProps = (state) => ({
    currentPage: state.currentPage,
    dogsPerPage: 8
});

export default connect(mapStateToProps)(Cards);