import type { IDecode, IProposal } from "../types/types";

export function createFeedback(proposal: IProposal, secretCode: IProposal) {
  const newFeedback: IDecode = [];
  const secretCopy = [...secretCode];
  const proposalCopy: IProposal = [...proposal];

  for (let i = 0; i < 4; i++) {
    if (proposal[i] === secretCode[i]) {
      newFeedback.push("red");
      secretCopy[i] = "";
      proposalCopy[i] = "";
    }
  }
  for (let i = 0; i < 4; i++) {
    if (proposalCopy[i] && proposalCopy[i] !== "") {
      const color = proposalCopy[i];
      if (color && secretCopy.includes(color)) {
        newFeedback.push("white");
        const index = secretCopy.indexOf(color);
        secretCopy[index] = "";
      }
    }
  }
  while (newFeedback.length < 4) {
    newFeedback.push("");
  }
  return newFeedback;
}
