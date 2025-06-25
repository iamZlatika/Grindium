import { useWriteContract } from 'wagmi';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '@/contract';
import { parseEther } from 'viem';
import { toast } from 'sonner';

export function useDonateXP() {
  const { writeContractAsync, isPending, status, error } = useWriteContract();

  const donate = (tokenId: number, donateXP: string) =>
    toast.promise(
      writeContractAsync({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'donateXP',
        args: [BigInt(tokenId)],
        value: parseEther(donateXP),
      }),
      {
        success: '✨ You donated successfully',
        error: '❌ Something went wrong',
      },
    );

  return {
    donate,
    isLoading: isPending,
    status,
    error,
  };
}
