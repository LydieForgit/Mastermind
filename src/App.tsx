import { useState, useEffect } from 'react'
import './App.css';
import { pieceColors, generateSecretCode } from './Game/Initiate.js';

function App() {
  const [ secretCode, setSecretCode ] = useState(generateSecretCode());
  const [ turn, setTurn ] = useState(1);
  const [ check, setCheck ] = useState([]);
  const [ proposals, setProposals ] = useState([]);
  const [ caseClicked, setCaseClicked ] = useState(null);
  const [ pickedColor, setPickedColor ] = useState(null);
  

  function handleColorClick(pickedColor, caseClicked, turn, proposals) {
  if (caseClicked !== null && pickedColor !== null) {
    const newProposals = [...proposals];
    newProposals[caseClicked] = pickedColor;
    setProposals(newProposals);
    setCaseClicked(null);
    setPickedColor(null);
  }
}

handleColorClick(pickedColor, caseClicked, turn, proposals);

console.log(secretCode);
console.log(proposals);
console.log(pickedColor);
console.log(caseClicked);

  return (
    <>
      <div>
      <h1>Mastermind</h1>
      </div>
      <div>
        {pieceColors.map((color, index) => (
          <div 
          key={index} 
          className={`${color} case`}
          onClick={()=>setPickedColor(color)}></div>
        ))}
      </div>
      <div className='gameContainer'>
        {Array.from({ length: turn }).map((_, rowIndex) => (
          <div key={rowIndex} className='row'>
            {Array.from({ length: 4 }).map((_, caseIndex) => (
              <div 
                key={caseIndex} 
                className={'case' + (proposals[caseIndex] ? ' ' + proposals[caseIndex] : '')}
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
