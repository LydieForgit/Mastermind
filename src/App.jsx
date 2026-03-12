import { useState } from 'react'
import './App.css';
import { pieceColors, generateSecretCode } from './Game/Initiate.js';

function App() {
  const [ secretCode, setSecretCode ] = useState(generateSecretCode());
  const [ turn, setTurn ] = useState(1);
  const [ check, setCheck ] = useState([]);
  const [ proposals, setProposals ] = useState([]);
  const [ caseClicked, setCaseClicked ] = useState(null);
  
  console.log(secretCode);

  return (
    <>
      <div>
      <h1>Mastermind</h1>
      </div>
      <div className='gameContainer'>
        {Array.from({ length: 10 }).map((_, rowIndex) => (
          <div key={rowIndex} className='row'>
            {Array.from({ length: 4 }).map((_, caseIndex) => (
              <div 
                key={caseIndex} 
                className='case' 
                onClick={() => setCaseClicked(caseIndex)}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </>
  )
}

export default App
