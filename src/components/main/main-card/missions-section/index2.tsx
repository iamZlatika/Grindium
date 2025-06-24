// import React, { useEffect } from 'react';
// import {
//   Card,
//   // CardAction,
//   CardContent,
//   // CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from '../../../../ui/card';
// // import SelectMissionSection from './components/missions-select';
// import { TMission  } from '@/types';

// import { Button } from '@/components/ui/button';
// import { useMissionTimer } from './hooks/useMissionTimer';
// import { MissionTimer } from './components/mission-timer';
// import { useCompleteMission } from './hooks/useCompleteMission';

// // import { useSendToMission } from './hooks/useSendToMisstion';

// interface MissionsSectionProps {
//   data: TMission[];
//   setMissionName: (value: string) => void;
//   missionName: string | undefined;
//   heroId?: number;
// }

// const MissionsSection = ({ data, heroId }: MissionsSectionProps) => {
//   const { startTimer, isRunning, secondsLeft } = useMissionTimer();
//   const { completeMission, isPendingCompleteMission } = useCompleteMission(heroId);
//   // const { sendToMission, isSending } = useSendToMission(() => {
//   //   if (heroId) {
//   //     startTimer(heroId); // <<< запускаем таймер после успешной отправки
//   //   }
//   // });

//   console.log('missions', data)
//   useEffect(() => {
//     if (heroId) startTimer(heroId);
//   }, [heroId, startTimer]);

//   if (!data) return null;
//   // const missionsNamesIndex = data[1].indexOf(missionName ?? '');
//   // const missionId = Number(data[0][missionsNamesIndex]);

//   // const handleSendToMission = () => {
//   //   if (!heroId || !missionId) return;
//   //   sendToMission({ heroId, missionId });
//   // };

//   return (
//     // <Card className="w-full mt-4 max-w-2xl">
//     //   <CardHeader>
//     //     <CardTitle>Missions</CardTitle>
//     //   </CardHeader>
//     //   <CardContent className="flex">
//      {/*     <SelectMissionSection
//           missionsNames={data.name}
//           setMissionName={setMissionName}
//           missionName={missionName}
//         />
//        <div className="ml-4">
//           <p>
//             <span>From level: </span>
//             {data[2][missionsNamesIndex]}
//           </p>
//           <p>
//             <span>Duration:</span>
//             {data[3][missionsNamesIndex]} min
//           </p>
//           <p>
//             <span>Reward:</span>
//             {data[4][missionsNamesIndex]}-{data[5][missionsNamesIndex]}
//           </p>*/}
//         </div> */}
//   //     </CardContent>
//   //     <CardFooter className="flex">
//   //       {/* <Button onClick={handleSendToMission} disabled={!heroId || !missionId}>
//   //         {isSending ? 'Sending' : 'Send to mission'}
//   //       </Button> */}
//   //       {!isRunning && (
//   //         <Button onClick={completeMission} disabled={isPendingCompleteMission} className="ml-4">
//   //           {isPendingCompleteMission ? 'Getting' : 'Get reward'}
//   //         </Button>
//   //       )}
//   //       {isRunning && <MissionTimer secondsLeft={secondsLeft} />}
//   //     </CardFooter>
//   //   </Card>
//   );
// };

// export default MissionsSection;
