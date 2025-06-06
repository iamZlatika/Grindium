import { Button } from '@/components/ui/button';
import React from 'react';
import { injected, useConnect, useDisconnect } from 'wagmi';

interface ConnectionSectionProps {
  isConnected: boolean;
  address: `0x${string}` | undefined;
}
const ConnectionSection = ({ isConnected, address }: ConnectionSectionProps) => {
  const { connect, connectors, error: connectError } = useConnect();

  const { disconnect } = useDisconnect();
  return (
    <div>
      {isConnected ? (
        <div>
          <div>Кошелёк подключён: {address}</div>
          <Button onClick={() => disconnect()}>Отключить</Button>
        </div>
      ) : (
        <div>
          <Button onClick={() => connect({ connector: injected() })}>Connect</Button>
          {connectors.map((connector) => (
            <button
              disabled={!connector.ready}
              key={connector.id}
              onClick={() => connect({ connector })}
            >
              {connector.name}
              {!connector.ready && ' (не доступен)'}
            </button>
          ))}
          {connectError && <div style={{ color: 'red' }}>{connectError.message}</div>}
        </div>
      )}
    </div>
  );
};

export default ConnectionSection;
