import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { createNewHero } from './hooks/useMintHero';
import HeroSelect from './components/hero-select';
import DonateForm from './components/donate-form';
import { useHeroMetadata } from './hooks/useGetHeroTokenURL';
import { useHeroLevel } from './hooks/useGetHeroLevel';
import { useHeroRarity } from './hooks/useGetHeroRarity';

interface HeroSectionProps {
  data: bigint[];
  setHeroId: (value: number) => void;
  heroId: number | undefined;
}

const HeroSection = ({ data, setHeroId, heroId }: HeroSectionProps) => {
  const { metadata, loading, error } = useHeroMetadata(heroId);
  const { level } = useHeroLevel(heroId);
  const { rarity } = useHeroRarity(heroId);
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Heroes</CardTitle>
        <CardAction>
          <Button onClick={createNewHero}>Create new hero</Button>
        </CardAction>
      </CardHeader>
      <CardContent className="flex">
        <HeroSelect data={data} setHeroId={setHeroId} heroId={heroId} />
        <DonateForm heroId={heroId} />
      </CardContent>
      <CardFooter className="flex-col gap-2">
        {level !== null && <p className="text-sm text-muted-foreground">Level: {level}</p>}
        {rarity !== null && <p className="text-sm text-muted-foreground">Rarity: {rarity}</p>}
        {loading && <p>Loading hero data…</p>}
        {error && <p className="text-red-500">Failed to load hero.</p>}
        {metadata && (
          <div className="flex flex-col items-center">
            <img
              src={metadata.image.replace('ipfs://', 'https://ipfs.io/ipfs/')}
              alt={'hero'}
              className="w-50 h-50 object-contain mb-3"
            />
            <p className="text-sm text-muted-foreground">{metadata.description}</p>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default HeroSection;
