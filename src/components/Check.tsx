import { useEffect, useState } from "react";
import "./Check.css";

interface CheckProps {
  check: string[];
  setCheck: React.Dispatch<React.SetStateAction<string[]>>;
  secretCode: string[];
  setDecodes: React.Dispatch<React.SetStateAction<string[][]>>;
  setTurn: React.Dispatch<React.SetStateAction<number>>;
}

function Check({
  check,
  setCheck,
  secretCode,
  setDecodes,
  setTurn,
}: CheckProps) {
  const [feedback, setFeedback] = useState<string[]>([]);

  useEffect(() => {
    if (check.length === 4 && check.every(Boolean)) {
      checkProposals(check);
    }
  }, [check]);

  function checkProposals(check: string[]) {
    const newFeedback: string[] = [];
    const secretCopy = [...secretCode];
    const checkCopy = [...check];

    for (let i = 0; i < 4; i++) {
      if (check[i] === secretCode[i]) {
        newFeedback.push("red");
        secretCopy[i] = "";
        checkCopy[i] = "";
      }
    }
    for (let i = 0; i < 4; i++) {
      if (checkCopy[i] && checkCopy[i] !== "") {
        const color = checkCopy[i];
        if (secretCopy.includes(color)) {
          newFeedback.push("white");
          const index = secretCopy.indexOf(color);
          secretCopy[index] = "";
        }
      }
    }
    while (newFeedback.length < 4) {
      newFeedback.push("");
    }
    setDecodes((prev) => [...prev, newFeedback]);
    setFeedback(newFeedback);
    setTurn((prev) => prev + 1);
    setCheck([]);
  }

  return (
    <div className="check-container">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className={`check-case ${feedback ? feedback[index] || "" : ""}`}
        ></div>
      ))}
    </div>
  );
}

export default Check;
