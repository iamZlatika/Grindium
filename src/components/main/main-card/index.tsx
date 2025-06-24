import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useMintHero } from './useMintHero';
import HeroSelect from './hero-select';
import DonateForm from './heroes/donane-section';
import { useEffect } from 'react';
import { toast } from 'sonner';
// import { TMission } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import HeroProfile from './heroes/hero-profile';
import { useMintCooldownTimer } from './useMintCooldown';
import { formatSeconds } from '@/lib/utils';

interface MainCardProps {
  heroes: bigint[];
  setHeroId: (value: number) => void;
  heroId: number | undefined;
  onHeroCreated: () => void;
  // missions: TMission[];
  setMissionName: (value: string) => void;
  missionName: string | undefined;
  isConnected: boolean;
  address: `0x${string}` | undefined;
}

const MainCard = ({
  heroes,
  setHeroId,
  heroId,
  onHeroCreated,
  address,
  isConnected,
}: MainCardProps) => {
  const { secondsLeft, isRunning, refreshCooldown } = useMintCooldownTimer(address);

  const { mintHero, isMinting, isConfirmed } = useMintHero(() => {
    refreshCooldown();
  });

  useEffect(() => {
    if (isConfirmed) toast.success('Hero is successfully created');
    onHeroCreated();
  }, [isConfirmed, onHeroCreated]);

  return (
    <Card className="w-full max-w-2xl">
      <Tabs defaultValue="heroes">
        <CardHeader>
          <CardTitle>
            <TabsList>
              <TabsTrigger value="heroes">Heroes</TabsTrigger>
              <TabsTrigger value="missions">Missions</TabsTrigger>
            </TabsList>
          </CardTitle>
          <CardAction>
            <Button onClick={() => mintHero()} disabled={isMinting || !isConnected || isRunning}>
              {!isRunning && isMinting && 'Minting in progress...'}
              {!isRunning && !isMinting && 'Create a new hero'}
              {isRunning && `Minting cooldown is ${formatSeconds(secondsLeft)}`}
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="">
          <TabsContent value="heroes">
            <div className="flex items-end">
              <HeroSelect data={heroes} setHeroId={setHeroId} heroId={heroId} />
              <DonateForm heroId={heroId} />
            </div>
            {heroId && <HeroProfile heroId={heroId} />}
          </TabsContent>
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Tabs>
    </Card>
  );
};

export default MainCard;
