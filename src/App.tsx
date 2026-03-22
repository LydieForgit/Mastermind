import { useEffect, useState } from 'react';
import './App.css';
import { generateSecretCode } from './Game/Initiate.js';
import Check from './components/Check';
import Proposal from './components/Proposal';
import type { Color, FeedbackPeg } from './types/types';

function App() {
  const [secretCode, setSecretCode] = useState<Color[]>(generateSecretCode());
  const [turn, setTurn] = useState(1);
  const [check, setCheck] = useState<Color[]>([]);
  const [proposals, setProposals] = useState<Color[][]>([]);
  const [decodes, setDecodes] = useState<FeedbackPeg[][]>([]);

  useEffect(() => {
    setTurn(proposals.length + 1);
  }, [proposals]);

  const resetGame = () => {
    setSecretCode(generateSecretCode());
    setTurn(1);
    setCheck([]);
    setProposals([]);
    setDecodes([]);
  };

  console.log('check:', check);
  console.log('proposals:', proposals);
  console.log('decodes:', decodes);
  console.log('secretCode:', secretCode);

  return (
    <>
      <div>
        <h1>Mastermind</h1>
        <button onClick={resetGame}>Nouvelle partie</button>
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
              check={check}
              setCheck={setCheck}
              secretCode={secretCode}
              setDecodes={setDecodes}
              setTurn={setTurn}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
