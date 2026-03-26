import { useEffect, useState } from "react";
import "./Check.css";

interface CheckProps {
  setCheck: React.Dispatch<React.SetStateAction<string[]>>;
  check: string[];
  secretCode: string[];
  setTurn: React.Dispatch<React.SetStateAction<number>>;
  rowIndex: number;
  setDecodes: React.Dispatch<React.SetStateAction<string[][]>>;
  decodes: string[][];
  proposals: string[][];
}

function Check({
  check,
  setCheck,
  secretCode,
  setTurn,
  rowIndex,
  setDecodes,
  decodes,
}: CheckProps) {
  const [feedback, setFeedback] = useState<string[]>([]);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (check.length === 4 && check.every(Boolean) && rowIndex === decodes.length) {
      checkProposals(check);
      setIsChecked(true);
    } else {
      if (decodes[rowIndex]) {
        setFeedback(decodes[rowIndex]);
      }
    }
  }, [check]);

  function checkProposals(checking: string[]) {
    const newFeedback: string[] = [];
    const secretCopy = [...secretCode];
    const checkCopy = [...checking];

    for (let i = 0; i < 4; i++) {
      if (checking[i] === secretCode[i]) {
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
    setDecodes((prev) => [...prev, newFeedback]);
    console.log("decodes dans checkProposals:", decodes);
    setTurn((prev) => prev + 1);
    setCheck([]);
    console.log("decodes fin checkProposals:", decodes);
  }

  console.log("feedback:", feedback);
  console.log("decodes:", decodes);
  console.log("decode du row:", decodes[rowIndex]);


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
