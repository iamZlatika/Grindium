import HeroSelect from '@/components/shared/hero-select';
import QuestSelect from '@/components/shared/quest-select/quest-select';
import { Label } from '@/components/ui/label';
import { TFullHeroData, TStory } from '@/types';
import React from 'react';
import { useSendToStory } from './hooks/useSendToStory';
import StoryInfo from './story-info';
import SendToStoryBtn from './send-to-story-btn';
import { useCompleteStory } from './hooks/useCompleteStory';
import GetRewardBtn from './get-reward-btn';
import { useStoryTimer } from './hooks/useStoryTimer';
import { useWatchContractEvent } from 'wagmi';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '@/contract';
import { toast } from 'sonner';
// import { useCheckStoryRewardReady } from './hooks/useCheckStoryRewardReady';

interface StoryTabProps {
  heroes: bigint[];
  setHeroId: (hero: number) => void;
  heroId: number | undefined;
  stories: TStory[];
  selectedStory: TStory | undefined;
  setSelectedStory: (story: TStory | undefined) => void;
  heroData: TFullHeroData;
  onHeroDataRefetch: () => void;
}
const StoryTab = ({
  heroes,
  setHeroId,
  heroId,
  stories,
  selectedStory,
  setSelectedStory,
  heroData,
  onHeroDataRefetch,
}: StoryTabProps) => {
  const { completeStory, isPendingCompleteStory } = useCompleteStory();
  const { secondsLeft, isRunning, startTimer } = useStoryTimer(heroId);
  // const { isReady, refetch } = useCheckStoryRewardReady(heroId, secondsLeft);
  const { sendToStory, isSending } = useSendToStory(() => {
    if (heroId) {
      startTimer(heroId);
    }
  });
  useWatchContractEvent({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    eventName: 'StoryMissionCompleted',
    onLogs(logs) {
      for (const log of logs) {
        const { tokenId, xpGained } = log.args as {
          user: string;
          tokenId: bigint;
          missionId: bigint;
          xpGained: bigint;
          newLevel: bigint;
        };

        if (Number(tokenId) === heroId) {
          toast.success(`Hero ${heroId} gained ${xpGained}xp`);
          onHeroDataRefetch();
        }
      }
    },
  });
  console.log('secondsLeft', secondsLeft);
  const handleSendToStory = () => {
    const storyId = Number(selectedStory?.id);
    if (!heroId || !storyId) return;
    sendToStory({ heroId, storyId });
  };

  const levelValidation =
    selectedStory && heroData && heroData?.hero && selectedStory?.minLevel > heroData?.hero.level;
  const disabledSendToStoryBtn = isRunning || isPendingCompleteStory || !heroId || isSending;
  return (
    <>
      <div className="flex items-end justify-between">
        <HeroSelect data={heroes} setHeroId={setHeroId} heroId={heroId} />
        <div>
          <Label className="mb-2">Select appropriate mission</Label>
          <QuestSelect
            items={stories}
            selected={selectedStory}
            setSelected={setSelectedStory}
            title="Story"
          />
        </div>
        <SendToStoryBtn
          handleSendToStory={handleSendToStory}
          disabled={disabledSendToStoryBtn}
          isOnStoryMission={isSending || isRunning}
          levelValidation={levelValidation}
          heroLevel={heroData?.hero.level}
        />
        <GetRewardBtn
          isPendingCompleteStory={isPendingCompleteStory}
          completeStory={completeStory}
          secondsLeft={secondsLeft}
          isRunning={isRunning}
          // isReady={isReady}
        />
      </div>
      <div className="text-red-400 mt-2 text-center">
        This story is exclusive to a single hero. Choose wisely — completing it will bring this hero
        to the max level.
      </div>
      <StoryInfo selectedStory={selectedStory} heroData={heroData} />
    </>
  );
};

export default StoryTab;
