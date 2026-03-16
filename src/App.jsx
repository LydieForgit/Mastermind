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
  

  function handleColorClick(pickedColor, caseClicked, proposals) {
  if (caseClicked !== null && pickedColor !== null) {
    const newProposals = [...proposals];
    newProposals[caseClicked] = pickedColor;
    setProposals(newProposals);
    setCaseClicked(null);
    setPickedColor(null);
  }
}

function checkProposals(secretCode) {
  if (check.length === 4) {
    for (let i = 0; i < 4; i++) {
      if (check[i] === secretCode[i]) {
        console.log('Correct color and position');
      } else if (secretCode.map(color => color.toLowerCase()).includes(check[i].toLowerCase())) {
        console.log('Correct color but wrong position');
      } else {
        console.log('Incorrect color');
      }
    }
    setTurn(turn + 1);
    setCheck([]);
  }
}
  

handleColorClick(pickedColor, caseClicked, proposals);
checkProposals(secretCode);

console.log(secretCode);
console.log(typeof check);
console.log(check);


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
          <button onClick={() => setCheck(proposals)}>Valider</button>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
