export const pieceColors = ['blue', 'red', 'green', 'yellow', 'orange', 'purple'];

export function generateSecretCode() {
    const generatedCode = [];
    while (generatedCode.length < 4) {
        const pieceColor = pieceColors[Math.floor(Math.random() * pieceColors.length)];
        if (generatedCode.filter((value) => value===pieceColor).length < 2) {
            generatedCode.push(pieceColor);
        }
    }
    return generatedCode;
}