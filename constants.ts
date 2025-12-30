import { Ad, BrandProfile } from './types';

export const DERMA_BOTANICA_PROFILE: BrandProfile = {
  name: "Derma Botanica",
  overview: "Derma Botanica offers dermatologist-developed skincare that blends science and nature to deliver visible results like smoother, firmer, and younger-looking skin. The brand emphasizes effective yet gentle routines for sensitive skin, backed by a 60-day money-back guarantee.",
  websiteUrl: "https://www.dermabotanica.com/",
  brandValues: [
    "Scientifically-backed efficacy",
    "Gentle and non-irritating formulas",
    "Simplicity and consistency",
    "Ethical and clean ingredients",
    "Customer confidence"
  ],
  visualAesthetics: ["modern", "clinical", "botanical", "sophisticated", "minimalist"],
  toneOfVoice: ["Authoritative", "Reassuring", "Clinical", "Confidence-boosting"]
};

// Realistic mock ads to use if no Foreplay API key is provided
export const MOCK_ADS: Ad[] = [
  {
    id: "ad_001",
    brand_name: "GlowRecipe",
    title: "Watermelon Glow Serum",
    description: "Hydrate and smooth your skin with our best-selling serum.",
    display_format: "video",
    publisher_platform: ["instagram", "tiktok"],
    running_duration: { days: 450 },
    thumbnail: "https://picsum.photos/400/600?random=1",
    created_at: "2023-05-15T10:30:00Z"
  },
  {
    id: "ad_002",
    brand_name: "CeraVe",
    title: "Daily Moisturizing Lotion",
    description: "Developed with dermatologists. Restore your protective skin barrier.",
    display_format: "image",
    publisher_platform: ["facebook"],
    running_duration: { days: 890 },
    thumbnail: "https://picsum.photos/400/400?random=2",
    created_at: "2022-01-10T08:00:00Z"
  },
  {
    id: "ad_003",
    brand_name: "The Ordinary",
    title: "Niacinamide 10% + Zinc 1%",
    description: "Target blemishes and congestion with high-strength vitamin and mineral formula.",
    display_format: "video",
    publisher_platform: ["tiktok"],
    running_duration: { days: 120 },
    thumbnail: "https://picsum.photos/400/700?random=3",
    created_at: "2024-01-20T14:15:00Z"
  },
  {
    id: "ad_004",
    brand_name: "La Roche-Posay",
    title: "Anthelios Melt-in Milk Sunscreen",
    description: "Broad spectrum SPF 100. Fast absorbing, velvety finish.",
    display_format: "carousel",
    publisher_platform: ["facebook", "instagram"],
    running_duration: { days: 600 },
    thumbnail: "https://picsum.photos/600/600?random=4",
    created_at: "2023-03-01T09:00:00Z"
  },
  {
    id: "ad_005",
    brand_name: "Paula's Choice",
    title: "2% BHA Liquid Exfoliant",
    description: "#1 product worldwide. Unclog pores and smooth wrinkles.",
    display_format: "video",
    publisher_platform: ["youtube", "instagram"],
    running_duration: { days: 365 },
    thumbnail: "https://picsum.photos/400/600?random=5",
    created_at: "2023-08-15T16:20:00Z"
  },
  {
    id: "ad_006",
    brand_name: "Youth To The People",
    title: "Superfood Cleanser",
    description: "Kale + Green Tea Spinach Vitamins. The green juice cleanse for your face.",
    display_format: "video",
    publisher_platform: ["tiktok"],
    running_duration: { days: 200 },
    thumbnail: "https://picsum.photos/400/700?random=6",
    created_at: "2023-11-05T11:00:00Z"
  },
   {
    id: "ad_007",
    brand_name: "Drunk Elephant",
    title: "Protini Polypeptide Cream",
    description: "Strengthen and moisturize. Like adding a shot of protein to your smoothie.",
    display_format: "image",
    publisher_platform: ["instagram"],
    running_duration: { days: 150 },
    thumbnail: "https://picsum.photos/500/500?random=7",
    created_at: "2023-12-01T10:00:00Z"
  },
  {
    id: "ad_008",
    brand_name: "Tatcha",
    title: "The Dewy Skin Cream",
    description: "Rich cream to feed skin with plumping hydration and antioxidant-packed Japanese purple rice.",
    display_format: "video",
    publisher_platform: ["facebook"],
    running_duration: { days: 90 },
    thumbnail: "https://picsum.photos/400/500?random=8",
    created_at: "2024-02-14T09:30:00Z"
  }
];
