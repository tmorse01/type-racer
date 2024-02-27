import React, { useEffect } from "react";
import "../css/CountdownTimer.scss";

type CountdownTimerProps = {
  running: boolean;
};

const CountdownTimer: React.FC<CountdownTimerProps> = ({ running }) => {
  const [time, setTime] = React.useState(5);
  useEffect(() => {
    let interval: number | undefined;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime === 0) {
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
