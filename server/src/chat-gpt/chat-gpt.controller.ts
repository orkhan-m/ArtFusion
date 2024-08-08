import { Controller, Post, Body, Get } from '@nestjs/common';
import { ChatGptService } from './chat-gpt.service';

@Controller('chat-gpt')
export class ChatGptController {
  constructor(private readonly chatGptService: ChatGptService) {}

  @Post('ask')
  async askChatGpt(@Body('prompt') prompt: string): Promise<any> {
    return this.chatGptService.getChatGptResponse(prompt);
  }

  @Get('test')
  async testGpt(): Promise<any> {
    return this.chatGptService.testRequest();
  }

  @Get('analyzeImage')
  async analyzeImage(): Promise<any> {
    return this.chatGptService.analyzeImage();
  }
}
