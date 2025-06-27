import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TBaseQuest } from '@/types';

interface SelectQuestProps<T extends TBaseQuest> {
  items: T[];
  setSelected: (value: T | undefined) => void;
  selected: T | undefined;
  title: string;
}
const QuestSelect = <T extends TBaseQuest>({
  items,
  setSelected,
  selected,
  title,
}: SelectQuestProps<T>) => {
  if (!items) return null;

  const handleSelectMission = (value: string): void => {
    const selectedMissionIn = items.find((item) => item.name === value);
    setSelected(selectedMissionIn);
  };

  return (
    <Select value={selected?.name} onValueChange={(value) => handleSelectMission(value)}>
      <SelectTrigger className="w-[170px]">
        <SelectValue placeholder={`Select a ${title}`} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{title}</SelectLabel>
          {items.map((item) => (
            <SelectItem value={item.name.toString()} key={item.name}>
              {title}: {item.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default QuestSelect;
