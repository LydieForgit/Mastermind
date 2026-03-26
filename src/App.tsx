import { useEffect, useState } from "react";
import "./App.css";
import { generateSecretCode } from "./Game/Initiate.js";
import Check from "./components/Check";
import Proposal from "./components/Proposal";
import Button from "./components/Button";

function App() {
  const [secretCode, setSecretCode] = useState<string[]>(generateSecretCode());
  const [turn, setTurn] = useState(1);
  const [check, setCheck] = useState<string[]>([]);
  const [proposals, setProposals] = useState<string[][]>([]);
  const [decodes, setDecodes] = useState<string[][]>([]);


  useEffect(() => {
    setTurn(proposals.length + 1);
  }, [proposals]);

  console.log("secretCode in App:", secretCode);
  console.log("proposals in App:", proposals);
  console.log("decodes in App:", decodes);

  function newGame() {
    setSecretCode(generateSecretCode());
    setTurn(1);
    setCheck(['', '', '', '']);
    setProposals([]);
    setDecodes([]);
  }

  return (
    <>
      <div>
        <h1>Mastermind</h1>
      </div>
      <div>
        <Button className="new-game" onClick={newGame} text="New Game" />
      </div>
      <div className="gameContainer">
        {Array.from({ length: turn }).map((_, rowIndex) => (
          <div key={rowIndex} className="proposal-check">
            <Proposal
              setCheck={setCheck}
              setProposals={setProposals}
              rowIndex={rowIndex}
              proposals={proposals}
              turn={turn}
            />
            <Check
              setCheck={setCheck}
              check={check}
              secretCode={secretCode}
              setTurn={setTurn}
              rowIndex={rowIndex}
              decodes={decodes}
              setDecodes={setDecodes}
              proposals={proposals}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
