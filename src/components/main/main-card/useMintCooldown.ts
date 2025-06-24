import { useCallback, useEffect, useRef, useState } from 'react';
import { readContract } from '@wagmi/core';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '@/contract';
import { config } from '@/wagmi';

type CooldownState = {
  secondsLeft: number;
  isRunning: boolean;
  error: string | null;
};
type TMintCooldownResult = [cooldown: bigint, lastMint: bigint, remaining: bigint];

const fetchMintCooldown = async (address: `0x${string}`): Promise<TMintCooldownResult> => {
  const result = await readContract(config, {
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getUserMintCooldown',
    args: [address],
  });

  return result as TMintCooldownResult;
};

export const useMintCooldownTimer = (address?: `0x${string}`) => {
  const [cooldownState, setCooldownState] = useState<CooldownState>({
    secondsLeft: 0,
    isRunning: false,
    error: null,
  });

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchAndStart = useCallback(async () => {
    if (!address) return;
    if (intervalRef.current) clearInterval(intervalRef.current);
    setCooldownState({ secondsLeft: 0, isRunning: false, error: null });

    try {
      const [, , remaining] = await fetchMintCooldown(address);

      if (remaining <= 0n) return;

      setCooldownState({
        secondsLeft: Number(remaining),
        isRunning: true,
        error: null,
      });

      intervalRef.current = setInterval(() => {
        setCooldownState((prev) => {
          if (prev.secondsLeft <= 1) {
            clearInterval(intervalRef.current!);
            return { ...prev, secondsLeft: 0, isRunning: false };
          }
          return { ...prev, secondsLeft: prev.secondsLeft - 1 };
        });
      }, 1000);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setCooldownState({ secondsLeft: 0, isRunning: false, error: message });
    }
  }, [address]);

  useEffect(() => {
    fetchAndStart();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [fetchAndStart]);

  return {
    secondsLeft: cooldownState.secondsLeft,
    isRunning: cooldownState.isRunning,
    error: cooldownState.error,
    refreshCooldown: fetchAndStart,
  };
};
