import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JoinGame from "./JoinGame";
import { GameState, Player } from "../../../shared/types/game-types";
import PlayerProgressBar from "./PlayerProgressBar";
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

  const players: Player[] = [
    {
      name: "Player 1",
      score: 50,
      element: "Fire",
    },
    {
      name: "Player 2",
      score: 23,
      element: "Water",
    },
    {
      name: "Player 3",
      score: 68,
      element: "Earth",
    },
    {
      name: "Player 4",
      score: 90,
      element: "Air",
    },
  ];

  return (
    <div>
      <h3>Game: {gameId}</h3>
      <div>
        {players.map((player, index) => (
          <PlayerProgressBar key={index} player={player} />
        ))}
      </div>
      <JoinGame players={gameState.players} handleJoin={handleJoin} />
    </div>
  );
};

export default Game;
