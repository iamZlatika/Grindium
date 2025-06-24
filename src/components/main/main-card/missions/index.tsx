// import { TMission } from '@/types';
import { Button } from '@/components/ui/button';
import MissionSelect from './components/missions-select';
import { MissionTimer } from './components/mission-timer';
import { useMissionTimer } from './hooks/useMissionTimer';
import { useSendToMission } from './hooks/useSendToMisstion';
// import { useCompleteMission } from './hooks/useCompleteMission';

interface MissionsSectionProps {
  // missions: TMission[];
  setMissionName: (value: string) => void;
  missionName: string | undefined;
  heroId?: number;
}

const MissionsSection = ({ heroId, setMissionName }: MissionsSectionProps) => {
  const { startTimer, isRunning, secondsLeft } = useMissionTimer();
  
  // const { completeMission, isPendingCompleteMission } = useCompleteMission(heroId);
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
    <div className="col-start-2 col-span-3 flex items-start gap-x-4">
      <MissionSelect
        missionsNames={['1', '2']}
        missionName={undefined}
        setMissionName={setMissionName}
      />
      <div>
        <p>
          <span>From level: </span>
          {1}
        </p>
        <p>
          <span>Duration:</span>
          {1} min
        </p>

        <p>
          <span>Reward:</span>
          {1}
        </p>
      </div>

      <Button onClick={handleSendToMission} disabled={!heroId}>
        {isSending ? 'Sending' : 'Send to mission'}
      </Button>
      {/* {!isRunning && (
        <Button onClick={completeMission} disabled={isPendingCompleteMission} className="ml-4">
          {isPendingCompleteMission ? 'Getting' : 'Get reward'}
        </Button>
      )} */}
      {isRunning && <MissionTimer secondsLeft={secondsLeft} />}
    </div>
  );
};

export default MissionsSection;
