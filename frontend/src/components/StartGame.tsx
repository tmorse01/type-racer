type StartGameProps = {
  disabled: boolean;
  handleCountdown: (value: Boolean) => void;
};

const StartGame: React.FC<StartGameProps> = ({ disabled, handleCountdown }) => {
  return (
    <button
      className={`start-game__button ${disabled ? "disabled" : ""}`}
      onClick={() => handleCountdown(true)}
      disabled={disabled}
    >
      Start Game
    </button>
  );
};

export default StartGame;
