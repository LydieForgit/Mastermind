import { expect, describe, it } from "vitest";
import { generateSecretCode } from "./Initiate";

describe("Initiate", () => {
    it("should generate a secret code", () => {
        const code = generateSecretCode();
        expect(code).toHaveLength(4);
    });

    it("should have 2 times the same color at max", () => {
        for (let i = 0; i < 100; i++) {
            const code = generateSecretCode();
            code.forEach(color => {
                expect(code.filter((value) => value===color).length).toBeLessThanOrEqual(2);
            })};
    });
});