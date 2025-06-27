import { storyImages } from '@/assets/story';
import { cn } from '@/lib/utils';
import { TFullHeroData, TStory } from '@/types';

interface StoryInfoProps {
  selectedStory: TStory | undefined;
  heroData: TFullHeroData;
}
const StoryInfo = ({ selectedStory, heroData }: StoryInfoProps) => {
  console.log('selectedStory', Number(selectedStory?.id));
  return (
    <>
      {selectedStory && (
        <div>
          <div className="flex justify-around mt-4">
            <img
              src={storyImages[Number(selectedStory.id)]}
              alt={selectedStory.name}
              className="h-[350px]"
            />
            <div>
              <p
                className={cn(
                  selectedStory &&
                    heroData?.hero &&
                    selectedStory?.minLevel > heroData?.hero.level &&
                    'text-red-400',
                )}
              >
                {`From level: ${selectedStory.minLevel}`}
              </p>
              <p>{`Duration: ${selectedStory.durationMinutes} min`}</p>

              <p>{`Reward: ${selectedStory.xpReward} xp`}</p>
            </div>
          </div>
          <div className="mt-2 flex justify-center text-center">{selectedStory.description}</div>
        </div>
      )}
    </>
  );
};

export default StoryInfo;
