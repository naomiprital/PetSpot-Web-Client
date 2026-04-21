import type { Listing } from '../components/ListingCard';
import { toast } from 'react-toastify';

const COHERE_API_URL = 'https://api.cohere.com/v2/chat';


export async function rankListingsByDescription(
  query: string,
  listings: Listing[]
): Promise<string[] | null> {
  const apiKey = import.meta.env.VITE_COHERE_API_KEY as string;

  if (!apiKey) {
    console.warn('VITE_COHERE_API_KEY is not set');
    return null;
  }

  const promptText = `You are an AI assistant helping a user find a lost or found animal. 
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

  const contentArray: any[] = [{ type: 'text', text: promptText }];

  listings.forEach((listing) => {
    contentArray.push({
      type: 'text',
      text: `Listing ID: ${listing.id} | Animal: ${listing.animal} | Description: ${listing.description}`,
    });
    if (listing.imageUrl) {
      contentArray.push({
        type: 'image_url',
        image_url: { url: listing.imageUrl },
      });
    }
  });

  const response = await fetch(COHERE_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'command-a-vision-07-2025',
      messages: [{ role: 'user', content: contentArray }],
      temperature: 0,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    console.error('Cohere API error:', response.status, errText);
    toast.error(`AI search failed (${response.status}). Please try again later.`);
    return null;
  }

  const data = await response.json();
  const rawText: string = data?.message?.content?.[0]?.text ?? '';

  try {
    const cleaned = rawText.replace(/```json?|```/g, '').trim();
    const ranked: string[] = JSON.parse(cleaned);
    if (Array.isArray(ranked)) return ranked;
  } catch {
    console.error('Failed to parse Cohere response:', rawText);
    toast.error('AI search returned an unexpected response.');
  }

  return null;
}
