import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Game from "../components/Game";
import { GameState } from "../../../shared/types/game-types";

const initialState: GameState = {
  players: [],
  inProgress: false,
  countdown: false,
};

const GamePage: React.FC = () => {
  const { gameId } = useParams();
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [gameState, setGameState] = useState<GameState>(initialState);

  useEffect(() => {
    // console.log("App component mounted");
    const ws = new WebSocket(`ws://localhost:3000?gameId=${gameId}`);
    setSocket(ws);

    // get initial game state
    fetch(`http://localhost:3000/games/${gameId}`)
      .then((response) => response.json())
      .then((data) => setGameState(data))
      .catch((error) => console.error("Error:", error));

    ws.onmessage = (message) => {
      console.log("onmessage", message.data);
      const data = JSON.parse(message.data);
      if (data.type === "update") {
        setGameState(data.result);
      }
    };
    return () => {
      console.log("CLOSE WEB SOCKET CLIENT");
      ws.close();
    };
  }, [gameId]);

  const joinGame = (name: string) => {
    socket?.send(JSON.stringify({ type: "join", data: { name } }));
  };

  const handleCountdown = (value: boolean) => {
    socket?.send(JSON.stringify({ type: "countdown", data: { value } }));
  };

  const startGame = () => {
    socket?.send(JSON.stringify({ type: "start" }));
  };

  //   const endGame = () => {
  //     socket?.send(JSON.stringify({ type: "end" }));
  //   };

  const playerFinish = (playerName: string) => {
    socket?.send(JSON.stringify({ type: "finish", data: playerName }));
  };

  //   const updateScore = (name: string, score: number) => {
  //     socket?.send(JSON.stringify({ type: "score", data: { name, score } }));
  //   };

  return (
    <div className="game-page">
      <h1>Game Page</h1>
      <p>Game ID: {gameId}</p>
      <Game
        gameState={gameState}
        setGameState={setGameState}
        joinGame={joinGame}
        startGame={startGame}
        handleCountdown={handleCountdown}
        playerFinish={playerFinish}
      />
    </div>
  );
};

export default GamePage;
