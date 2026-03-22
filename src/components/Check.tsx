import { useEffect, useState } from 'react';
import './Check.css';
import type { Color, FeedbackPeg } from '../types/types';

interface CheckProps {
  check: Color[];
  setCheck: React.Dispatch<React.SetStateAction<Color[]>>;
  secretCode: Color[];
  setDecodes: React.Dispatch<React.SetStateAction<FeedbackPeg[][]>>;
  setTurn: React.Dispatch<React.SetStateAction<number>>;
}

function Check({
  check,
  setCheck,
  secretCode,
  setDecodes,
  setTurn,
}: CheckProps) {
  // Initialize feedback to avoid undefined in render
  const [feedback, setFeedback] = useState<FeedbackPeg[]>(Array(4).fill(''));

  useEffect(() => {
    if (check.length === 4 && check.every(Boolean)) {
      checkProposals(check);
    }
  }, [check]);

  function checkProposals(check: Color[]) {
    const newFeedback: FeedbackPeg[] = [];
    // Explicitly type copies to allow '' as a marker
    const secretCopy: (Color | '')[] = [...secretCode];
    const checkCopy: (Color | '')[] = [...check];

    for (let i = 0; i < 4; i++) {
      if (check[i] === secretCode[i]) {
        newFeedback.push('red');
        secretCopy[i] = '';
        checkCopy[i] = '';
      }
    }
    for (let i = 0; i < 4; i++) {
      if (checkCopy[i] && checkCopy[i] !== '') {
        // Cast to Color since we've checked it's not ''
        const color = checkCopy[i] as Color;
        if (secretCopy.includes(color)) {
          newFeedback.push('white');
          const index = secretCopy.indexOf(color);
          secretCopy[index] = '';
        }
      }
    }
    while (newFeedback.length < 4) {
      newFeedback.push('');
    }
    setDecodes((prev) => [...prev, newFeedback]);
    setFeedback(newFeedback);
    setTurn((prev) => prev + 1);
    setCheck([]);
  }

  return (
    <div className="check-container">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className={`check-case ${feedback[index] || ''}`}
        ></div>
      ))}
    </div>
  );
}

export default Check;
