import { useReadContract } from 'wagmi';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '@/contract';

export interface HeroData {
  rarity: number;
  level: bigint;
  xp: bigint;
}

export interface FullHeroData {
  hero: HeroData;
  owner: `0x${string}`;
  uri: string;
}

export function useHeroData(heroId?: number) {
  const heroIdAsBigInt = heroId !== undefined ? BigInt(heroId) : undefined;

  const { data, isLoading, isError, error, isSuccess, refetch } = useReadContract({
    abi: CONTRACT_ABI,
    address: CONTRACT_ADDRESS,
    functionName: 'getHeroData',
    args: heroIdAsBigInt !== undefined ? [heroIdAsBigInt] : undefined,
    query: {
      enabled: heroIdAsBigInt !== undefined,
    },
  });

  const heroData: FullHeroData | undefined = data
    ? {
        hero: {
          rarity: Number(data[0].rarity),
          level: BigInt(data[0].level),
          xp: BigInt(data[0].xp),
        },
        owner: data[1] as `0x${string}`,
        uri: data[2] as string,
      }
    : undefined;

  return {
    heroData,
    isLoading,
    isError,
    heroDataError: error,
    isSuccess,
    refetchHero: refetch,
  };
}
