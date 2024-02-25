import React, { useState } from "react";
import { Player } from "../../../shared/types/game-types";
import "../css/JoinGame.scss";

type JoinGameProps = {
  players: Player[];
  handleJoin: (name: string) => void;
};

const JoinGame: React.FC<JoinGameProps> = ({ players, handleJoin }) => {
  const [name, setName] = useState("");

  const handleClick = () => {
    // Add logic to join the game
    handleJoin(name);
  };

  return (
    <>
      {players.length < 4 ? (
        <div className="join-game">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className="join-game__button" onClick={handleClick}>
            Join Game
          </button>
        </div>
      ) : (
        <div className="join-game__full">Player list is full</div>
      )}
    </>
  );
};

export default JoinGame;
