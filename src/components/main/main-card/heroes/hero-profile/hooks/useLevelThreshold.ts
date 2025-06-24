import { useEffect, useState } from 'react';
import { useReadContracts } from 'wagmi';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '@/contract';

export function useLevelThreshold(level?: bigint) {
  const [currentLevelArg, setCurrentLevelArg] = useState<bigint | undefined>();
  const [nextLevelArg, setNextLevelArg] = useState<bigint | undefined>();

  useEffect(() => {
    if (level !== undefined) {
      setCurrentLevelArg(level);
      setNextLevelArg(level + 1n);
    }
  }, [level]);

  const { data, isLoading, isError, error } = useReadContracts({
    contracts:
      currentLevelArg !== undefined && nextLevelArg !== undefined
        ? [
            {
              abi: CONTRACT_ABI,
              address: CONTRACT_ADDRESS,
              functionName: 'levelThresholds',
              args: [currentLevelArg],
            },
            {
              abi: CONTRACT_ABI,
              address: CONTRACT_ADDRESS,
              functionName: 'levelThresholds',
              args: [nextLevelArg],
            },
          ]
        : [],
    query: {
      enabled: currentLevelArg !== undefined && nextLevelArg !== undefined,
    },
  });

  return {
    currentThreshold: data?.[0]?.result as bigint | undefined,
    nextThreshold: data?.[1]?.result as bigint | undefined,
    isLoading,
    isError,
    error,
  };
}
