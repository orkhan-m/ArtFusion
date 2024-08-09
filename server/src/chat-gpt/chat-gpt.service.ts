import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NFTBaseData } from '../../../common';
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

  async analyzeImage(image: string) {
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
                url: image,
              },
            },
          ],
        },
      ],
    });
    return response;
  }

  async generateImage(data: NFTBaseData[]) {
    const response = await openai.images.generate({
      model: 'dall-e-2',
      prompt: this.combineNFTsTextsToPrompt(data),
      n: 1,
      size: '256x256',
    });
    return response;
  }

  private combineNFTsTextsToPrompt(nftArray: NFTBaseData[]): string {
    const formattedNFTs = nftArray.map((nft, index) => {
      return `${index + 1}. Name: ${nft.name}. Description: ${nft.description}`;
    });
    const combination = formattedNFTs.join(' ');
    return `Please generate a unique image that combines the following items. Provide a new name and a brief description (maximum 200 characters) for the generated image. Here is the input data: ${combination}.`;
  }
}
