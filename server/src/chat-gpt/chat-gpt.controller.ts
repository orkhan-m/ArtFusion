import { Controller, Post, Body } from '@nestjs/common';
import { ChatGptService } from './chat-gpt.service';
import { NFTBaseData } from '../../../common';

@Controller('chat-gpt')
export class ChatGptController {
  constructor(private readonly chatGptService: ChatGptService) {}

  @Post('ask')
  async askChatGpt(@Body('prompt') prompt: string) {
    return this.chatGptService.getChatGptResponse(prompt);
  }

  @Post('analyzeImage')
  async analyzeImage_v2(@Body() file: { data_url: string }) {
    console.log('file: ', file.data_url);
    return this.chatGptService.analyzeImage(file.data_url);
  }

  @Post('generateImage')
  async generateImage(@Body() data: NFTBaseData[]) {
    return this.chatGptService.generateImage(data);
  }
}
