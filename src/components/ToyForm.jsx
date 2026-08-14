import React, { useState } from "react";

// ToyForm receives baseUrl and onAddNewToy (a function) as props from App.
function ToyForm({ baseUrl, onAddNewToy }) {
  // "Controlled form" means React state holds the current value of
  // every input, instead of the browser DOM holding it.
  // We keep one piece of state per input field.
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  // These two functions run every time the user types a character.
  // They update state so it always matches what's in the input box.
  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleImageChange(event) {
    setImage(event.target.value);
  }

  function handleSubmit(event) {
    // Stop the browser's default behavior of refreshing the page.
    event.preventDefault();

    // This is the new toy we want to save. Likes always start at 0.
    const newToy = {
      name: name,
      image: image,
      likes: 0,
    };

    // Send a POST request to create the toy on the server.
    fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newToy),
    })
      .then((response) => response.json())
      // The server sends back the saved toy (now it has a real id).
      // "Inverse data flow": we call the function App gave us so that
      // App (the parent) can add this toy to its own state.
      .then((savedToy) => onAddNewToy(savedToy));

    // Clear the form inputs after submitting.
    setName("");
    setImage("");
  }

  return (
    <div className="container">
      <form className="add-toy-form" onSubmit={handleSubmit}>
        <h3>Create a toy!</h3>
        <input
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          className="input-text"
          value={name}
          onChange={handleNameChange}
        />
        <br />
        <input
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
          value={image}
          onChange={handleImageChange}
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;
