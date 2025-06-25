import { TFullHeroData, TMission } from '@/types';
import { Button } from '@/components/ui/button';
import MissionSelect from './components/missions-select';
import { MissionTimer } from './components/mission-timer';
import { useMissionTimer } from './hooks/useMissionTimer';
import { useSendToMission } from './hooks/useSendToMisstion';
import HeroSelect from '@/components/ui/hero-select';
import { useCompleteMission } from './hooks/useCompleteMission';
import { Label } from '@/components/ui/label';
import { missionImages } from '@/assets/missions';
import { cn } from '@/lib/utils';

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
}: // onHeroDataRefetch
MissionsSectionProps) => {
  const { startTimer, isRunning, secondsLeft } = useMissionTimer();
  const { completeMission, isPendingCompleteMission } = useCompleteMission(heroId);
  const { sendToMission, isSending } = useSendToMission(() => {
    if (heroId) {
      startTimer(heroId);
    }
  });

  const handleSendToMission = () => {
    if (!heroId) return;
    sendToMission({ heroId, missionId: 1 });
  };
  return (
    <>
      <div className="flex items-end justify-between">
        <HeroSelect data={heroes} setHeroId={setHeroId} heroId={heroId} />
        <div>
          <Label className="mb-2">Select appropriate mission</Label>
          <MissionSelect
            missions={missions}
            selectedMission={selectedMission}
            setSelectedMission={setSelectedMission}
          />
        </div>
        <div>
          <Label className="mb-2 text-red-400">
            {selectedMission &&
              selectedMission?.minLevel > heroData.hero.level &&
              'Level is too low'}
          </Label>
          <Button
            onClick={handleSendToMission}
            disabled={
              !heroId || (selectedMission && selectedMission?.minLevel > heroData.hero.level)
            }
          >
            {isSending ? 'Sending' : 'Send to mission'}
          </Button>
        </div>

        {!isRunning && (
          <Button onClick={completeMission} disabled={isPendingCompleteMission}>
            {isPendingCompleteMission ? 'Getting' : 'Get reward'}
          </Button>
        )}
        {isRunning && <MissionTimer secondsLeft={secondsLeft} />}
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
                    selectedMission?.minLevel > heroData.hero.level &&
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
