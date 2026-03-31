import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Proposal from "./Proposal";

describe("Proposal", () => {
  it("renders 4 cases and a button when active", () => {
    const { container } = render(
      <Proposal
        setCheck={vi.fn()}
        setProposals={vi.fn()}
        rowIndex={0}
        proposals={[]}
        turn={1}
      />,
    );
    const cases = container.querySelectorAll(".case");
    expect(cases).toHaveLength(4);
    const button = screen.getByRole("button", { name: /valider/i });
    expect(button).toBeInTheDocument();
  });

  it("renders 4 cases with data from proposals when not active", () => {
    const proposals = [["red", "blue", "green", "yellow"]];
    const { container } = render(
      <Proposal
        setCheck={vi.fn()}
        setProposals={vi.fn()}
        rowIndex={0}
        proposals={proposals}
        turn={2}
      />,
    );
    const cases = container.querySelectorAll(".case");
    expect(cases).toHaveLength(4);
    expect(cases[0]).toHaveClass("red");
    expect(cases[1]).toHaveClass("blue");
    expect(cases[2]).toHaveClass("green");
    expect(cases[3]).toHaveClass("yellow");
  });
});
