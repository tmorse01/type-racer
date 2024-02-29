import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Types
import { GameState } from "../../../shared/types/game-types";

// Components
import JoinGame from "./JoinGame";
import PlayerProgressBar from "./PlayerProgressBar";
import TypeRacer from "./TypeRacer";
import StartGame from "./StartGame";

// Style
import "../css/Game.scss";

import CountdownTimer from "./CountdownTimer";
import { SimpleParagraph } from "../lib/sample-paragraphs";

interface GameProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  joinGame: (name: string) => void;
  startGame: () => void;
  handleCountdown: (value: boolean) => void;
  playerFinish: (playerName: string) => void;
  updateScore: (name: string, score: number) => void;
}

const Game: React.FC<GameProps> = ({
  gameState,
  setGameState,
  joinGame,
  startGame,
  handleCountdown,
  playerFinish,
  updateScore,
}) => {
  const { gameId } = useParams<{ gameId: string }>();
  const [playerName, setPlayerName] = useState<string>("");
  const paragraph = SimpleParagraph;

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await fetch(`http://localhost:3000/games/${gameId}`);
        const data = await response.json();
        setGameState(data);
      } catch (error) {
        console.error("Error fetching game state:", error);
      }
    };
    fetchGame();
  }, [gameId, setGameState]);

  // console.log("Game state", gameState);
  if (!gameId || !gameState) {
    return <div>No game found</div>;
  }

  const handleJoin = (name: string) => {
    joinGame(name);
  };

  const handlePlayerFinish = () => {
    playerFinish(playerName);
  };

  const handlePlayerScore = (score: number) => {
    updateScore(playerName, score);
  };

  return (
    <>
      <div className="progress-bar-list">
        {gameState.players.map((player, index) => (
          <div key={index}>
            <label>{player.name}</label>
            <PlayerProgressBar
              key={index}
              player={player}
              paragraph={paragraph}
            />
          </div>
        ))}
      </div>
      <div className="game-controls">
        <JoinGame
          playerName={playerName}
          setPlayerName={setPlayerName}
          players={gameState.players}
          handleJoin={handleJoin}
        />
        <StartGame
          disabled={gameState.countdown || gameState.inProgress}
          handleCountdown={handleCountdown}
        />
        <CountdownTimer
          inProgress={gameState.inProgress}
          running={gameState.countdown}
          startGame={startGame}
          handleCountdown={handleCountdown}
        />
      </div>
      <TypeRacer
        paragraph={paragraph}
        inProgress={gameState.inProgress}
        handlePlayerFinish={handlePlayerFinish}
        handlePlayerScore={handlePlayerScore}
      />
    </>
  );
};

export default Game;
