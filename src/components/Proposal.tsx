import { useEffect, useState } from 'react';
import { pieceColors } from '../Game/Initiate';
import './Proposal.css';
import type { Color } from '../types/types';

interface ProposalProps {
  setCheck: React.Dispatch<React.SetStateAction<Color[]>>;
  setProposals: React.Dispatch<React.SetStateAction<Color[][]>>;
  rowIndex: number;
  proposals: Color[][];
  turn: number;
}

function Proposal({
  setCheck,
  setProposals,
  rowIndex,
  proposals,
  turn,
}: ProposalProps) {
  const [combination, setCombination] = useState<Color[]>([] as Color[]);
  const [caseClicked, setCaseClicked] = useState<number | null>(null);
  const [showPalettes, setShowPalettes] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (rowIndex === turn - 1) {
      setIsActive(true);
      setCombination(Array(4).fill(''));
    } else {
      setIsActive(false);
      setCombination(proposals[rowIndex]!);
    }
  }, [rowIndex]);

  const handleColorClick = (color: Color) => {
    if (caseClicked !== null && isActive) {
      const newCombination = [...combination];
      newCombination[caseClicked] = color;
      setCombination(newCombination);
      setCaseClicked(null);
      setShowPalettes(false);
    }
  };

  const handleCaseClick = (caseIndex: number) => {
    if (isActive) {
      setCaseClicked(caseIndex);
      setShowPalettes(true);
    }
  };

  const handleValidation = () => {
    const isComplete = combination.length === 4 && combination.every(Boolean);
    if (isComplete) {
      setCheck(combination);
      setProposals((prev) => [...prev, combination]);
    } else {
      alert('Please fill in all 4 cases');
    }
  };

  return (
    <div className="proposal-container">
      {showPalettes && caseClicked !== null ? (
        <div
          className="palette"
          style={{
            left: `${caseClicked * 6 + 3.5}rem`,
            top: '-9rem',
          }}
        >
          {pieceColors.map((color, index) => (
            <div
              key={index}
              className={`${color} case-palette`}
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
                'case' +
                (combination[caseIndex]
                  ? ' ' + combination[caseIndex]
                  : ' neutral')
              }
              onClick={() => handleCaseClick(caseIndex)}
            />
          ))}
          <button onClick={() => handleValidation()}>Valider</button>
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
