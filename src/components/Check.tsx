import { useEffect, useState } from "react";
import { createFeedback } from "../Game/CheckCombo";
import type { GameState, IDecode, IProposal } from "../types/types";
import "./Check.css";

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
    if (
      check.length === 4 &&
      check.every(Boolean) &&
      rowIndex === gameState.decodes.length
    ) {
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
    const newFeedback = createFeedback(checking, gameState.secretCode);
    setFeedback(newFeedback);
    setCheck([]);
    setGameState((prev) => ({
      ...prev,
      decodes: [...prev.decodes, newFeedback],
    }));
  };

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
            <div key={index} className={`check-case`}></div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Check;
