import React from "react";
import ToyCard from "./ToyCard";

// ToyContainer does NOT hold its own state.
// It just receives the toys array (and handler functions) as props
// from App, and turns each toy object into a <ToyCard /> component.
function ToyContainer({ toys, baseUrl, onUpdateToy, onDeleteToy }) {
  const toyCards = toys.map((toy) => (
    <ToyCard
      key={toy.id}
      toy={toy}
      baseUrl={baseUrl}
      onUpdateToy={onUpdateToy}
      onDeleteToy={onDeleteToy}
    />
  ));

  return <div id="toy-collection">{toyCards}</div>;
}

export default ToyContainer;
