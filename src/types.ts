export type THero = {
  name: string;
  description: string;
  image: string;
  attributes: TAttribute[];
};

type TAttribute = {
  trait_type: string;
  value: string;
};

export type TCheckIsOnMissionResult =
  | { success: true; result: boolean }
  | { success: false; message: string };

export type TMission = {
  name: string;
  minLevel: bigint;
  durationMinutes: bigint;
  minXPReward: bigint;
  maxXPReward: bigint;
};