import { useMutation } from '@tanstack/react-query';
import { writeContract, waitForTransactionReceipt } from '@wagmi/core';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '@/contract';
import { config } from '@/wagmi';
import { toast } from 'sonner';

export const useSendToStory = (onSuccessCallback: () => void) => {
  const mutation = useMutation({
    mutationFn: async ({ heroId, storyId }: { heroId: number; storyId: number }) => {
      const tx = await writeContract(config, {
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'sendToStoryMission',
        args: [BigInt(heroId), BigInt(storyId)],
      });
      await waitForTransactionReceipt(config, { hash: tx });

      return tx;
    },
    onSuccess: () => {
      onSuccessCallback();
      toast.success('Story started successfully');
    },
  });

  return {
    sendToStory: mutation.mutate,
    isSending: mutation.isPending,
    error: mutation.error,
  };
};
