import { UseGuards } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { IncomingMessage } from 'http';
import { Server } from 'ws';
import { AuthService } from '../auth/auth.service';
import { WSGuard } from '../auth/guards/WSAuth.guard';
import PayGatewayMessage from './dtos/PayGatewayMessage.dto';

@WebSocketGateway({ namespace: 'payments' })
// @WebSocketGateway()
export class PayGateway implements OnGatewayInit, OnGatewayConnection {
  constructor() {}

  @WebSocketServer() server: Server;

  handleConnection(client: any, ...args: any[]) {
    console.log('connected');
  }

  afterInit(server: any) {
    console.log('Connected');
  }

  public notifyAll(msg: PayGatewayMessage) {
    this.server.clients.forEach((client) => {
      client.send(JSON.stringify(msg));
    });
  }

  @UseGuards(WSGuard)
  @SubscribeMessage('pay')
  handleMessage(client: any, payload: any): string {
    return 'Hello sir';
  }
}
