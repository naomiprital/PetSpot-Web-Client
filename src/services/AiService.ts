import type { Listing } from '../components/MainFeedListingCard';
import { toast } from 'react-toastify';

const COHERE_API_URL = 'https://api.cohere.com/v2/chat';
const AI_MODEL = 'command-a-vision-07-2025';
const MAX_AI_LISTINGS = 50;

function getNewestListings(listings: Listing[], limit: number): Listing[] {
  return [...listings].sort((a, b) => b.lastSeen - a.lastSeen).slice(0, limit);
}

function buildPrompt(query: string): string {
  return `You are an AI assistant helping a user find a lost or found animal. 
The user is looking for: "${query}"

Below, you will receive the details and photos for all available listings.
Task:
1. Look at BOTH the text descriptions and the provided images for each listing.
2. Find the listings that match the user's description (e.g. if they say "black", look for black animals in the photos).
3. If a listing is completely unrelated, EXCLUDE IT entirely.
4. Return ONLY a valid JSON array of the relevant listing IDs, sorted from most relevant to least relevant.
5. If no listings match, return an empty array [].

Example output format: ["3", "1"]
Do NOT include any explanation, markdown formatting (like \`\`\`json), or extra text — only the raw JSON array.`;
}

function buildContentArray(query: string, listings: Listing[]): any[] {
  const content: any[] = [{ type: 'text', text: buildPrompt(query) }];

  listings.forEach((listing) => {
    content.push({
      type: 'text',
      text: `Listing ID: ${listing._id} | Animal: ${listing.animalType} | Description: ${listing.description}`,
    });
    if (listing.imageUrl) {
      content.push({
        type: 'image_url',
        image_url: { url: listing.imageUrl },
      });
    }
  });

  return content;
}

async function callCohereApi(apiKey: string, content: any[]): Promise<Response> {
  return fetch(COHERE_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: AI_MODEL,
      messages: [{ role: 'user', content }],
      temperature: 0,
    }),
  });
}

function parseRankedIds(rawText: string): string[] | null {
  try {
    const cleaned = rawText.replace(/```json?|```/g, '').trim();
    const ranked: string[] = JSON.parse(cleaned);
    if (Array.isArray(ranked)) return ranked;
  } catch {
    toast.error('AI search returned an unexpected response.');
  }
  return null;
}

export async function rankListingsByDescription(
  query: string,
  listings: Listing[]
): Promise<string[] | null> {
  const apiKey = import.meta.env.VITE_COHERE_API_KEY as string;

  if (!apiKey) {
    toast.error('AI search API key is missing.');
    return null;
  }

  const content = buildContentArray(query, getNewestListings(listings, MAX_AI_LISTINGS));
  const response = await callCohereApi(apiKey, content);

  if (!response.ok) {
    toast.error(`AI search failed. Please try again later.`);
    return null;
  }

  const data = await response.json();
  const rawText: string = data?.message?.content?.[0]?.text ?? '';

  return parseRankedIds(rawText);
}

export interface ImageSuggestion {
  description: string;
  animalType: string | null;
}

export async function getSuggestedDescription(image: File): Promise<ImageSuggestion | null> {
  const apiKey = import.meta.env.VITE_COHERE_API_KEY as string;

  if (!apiKey) {
    toast.error('AI suggestion API key is missing.');
    return null;
  }

  const base64Image = await new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(image);
  });

  const content = [
    {
      type: 'text',
      text: `You are an expert at identifying pets for lost and found reports.
Look at the image and return a JSON object with exactly two fields:
1. "description": A concise 1-2 sentence description of the pet (breed if recognizable, colors, distinctive features, estimated age).
2. "animalType": One of "Dog", "Cat", "Bird", "Rabbit", "Other", or null if no animal is visible.

Return ONLY valid JSON. No markdown, no explanation.
Example: {"description": "A golden retriever with a red collar, fluffy tail, and friendly expression.", "animalType": "Dog"}`,
    },
    {
      type: 'image_url',
      image_url: { url: base64Image },
    },
  ];

  const response = await callCohereApi(apiKey, content);

  if (!response.ok) {
    toast.error('AI failed to analyze the image.');
    return null;
  }

  const data = await response.json();
  const rawText: string = data?.message?.content?.[0]?.text ?? '';

  try {
    const cleaned = rawText.replace(/```json?|```/g, '').trim();
    const parsed = JSON.parse(cleaned);
    if (parsed && typeof parsed.description === 'string') {
      return {
        description: parsed.description,
        animalType: parsed.animalType ?? null,
      };
    }
  } catch {
    toast.error('AI returned an unexpected response.');
  }

  return null;
}
