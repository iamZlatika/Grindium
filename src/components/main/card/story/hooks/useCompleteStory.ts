import { CONTRACT_ABI, CONTRACT_ADDRESS } from '@/contract';
import { useWriteContract } from 'wagmi';

export const useCompleteStory = (tokenId?: number) => {
  const { writeContract, isPending, error } = useWriteContract();

  const handleClick = () => {
    if (!tokenId) return;

    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'completeStoryMission',
      args: [BigInt(tokenId)],
    });
  };

  return {
    completeStory: handleClick,
    isPendingCompleteStory: isPending,
    completeMissionError: error,
  };
};

// import { useMutation } from '@tanstack/react-query';
// import { writeContract, waitForTransactionReceipt } from '@wagmi/core';
// import { CONTRACT_ABI, CONTRACT_ADDRESS } from '@/contract';
// import { config } from '@/wagmi';
// import { toast } from 'sonner';

// export const useCompleteStory = (onSuccessCallback: () => void) => {
//   const mutation = useMutation({
//     mutationFn: async ({ heroId }: { heroId: number }) => {
//       const tx = await writeContract(config, {
//         address: CONTRACT_ADDRESS,
//         abi: CONTRACT_ABI,
//         functionName: 'completeStoryMission',
//         args: [BigInt(heroId)],
//       });
//       await waitForTransactionReceipt(config, { hash: tx });

//       return tx;
//     },
//     onSuccess: () => {
//       onSuccessCallback();
//       toast.success('Mission completed successfully');
//     },
//   });

//   return {
//     completeStory: mutation.mutate,
//     isPendingCompleteStory: mutation.isPending,
//     completeStoryError: mutation.error,
//   };
// };
