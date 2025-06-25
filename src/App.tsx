import ConnectionSection from './components/main/connection';
import { useAccount, useReadContract } from 'wagmi';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from './contract';
import { useState } from 'react';
import { Toaster } from '@/components/ui/sonner';
import MainCard from './components/main/card';
import { TFullHeroData, TMission } from './types';

export default function App() {
  const { isConnected, address } = useAccount();
  const [heroId, setHeroId] = useState<number | undefined>(undefined);
  const [selectedMission, setSelectedMission] = useState<TMission | undefined>(undefined);

  const { data: heroes, refetch: refetchOwnedHeroes } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getOwnedHeroes',
    args: isConnected && address ? [address] : undefined,
    query: {
      enabled: isConnected,
    },
  });

  const { data: missions } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getAllMissions',
    query: {
      enabled: isConnected,
    },
  });

  const heroIdAsBigInt = heroId !== undefined ? BigInt(heroId) : undefined;
  const { data: heroData, refetch: refetchHeroData } = useReadContract({
    abi: CONTRACT_ABI,
    address: CONTRACT_ADDRESS,
    functionName: 'getHeroFullData',
    args: heroIdAsBigInt !== undefined ? [heroIdAsBigInt] : undefined,
    query: {
      enabled: heroIdAsBigInt !== undefined,
    },
  });

  console.log('heroData', heroData);
  return (
    <div className="w-4/5 mx-auto flex flex-col items-center">
      <ConnectionSection isConnected={isConnected} />

      <MainCard
        isConnected={isConnected}
        heroes={heroes as bigint[]}
        setHeroId={setHeroId}
        heroId={heroId}
        onHeroCreated={refetchOwnedHeroes}
        onHeroDataRefetch={refetchHeroData}
        heroData={heroData as TFullHeroData}
        selectedMission={selectedMission}
        setSelectedMission={setSelectedMission}
        missions={missions as TMission[]}
        address={address}
      />
      <Toaster richColors />
    </div>
  );
}
