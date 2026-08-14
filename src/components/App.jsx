import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

// This is the base URL for our fake backend (json-server).
// Every fetch request in this app will start with this URL.
const BASE_URL = "http://localhost:3001/toys";

function App() {
  const [showForm, setShowForm] = useState(false);

  // ToyForm and ToyContainer are SIBLINGS (they are both children of App,
  // but not children of each other). Because of that, the list of toys
  // must live here in App, so that both components can use it:
  //   - ToyForm needs to ADD a new toy to this list
  //   - ToyContainer needs to DISPLAY this list
  const [toys, setToys] = useState([]);

  // useEffect with an empty dependency array [] runs ONE time,
  // right after the App component first renders.
  // This is where we make our GET request to load all the toys.
  useEffect(() => {
    fetch(BASE_URL)
      .then((response) => response.json())
      .then((toysFromServer) => setToys(toysFromServer));
  }, []);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  // Called by ToyForm after a new toy has been saved to the server.
  // We take the new toy object and add it to the end of our toys array.
  function handleAddNewToy(newToy) {
    setToys((toys) => [...toys, newToy]);
  }

  // Called by ToyCard (through ToyContainer) after a toy's likes
  // have been updated on the server.
  // We replace the old version of that toy in state with the updated one.
  function handleUpdateToy(updatedToy) {
    setToys((toys) =>
      toys.map((toy) => (toy.id === updatedToy.id ? updatedToy : toy))
    );
  }

  // Called by ToyCard (through ToyContainer) after a toy has been
  // deleted ("donated") on the server.
  // We remove that toy from our toys array using its id.
  function handleDeleteToy(toyId) {
    setToys((toys) => toys.filter((toy) => toy.id !== toyId));
  }

  return (
    <>
      <Header />
      {showForm ? (
        <ToyForm baseUrl={BASE_URL} onAddNewToy={handleAddNewToy} />
      ) : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer
        toys={toys}
        baseUrl={BASE_URL}
        onUpdateToy={handleUpdateToy}
        onDeleteToy={handleDeleteToy}
      />
    </>
  );
}

export default App;
