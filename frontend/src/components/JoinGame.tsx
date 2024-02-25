import React, { useState } from "react";
import { Player } from "../types/game-types";

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
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={handleClick}>Join Game</button>
        </div>
      ) : (
        <div>Player list is full</div>
      )}
    </>
  );
};

export default JoinGame;
