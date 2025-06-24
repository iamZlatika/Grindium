
import { Button } from '@/components/ui/button';
import { useCheckIsOnMission } from '../hooks/useCheckIsOnMission';


interface IsOnMissionSectionProps {
  heroId: number | undefined;
}
const IsOnMissionSection = ({ heroId }: IsOnMissionSectionProps) => {
  const { isOnMission, isOnMissionPending, isOnMissionError, checkIsOnMission } =
    useCheckIsOnMission();

  const handleCheck = () => {
    if (heroId !== undefined) {
      checkIsOnMission(heroId);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🦸 Где мой герой?</h1>
      <Button onClick={handleCheck} variant="default">
        Проверить героя
      </Button>
      {isOnMissionPending && <p>Проверяем...</p>}
      {isOnMissionError && <p style={{ color: 'red' }}>Ошибка контракта: {isOnMissionError}</p>}
      {!isOnMissionPending && heroId !== undefined && (
        <p>Ваш герой {isOnMission ? 'на задании' : 'не на задании'}</p>
      )}
      {!isOnMissionPending && heroId === undefined && !isOnMissionError && (
        <p>Введите ID героя для проверки.</p>
      )}
    </div>
  );
};

export default IsOnMissionSection;
