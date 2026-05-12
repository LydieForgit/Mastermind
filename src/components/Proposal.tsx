import { useEffect, useState } from "react";
import { pieceColors } from "../Game/Initiate";
import Button from "./Button";
import "./Proposal.css";
import type { GameState, IProposal, IProposalPin } from "../types/types";

interface ProposalProps {
  setCheck: React.Dispatch<React.SetStateAction<IProposal>>;
  rowIndex: number;
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}

function Proposal({
  setCheck,
  rowIndex,
  gameState,
  setGameState,
}: ProposalProps) {
  const [combination, setCombination] = useState<IProposal>(Array(4).fill(""));
  const [caseClicked, setCaseClicked] = useState<number | null>(null);
  const [showPalettes, setShowPalettes] = useState(false);
  const [isActive, setIsActive] = useState(Boolean);

  useEffect(() => {
    if (rowIndex === gameState.turn - 1) {
      setIsActive(true);
      setCombination(Array(4).fill(""));
    } else {
      setIsActive(false);
      setCombination(gameState.proposals[rowIndex]!);
    }
  }, [gameState.turn]);

  function handleColorClick(color: IProposalPin) {
    if (caseClicked !== null && isActive) {
      const newCombination = [...combination];
      newCombination[caseClicked] = color;
      setCombination(newCombination);
      setCaseClicked(null);
      setShowPalettes(false);
    }
  }

  function handleCaseClick(caseIndex: number) {
    if (isActive) {
      setCaseClicked(caseIndex);
      setShowPalettes(true);
    }
  }

  function handleValidation() {
    const isComplete = combination.length === 4 && combination.every(Boolean);
    if (isComplete) {
      setCheck(combination);
      setGameState((prev) => ({
        ...prev,
        proposals: [...prev.proposals, combination],
      }))
    } else {
      console.log("Please fill in all 4 cases");
    }
  }

  return (
    <div className="proposal-container">
      {showPalettes && caseClicked !== null ? (
        <div
          className="palette"
          style={{
            left: `${caseClicked * 6 + 3.5}rem`,
            top: "-9rem",
          }}
        >
          {pieceColors.map((color, index) => (
            <div
              key={index}
              className={`${color} case-palette`}
              data-testid="palette-color"
              onClick={() => handleColorClick(color)}
            />
          ))}
        </div>
      ) : null}
      {isActive ? (
        <div className="row">
          {Array.from({ length: 4 }).map((_, caseIndex) => (
            <div
              key={caseIndex}
              className={
                "case" +
                (combination[caseIndex]
                  ? " " + combination[caseIndex]
                  : " neutral")
              }
              onClick={() => handleCaseClick(caseIndex)}
            />
          ))}
          <Button className="validate" onClick={() => handleValidation()} text="Valider" />
        </div>
      ) : (
        <div className="row">
          {combination.map((color, caseIndex) => (
            <div key={caseIndex} className={`case ${color}`}></div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Proposal;
