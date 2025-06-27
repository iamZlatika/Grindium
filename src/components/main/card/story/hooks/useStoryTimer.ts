import { useCallback, useEffect, useRef, useState } from 'react';
import { readContract } from '@wagmi/core';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '@/contract';
import { config } from '@/wagmi';

type TimerState = {
  secondsLeft: number;
  isRunning: boolean;
  error: string | null;
};

const fetchRemainingTime = async (heroId: number): Promise<number> => {
  const result = await readContract(config, {
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getStoryMissionRemainingTime',
    args: [BigInt(heroId)],
  });

  if (typeof result !== 'bigint') {
    throw new Error('Unexpected return type from contract', result);
  }

  return Number(result);
};

export const useStoryTimer = (heroId?: number) => {
  const [timerState, setTimerState] = useState<TimerState>({
    secondsLeft: 0,
    isRunning: false,
    error: null,
  });

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback(async (tokenId: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setTimerState({ secondsLeft: 0, isRunning: false, error: null });

    try {
      const seconds = await fetchRemainingTime(tokenId);

      if (seconds <= 0) {
        setTimerState({ secondsLeft: 0, isRunning: false, error: null });
        return;
      }

      setTimerState({
        secondsLeft: seconds,
        isRunning: true,
        error: null,
      });

      intervalRef.current = setInterval(() => {
        setTimerState((prev) => {
          if (prev.secondsLeft <= 1) {
            clearInterval(intervalRef.current!);
            return { ...prev, secondsLeft: 0, isRunning: false };
          }
          return { ...prev, secondsLeft: prev.secondsLeft - 1 };
        });
      }, 1000);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setTimerState({ secondsLeft: 0, isRunning: false, error: message });
    }
  }, []);
  useEffect(() => {
    if (!heroId) return;
    startTimer(heroId);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [heroId, startTimer]);
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);


  return {
    secondsLeft: timerState.secondsLeft,
    isRunning: timerState.isRunning,
    error: timerState.error,
    startTimer,
  };
};
