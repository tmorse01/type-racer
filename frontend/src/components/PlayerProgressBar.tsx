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
    width: `${player.score}%`,
  };
  console.log(progressStyle);
  return (
    <div className="progress-bar-container">
      <div className="progress-bar">
        <div
          className={`progress progress-${player.element.toLowerCase()}`}
          style={progressStyle}
        >
          <Elemental element={player.element} />
        </div>
      </div>
    </div>
  );
};

export default PlayerProgressBar;
