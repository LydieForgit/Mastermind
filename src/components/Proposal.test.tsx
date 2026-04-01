import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Proposal from "./Proposal";

describe("Proposal", () => {
  it("renders 4 cases and a button when active", () => {
    const { container } = render(
      <Proposal
        setCheck={vi.fn()}
        rowIndex={0}
        gameState={{ secretCode: [], proposals: [], decodes: [], turn: 1}}
        setGameState={vi.fn()}
      />,
    );
    const cases = container.querySelectorAll(".case");
    expect(cases).toHaveLength(4);
    const button = screen.getByRole("button", { name: /valider/i });
    expect(button).toBeInTheDocument();
  });

  it("renders 4 cases with data from proposals when not active", () => {
    const { container } = render(
      <Proposal
        setCheck={vi.fn()}
        rowIndex={0}
        gameState={{ secretCode: [], proposals: [["red", "blue", "green", "yellow"]], decodes: [], turn: 2}}
        setGameState={vi.fn()}
      />,
    );
    const cases = container.querySelectorAll(".case");
    expect(cases).toHaveLength(4);
    expect(cases[0]).toHaveClass("red");
    expect(cases[1]).toHaveClass("blue");
    expect(cases[2]).toHaveClass("green");
    expect(cases[3]).toHaveClass("yellow");
  });

  it("shows palette when a case is clicked", () => {
    const caseClicked = 2;
    const { container } = render(
      <Proposal
        setCheck={vi.fn()}
        rowIndex={0}
        gameState={{ secretCode: [], proposals: [], decodes: [], turn: 1}}
        setGameState={vi.fn()}
      />,
    );
    const caseElement = container.querySelectorAll(".case")[caseClicked];
    fireEvent.click(caseElement!);
    const palette = container.querySelector(".palette");
    expect(palette).toBeInTheDocument();
    expect(palette).toHaveStyle(`left: ${caseClicked * 6 + 3.5}rem;`);
  });
});
