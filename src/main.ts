import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SocketIoAdapter } from './socket-io.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:5173',
      'https://heroic-hotteok-38d31a.netlify.app',
    ],
    credentials: true,
  });

  app.useWebSocketAdapter(new SocketIoAdapter(app));

  await app.listen(process.env.PORT || 3000);
}

void bootstrap();
