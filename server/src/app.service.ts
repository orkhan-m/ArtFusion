import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import OpenAI from 'openai';
import { NFTBaseData } from 'src/models';
import { PinataSDK } from 'pinata';

const openai = new OpenAI();

@Injectable()
export class AppService {
  private readonly openaiApiKey: string;
  private readonly openaiApiUrl: string =
    'https://api.openai.com/v1/chat/completions';
  private readonly pinata: PinataSDK;

  constructor(private configService: ConfigService) {
    this.openaiApiKey = this.configService.get<string>('OPENAI_API_KEY');
    this.pinata = new PinataSDK({
      pinataJwt: this.configService.get<string>('PINATA_JWT'),
      pinataGateway: this.configService.get<string>('GATEWAY_URL'),
    });
  }

  async getChatGptResponse(prompt: string): Promise<any> {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.openaiApiKey}`,
    };

    const data = {
      model: 'gpt-4', // Use the model you have access to
      messages: [{ role: 'user', content: prompt }],
    };

    try {
      const response = await axios.post(this.openaiApiUrl, data, { headers });
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

  private async generateImage(data: NFTBaseData[]) {
    const openaiImage = await openai.images.generate({
      model: 'dall-e-2',
      prompt: this.combineNFTsTextsToPrompt(data),
      n: 1,
      size: '256x256',
      response_format: 'url', // url or b64_json
    });
    return openaiImage.data[0].url;
  }

  private combineNFTsTextsToPrompt(nftArray: NFTBaseData[]): string {
    const formattedNFTs = nftArray.map((nft, index) => {
      return `${index + 1}. Name: ${nft.name}. Description: ${nft.description}`;
    });
    const combination = formattedNFTs.join(' ');
    return `Please generate a unique image that combines the following items. Provide a new name and a brief description (maximum 200 characters) for the generated image. Here is the input data: ${combination}.`;
  }

  async createNFT(data: NFTBaseData[]) {
    const generateImageUrl = await this.generateImage(data);
    try {
      const upload = await this.pinata.upload.url(generateImageUrl);
      console.log(upload);
      return upload;
    } catch (error) {
      console.log(error);
    }
  }
}
