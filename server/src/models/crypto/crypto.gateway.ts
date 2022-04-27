import {
  ConnectedSocket,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';

import { SocketEvent } from './constants/events.constant';

@WebSocketGateway()
export class CryptoGateway implements OnGatewayDisconnect {
  clients = [];

  handleDisconnect(client: any): any {
    this.clients.forEach((clientItem, index) => {
      if (clientItem === client) {
        this.clients.splice(index, 1);
      }
    });
  }

  broadcast(event: string) {
    for (const client of this.clients) {
      client.send(event);
    }
  }

  @SubscribeMessage(SocketEvent.Connect)
  handleMessage(@ConnectedSocket() client: any) {
    const existClient = this.clients.some(
      (clientItem) => clientItem === client,
    );

    if (!existClient) {
      this.clients.push(client);
    }

    return { event: SocketEvent.ConnectSuccess };
  }
}
