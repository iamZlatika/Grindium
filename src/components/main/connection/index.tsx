import { Button } from '@/components/ui/button';
import { injected, useConnect, useDisconnect } from 'wagmi';

interface ConnectionSectionProps {
  isConnected: boolean;
}
const ConnectionSection = ({ isConnected }: ConnectionSectionProps) => {
  const { connect, error: connectError } = useConnect();
  const { disconnect } = useDisconnect();
  return (
    <div className="w-full mt-3">
      <div className="flex justify-end gap-5">
        {isConnected ? (
          <Button onClick={() => disconnect()}>Disconnect</Button>
        ) : (
          <>
            <Button onClick={() => connect({ connector: injected() })}>Connect</Button>
            {connectError && <div style={{ color: 'red' }}>{connectError.message}</div>}
          </>
        )}
      </div>
    </div>
  );
};

export default ConnectionSection;
