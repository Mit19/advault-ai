export interface BrandProfile {
  name: string;
  overview: string;
  websiteUrl: string;
  brandValues: string[];
  visualAesthetics: string[];
  toneOfVoice: string[];
}

export interface Ad {
  id: string;
  brand_name: string;
  title: string;
  description: string;
  display_format: 'video' | 'image' | 'carousel' | 'dco' | 'other';
  publisher_platform: string[];
  running_duration?: {
    days: number;
  };
  thumbnail: string;
  video_url?: string;
  image_url?: string;
  created_at: string;
  score?: number; // Internal relevance score
}

export interface GeneratedQuery {
  term: string;
  rationale: string;
  status: 'pending' | 'searching' | 'completed' | 'failed';
  resultsCount: number;
}

export interface ForeplayConfig {
  apiKey: string;
}

export enum GeminiModel {
  FLASH = 'gemini-3-flash-preview',
  PRO = 'gemini-3-pro-preview',
}
