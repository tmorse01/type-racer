import { useEffect, useMemo, useState } from "react";
import "../css/Paragraph.scss";
type ParagraphProps = {
  paragraph: string;
  userInput: string;
  inProgress: boolean;
};

export default function Paragraph({
  paragraph,
  userInput,
  inProgress,
}: ParagraphProps) {
  // TODO: generate a random paragraph
  const [errorCharIndexes, setErrorCharIndexes] = useState(new Set<number>());
  const characters = useMemo(() => paragraph.split(""), [paragraph]);
  const currentUserInputIndex = userInput.length - 1;

  useEffect(() => {
    // base case: if the user has not typed anything, then there are no errors
    if (userInput === "") {
      setErrorCharIndexes(new Set<number>());
      return;
    }
    if (paragraph[currentUserInputIndex] !== userInput[currentUserInputIndex]) {
      // typed the wrong character
      setErrorCharIndexes((prevErrorCharIndexes) =>
        prevErrorCharIndexes.add(currentUserInputIndex)
      );
    }

    // if the errorCharIndexes contains an index greater than the current user index, then remove it
    setErrorCharIndexes((prevErrorCharIndexes) => {
      const updatedErrorCharIndexes = new Set<number>(prevErrorCharIndexes);
      prevErrorCharIndexes.forEach((index: number) => {
        if (index > currentUserInputIndex) {
          updatedErrorCharIndexes.delete(index);
        }
      });
      return updatedErrorCharIndexes;
    });
  }, [userInput, paragraph, currentUserInputIndex]);

  const getHighlightedCharacter = (char: string, index: number) => {
    // check if the charcter is the next character the user is supposed to type

    if (index > currentUserInputIndex) {
      const nextWordIndex = paragraph.indexOf(" ", currentUserInputIndex);
      const isNextWord =
        index >= currentUserInputIndex && index < nextWordIndex;

      if (inProgress && isNextWord) {
        return (
          <span key={index} className="next-word">
            {char}
          </span>
        );
      } else {
        return (
          <span key={index} className="text-light">
            {char}
          </span>
        );
      }
    }
    const isIndexError = errorCharIndexes.has(index);
    const className = isIndexError ? "error-char" : "success-char";
    return (
      <span key={index} className={className}>
        {char}
      </span>
    );
  };

  return (
    <p>
      {characters.map((char, i) => (
        <span key={i}>{getHighlightedCharacter(char, i)}</span>
      ))}
    </p>
  );
}
