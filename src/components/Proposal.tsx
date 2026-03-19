import { useState } from "react";
import { pieceColors } from "../Game/Initiate";
import "./Proposal.css";

interface ProposalProps {
  setCheck: React.Dispatch<React.SetStateAction<string[]>>;
  setProposals: React.Dispatch<React.SetStateAction<string[][]>>;
}

function Proposal({ setCheck, setProposals }: ProposalProps) {
  const [combination, setCombination] = useState<string[]>(Array(4).fill(""));
  const [caseClicked, setCaseClicked] = useState<number | null>(null);
  const [pickedColor, setPickedColor] = useState<string | null>(null);
  const [showPalettes, setShowPalettes] = useState(false);

  function handleColorClick(
    pickedColor: string | null,
    caseClicked: number | null,
    combination: string[],
  ) {
    if (caseClicked !== null && pickedColor !== null) {
      const newCombination = [...combination];
      newCombination[caseClicked] = pickedColor;
      setCombination(newCombination);
      setCaseClicked(null);
      setPickedColor(null);
      setShowPalettes(false);
    }
  }

  function handleValidation() {
    const isComplete = combination.length === 4 && combination.every(Boolean);

    if (isComplete) {
      setCheck(combination);
      setProposals((prev) => [...prev, combination]);
      setCombination(Array(4).fill(""));
    } else {
      console.log("Please fill in all 4 cases");
    }
  }

  handleColorClick(pickedColor, caseClicked, combination);

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
              onClick={() => setPickedColor(color)}
            />
          ))}
        </div>
      ) : null}
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
            onClick={() => {
              setCaseClicked(caseIndex);
              setShowPalettes(true);
            }}
          ></div>
        ))}
        <button onClick={() => handleValidation()}>Valider</button>
      </div>
    </div>
  );
}

export default Proposal;
