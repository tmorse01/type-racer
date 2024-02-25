import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JoinGame from "./JoinGame";
import { GameState } from "../../../shared/types/game-types";
interface GameProps {
  gameState: GameState;
  joinGame: (gameId: string, name: string) => void;
  setGameState: (gameState: GameState) => void;
}

const Game: React.FC<GameProps> = ({ gameState, joinGame, setGameState }) => {
  const { gameId } = useParams<{ gameId: string }>();
  console.log({ gameState });
  if (!gameId) {
    return <div>No game ID provided</div>;
  }

  useEffect(() => {
    fetch(`http://localhost:3000/games/${gameId}`)
      .then((response) => response.json())
      .then((data) => setGameState(data))
      .catch((error) => console.error("Error:", error));
  }, [gameId]);

  const handleJoin = (name: string) => {
    joinGame(gameId, name);
  };

  return (
    <div>
      <h1>Game: {gameId}</h1>
      <div>
        <h2>Players:</h2>
        {gameState.players.map((player, index) => (
          <p key={index}>
            {player.name}: {player.score}
          </p>
        ))}
      </div>
      <JoinGame players={gameState.players} handleJoin={handleJoin} />
    </div>
  );
};

export default Game;
