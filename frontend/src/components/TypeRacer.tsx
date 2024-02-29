import React, { useState } from "react";
import "../css/TypeRacer.scss";
import Paragraph from "./Paragraph";

interface TypeRacerProps {
  paragraph: string;
  inProgress: boolean;
  handlePlayerFinish: () => void;
  handlePlayerScore: (score: number) => void;
}

const TypeRacer: React.FC<TypeRacerProps> = ({
  paragraph,
  inProgress,
  handlePlayerFinish,
  handlePlayerScore,
}) => {
  const [userInput, setUserInput] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    if (!inProgress) return;
    // if the player gets a character right, send an update score to the server
    if (input.length > userInput.length) {
      if (input[input.length - 1] === paragraph[input.length - 1]) {
        console.log("correct");
        handlePlayerScore(input.length);
      }
    }
    setUserInput(input);

    // check if finished
    if (input === paragraph) {
      console.log("finished");
      handlePlayerFinish();
    }
  };

  return (
    <div className="type-racer">
      <div className="type-paragraph">
        <Paragraph
          paragraph={paragraph}
          userInput={userInput}
          inProgress={inProgress}
        />
      </div>
      <input
        type="text"
        value={userInput}
        onChange={handleChange}
        className={`type-input`}
        placeholder={
          !inProgress ? "Wait for the game to start" : "Start typing..."
        }
      />
    </div>
  );
};

export default TypeRacer;
