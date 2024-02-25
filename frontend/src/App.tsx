import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GameState } from "./types/game-types";
import Game from "./components/Game";
import CreateGame from "./components/CreateGame";
const ws = new WebSocket("ws://localhost:3000");

function App() {
  const [gameState, setGameState] = useState<GameState>({
    players: [],
    gameInProgress: false,
  });

  useEffect(() => {
    ws.onmessage = (message) => {
      setGameState(JSON.parse(message.data));
    };
  }, []);

  const joinGame = (gameId: string, name: string) => {
    setGameState((prevState) => ({
      ...prevState,
      players: [...prevState.players, { name, score: 0 }],
    }));
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
          path="/game/:gameId"
          element={<Game gameState={gameState} joinGame={joinGame} />}
        >
          {/* Here you would render your game component, passing in the necessary props */}
          {/* <Game gameState={gameState} updateScore={updateScore} endGame={endGame} /> */}
        </Route>
        <Route path="/" element={<CreateGame createGame={() => {}} />}>
          {/* Here you would render your join game component, passing in the necessary props */}
          {/* <JoinGame joinGame={joinGame} startGame={startGame} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
