import { useEffect, useState } from 'react';
import { readContract } from '@wagmi/core';
import { config } from '@/wagmi';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '@/contract';

interface HeroMetadata {
  description: string;
  image: string;
}

export function useHeroMetadata(heroId?: number) {
  const [metadata, setMetadata] = useState<HeroMetadata | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (heroId === undefined) return;

    const fetchMetadata = async () => {
      setLoading(true);
      setError(null);

      try {
        const uri = (await readContract(config, {
          abi: CONTRACT_ABI,
          address: CONTRACT_ADDRESS,
          functionName: 'getHeroTokenURI',
          args: [heroId],
        })) as string;

        const ipfsUrl = uri.replace('ipfs://', 'https://ipfs.io/ipfs/');
        const res = await fetch(ipfsUrl);
        const json = await res.json();

        setMetadata(json);
      } catch (err) {
        setError(err as Error);
        setMetadata(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMetadata();
  }, [heroId]);

  return { metadata, loading, error };
}
