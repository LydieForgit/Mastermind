import { useEffect, useState } from "react";
import type { IGameState, IProposal, IProposalPin } from "../types/types";
import Button from "./Button";
import Check from "./Check";
import Proposal from "./Proposal";

interface GameRowProps {
  rowIndex: number;
  gameState: IGameState;
  setGameState: React.Dispatch<React.SetStateAction<IGameState>>;
  isGameOver: boolean;
}

function GameRow({
  rowIndex,
  gameState,
  setGameState,
  isGameOver,
}: GameRowProps) {
  const [check, setCheck] = useState<IProposalPin[]>([]);
  const [combination, setCombination] = useState<IProposal>(Array(4).fill(""));
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (rowIndex === gameState.turn - 1 && !isGameOver) {
      setIsActive(true);
      setCombination(Array(4).fill(""));
    } else {
      setIsActive(false);
      setCombination(gameState.proposals[rowIndex]!);
    }
  }, [gameState, gameState.decodes]);

  function handleValidation() {
    const isComplete = combination.length === 4 && combination.every(Boolean);
    if (isComplete) {
      setCheck(combination);
      setGameState((prev) => ({
        ...prev,
        proposals: [...prev.proposals, combination],
      }));
      setIsActive(false);
    } else {
      console.log("Please fill in all 4 cases");
    }
  }

  return (
    <div className="proposal-check">
      <Proposal
        combination={combination}
        setCombination={setCombination}
        isActive={isActive}
        isGameOver={isGameOver}
      />
      <Check
        setCheck={setCheck}
        check={check}
        rowIndex={rowIndex}
        gameState={gameState}
        setGameState={setGameState}
      />
      {isActive && !isGameOver && (
        <Button
          className="validate"
          onClick={() => handleValidation()}
          text="✔"
        />
      )}
    </div>
  );
}

export default GameRow;
