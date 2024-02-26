import React from "react";
import "../css/CreateGame.scss";
interface CreateGameProps {
  createGame: () => void;
}

const CreateGame: React.FC<CreateGameProps> = ({ createGame }) => {
  return (
    <div className="create-game">
      <button className="create-game__button" onClick={createGame}>
        Create New Game
      </button>
    </div>
  );
};
export default CreateGame;
