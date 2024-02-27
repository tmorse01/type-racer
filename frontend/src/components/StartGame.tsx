type StartGameProps = {
  disabled: boolean;
  startGame: () => void;
};

const StartGame: React.FC<StartGameProps> = ({ disabled, startGame }) => {
  return (
    <button
      className={`start-game__button ${disabled ? "disabled" : ""}`}
      onClick={startGame}
      disabled={disabled}
    >
      Start Game
    </button>
  );
};

export default StartGame;
