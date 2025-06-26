import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TMission } from '@/types';

interface SelectMissionSectionProps {
  missions: TMission[];
  setSelectedMission: (value: TMission | undefined) => void;
  selectedMission: TMission | undefined;
}
const MissionSelect = ({
  setSelectedMission,
  selectedMission,
  missions,
}: SelectMissionSectionProps) => {
  if (!missions) return null;

  const handleSelectMission = (value: string): void => {
    const selectedMissionIn = missions.find((mission) => mission.name === value);
    setSelectedMission(selectedMissionIn);
  };

  return (
    <Select value={selectedMission?.name} onValueChange={(value) => handleSelectMission(value)}>
      <SelectTrigger className="w-[170px]">
        <SelectValue placeholder="Select a mission" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Missions</SelectLabel>
          {missions.map((mission) => (
            <SelectItem value={mission.name.toString()} key={mission.name}>
              Mission: {mission.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default MissionSelect;
