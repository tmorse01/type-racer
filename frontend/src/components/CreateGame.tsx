import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/CreateGame.scss";
interface CreateGameProps {}

const CreateGame: React.FC<CreateGameProps> = () => {
  const navigate = useNavigate();

  function createGame() {
    fetch("http://localhost:3000/games", {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Navigate to the newly created game page
        navigate(`/games/${data.gameId}`);
      })
      .catch((error) => console.error("Error:", error));
  }

  return (
    <div className="create-game">
      <button className="create-game__button" onClick={createGame}>
        Create New Game
      </button>
    </div>
  );
};
export default CreateGame;
