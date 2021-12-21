import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'ws';
import PayGatewayMessage from './dtos/PayGatewayMessage.dto';

@WebSocketGateway()
export class PayGateway {
  @WebSocketServer() server: Server;

  public notifyAll(msg: PayGatewayMessage) {
    this.server.clients.forEach((client) => {
      client.send(JSON.stringify(msg));
    });
  }

  @SubscribeMessage('pay')
  handleMessage(client: any, payload: any): string {
    return 'Hello sir';
  }
}
