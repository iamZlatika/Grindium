import ConnectionSection from './components/sections/connection-section';
import { useAccount, useReadContract } from 'wagmi';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from './contract';
import { useState } from 'react';
import MissionsSection from './components/sections/missions-section';
import { TMissions } from './types';
import HeroSection from './components/sections/hero-section';

export default function App() {
  const { isConnected, address } = useAccount();
  const [heroId, setHeroId] = useState<number | undefined>(undefined);
  const [missionName, setMissionName] = useState<string | undefined>(undefined);
  const {
    data: heroes,
    // isPending, error, refetch
  } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getOwnedHeroes',
    args: [address],
    query: {
      enabled: isConnected,
    },
  });
  const {
    data: missions,
    // isPending, error, refetch
  } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getAllMissions',
    // enabled: isConnected && !!address,
    // query: {
    //   enabled: isConnected,
    // },
  });

  return (
    <div style={{ padding: 20 }}>
      <ConnectionSection isConnected={isConnected} address={address} />
      <HeroSection data={heroes as bigint[]} setHeroId={setHeroId} heroId={heroId} />
      <MissionsSection
        missionName={missionName}
        setMissionName={setMissionName}
        data={missions as TMissions}
        heroId={heroId}
      />
    </div>
  );
}
