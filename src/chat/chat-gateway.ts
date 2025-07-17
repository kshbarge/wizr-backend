import {
  SubscribeMessage,
  MessageBody,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';

import { Socket, Server } from 'socket.io';
@WebSocketGateway({ cors: { origin: 'https://wizr-z1na.onrender.com/session' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    this.server.emit('user-joined', {
      message: `New user joined the chat: ${client.id}`,
    });
  }

  handleDisconnect(client: Socket) {
    this.server.emit('user-left', {
      message: `This user left the chat: ${client.id}`,
    });
  }

  @SubscribeMessage('newMessage')
  handleNewMessage(client: Socket, message: string, sender: string) {
    client.emit('reply', 'Message received!');
    this.server.emit('message', message);
  }
}
