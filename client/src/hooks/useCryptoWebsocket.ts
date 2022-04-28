import { useEffect } from 'react';

import { CryptoMapper } from '../modules/crypto/mappers/crypto-mapper';

import { WebsocketClientExternal } from '../lib/websocket-client/websocket-client-external';

import { useStore } from '../store/crypto/asset.slice';

export default function useCryptoWebsocket(spreadPercentage: number) {
  const { cryptoHistory, add } = useStore();

  useEffect(() => {
    const websocket = new WebsocketClientExternal();

    const handleConnection = () => {
      websocket.send(JSON.stringify({ event: 'Connect' }));
    };

    websocket.connect(handleConnection);

    return websocket.addListener((message) => {
      const eventMessage = JSON.parse(message.data);

      if (eventMessage.event === 'OnTicker') {
        add(new CryptoMapper().toDomain(eventMessage.data, spreadPercentage));
      }
    });
  }, [add, spreadPercentage]);

  return cryptoHistory;
}
