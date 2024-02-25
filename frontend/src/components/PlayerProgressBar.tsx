// PlayerProgressBar.tsx
import React from "react";
import "../css/PlayerProgressBar.scss";
import { Player } from "../../../shared/types/game-types";
import Elemental from "./Elemental";

interface PlayerProgressBarProps {
  player: Player;
}

const PlayerProgressBar: React.FC<PlayerProgressBarProps> = ({ player }) => {
  const progressStyle = {
    transform: `translateX(${player.score}%)`,
  };

  return (
    <div className="progress-bar-container">
      <div className="progress-bar">
        <div className="progress" style={progressStyle}></div>
      </div>
      <Elemental element={player.element} />
    </div>
  );
};

export default PlayerProgressBar;
