import { CONTRACT_ABI, CONTRACT_ADDRESS } from '@/contract';
import { useWriteContract } from 'wagmi';

export const useCompleteMission = (tokenId?: number) => {
  const { writeContract, isPending, error } = useWriteContract();

  const handleClick = () => {
    if (!tokenId) return;

    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'completeMission',
      args: [BigInt(tokenId)],
    });
  };

  return {
    completeMission: handleClick,
    isPendingCompleteMission: isPending,
    completeMissionError: error,
  };
};
