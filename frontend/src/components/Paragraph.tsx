import { useEffect, useMemo, useState } from "react";

type ParagraphProps = {
  paragraph: string;
  userInput: string;
};

export default function Paragraph({ paragraph, userInput }: ParagraphProps) {
  const [errorCharIndexes, setErrorCharIndexes] = useState([] as number[]);
  const characters = useMemo(() => paragraph.split(""), [paragraph]);

  useEffect(() => {
    let currentCharacterIndex = userInput.length - 1;
    // base case: if the user has not typed anything, then there are no errors
    if (userInput === "") return;
    if (paragraph[currentCharacterIndex] !== userInput[currentCharacterIndex]) {
      // typed the wrong character
      if (!errorCharIndexes.includes(currentCharacterIndex))
        setErrorCharIndexes([...errorCharIndexes, currentCharacterIndex]);
    }
    // if a user deletes characters, then remove the error
    // setErrorCharIndexes(
    //   errorCharIndexes.filter((index) => index > currentCharacterIndex)
    // );
  }, [userInput, paragraph]);

  const getHighlightedCharacter = (char: string, index: number) => {
    const isIndexError = errorCharIndexes.includes(index);
    if (!isIndexError) {
      return <span style={{ color: "green" }}>{char}</span>;
    } else {
      return <span style={{ color: "red" }}>{char}</span>;
    }
  };

  return (
    <p>
      {characters.map((char, i) => (
        <span key={i}>{getHighlightedCharacter(char, i)}</span>
      ))}
    </p>
  );
}
