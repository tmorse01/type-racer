import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JoinGame from "./JoinGame";
import { GameState } from "../../../shared/types/game-types";
import PlayerProgressBar from "./PlayerProgressBar";
import "../css/Game.scss";
import TypeRacer from "./TypeRacer";
import { SampleParagraph } from "../lib/sample-paragraphs";

interface GameProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  joinGame: (gameId: string, name: string) => void;
}

const Game: React.FC<GameProps> = ({ gameState, setGameState, joinGame }) => {
  const { gameId } = useParams<{ gameId: string }>();
  const [playerName, setPlayerName] = useState<string>("");

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
          <div key={index}>
            <label>{player.name}</label>
            <PlayerProgressBar key={index} player={player} />
          </div>
        ))}
      </div>
      <JoinGame
        playerName={playerName}
        setPlayerName={setPlayerName}
        players={gameState.players}
        handleJoin={handleJoin}
      />
      <TypeRacer paragraph={SampleParagraph} />
    </div>
  );
};

export default Game;
