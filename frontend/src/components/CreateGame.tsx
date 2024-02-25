import React, { useState } from "react";

interface CreateGameProps {
  createGame: () => void;
}

const CreateGame: React.FC<CreateGameProps> = ({ createGame }) => {
  return (
    <div>
      <button onClick={createGame}>Create New Game</button>
    </div>
  );
};

export default CreateGame;
