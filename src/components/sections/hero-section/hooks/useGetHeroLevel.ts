import { useEffect, useState } from 'react';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '@/contract';
import { readContract } from '@wagmi/core';
import { config } from '@/wagmi';

export function useHeroLevel(heroId: number | undefined) {
  const [level, setLevel] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (heroId === undefined) return;

    const fetchHeroLevel = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await readContract(config, {
          address: CONTRACT_ADDRESS,
          abi: CONTRACT_ABI,
          functionName: 'getHeroLevel',
          args: [heroId],
        });

        if (typeof result !== 'bigint') {
          throw new Error('Unexpected result type');
        }

        setLevel(Number(result));
      } catch (err) {
        console.error(err);
        setError('Failed to load hero level');
      } finally {
        setIsLoading(false);
      }
    };

    fetchHeroLevel();
  }, [heroId]);

  return { level, isLoading, error };
}
