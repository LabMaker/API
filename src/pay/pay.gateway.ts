import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { IncomingMessage } from 'http';
import { Server } from 'ws';
import { AuthService } from '../auth/auth.service';
import PayGatewayMessage from './dtos/PayGatewayMessage.dto';

@WebSocketGateway()
export class PayGateway {
  @WebSocketServer() server: Server;

  constructor(private authService: AuthService) {}

  async handleConnection(socket: WebSocket, msg: IncomingMessage) {
    const payload = await this.authService.verify(msg.headers.authorization);

    if (!payload) socket.close();
  }

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
