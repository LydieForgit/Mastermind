import { useEffect, useState } from "react";
import "./Check.css";
import type { IDecode, GameState, IProposal } from "../types/types";

interface CheckProps {
  check: IProposal;
  setCheck: React.Dispatch<React.SetStateAction<IProposal>>;
  rowIndex: number;
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}

function Check({
  check,
  setCheck,
  rowIndex,
  gameState,
  setGameState,
}: CheckProps) {
  const [feedback, setFeedback] = useState<IDecode>([]);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (check.length === 4 && check.every(Boolean) && rowIndex === gameState.decodes.length) {
      checkProposals(check);
      setIsChecked(true);
    } else {
      if (gameState.decodes[rowIndex]) {
        setFeedback(gameState.decodes[rowIndex]);
      } else {
        setFeedback([]);
        setIsChecked(false);
      }
    }
  }, [check]);

  const checkProposals = (checking: IProposal) => {
    const newFeedback: IDecode = [];
    const secretCopy = [...gameState.secretCode];
    const checkCopy: IProposal = [...checking];

    for (let i = 0; i < 4; i++) {
      if (checking[i] === gameState.secretCode[i]) {
        newFeedback.push("red");
        secretCopy[i] = "";
        checkCopy[i] = "";
      }
    }
    for (let i = 0; i < 4; i++) {
      if (checkCopy[i] && checkCopy[i] !== "") {
        const color = checkCopy[i];
        if (color && secretCopy.includes(color)) {
          newFeedback.push("white");
          const index = secretCopy.indexOf(color);
          secretCopy[index] = "";
        }
      }
    }
    while (newFeedback.length < 4) {
      newFeedback.push("");
    }
    setFeedback(newFeedback);
    setCheck([]);

    setGameState((prev) => ({
      ...prev,
      decodes: [...prev.decodes, newFeedback],
      turn: prev.turn + 1,
    }));
  }


  return (
    <div className="check-container">
      {isChecked ? (
        <div className="feedback">
          {feedback.map((color, index) => (
            <div key={index} className={`check-case ${color}`}></div>
          ))}
        </div>
      ) : (
        <div className="feedback">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className={`check-case`}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Check;
