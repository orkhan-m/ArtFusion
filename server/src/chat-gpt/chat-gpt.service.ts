import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class ChatGptService {
  private readonly apiKey: string;
  private readonly apiUrl: string =
    'https://api.openai.com/v1/chat/completions';

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('OPENAI_API_KEY');
  }

  async getChatGptResponse(prompt: string): Promise<any> {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiKey}`,
    };

    const data = {
      model: 'gpt-4', // Use the model you have access to
      messages: [{ role: 'user', content: prompt }],
    };

    try {
      const response = await axios.post(this.apiUrl, data, { headers });
      return response.data;
    } catch (error) {
      console.error('Error communicating with ChatGPT API', error);
      throw error;
    }
  }
}
