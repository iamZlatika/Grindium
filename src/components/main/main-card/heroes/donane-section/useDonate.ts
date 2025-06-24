import { CONTRACT_ABI, CONTRACT_ADDRESS } from '@/contract';
import { config } from '@/wagmi';
import { writeContract } from '@wagmi/core';
import { parseEther } from 'viem';

export async function donate(tokenId: number, donateXP: string) {
  try {
    await writeContract(config, {
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'donateXP',
      args: [BigInt(tokenId)],
      value: parseEther(donateXP),
    });
    return { success: true, message: 'You successfully get XP' };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error occurred';
    return { success: false, message };
  }
}
