export type THeroData = {
  rarity: number;
  level: bigint;
  xp: bigint;
};
export type TFullHeroData = {
  hero: THeroData;
  owner: `0x${string}`;
  tokenUri: string;
};

export type TCheckIsOnMissionResult =
  | { success: true; result: boolean }
  | { success: false; message: string };

export type TMission = {
  id: bigint;
  name: string;
  description: string;
  minLevel: bigint;
  durationMinutes: bigint;
  minXPReward: bigint;
  maxXPReward: bigint;
};
