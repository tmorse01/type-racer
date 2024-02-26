import { Routes, Route } from "react-router-dom";
import { LandingPage, GamePage } from "./pages/";

function App() {
  return (
    <div style={{ width: "100vw" }}>
      <Routes>
        <Route path="/games/:gameId" element={<GamePage />}></Route>
        <Route path="/" element={<LandingPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
