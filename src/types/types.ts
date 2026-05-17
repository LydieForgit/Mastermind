export type IProposalPin =
  | "blue"
  | "red"
  | "green"
  | "yellow"
  | "orange"
  | "purple"
  | "";

export type IDecodePin = "red" | "white" | "";

export type IProposal = IProposalPin[];

export type IDecode = IDecodePin[];

export type GameState = {
  secretCode: IProposal;
  proposals: IProposal[];
  decodes: IDecode[];
  turn: number;
};

export type ILevel = {
  name: string;
  minCase: number;
  minColor: number;
  turn: number;
};
