import { useState } from "react";
import { pieceColors } from "../Game/Initiate";
import type { IProposal, IProposalPin } from "../types/types";
import "./Proposal.css";

interface ProposalProps {
  combination: IProposal;
  setCombination: React.Dispatch<React.SetStateAction<IProposal>>;
  isActive: boolean;
  isGameOver: boolean;
}

function Proposal({
  combination,
  setCombination,
  isActive,
  isGameOver,
}: ProposalProps) {
  const [caseClicked, setCaseClicked] = useState<number | null>(null);
  const [showPalettes, setShowPalettes] = useState(false);

  function handleColorClick(color: IProposalPin) {
    if (caseClicked !== null && isActive && !isGameOver) {
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
      {isActive && !isGameOver ? (
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
