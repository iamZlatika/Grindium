import { TFullHeroData } from '@/types';
import HeroSelect from '../../../shared/hero-select';
import DonateForm from './donate-section';
import HeroProfile from './hero-profile';

interface HeroTabProps {
  heroId: number | undefined;
  heroes: bigint[];
  setHeroId: (id: number) => void;
  heroData: TFullHeroData;
  onHeroDataRefetch: () => void;
}
const HeroTab = ({ heroId, heroes, setHeroId, heroData, onHeroDataRefetch }: HeroTabProps) => {
  return (
    <>
      <div className="flex items-end">
        <HeroSelect data={heroes} setHeroId={setHeroId} heroId={heroId} />
        <DonateForm heroId={heroId} />
      </div>
      {heroId && (
        <HeroProfile heroId={heroId} heroData={heroData} onHeroDataRefetch={onHeroDataRefetch} />
      )}
    </>
  );
};

export default HeroTab;
