import { useState } from "react";
import "./App.css";
import { generateSecretCode } from "./Game/Initiate.js";
import Proposal from "./components/Proposal";

function App() {
  const [secretCode, setSecretCode] = useState(generateSecretCode());
  const [turn, setTurn] = useState(1);
  const [check, setCheck] = useState([]);
  const [proposals, setProposals] = useState([]);

  function checkProposals(secretCode) {
    if (check.length === 4) {
      for (let i = 0; i < 4; i++) {
        if (check[i] === secretCode[i]) {
          console.log("Correct color and position");
        } else if (
          secretCode
            .map((color) => color.toLowerCase())
            .includes(check[i].toLowerCase())
        ) {
          console.log("Correct color but wrong position");
        } else {
          console.log("Incorrect color");
        }
      }
      setTurn(turn + 1);
      setCheck([]);
    }
  }

  checkProposals(secretCode);

  console.log(secretCode);
  console.log(typeof check);
  console.log(check);

  return (
    <>
      <div>
        <h1>Mastermind</h1>
      </div>
      <div className="gameContainer">
        {Array.from({ length: turn }).map((_, rowIndex) => (
          <Proposal key={rowIndex} />
        ))}
      </div>
    </>
  );
}

export default App;
