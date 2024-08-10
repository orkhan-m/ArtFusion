import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { NFTBaseData } from './models';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('chat-gpt/ask')
  async askChatGpt(@Body('prompt') prompt: string) {
    return this.appService.getChatGptResponse(prompt);
  }

  @Post('chat-gpt/analyzeImage')
  async analyzeImage_v2(@Body() file: { data_url: string }) {
    console.log('file: ', file.data_url);
    return this.appService.analyzeImage(file.data_url);
  }

  @Post('createNFT')
  async generateImage(@Body() data: NFTBaseData[]) {
    return this.appService.createNFT(data);
  }
}
