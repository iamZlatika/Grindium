import HeroSelect from '../../../ui/hero-select';
import DonateForm from './donane-section';
import HeroProfile from './hero-profile';

interface HeroTabProps {
  heroId: number | undefined;
  heroes: bigint[];
  setHeroId: (id: number) => void;
}
const HeroTab = ({ heroId, heroes, setHeroId }: HeroTabProps) => {
  return (
    <>
      <div className="flex items-end">
        <HeroSelect data={heroes} setHeroId={setHeroId} heroId={heroId} />
        <DonateForm heroId={heroId} />
      </div>
      {heroId && <HeroProfile heroId={heroId} />}
    </>
  );
};

export default HeroTab;
