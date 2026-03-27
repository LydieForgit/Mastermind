export const pieceColors: string[] = [
  "blue",
  "red",
  "green",
  "yellow",
  "orange",
  "purple",
];

export function generateSecretCode(): string[] {
  const generatedCode: string[] = [];
  while (generatedCode.length < 4) {
    let randomColor =
      pieceColors[Math.floor(Math.random() * pieceColors.length)];
    if (
      randomColor !== undefined && 
      generatedCode.filter((value) => value === randomColor).length < 2) {
      generatedCode.push(randomColor);
    }
  }
  return generatedCode;
}
