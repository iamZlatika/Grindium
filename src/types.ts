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

export type TBaseQuest = {
  id: bigint;
  name: string;
  description: string;
  minLevel: bigint;
  durationMinutes: bigint;
};

export type TMission = TBaseQuest & {
  minXPReward: bigint;
  maxXPReward: bigint;
};

export type TStory = TBaseQuest & {
  xpReward: bigint;
};
