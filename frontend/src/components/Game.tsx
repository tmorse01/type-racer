import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JoinGame from "./JoinGame";
import { GameState, Player } from "../../../shared/types/game-types";
import PlayerProgressBar from "./PlayerProgressBar";
import "../css/Game.scss";
import TypeRacer from "./TypeRacer";
import { SampleParagraph } from "../lib/sample-paragraphs";

interface GameProps {
  gameState: GameState;
  joinGame: (gameId: string, name: string) => void;
  setGameState: (gameState: GameState) => void;
}

const Game: React.FC<GameProps> = ({ gameState, joinGame, setGameState }) => {
  const { gameId } = useParams<{ gameId: string }>();
  // console.log({ gameState });
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
    <div className="game-page">
      <h3>Game: {gameId}</h3>
      <div className="progress-bar-list">
        {gameState.players.map((player, index) => (
          <div>
            <label>{player.name}</label>
            <PlayerProgressBar key={index} player={player} />
          </div>
        ))}
      </div>
      <JoinGame players={gameState.players} handleJoin={handleJoin} />
      <TypeRacer paragraph={SampleParagraph} />
    </div>
  );
};

export default Game;
