import React, { useState } from "react";
import { useParams } from "react-router-dom";
import JoinGame from "./JoinGame";

interface Player {
  name: string;
  score: number;
}

interface GameState {
  players: Player[];
  gameInProgress: boolean;
}

interface GameProps {
  gameState: GameState;
  joinGame: (gameId: string, name: string) => void;
}

const Game: React.FC<GameProps> = ({ gameState, joinGame }) => {
  const { gameId } = useParams<{ gameId: string }>();
  if (!gameId) {
    return <div>No game ID provided</div>;
  }

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
