import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { NFTBaseData } from './models';

export interface CreateNFTMetadataRequest {
  name: string;
  description: string;
  imageUrl: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('chat-gpt/ask')
  async askChatGpt(@Body('prompt') prompt: string) {
    return this.appService.getChatGptResponse(prompt);
  }

  @Post('chat-gpt/analyzeImage')
  async analyzeImage_v2(@Body() file: { data_url: string }) {
    return this.appService.analyzeImage(file.data_url);
  }

  @Post('shakeNFTs')
  async generateImage(@Body() data: NFTBaseData[]) {
    return this.appService.shakeNFTs(data);
  }

  @Post('createNFTMetadata')
  async createNFTMetadata(@Body() data: CreateNFTMetadataRequest) {
    return this.appService.createNFTMetadata(data, 'base64');
  }
}
