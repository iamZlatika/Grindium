import { useState, useTransition, useCallback } from 'react';
import { readContract } from '@wagmi/core';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '@/contract';
import { config } from '@/wagmi';

type Result = { success: true; result: boolean } | { success: false; message: string };

const handleCheckIsOnMission = async (tokenId: number): Promise<Result> => {
  try {
    const result = await readContract(config, {
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'isOnMission',
      args: [tokenId],
    });

    if (typeof result !== 'boolean') {
      throw new Error('Unexpected return type from contract');
    }

    return { success: true, result };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error occurred';
    return { success: false, message };
  }
};

export const useCheckIsOnMission = () => {
  const [isOnMission, setIsOnMission] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const check = useCallback(async (tokenId: number) => {
    setIsOnMission(false);
    setError(null);

    startTransition(async () => {
      const result = await handleCheckIsOnMission(tokenId);
      if (result.success) {
        setIsOnMission(result.result);
        setError(null);
      } else {
        setError(result.message);
      }
    });
  }, []);
  return {
    isOnMission,
    isOnMissionPending: isPending,
    isOnMissionError: error,
    checkIsOnMission: check,
  };
};
