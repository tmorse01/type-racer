import React from "react";
import "../css/CreateGame.scss";
import { useNavigate } from "react-router-dom";

const CreateGame: React.FC = () => {
  const navigate = useNavigate();
  const createGame = () => {
    fetch("http://localhost:3000/create", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        navigate(`/games/${data.result}`);
      });
  };
  return (
    <div className="create-game">
      <button className="create-game__button" onClick={createGame}>
        Create New Game
      </button>
    </div>
  );
};
export default CreateGame;
