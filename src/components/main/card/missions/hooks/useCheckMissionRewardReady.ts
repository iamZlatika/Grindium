import { useEffect, useRef, useState } from 'react';
import { readContract } from '@wagmi/core';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '@/contract';
import { config } from '@/wagmi';

export const useCheckMissionRewardReady = (heroId?: number, secondsLeft?: number) => {
  const [isReady, setIsReady] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const hasCheckedOnZero = useRef(false);

  useEffect(() => {
    if (heroId == null) return;

    const checkRewardReady = async () => {
      setIsLoading(true);
      try {
        const result = await readContract(config, {
          abi: CONTRACT_ABI,
          address: CONTRACT_ADDRESS,
          functionName: 'isMissionRewardReady',
          args: [BigInt(heroId)],
        });

        setIsReady(Boolean(result));
      } catch (err) {
        console.error('Failed to check reward:', err);
        setIsReady(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkRewardReady();
    hasCheckedOnZero.current = false;
  }, [heroId]);

  useEffect(() => {
    if (heroId == null) return;

    if (secondsLeft === 0 && !hasCheckedOnZero.current) {
      hasCheckedOnZero.current = true;

      const checkRewardReady = async () => {
        setIsLoading(true);
        try {
          const result = await readContract(config, {
            abi: CONTRACT_ABI,
            address: CONTRACT_ADDRESS,
            functionName: 'isMissionRewardReady',
            args: [BigInt(heroId)],
          });

          setIsReady(Boolean(result));
        } catch (err) {
          console.error('Failed to check reward at 0:', err);
          setIsReady(null);
        } finally {
          setIsLoading(false);
        }
      };

      checkRewardReady();
    }

    if (secondsLeft && secondsLeft > 0) {
      hasCheckedOnZero.current = false;
    }
  }, [secondsLeft, heroId]);

  return { isReady, isLoading };
};
