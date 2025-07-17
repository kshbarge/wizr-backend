import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(6379, {
  cors: {
    origin: '*',
  },
})
export class MatchGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('startMatch')
  handleStartMatch(client: Socket, payload: any) {
    console.log('startMatch received:', payload);

    const { userId, skillToTeach, skillToLearn } = payload;

    if (skillToTeach === 'Japanese' && skillToLearn === 'German') {
      const matchData = {
        message: 'Match found!',
        partnerId: '456', // dummy id
        partnerTeach: 'German',
        partnerLearn: 'Japanese',
      };

      client.emit('matchFound', matchData);
    } else {
      client.emit('matchNotFound', {
        message: 'No match available at the moment.',
      });
    }
  }
}
