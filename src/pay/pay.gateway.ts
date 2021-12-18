import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'ws';

@WebSocketGateway()
export class PayGateway {
  @WebSocketServer() server: Server;

  public notifyAll(msg: object | string) {
    this.server.clients.forEach((client) => {
      client.send(JSON.stringify(msg));
    });
  }

  @SubscribeMessage('pay')
  handleMessage(client: any, payload: any): string {
    return 'Hello sir';
  }
}
