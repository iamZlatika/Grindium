import { useMutation } from '@tanstack/react-query';
import { writeContract, waitForTransactionReceipt } from '@wagmi/core';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '@/contract';
import { config } from '@/wagmi';
import { toast } from 'sonner';

export const useCancelMission = (onSuccessCallback: () => void) => {
  const mutation = useMutation({
    mutationFn: async ({ heroId }: { heroId: number }) => {
      const tx = await writeContract(config, {
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'cancelMission',
        args: [BigInt(heroId)],
      });
      await waitForTransactionReceipt(config, { hash: tx });

      return tx;
    },
    onSuccess: () => {
      onSuccessCallback();
      toast.success('Mission canceled successfully');
    },
  });

  return {
    cancelMission: mutation.mutate,
    isCanceling: mutation.isPending,
    cancelingError: mutation.error,
  };
};
