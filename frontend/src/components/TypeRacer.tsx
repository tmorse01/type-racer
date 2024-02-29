import React, { useState } from "react";
import "../css/TypeRacer.scss";
import Paragraph from "./Paragraph";
import { SimpleParagraph } from "../lib/sample-paragraphs";

interface TypeRacerProps {
  inProgress: boolean;
  handlePlayerFinish: () => void;
}

const TypeRacer: React.FC<TypeRacerProps> = ({
  inProgress,
  handlePlayerFinish,
}) => {
  const [userInput, setUserInput] = useState("");

  const paragraph = SimpleParagraph;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
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
      />
    </div>
  );
};

export default TypeRacer;
