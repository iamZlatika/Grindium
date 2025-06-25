import { useMutation } from '@tanstack/react-query';
import { writeContract, waitForTransactionReceipt } from '@wagmi/core';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '@/contract';
import { config } from '@/wagmi';
import { useState } from 'react';

export function useMintHero(onSuccessCallback: () => void) {
  const [isConfirmed, setIsConfirmed] = useState(false);

  const mutation = useMutation({
    mutationFn: async () => {
      setIsConfirmed(false);

      const hash = await writeContract(config, {
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'mintHero',
      });

      await waitForTransactionReceipt(config, { hash });
      setIsConfirmed(true);
    },
    onSuccess: () => {
      onSuccessCallback();
    },
  });

  return {
    mintHero: mutation.mutate,
    isMinting: mutation.isPending,
    isConfirmed,
    mintHeroError: mutation.error,
  };
}
