import {
  Controller,
  Post,
  Body,
  Get,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ChatGptService } from './chat-gpt.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

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

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async analyzeImage(@UploadedFile() file: Express.Multer.File): Promise<any> {
    return this.chatGptService.analyzeImage(file);
  }
}
