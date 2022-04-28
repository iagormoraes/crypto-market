import { useEffect, useState } from 'react';

import { CryptoAsset } from '../modules/crypto/interfaces/asset.interface';

import { WebsocketClientExternal } from '../lib/websocket-client/websocket-client-external';
import { CryptoMapper } from '../modules/crypto/mappers/crypto-mapper';

export default function useCryptoWebsocket(spreadPercentage: number) {
  const [cryptoHistory, setCryptoHistory] = useState<CryptoAsset[]>([]);

  useEffect(() => {
    const websocket = new WebsocketClientExternal();

    const handleConnection = () => {
      websocket.send(JSON.stringify({ event: 'Connect' }));
    };

    websocket.connect(handleConnection);

    return websocket.addListener((message) => {
      const eventMessage = JSON.parse(message.data);

      if (eventMessage.event === 'OnTicker') {
        setCryptoHistory((prev) => [
          new CryptoMapper().toDomain(eventMessage.data, spreadPercentage),
          ...prev,
        ]);
      }
    });
  }, [spreadPercentage]);

  return cryptoHistory;
}
