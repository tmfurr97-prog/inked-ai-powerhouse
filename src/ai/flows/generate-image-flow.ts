'use server';

/**
 * @fileOverview A flow for generating an image from a text prompt.
 * 
 * - generateImage - A function that takes a text prompt and returns an image.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateImageInputSchema = z.object({
  prompt: z.string().describe('A detailed text prompt describing the desired image.'),
});

const GenerateImageOutputSchema = z.object({
  imageUrl: z.string().describe('The data URI of the generated image.'),
});

export async function generateImage(input: z.infer<typeof GenerateImageInputSchema>): Promise<z.infer<typeof GenerateImageOutputSchema>> {
  return generateImageFlow(input);
}

const generateImageFlow = ai.defineFlow(
  {
    name: 'generateImageFlow',
    inputSchema: GenerateImageInputSchema,
    outputSchema: GenerateImageOutputSchema,
  },
  async (input) => {
    const { media } = await ai.generate({
        // Using a fast image generation model.
        model: 'googleai/imagen-4.0-fast-generate-001',
        prompt: input.prompt,
    });
    
    const imageUrl = media?.url;
    if (!imageUrl) {
        throw new Error('Image generation failed to produce an output.');
    }

    return { imageUrl };
  }
);
