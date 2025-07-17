import { SubscribeMessage, MessageBody, WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from "@nestjs/websockets";
import SimplePeer from 'simple-peer'

import { Socket, Server } from 'socket.io'
@WebSocketGateway({cors: {origin: 'https://wizr-z1na.onrender.com/'}})
export class VideoGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;

    handleConnection(client: Socket){
        client.emit("me", client.id)
    }

    handleDisconnect(client: Socket){
        this.server.emit("callEnded")
    }

    @SubscribeMessage('callUser')
    handleNewCall(client: Socket, data){
        console.log(data);
        client.emit('reply', 'Call request received!');
        this.server.to(data.userToCall).emit('callUser', {signal: data.signalData, from:data.from, name: data.name});
    }

    @SubscribeMessage('answerCall')
    handleAnswer(client: Socket, data){
        console.log(data)
        this.server.to(data.to).emit('callAccepted', data.signal) 
    }
}