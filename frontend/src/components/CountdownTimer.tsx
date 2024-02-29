import React, { useEffect } from "react";
import "../css/CountdownTimer.scss";

type CountdownTimerProps = {
  inProgress: boolean;
  running: boolean;
  handleStartGame: () => void;
  handleCountdown: (value: boolean) => void;
};

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  inProgress,
  running,
  handleStartGame,
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
            handleStartGame();
            handleCountdown(false);
            clearInterval(interval);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [handleCountdown, running, handleStartGame]);

  return (
    <div className="countdown-timer">
      {time === 0 || inProgress ? (
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
