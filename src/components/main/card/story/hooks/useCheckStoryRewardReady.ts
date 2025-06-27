import { useEffect, useRef, useState, useCallback } from 'react';
import { readContract } from '@wagmi/core';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '@/contract';
import { config } from '@/wagmi';

export const useCheckStoryRewardReady = (heroId?: number, secondsLeft?: number) => {
  const [isReady, setIsReady] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const hasCheckedOnZero = useRef(false);

  const fetchRewardReady = useCallback(async () => {
    if (heroId == null) return;
    setIsLoading(true);
    try {
      const result = await readContract(config, {
        abi: CONTRACT_ABI,
        address: CONTRACT_ADDRESS,
        functionName: 'isStoryMissionRewardReady',
        args: [BigInt(heroId)],
      });

      setIsReady(Boolean(result));
    } catch (err) {
      console.error('Failed to check reward:', err);
      setIsReady(null);
    } finally {
      setIsLoading(false);
    }
  }, [heroId]);

  useEffect(() => {
    if (heroId == null) return;
    fetchRewardReady();
    hasCheckedOnZero.current = false;
  }, [heroId, fetchRewardReady]);

  useEffect(() => {
    if (heroId == null) return;

    if (secondsLeft === 0 && !hasCheckedOnZero.current) {
      hasCheckedOnZero.current = true;
      fetchRewardReady();
    }

    if (secondsLeft && secondsLeft > 0) {
      hasCheckedOnZero.current = false;
    }
  }, [secondsLeft, heroId, fetchRewardReady]);

  return { isReady, isLoading, refetch: fetchRewardReady };
};
