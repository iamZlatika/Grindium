import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface HeroSelectProps {
  data: bigint[];
  setHeroId: (value: number) => void;
  heroId: number | undefined;
}
const HeroSelect = ({ heroId, data, setHeroId }: HeroSelectProps) => {
  if (!data) return null;

  return (
    <Select value={heroId?.toString()} onValueChange={(value) => setHeroId(Number(value))}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select your hero" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>My Heroes</SelectLabel>
          {data.map((id) => (
            <SelectItem value={id.toString()} key={id.toString()}>
              Token ID: {id.toString()}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default HeroSelect;
