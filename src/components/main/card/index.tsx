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
import { useEffect } from 'react';
import { toast } from 'sonner';
import { TFullHeroData, TMission } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useMintCooldownTimer } from './useMintCooldown';
import { formatSeconds } from '@/lib/utils';
import HeroTab from './heroes';
import MissionsTab from './missions';

interface MainCardProps {
  heroes: bigint[];
  setHeroId: (value: number) => void;
  heroId: number | undefined;
  onHeroCreated: () => void;
  missions: TMission[];
  setSelectedMission: (value: TMission | undefined) => void;
  selectedMission: TMission | undefined;
  isConnected: boolean;
  address: `0x${string}` | undefined;
  heroData: TFullHeroData;
  onHeroDataRefetch: () => void;
}

const MainCard = ({
  heroes,
  setHeroId,
  heroId,
  onHeroCreated,
  address,
  missions,
  isConnected,
  selectedMission,
  setSelectedMission,
  heroData,
  onHeroDataRefetch,
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
      <Tabs defaultValue="missions">
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
            <HeroTab
              heroId={heroId}
              setHeroId={setHeroId}
              heroes={heroes}
              heroData={heroData}
              onHeroDataRefetch={onHeroDataRefetch}
            />
          </TabsContent>
          <TabsContent value="missions">
            <MissionsTab
              heroId={heroId}
              missions={missions}
              selectedMission={selectedMission}
              setSelectedMission={setSelectedMission}
              setHeroId={setHeroId}
              heroes={heroes}
              heroData={heroData}
              onHeroDataRefetch={onHeroDataRefetch}
            />
          </TabsContent>
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Tabs>
    </Card>
  );
};

export default MainCard;
