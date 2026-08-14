import React from "react";

// ToyCard shows one single toy's info, plus its two buttons.
// It receives the toy object itself, plus the baseUrl and two
// functions (onUpdateToy, onDeleteToy) as props from ToyContainer.
function ToyCard({ toy, baseUrl, onUpdateToy, onDeleteToy }) {
  
  function handleLikeClick() {
    fetch(`${baseUrl}/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likes: toy.likes + 1 }),
    })
      .then((response) => response.json())
      .then((updatedToy) => onUpdateToy(updatedToy));
  }

  
  function handleDonateClick() {
    fetch(`${baseUrl}/${toy.id}`, {
      method: "DELETE",
    }).then(() => onDeleteToy(toy.id));
  }

  return (
    <div className="card" data-testid="toy-card">
      <h2>{toy.name}</h2>
      <img src={toy.image} alt={toy.name} className="toy-avatar" />
      <p>{toy.likes} Likes </p>
      <button className="like-btn" onClick={handleLikeClick}>
        Like {"<3"}
      </button>
      <button className="del-btn" onClick={handleDonateClick}>
        Donate to GoodWill
      </button>
    </div>
  );
}

export default ToyCard;
