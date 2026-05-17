import { useEffect, useState } from "react";
import "./App.css";
import { generateSecretCode } from "./Game/Initiate.js";
import Button from "./components/Button";
import Check from "./components/Check";
import Proposal from "./components/Proposal";
import { type GameState, type ILevel, type IProposalPin } from "./types/types";

function App() {
  const [check, setCheck] = useState<IProposalPin[]>([]);

  const [gameState, setGameState] = useState<GameState>({
    secretCode: generateSecretCode(0, 0),
    proposals: [],
    decodes: [],
    turn: 1,
  });

  const [level, setLevel] = useState<ILevel>({
    name: "Easy",
    minCase: 4,
    minColor: 1,
    turn: 12,
  });

  useEffect(() => {
    setGameState({
      secretCode: generateSecretCode(level.minCase, level.minColor),
      proposals: [],
      decodes: [],
      turn: 1,
    });
    setCheck([]);
  }, [level]);

  useEffect(() => {
    const lastDecode = gameState.decodes[gameState.turn - 1];
    if (lastDecode?.every((value) => value === "red")) {
      window.alert("Congratulations! You've cracked the code!");
      setGameState((prev) => ({
        ...prev,
        turn: prev.proposals.length,
      }));
    } else if (gameState.turn < level.turn) {
      setGameState((prev) => ({
        ...prev,
        turn: prev.proposals.length + 1,
      }));
    } else if (gameState.turn === level.turn) {
      window.alert("Game Over! You've used all your turns!");
    }
  }, [gameState.decodes.length]);

  console.log("secretCode in App:", gameState.secretCode);
  console.log("gameState in App:", gameState);
  console.log("level in App:", level);

  return (
    <>
      <div>
        <h1>Mastermind</h1>
      </div>
      <div>
        <Button
          className="new-game"
          onClick={() =>
            setLevel({ name: "Easy", minCase: 4, minColor: 1, turn: 12 })
          }
          text="New Game Easy mode"
        />
        <Button
          className="new-game"
          onClick={() =>
            setLevel({ name: "Medium", minCase: 4, minColor: 2, turn: 12 })
          }
          text="New Game Medium mode"
        />
        <Button
          className="new-game"
          onClick={() =>
            setLevel({ name: "Hard", minCase: 4, minColor: 3, turn: 10 })
          }
          text="New Game Hard mode"
        />
        <p>Niveau: {level.name}</p>
        <p>
          Turn: {gameState.turn}/{level.turn}
        </p>
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
