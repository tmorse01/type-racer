import React, { useState } from "react";
import "../css/TypeRacer.scss";
import Paragraph from "./Paragraph";
import { SampleParagraph } from "../lib/sample-paragraphs";

interface TypeRacerProps {
  paragraph: string;
}

const TypeRacer: React.FC<TypeRacerProps> = () => {
  const [userInput, setUserInput] = useState("");
  const paragraph = SampleParagraph;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
    // check if finished
    if (event.target.value === paragraph) {
      console.log("finished");
    }
  };

  return (
    <div className="type-racer">
      <div className="type-paragraph">
        <Paragraph paragraph={paragraph} userInput={userInput} />
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
