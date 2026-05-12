import { useEffect, useState } from "react";
import "./App.css";
import { generateSecretCode } from "./Game/Initiate.js";
import Check from "./components/Check";
import Button from "./components/Button";
import type { GameState, IProposalPin } from "./types/types";
import Proposal from "./components/Proposal";

function App() {
  const [check, setCheck] = useState<IProposalPin[]>([]);

  const [gameState, setGameState] = useState<GameState>({
    secretCode: generateSecretCode(),
    proposals: [],
    decodes: [],
    turn: 1,
  });
  
  // const [secretCode, setSecretCode] = useState<string[]>(generateSecretCode());
  // const [turn, setTurn] = useState(1);
  // const [proposals, setProposals] = useState<string[][]>([]);
  // const [decodes, setDecodes] = useState<string[][]>([]);

  useEffect(() => {
    setGameState((prev) => ({
      ...prev,
      turn: prev.proposals.length + 1,
    }))
    // setTurn(proposals.length + 1);
  }, [gameState.proposals.length]);

  console.log("secretCode in App:", gameState.secretCode);
  console.log("proposals in App:", gameState.proposals);
  console.log("decodes in App:", gameState.decodes);

  const newGame = () => {
    setGameState({
      secretCode: generateSecretCode(),
      proposals: [],
      decodes: [],
      turn: 1,
    });

    // setSecretCode(generateSecretCode());
    // setTurn(1);
    setCheck([]);
    // setProposals([]);
    // setDecodes([]);
  }

  return (
    <>
      <div>
        <h1>Mastermind</h1>
      </div>
      <div>
        <Button className="new-game" onClick={newGame} text="New Game" />
        <p>Turn: {gameState.turn}</p>
      </div>
      <div className="gameContainer">
        {Array.from({ length: gameState.turn }).map((_, rowIndex) => (
          <div key={rowIndex} className="proposal-check">
            <Proposal
              setCheck={setCheck}
              // setProposals={setProposals}
              rowIndex={rowIndex}
              // proposals={proposals}
              // turn={turn}

              gameState={gameState}
              setGameState={setGameState}
            />
            <Check
              setCheck={setCheck}
              check={check}
              // secretCode={secretCode}
              // setTurn={setTurn}
              rowIndex={rowIndex}
              // decodes={decodes}
              // setDecodes={setDecodes}
              // proposals={proposals}

              gameState={gameState}
              setGameState={setGameState}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
