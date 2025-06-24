import ConnectionSection from './components/main/connection';
import { useAccount, useReadContract } from 'wagmi';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from './contract';
import { useState } from 'react';
import { Toaster } from '@/components/ui/sonner';
// import { TMission } from './types';
import MainCard from './components/main/main-card';

export default function App() {
  const { isConnected, address } = useAccount();
  const [heroId, setHeroId] = useState<number | undefined>(undefined);
  const [missionName, setMissionName] = useState<string | undefined>(undefined);

  const { data: heroes, refetch: refetchOwnedHeroes } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getOwnedHeroes',
    args: isConnected && address ? [address] : undefined,
    query: {
      enabled: isConnected,
    },
  });

  console.log("address", )
  // const {
  //   data: missions,
  //   // isPending, error, refetch
  // } = useReadContract({
  //   address: CONTRACT_ADDRESS,
  //   abi: CONTRACT_ABI,
  //   functionName: 'getAllMissions',
  //   // enabled: isConnected && !!address,
  //   // query: {
  //   //   enabled: isConnected,
  //   // },
  // });

  return (
    <div className="w-4/5 mx-auto flex flex-col items-center">
      <ConnectionSection isConnected={isConnected} />

      <MainCard
        isConnected={isConnected}
        heroes={heroes as bigint[]}
        setHeroId={setHeroId}
        heroId={heroId}
        onHeroCreated={refetchOwnedHeroes}
        missionName={missionName}
        setMissionName={setMissionName}
        // missions={missions as TMission[]}
        address={address}
      />
      <Toaster richColors />
    </div>
  );
}
