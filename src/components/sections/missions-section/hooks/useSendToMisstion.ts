import { useMutation } from '@tanstack/react-query';
import { writeContract, waitForTransactionReceipt } from '@wagmi/core';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '@/contract';
import { config } from '@/wagmi';

export const useSendToMission = (onSuccessCallback: () => void) => {
  const mutation = useMutation({
    mutationFn: async ({ heroId, missionId }: { heroId: number; missionId: number }) => {
      const tx = await writeContract(config, {
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'sendToMission',
        args: [heroId, missionId],
      });

      // 🟡 Ждём пока транзакция завершится
      await waitForTransactionReceipt(config, { hash: tx });

      return tx;
    },
    onSuccess: () => {
      onSuccessCallback(); // ✅ теперь состояние точно обновлено
    },
  });

  return {
    sendToMission: mutation.mutate,
    isSending: mutation.isPending,
    error: mutation.error,
  };
};
