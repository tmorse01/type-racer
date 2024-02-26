import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JoinGame from "./JoinGame";
import { GameState, Player } from "../../../shared/types/game-types";
import PlayerProgressBar from "./PlayerProgressBar";
import "../css/Game.scss";
import TypeRacer from "./TypeRacer";
import { SampleParagraph } from "../lib/sample-paragraphs";
const ws = new WebSocket("ws://localhost:3000");

interface GameProps {}

const initialState: GameState = {
  players: [],
  gameInProgress: false,
};

const Game: React.FC<GameProps> = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const [playerName, setPlayerName] = useState<string>("");
  const [gameState, setGameState] = useState<GameState>(initialState);

  useEffect(() => {
    ws.onmessage = (message) => {
      console.log("onmessage", message.data);
      setGameState(JSON.parse(message.data));
    };
  }, []);

  const joinGame = (gameId: string, name: string) => {
    ws.send(JSON.stringify({ type: "join", data: { gameId, name } }));
  };

  const startGame = () => {
    ws.send(JSON.stringify({ type: "start" }));
  };

  const endGame = () => {
    ws.send(JSON.stringify({ type: "end" }));
  };

  const playerFinish = (playerName: string) => {
    ws.send(JSON.stringify({ type: "finish", data: playerName }));
  };

  const updateScore = (name: string, score: number) => {
    ws.send(JSON.stringify({ type: "score", data: { name, score } }));
  };
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
