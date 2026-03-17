import { useState } from "react";
import { pieceColors } from "../Game/Initiate";
import "./Proposal.css";

function Proposal() {
  const [combination, setCombination] = useState([]);
  const [check, setCheck] = useState([]);
  const [caseClicked, setCaseClicked] = useState(null);
  const [pickedColor, setPickedColor] = useState(null);
  const [showPalettes, setShowPalettes] = useState(false);

  function handleColorClick(pickedColor, caseClicked, combination) {
    if (caseClicked !== null && pickedColor !== null) {
      const newCombination = [...combination];
      newCombination[caseClicked] = pickedColor;
      setCombination(newCombination);
      setCaseClicked(null);
      setPickedColor(null);
      setShowPalettes(false);
    }
  }

  handleColorClick(pickedColor, caseClicked, combination);

  return (
    <div className="proposal-container">
      {showPalettes ? (
        <div
          className="palette"
          style={{
            left: `${caseClicked * 6 + 3.5}rem`, // Ajustez le calcul si nécessaire (6rem par case + offset)
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
              (combination[caseIndex] ? " " + combination[caseIndex] : "")
            }
            onClick={() => {
              setCaseClicked(caseIndex);
              setShowPalettes(true);
            }}
          ></div>
        ))}
        <button onClick={() => setCheck(combination)}>Valider</button>
      </div>
    </div>
  );
}

export default Proposal;
