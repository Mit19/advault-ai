import { GoogleGenAI, Type, SchemaType } from "@google/genai";
import { BrandProfile, GeneratedQuery, GeminiModel } from '../types';

// Initialize Gemini
// Ensure process.env.API_KEY is available. 
// In a real app, you might handle missing keys more gracefully in UI.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateSearchStrategies = async (brand: BrandProfile): Promise<GeneratedQuery[]> => {
  try {
    const prompt = `
      You are an expert media buyer and ad strategist.
      Analyze the following brand profile for "${brand.name}".
      
      Brand Overview: ${brand.overview}
      Values: ${brand.brandValues.join(', ')}
      Target Tone: ${brand.toneOfVoice.join(', ')}

      Your goal is to find high-performing competitor ads on an ad intelligence platform (like Foreplay).
      Generate 5 distinct, short, product-oriented search queries that would surface relevant, high-converting ads.
      Focus on:
      1. Similar product categories (e.g., "gentle retinol").
      2. Specific problem/solution keywords (e.g., "anti-aging for sensitive skin").
      3. Competitor niches.

      For each query, provide a short rationale (max 10 words) explaining why this query reveals good ads.
    `;

    const response = await ai.models.generateContent({
      model: GeminiModel.PRO,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              term: { type: Type.STRING },
              rationale: { type: Type.STRING }
            },
            required: ["term", "rationale"]
          }
        },
        // Using Thinking Mode for better strategic reasoning
        thinkingConfig: {
            thinkingBudget: 2048 
        }
      }
    });

    const data = JSON.parse(response.text || '[]');
    
    return data.map((item: any) => ({
      term: item.term,
      rationale: item.rationale,
      status: 'pending',
      resultsCount: 0
    }));

  } catch (error) {
    console.error("Error generating strategies:", error);
    // Fallback if API fails
    return [
      { term: "sensitive skin anti-aging", rationale: "Direct competitor niche", status: 'pending', resultsCount: 0 },
      { term: "dermatologist tested skincare", rationale: "Authority based search", status: 'pending', resultsCount: 0 },
      { term: "vegan retinol alternative", rationale: "Ingredient focused", status: 'pending', resultsCount: 0 }
    ];
  }
};

export const chatWithGemini = async (
    message: string, 
    context: string, 
    history: {role: string, parts: {text: string}[]}[]
) => {
    try {
        const chat = ai.chats.create({
            model: GeminiModel.FLASH,
            history: [
                {
                    role: 'user',
                    parts: [{ text: `System Context: You are an ad creative assistant helping a user analyze ads for the brand "Derma Botanica". ${context}` }]
                },
                {
                    role: 'model',
                    parts: [{ text: "Understood. I am ready to help you analyze ads and improve your creative strategy." }]
                },
                ...history
            ]
        });

        const result = await chat.sendMessage({ message });
        return result.text;
    } catch (e) {
        console.error(e);
        return "I'm having trouble connecting right now. Please check your connection.";
    }
}
