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

  // @Post('analyzeImage')
  // @UseInterceptors(FileInterceptor('file'))
  // async analyzeImage(@UploadedFile() file: Express.Multer.File): Promise<any> {
  //   console.log('file: ', file);
  //   return this.chatGptService.analyzeImage(file);
  // }

  @Post('analyzeImage')
  async analyzeImage_v2(@Body() file: { data_url: string }): Promise<any> {
    console.log('file: ', file.data_url);
    return this.chatGptService.analyzeImage(file.data_url);
  }
}
