import { useReadContract } from 'wagmi';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '@/contract';
import { useQuery } from '@tanstack/react-query';

interface HeroMetadata {
  description: string;
  image: string;
  name: string;
}

export function useHeroTokenURI(heroId?: number) {
  const heroIdAsBigInt = heroId !== undefined ? BigInt(heroId) : undefined;
  const IPFS_GATEWAY = 'https://green-tropical-wildfowl-451.mypinata.cloud/ipfs/';

  const {
    data: uri,
    isLoading: isUriLoading,
    error: uriError,
  } = useReadContract({
    abi: CONTRACT_ABI,
    address: CONTRACT_ADDRESS,
    functionName: 'getHeroTokenURI',
    args: heroIdAsBigInt !== undefined ? [heroIdAsBigInt] : undefined,
    query: {
      enabled: heroIdAsBigInt !== undefined,
    },
  });

  const {
    data: processedMetadata,
    isLoading: isIpfsLoading,
    error: ipfsError,
  } = useQuery<HeroMetadata, Error>({
    queryKey: ['heroMetadata', uri],
    queryFn: async () => {
      if (!uri || typeof uri !== 'string') {
        throw new Error('URI is not available');
      }

      const ipfsUrl = uri.replace('ipfs://', IPFS_GATEWAY);
      const res = await fetch(ipfsUrl);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const rawMetadata = await res.json();
      const processedImage = rawMetadata.image
        ? rawMetadata.image.replace('ipfs://', IPFS_GATEWAY)
        : '';
      return {
        ...rawMetadata,
        image: processedImage,
      };
    },
    enabled: !!uri,
  });

  const loading = isUriLoading || isIpfsLoading;
  const error = uriError || ipfsError;

  return { processedMetadata, loading, error };
}
