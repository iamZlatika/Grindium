import { Button } from '@/components/ui/button';
import { formatSeconds } from '@/lib/utils';
import React from 'react';

interface GetRewardBtnProps {
  completeStory: () => void;
  secondsLeft: number;
  isRunning: boolean;
  isPendingCompleteStory: boolean;
  // isReady: boolean | null;
}
const GetRewardBtn = ({
  completeStory,
  secondsLeft,
  isRunning,
  isPendingCompleteStory,
}: // isReady,
GetRewardBtnProps) => {
  return (
    <Button onClick={completeStory} disabled={isPendingCompleteStory || isRunning}>
      {!isRunning && isPendingCompleteStory && 'Getting'}
      {!isRunning && !isPendingCompleteStory && 'Get reward'}
      {isRunning && <div>On mission: {formatSeconds(secondsLeft)}</div>}
    </Button>
  );
};

export default GetRewardBtn;
