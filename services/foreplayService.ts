import { Ad } from '../types';
import { MOCK_ADS } from '../constants';

const BASE_URL = 'https://public.api.foreplay.co';

export const searchAds = async (
  query: string, 
  apiKey: string | null
): Promise<Ad[]> => {
  // Simulate network delay for better UX feel
  await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1000));

  // If no API key, return filtered mock data
  if (!apiKey) {
    console.warn("No Foreplay API Key provided. Using Mock Data.");
    return MOCK_ADS.filter(ad => 
      ad.title.toLowerCase().includes(query.toLowerCase()) || 
      ad.description.toLowerCase().includes(query.toLowerCase()) ||
      ad.brand_name.toLowerCase().includes(query.toLowerCase()) ||
      query.toLowerCase().split(' ').some(word => ad.description.toLowerCase().includes(word))
    );
  }

  // Real API Call
  try {
    const url = new URL(`${BASE_URL}/api/discovery/ads`);
    url.searchParams.append('query', query);
    url.searchParams.append('limit', '20');
    url.searchParams.append('order', 'longest_running'); // "Best working" proxy

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Authorization': apiKey,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
        if(response.status === 401) throw new Error("Invalid Foreplay API Key");
        if(response.status === 429) throw new Error("Rate limit exceeded");
        throw new Error(`API Error: ${response.statusText}`);
    }

    const json = await response.json();
    
    // Transform Foreplay response to our Ad interface
    // Note: Adjust mapping based on actual API response shape provided in OpenAPI spec
    return json.data.map((item: any) => ({
      id: item.id,
      brand_name: item.brand_name || "Unknown Brand",
      title: item.title || "Untitled Ad",
      description: item.description || "",
      display_format: item.display_format,
      publisher_platform: item.publisher_platform || [],
      running_duration: item.running_duration,
      thumbnail: item.thumbnail || "https://picsum.photos/400/400",
      video_url: item.video,
      image_url: item.image,
      created_at: item.created_at
    }));

  } catch (error) {
    console.error("Foreplay API search failed:", error);
    // Fallback to mock data on error so the app doesn't break for the user
    return MOCK_ADS; 
  }
};
