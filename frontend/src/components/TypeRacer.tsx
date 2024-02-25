import React, { useState, useEffect } from "react";
import "../css/TypeRacer.scss";

interface TypeRacerProps {
  paragraph: string;
}

const TypeRacer: React.FC<TypeRacerProps> = ({ paragraph }) => {
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(userInput !== paragraph.slice(0, userInput.length));
  }, [userInput, paragraph]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  const getHighlightedText = (text: string) => {
    if (error) {
      return <span style={{ color: "red" }}>{text}</span>;
    } else {
      return <span style={{ color: "green" }}>{text}</span>;
    }
  };

  return (
    <div className="type-racer">
      <div className="type-paragraph">
        {getHighlightedText(paragraph.slice(0, userInput.length))}
        {paragraph.slice(userInput.length)}
      </div>
      <input
        type="text"
        value={userInput}
        onChange={handleChange}
        className={`type-input ${error ? "error" : ""}`}
      />
    </div>
  );
};

export default TypeRacer;
