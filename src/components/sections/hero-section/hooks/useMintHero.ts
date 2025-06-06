import { CONTRACT_ABI, CONTRACT_ADDRESS } from '@/contract';
import { config } from '@/wagmi';
import { writeContract } from '@wagmi/core';

export async function createNewHero() {
  try {
    await writeContract(config, {
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'mintHero',
    });
    return { success: true, message: 'New Hero successfully created!' };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error occurred';
    return { success: false, message };
  }
}
