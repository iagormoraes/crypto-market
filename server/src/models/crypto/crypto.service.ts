import { Injectable } from '@nestjs/common';
import { timer } from 'rxjs';
import * as WebSocket from 'ws';

import { Environment } from '../../config/environment';
import { CryptoGateway } from './crypto.gateway';
import { TickerMapper } from './mappers/ticker.mapper';
import { SocketMapper } from './mappers/socket.mapper';
import { SocketEvent } from './constants/events.constant';

@Injectable()
export class CryptoService {
  private ws: WebSocket;
  private isConnected = false;

  constructor(private cryptoGateway: CryptoGateway) {
    this.connect();
  }

  connect() {
    this.ws = new WebSocket(`wss://${Environment.KRAKEN_WSS_HOST}`);
    this.ws.on('open', () => {
      this.ws.send(
        JSON.stringify({
          event: 'subscribe',
          pair: ['BTC/USD'],
          subscription: {
            name: 'ticker',
          },
        }),
      );
    });

    this.ws.on('error', () => {
      this.ws.close();
      this.isConnected = false;
    });

    this.ws.on('close', () => {
      timer(1000).subscribe(() => {
        this.isConnected = false;
        this.connect();
      });
    });

    this.ws.on('message', (buffer: Buffer) => {
      const messageJSON = Buffer.from(buffer).toString('utf-8');

      if (
        !(
          (messageJSON.startsWith('[') || messageJSON.startsWith('{')) &&
          (messageJSON.endsWith(']') || messageJSON.endsWith('}'))
        )
      )
        return;

      const message = JSON.parse(messageJSON);
      const isArray = Array.isArray(message);

      if (!isArray) return;

      this.cryptoGateway.broadcast(
        new SocketMapper().toDto({
          event: SocketEvent.OnTicker,
          data: new TickerMapper().toDomain(message),
        }),
      );
    });
  }
}
