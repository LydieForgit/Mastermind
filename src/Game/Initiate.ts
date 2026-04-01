import type { IProposal, IProposalPin } from "../types/types";

export const pieceColors: IProposalPin[] = [
  "blue",
  "red",
  "green",
  "yellow",
  "orange",
  "purple",
];

export function generateSecretCode(): IProposal {
  const generatedCode: IProposalPin[] = [];
  while (generatedCode.length < 4) {
    const randomColor =
      pieceColors[Math.floor(Math.random() * pieceColors.length)];
    if (
      randomColor !== undefined && 
      generatedCode.filter((value) => value === randomColor).length < 2) {
      generatedCode.push(randomColor);
    }
  }
  return generatedCode;
}
