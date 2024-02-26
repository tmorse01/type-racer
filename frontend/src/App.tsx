import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { GameState } from "../../shared/types/game-types";
import Game from "./components/Game";
import LandingPage from "./pages/LandingPage";
const ws = new WebSocket("ws://localhost:3000");

const initialState: GameState = {
  players: [],
  inProgress: false,
};

function App() {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState<GameState>(initialState);
  const [remainingTime, setRemainingTime] = useState<number>(30);

  useEffect(() => {
    console.log("App component mounted");
    ws.onmessage = (message) => {
      console.log("onmessage", message.data);
      const data = JSON.parse(message.data);
      if (data.type === "update") {
        setGameState(data.result);
      } else if (data.type === "countdown") {
        setRemainingTime(data.result);
        if (data.result === 0) {
          setGameState({ ...gameState, inProgress: true });
        }
      } else if (data.type === "create") {
        navigate(`/games/${data.result}`);
      }
    };
  }, []);

  const createGame = () => {
    ws.send(JSON.stringify({ type: "create" }));
  };

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

  return (
    <div style={{ width: "100vw" }}>
      <Routes>
        <Route
          path="/games/:gameId"
          element={
            <Game
              gameState={gameState}
              setGameState={setGameState}
              joinGame={joinGame}
              remainingTime={remainingTime}
            />
          }
        ></Route>
        <Route
          path="/"
          element={<LandingPage createGame={createGame} />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
