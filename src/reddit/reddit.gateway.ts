import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
  OnGatewayInit,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server } from 'ws';

import {} from '@nestjs/platform-socket.io';
import { IncomingMessage } from 'http';
import { AuthService } from '../auth/auth.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../auth/guards/Jwt.guard';
import { WSGuard } from '../auth/guards/WSAuth.guard';

@WebSocketGateway({ namespace: 'reddit' })
export class RedditGateway implements OnGatewayInit, OnGatewayConnection {
  constructor() {}

  @WebSocketServer() server: Server;

  handleConnection(client: any, ...args: any[]) {
    console.log(client.handshake.auth);
    console.log('connected');
  }

  afterInit(server: any) {
    console.log('Connected');
  }

  @SubscribeMessage('events')
  handleEvent(@MessageBody('id') id: number): number {
    console.log('Received');
    return id;
  }

  @UseGuards(WSGuard)
  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string): void {
    console.log('Sent');
    this.server.emit('message', message);
  }
}
