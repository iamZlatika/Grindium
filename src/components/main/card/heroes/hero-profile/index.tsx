import { useEffect, useState } from 'react';
import { useHeroTokenURI } from './hooks/useGetHeroTokenURI';
import loaderGif from '../../../../../lib/loader.gif';
import { useImageOnScreen } from './hooks/useImageOnScreen';
import { Progress } from '@/components/ui/progress';
import { useLevelThreshold } from './hooks/useLevelThreshold';
import { useWatchContractEvent } from 'wagmi';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '@/contract';
import { toast } from 'sonner';
import { levelLabels } from './helpers';
import { TFullHeroData } from '@/types';
import { cn } from '@/lib/utils';

interface HeroProfileProps {
  heroId: number;
  heroData: TFullHeroData;
  onHeroDataRefetch: () => void;
}

const HeroProfile = ({ heroId, heroData, onHeroDataRefetch }: HeroProfileProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const [imageContainerRef, isImageOnScreen] = useImageOnScreen({ threshold: 0.1 });
  const { processedMetadata, loading, error, refetchTokenUri } = useHeroTokenURI(heroId);

  const {
    currentThreshold,
    nextThreshold,
    isLoading: thresholdLoading,
  } = useLevelThreshold(heroData?.hero.level);

  useWatchContractEvent({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    eventName: 'XPDonated',
    onLogs(logs) {
      for (const log of logs) {
        const { tokenId } = log.args as {
          donor: string;
          tokenId: bigint;
          xpAmount: bigint;
          ethSpent: bigint;
        };

        if (Number(tokenId) === heroId) {
          toast.success(`XP updated for hero ${heroId}`);
          onHeroDataRefetch();
          refetchTokenUri();
        }
      }
    },
  });
  useEffect(() => {
    if (processedMetadata?.image) {
      setImageLoaded(false);
      setImageError(false);
    } else {
      setImageLoaded(true);
      setImageError(false);
    }
  }, [processedMetadata]);

  useEffect(() => {
    if (isImageOnScreen && processedMetadata?.image && !imageLoaded && !imageError) {
      const img = new Image();
      img.src = processedMetadata.image;
      img.onload = () => {
        setImageLoaded(true);
        setImageError(false);
      };

      img.onerror = () => {
        setImageLoaded(false);
        setImageError(true);
      };

      return () => {
        img.onload = null;
        img.onerror = null;
      };
    }
  }, [isImageOnScreen, processedMetadata, imageLoaded, imageError]);

  const currentXp = Number(heroData?.hero.xp ?? 0) - Number(currentThreshold);
  const nextLevelThreshold = Number(nextThreshold) - Number(currentThreshold);
  const progressPercent = nextLevelThreshold > 0 ? (currentXp / nextLevelThreshold) * 100 : 0;
  const maxLvlPercent = Number(heroData?.hero.level) === 30 ? 100 : progressPercent;

  return (
    <>
      {processedMetadata && (
        <div className="flex flex-col items-center mt-5">
          {/* img */}
          <div ref={imageContainerRef} className="w-100 h-100 flex mb-3">
            {!imageLoaded && !imageError && processedMetadata.image && (
              <img
                src={loaderGif}
                alt="Loading image..."
                className="object-contain animate-pulse"
              />
            )}
            {imageError && <p className="text-red-500">Failed to load image.</p>}
            {imageLoaded && !imageError && processedMetadata.image && (
              <img
                src={processedMetadata.image}
                alt={processedMetadata.name || 'hero'}
                className="w-full h-full object-contain"
              />
            )}

            {processedMetadata && !processedMetadata.image && (
              <p className="text-sm text-muted-foreground">No image available.</p>
            )}
          </div>
          {/* img end */}
          <p className="text-sm text-muted-foreground">{processedMetadata.description}</p>
          {loading && <p>Loading hero data…</p>}
          {error && <p className="text-red-500">Failed to load hero metadata.</p>}
        </div>
      )}
      <div className="flex flex-col items-center mt-5">
        <div className="relative w-full">
          <Progress value={maxLvlPercent} className="h-6" />
          <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-black">
            {Number(heroData?.hero.level) !== 30 &&
              (thresholdLoading
                ? 'Loading...'
                : `${
                    Number(heroData?.hero.xp) - Number(currentThreshold) || 0
                  } / ${nextLevelThreshold}`)}
            {Number(heroData?.hero.level) === 30 && 'Max level'}
          </div>
        </div>
        <div className="flex mt-2">
          <p className="mr-2">Level:</p>
          {heroData?.hero.level}
        </div>
        <div className="flex">
          <p className="mr-2">Rarity:</p>
          <span
            className={cn({
              'text-green-500': heroData?.hero.rarity === 0,
              'text-yellow-500': heroData?.hero.rarity === 1,
              'text-purple-500': heroData?.hero.rarity === 2,
            })}
          >
            {levelLabels[Number(heroData?.hero.rarity)]}
          </span>
        </div>
      </div>
    </>
  );
};

export default HeroProfile;
