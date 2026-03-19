import { useState } from "react";
import "./App.css";
import { generateSecretCode } from "./Game/Initiate.js";
import Check from "./components/Check";
import Proposal from "./components/Proposal";

function App() {
  const [secretCode, setSecretCode] = useState<string[]>(generateSecretCode());
  const [turn, setTurn] = useState(1);
  const [check, setCheck] = useState<string[]>([]);
  const [proposals, setProposals] = useState<string[][]>([]);

  console.log("check:", check);
  console.log("proposals:", proposals);
  console.log("secretCode:", secretCode);

  return (
    <>
      <div>
        <h1>Mastermind</h1>
      </div>
      <div className="gameContainer">
        {Array.from({ length: turn }).map((_, rowIndex) => (
          <div key={rowIndex} className="proposal-check">
            <Proposal setCheck={setCheck} setProposals={setProposals} />
            <Check
              check={check}
              setCheck={setCheck}
              setTurn={setTurn}
              secretCode={secretCode}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
