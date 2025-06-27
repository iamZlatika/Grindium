import { Button } from '@/components/ui/button';
import { useMintHero } from './hooks/useMintHero';
import { useMintCooldownTimer } from './hooks/useMintCooldown';
import { formatSeconds } from '@/lib/utils';

interface MintHeroBtnProps {
  onHeroCreated: () => void;
  isConnected: boolean;
  address: `0x${string}` | undefined;
}
const MintHeroBtn = ({ onHeroCreated, isConnected, address }: MintHeroBtnProps) => {
  const { secondsLeft, isRunning, refreshCooldown } = useMintCooldownTimer(address);
  const { mintHero, isMinting } = useMintHero(() => {
    refreshCooldown();
    onHeroCreated();
  });
  return (
    <Button onClick={() => mintHero()} disabled={isMinting || !isConnected || isRunning}>
      {!isRunning && isMinting && 'Minting in progress...'}
      {!isRunning && !isMinting && 'Create a new hero'}
      {isRunning && `Minting cooldown is ${formatSeconds(secondsLeft)}`}
    </Button>
  );
};

export default MintHeroBtn;
