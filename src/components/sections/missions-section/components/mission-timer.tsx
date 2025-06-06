interface MissionTimerProps {
  secondsLeft: number;
}
export const MissionTimer = ({ secondsLeft }: MissionTimerProps) => {
  return <div>Осталось времени: {secondsLeft.toString().padStart(2, '0')}</div>;
};
