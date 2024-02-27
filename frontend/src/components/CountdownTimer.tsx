import React, { useEffect } from "react";
import "../css/CountdownTimer.scss";

type CountdownTimerProps = {
  running: boolean;
  startGame: () => void;
  handleCountdown: (value: Boolean) => void;
};

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  running,
  startGame,
  handleCountdown,
}) => {
  const [time, setTime] = React.useState(5);
  useEffect(() => {
    let interval: number | undefined;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime === 0) {
            // start game here
            startGame();
            handleCountdown(false);
            clearInterval(interval);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [running]);
  return (
    <div className="countdown-timer">
      {time === 0 ? (
        <span className="countdown-timer__time">Game in progress!</span>
      ) : (
        <span className="countdown-timer__time">
          {`${time} seconds until start`}
        </span>
      )}
    </div>
  );
};

export default CountdownTimer;
