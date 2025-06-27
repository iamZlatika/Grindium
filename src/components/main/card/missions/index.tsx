import { TFullHeroData, TMission } from '@/types';
import { Button } from '@/components/ui/button';
import QuestSelect from '../../../shared/quest-select/quest-select';
import { useMissionTimer } from './hooks/useMissionTimer';
import { useSendToMission } from './hooks/useSendToMission';
import HeroSelect from '@/components/shared/hero-select';
import { useCompleteMission } from './hooks/useCompleteMission';
import { Label } from '@/components/ui/label';
import { missionImages } from '@/assets/missions';
import { cn, formatSeconds } from '@/lib/utils';
import { useWatchContractEvent } from 'wagmi';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '@/contract';
import { toast } from 'sonner';
import { useCancelMission } from './hooks/useCancelMission';

interface MissionsSectionProps {
  missions: TMission[];
  setSelectedMission: (value: TMission | undefined) => void;
  selectedMission: TMission | undefined;
  heroId?: number;
  setHeroId: (value: number) => void;
  heroes: bigint[];
  heroData: TFullHeroData;
  onHeroDataRefetch: () => void;
}

const MissionsTab = ({
  heroId,
  setSelectedMission,
  missions,
  setHeroId,
  heroes,
  selectedMission,
  heroData,
  onHeroDataRefetch,
}: MissionsSectionProps) => {
  const { startTimer, isRunning, secondsLeft } = useMissionTimer(heroId);
  const { completeMission, isPendingCompleteMission } = useCompleteMission(heroId);
  // const { isReady } = useCheckMissionRewardReady(heroId, secondsLeft);
  const { cancelMission } = useCancelMission(() => {
    if (heroId) {
      startTimer(heroId);
    }
  });
  const { sendToMission, isSending } = useSendToMission(() => {
    if (heroId) {
      startTimer(heroId);
    }
  });
  useWatchContractEvent({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    eventName: 'MissionCompleted',
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

  const handleSendToMission = () => {
    const missionId = Number(selectedMission?.id);
    if (!heroId || !missionId) return;
    sendToMission({ heroId, missionId });
  };
  const handleCancelMission = () => {
    if (!heroId) return;
    cancelMission({ heroId });
  };

  return (
    <>
      <div className="flex items-end justify-between">
        <HeroSelect data={heroes} setHeroId={setHeroId} heroId={heroId} />
        <div>
          <Label className="mb-2">Select appropriate mission</Label>
          <QuestSelect
            items={missions}
            selected={selectedMission}
            setSelected={setSelectedMission}
            title="Mission"
          />
        </div>
        <div>
          <Label className="mb-2 text-red-400">
            {selectedMission &&
              heroData &&
              heroData?.hero &&
              selectedMission?.minLevel > heroData?.hero.level &&
              `Your level ${heroData?.hero.level}`}
          </Label>
          {!isRunning && (
            <Button
              onClick={handleSendToMission}
              disabled={
                isRunning ||
                isPendingCompleteMission ||
                !heroId ||
                (selectedMission &&
                  heroData?.hero &&
                  selectedMission?.minLevel > heroData?.hero.level)
              }
            >
              {isSending ? 'Sending' : 'Send to mission'}
            </Button>
          )}
          {isRunning && (
            <Button
              onClick={handleCancelMission}
              disabled={
                !heroId ||
                (selectedMission &&
                  heroData?.hero &&
                  selectedMission?.minLevel > heroData?.hero.level)
              }
            >
              {isRunning ? 'Stop mission' : 'Stopping'}
            </Button>
          )}
        </div>

        <Button onClick={completeMission} disabled={isPendingCompleteMission || isRunning}>
          {!isRunning && isPendingCompleteMission && 'Getting'}
          {!isRunning && !isPendingCompleteMission && 'Get reward'}
          {isRunning && <div>On mission: {formatSeconds(secondsLeft)}</div>}
        </Button>
      </div>
      {selectedMission && (
        <div>
          <div className="flex justify-around mt-4">
            <img
              src={missionImages[Number(selectedMission.id)]}
              alt={selectedMission.name}
              className="h-[350px]"
            />
            <div>
              <p
                className={cn(
                  selectedMission &&
                    heroData?.hero &&
                    selectedMission?.minLevel > heroData?.hero.level &&
                    'text-red-400',
                )}
              >
                {`From level: ${selectedMission.minLevel}`}
              </p>
              <p>{`Duration: ${selectedMission.durationMinutes} min`}</p>

              <p>{`Reward: ${selectedMission.minXPReward} - ${selectedMission.maxXPReward} xp`}</p>
            </div>
          </div>
          <div className="mt-2 flex justify-center">{selectedMission.description}</div>
        </div>
      )}
    </>
  );
};

export default MissionsTab;
