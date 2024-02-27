type StartGameProps = {
  startGame: () => void;
};

const StartGame: React.FC<StartGameProps> = ({ startGame }) => {
  return (
    <button className="start-game__button" onClick={startGame}>
      Start Game
    </button>
  );
};

export default StartGame;
