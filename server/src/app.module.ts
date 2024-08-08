import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGptService } from './chat-gpt/chat-gpt.service';
import { ChatGptController } from './chat-gpt/chat-gpt.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController, ChatGptController],
  providers: [AppService, ChatGptService],
})
export class AppModule {}
