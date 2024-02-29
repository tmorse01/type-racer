import React from "react";
import "../css/PlayerProgressBar.scss";
import { Player } from "../../../shared/types/game-types";
import Elemental from "./Elemental";

interface PlayerProgressBarProps {
  player: Player;
  paragraph: string;
}

const PlayerProgressBar: React.FC<PlayerProgressBarProps> = ({
  player,
  paragraph,
}) => {
  // Calculate progress bar width from player score which is character / paragraph length
  const progressStyle = {
    width: `${(player.score / paragraph.length) * 100}%`,
  };
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
