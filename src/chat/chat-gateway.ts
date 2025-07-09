import { SubscribeMessage, MessageBody, WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from "@nestjs/websockets";

import { Socket, Server } from 'socket.io'
@WebSocketGateway(9628, {cors: {origin: '*'}})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;

    handleConnection(client: Socket){
        console.log("User connected:", client.id);
        this.server.emit('user-joined', {
            message: `New user joined the chat: ${client.id}`,
        })
    }

    handleDisconnect(client: Socket){
        console.log("User disconnected", client.id);
        this.server.emit('user-left', {
            message: `This user left the chat: ${client.id}`,
        })
    }

    @SubscribeMessage('newMessage')
    handleNewMessage(client: Socket, message: string){
        console.log(message);
        client.emit('reply', 'Message received!');
        this.server.emit('message', message);
    }
}