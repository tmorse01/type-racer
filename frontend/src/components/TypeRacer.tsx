import React, { useState, useEffect, useMemo } from "react";
import "../css/TypeRacer.scss";
import Paragraph from "./Paragraph";

interface TypeRacerProps {
  paragraph: string;
}

const TypeRacer: React.FC<TypeRacerProps> = ({ paragraph }) => {
  const [userInput, setUserInput] = useState("");

  const words = useMemo(() => paragraph.split(" "), [paragraph]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
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
