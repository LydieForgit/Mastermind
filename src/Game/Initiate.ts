import { COLORS, type Color } from '../types/types';

export const pieceColors: readonly Color[] = COLORS;

export function generateSecretCode(): Color[] {
  const generatedCode: Color[] = [];
  while (generatedCode.length < 4) {
    const pieceColor = pieceColors[
      Math.floor(Math.random() * pieceColors.length)
    ] as Color;
    if (generatedCode.filter((value) => value === pieceColor).length < 2) {
      generatedCode.push(pieceColor);
    }
  }
  return generatedCode;
}
