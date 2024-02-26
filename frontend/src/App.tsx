import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GameState } from "../../shared/types/game-types";
import Game from "./components/Game";
import CreateGame from "./components/CreateGame";

function App() {
  return (
    <div style={{ width: "100vw" }}>
      <Router>
        <Routes>
          <Route path="/games/:gameId" element={<Game />}>
            {/* Here you would render your game component, passing in the necessary props */}
            {/* <Game gameState={gameState} updateScore={updateScore} endGame={endGame} /> */}
          </Route>
          <Route path="/" element={<CreateGame />}>
            {/* Here you would render your join game component, passing in the necessary props */}
            {/* <JoinGame joinGame={joinGame} startGame={startGame} /> */}
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
