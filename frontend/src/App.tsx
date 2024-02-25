import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GameState } from "../../shared/types/game-types";
import Game from "./components/Game";
import CreateGame from "./components/CreateGame";
const ws = new WebSocket("ws://localhost:3000");

function App() {
  const initialState: GameState = {
    players: [],
    gameInProgress: false,
  };
  const [gameState, setGameState] = useState<GameState>(initialState);
  useEffect(() => {
    ws.onmessage = (message) => {
      console.log("onmessage", message.data);
      setGameState(JSON.parse(message.data));
    };
  }, []);

  const joinGame = (gameId: string, name: string) => {
    ws.send(JSON.stringify({ type: "join", data: { name } }));
  };

  const startGame = () => {
    ws.send(JSON.stringify({ type: "start" }));
  };

  const endGame = () => {
    ws.send(JSON.stringify({ type: "end" }));
  };

  const updateScore = (name: string, score: number) => {
    ws.send(JSON.stringify({ type: "score", data: { name, score } }));
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/games/:gameId"
          element={
            <Game
              gameState={gameState}
              joinGame={joinGame}
              setGameState={setGameState}
            />
          }
        >
          {/* Here you would render your game component, passing in the necessary props */}
          {/* <Game gameState={gameState} updateScore={updateScore} endGame={endGame} /> */}
        </Route>
        <Route path="/" element={<CreateGame />}>
          {/* Here you would render your join game component, passing in the necessary props */}
          {/* <JoinGame joinGame={joinGame} startGame={startGame} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
