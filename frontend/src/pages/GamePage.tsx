import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Game from "../components/Game";
import { GameState } from "../../../shared/types/game-types";

const initialState: GameState = {
  players: [],
  inProgress: false,
};

const GamePage: React.FC = () => {
  const { gameId } = useParams();
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [gameState, setGameState] = useState<GameState>(initialState);

  useEffect(() => {
    console.log("App component mounted");
    const ws = new WebSocket(`ws://localhost:3000?gameId=${gameId}`);
    setSocket(ws);
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
  }, []);

  const joinGame = (name: string) => {
    socket?.send(JSON.stringify({ type: "join", data: { name } }));
  };

  //   const startGame = () => {
  //     socket?.send(JSON.stringify({ type: "start" }));
  //   };

  //   const endGame = () => {
  //     socket?.send(JSON.stringify({ type: "end" }));
  //   };

  //   const playerFinish = (playerName: string) => {
  //     socket?.send(JSON.stringify({ type: "finish", data: playerName }));
  //   };

  //   const updateScore = (name: string, score: number) => {
  //     socket?.send(JSON.stringify({ type: "score", data: { name, score } }));
  //   };

  return (
    <Game
      gameState={gameState}
      setGameState={setGameState}
      joinGame={joinGame}
    />
  );
};

export default GamePage;