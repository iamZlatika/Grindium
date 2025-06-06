import { useCallback, useEffect, useRef, useState } from 'react';
import { readContract } from '@wagmi/core';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '@/contract';
import { config } from '@/wagmi';

type TimerState = {
  secondsLeft: number;
  isRunning: boolean;
  error: string | null;
};

const fetchRemainingTime = async (tokenId: number): Promise<number> => {
  const result = await readContract(config, {
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getMissionRemainingTime',
    args: [tokenId],
  });

  if (typeof result !== 'bigint') {
    throw new Error('Unexpected return type from contract');
  }

  return Number(result);
};

export const useMissionTimer = () => {
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
