import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface SendToStoryProps {
  handleSendToStory: () => void;
  disabled: boolean;
  isOnStoryMission: boolean;
  levelValidation?: boolean;
  heroLevel?: bigint;
}
const SendToStoryBtn = ({
  handleSendToStory,
  disabled,
  isOnStoryMission,
  levelValidation,
  heroLevel,
}: SendToStoryProps) => {
  return (
    <div>
      <Label className="mb-2 text-red-400">
        {levelValidation && heroLevel && `Your level ${heroLevel}`}
      </Label>
      <Button onClick={handleSendToStory} disabled={disabled || levelValidation}>
        {isOnStoryMission ? 'On story mission' : 'Start a new story'}
      </Button>
    </div>
  );
};

export default SendToStoryBtn;
