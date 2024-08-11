export interface ChatCompletion {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Choice[];
  usage: Usage;
  system_fingerprint: string;
}

interface Choice {
  index: number;
  message: Message;
  logprobs: null | any; // or you can specify the exact type if known
  finish_reason: string;
}

interface Message {
  role: string;
  content: string;
  refusal: null | any; // or you can specify the exact type if known
}

interface Usage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}

export interface NFTBaseData {
  name: string;
}
