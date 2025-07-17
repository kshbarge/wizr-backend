import { IoAdapter } from '@nestjs/platform-socket.io';
import { INestApplication } from '@nestjs/common';
import { ServerOptions } from 'socket.io';

export class SocketIoAdapter extends IoAdapter {
  constructor(private app: INestApplication) {
    super(app);
  }

  createIOServer(port: number, options?: ServerOptions): any {
    const cors = {
      origin: [
        'http://localhost:5173',
        'https://heroic-hotteok-38d31a.netlify.app',
      ],
      credentials: true,
    };

    const serverOptions = {
      ...options,
      cors,
    };

    return super.createIOServer(port, serverOptions);
  }
}
