import { useMutation } from '@tanstack/react-query';
import { writeContract, waitForTransactionReceipt } from '@wagmi/core';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '@/contract';
import { config } from '@/wagmi';
import { toast } from 'sonner';

export function useMintHero(onSuccessCallback: () => void) {
  const mutation = useMutation({
    mutationFn: async () => {
      const hash = await writeContract(config, {
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'mintHero',
      });
      await waitForTransactionReceipt(config, { hash });
    },
    onSuccess: () => {
      toast.success('Hero is successfully created');
      onSuccessCallback();
    },
  });

  return {
    mintHero: mutation.mutate,
    isMinting: mutation.isPending,
    mintHeroError: mutation.error,
  };
}
