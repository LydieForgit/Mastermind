import { useEffect, useState } from "react";
import "./App.css";
import { generateSecretCode } from "./Game/Initiate.js";
import Button from "./components/Button";
import Check from "./components/Check";
import Proposal from "./components/Proposal";
import type { GameState, IProposalPin } from "./types/types";

function App() {
  const [check, setCheck] = useState<IProposalPin[]>([]);

  const [gameState, setGameState] = useState<GameState>({
    secretCode: generateSecretCode(),
    proposals: [],
    decodes: [],
    turn: 1,
  });

  useEffect(() => {
    const lastDecode = gameState.decodes[gameState.turn - 1];
    if (lastDecode?.every((value) => value === "red")) {
      window.alert("Congratulations! You've cracked the code!");
      setGameState((prev) => ({
        ...prev,
        turn: prev.proposals.length,
      }));
    } else {
      setGameState((prev) => ({
        ...prev,
        turn: prev.proposals.length + 1,
      }));
    }
  }, [gameState.decodes.length]);

  console.log("secretCode in App:", gameState.secretCode);
  console.log("gameState in App:", gameState);

  const newGame = () => {
    setGameState({
      secretCode: generateSecretCode(),
      proposals: [],
      decodes: [],
      turn: 1,
    });
    setCheck([]);
  };

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
              rowIndex={rowIndex}
              gameState={gameState}
              setGameState={setGameState}
            />
            <Check
              setCheck={setCheck}
              check={check}
              rowIndex={rowIndex}
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
