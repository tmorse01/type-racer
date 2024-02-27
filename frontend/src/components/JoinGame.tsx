import React from "react";
import { Player } from "../../../shared/types/game-types";

type JoinGameProps = {
  playerName: string;
  setPlayerName: (name: string) => void;
  players: Player[];
  handleJoin: (name: string) => void;
};

const JoinGame: React.FC<JoinGameProps> = ({
  playerName,
  setPlayerName,
  players,
  handleJoin,
}) => {
  const handleClick = () => {
    // Add logic to join the game
    handleJoin(playerName);
  };

  if (players.some((player: Player) => player.name === playerName)) {
    return null;
  }

  return (
    <>
      {players.length < 4 ? (
        <>
          <input
            className="join-game__input"
            type="text"
            placeholder="Enter your name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleClick();
              }
            }}
          />
          <button className="join-game__button" onClick={handleClick}>
            Join Game
          </button>
        </>
      ) : (
        <div className="join-game__full">Player list is full</div>
      )}
    </>
  );
};

export default JoinGame;
