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

export type TMissionsIds = [bigint, bigint, bigint, bigint];
export type TMissionsNames = [string, string, string, string];
export type TMissionsLevels = [bigint, bigint, bigint, bigint];
export type TMissionsDurations = [bigint, bigint, bigint, bigint];
export type TMissionsMinXPRewards = [bigint, bigint, bigint, bigint];
export type TMissionsMaxXPRewards = [bigint, bigint, bigint, bigint];

export type TMissions = [
  TMissionsIds,
  TMissionsNames,
  TMissionsLevels,
  TMissionsDurations,
  TMissionsMinXPRewards,
  TMissionsMaxXPRewards,
];
