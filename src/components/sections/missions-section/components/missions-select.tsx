import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../../../ui/select';

interface SelectMissionSectionProps {
  missionsNames: string[];
  setMissionName: (value: string) => void;
  missionName: string | undefined;
}
const SelectMissionSection = ({
  setMissionName: setMissionId,
  missionName: missionId,
  missionsNames,
}: SelectMissionSectionProps) => {
  if (!missionsNames) return null;

  return (
    <Select value={missionId?.toString()} onValueChange={(value) => setMissionId(value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a mission" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Missions</SelectLabel>
          {missionsNames.map((name) => (
            <SelectItem value={name.toString()} key={name}>
              Mission: {name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectMissionSection;
