import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { TFullHeroData, TMission, TStory } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import HeroTab from './heroes';
import MissionsTab from './missions';
import MintHeroBtn from './mint-btn';
import StoryTab from './story';

interface MainCardProps {
  heroes: bigint[];
  setHeroId: (hero: number) => void;
  heroId: number | undefined;
  onHeroCreated: () => void;
  missions: TMission[];
  setSelectedMission: (mission: TMission | undefined) => void;
  selectedMission: TMission | undefined;
  isConnected: boolean;
  address: `0x${string}` | undefined;
  heroData: TFullHeroData;
  onHeroDataRefetch: () => void;
  stories: TStory[];
  selectedStory: TStory | undefined;
  setSelectedStory: (story: TStory | undefined) => void;
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
  selectedStory,
  setSelectedStory,
  stories,
}: MainCardProps) => {
  return (
    <Card className="w-full max-w-2xl">
      <Tabs defaultValue="heroes">
        <CardHeader>
          <CardTitle>
            <TabsList>
              <TabsTrigger value="heroes">Heroes</TabsTrigger>
              <TabsTrigger value="missions">Missions</TabsTrigger>
              <TabsTrigger value="story">Story</TabsTrigger>
            </TabsList>
          </CardTitle>
          <CardAction>
            <MintHeroBtn
              address={address}
              onHeroCreated={onHeroCreated}
              isConnected={isConnected}
            />
          </CardAction>
        </CardHeader>
        <CardContent>
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
          <TabsContent value="story">
            <StoryTab
              heroes={heroes}
              setHeroId={setHeroId}
              heroId={heroId}
              stories={stories}
              selectedStory={selectedStory}
              setSelectedStory={setSelectedStory}
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
