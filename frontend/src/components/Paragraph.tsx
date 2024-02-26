import { useEffect, useMemo, useState } from "react";
import { SampleParagraph } from "../lib/sample-paragraphs";
import "../css/Paragraph.scss";
type ParagraphProps = {
  paragraph: string;
  userInput: string;
};

export default function Paragraph({ paragraph, userInput }: ParagraphProps) {
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
      setErrorCharIndexes(errorCharIndexes.add(currentUserInputIndex));
    }

    // if the errorCharIndexes contains a index greater than the current user index, then remove it
    const updatedErrorCharIndexes = new Set<number>(errorCharIndexes);
    errorCharIndexes.forEach((index: number) => {
      if (index > currentUserInputIndex) {
        updatedErrorCharIndexes.delete(index);
      }
    });
    setErrorCharIndexes(updatedErrorCharIndexes);
  }, [userInput, paragraph]);

  const getHighlightedCharacter = (char: string, index: number) => {
    if (index > currentUserInputIndex) {
      return (
        <span key={index} className="text-light">
          {char}
        </span>
      );
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