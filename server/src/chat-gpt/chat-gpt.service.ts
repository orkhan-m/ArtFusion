import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import OpenAI from 'openai';

const openai = new OpenAI();

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

  async testRequest() {
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'system', content: 'You are a helpful assistant.' }],
      model: 'gpt-4o-mini',
    });

    return completion;
  }

  async analyzeImage() {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: 'What’s in this image?' },
            {
              type: 'image_url',
              image_url: {
                url: 'https://pics.craiyon.com/2023-06-30/76e502c13cf3441ba38b27ab59b5a250.webp',
              },
            },
          ],
        },
      ],
    });
    return response;
  }
}
