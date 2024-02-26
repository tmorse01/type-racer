import React from "react";
import "../css/CountdownTimer.scss";

type CountdownTimerProps = {
  time: number;
  gameInProgress: boolean;
};

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  time,
  gameInProgress,
}) => {
  return (
    <div className="countdown-timer">
      <span className="countdown-timer__time">
        {gameInProgress ? "Game in progress" : `${time} seconds until start`}
      </span>
    </div>
  );
};

export default CountdownTimer;
