'use server';

/**
 * @fileOverview Extracts text from an image using OCR.
 *
 * - extractTextFromImage - A function that performs OCR on an image.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ExtractTextFromImageInputSchema = z.object({
  imageDataUri: z.string().describe(
    "A photo of a document, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
  ),
});
type ExtractTextFromImageInput = z.infer<typeof ExtractTextFromImageInputSchema>;

const ExtractTextFromImageOutputSchema = z.object({
  extractedText: z.string().describe('The text extracted from the image.'),
});
type ExtractTextFromImageOutput = z.infer<typeof ExtractTextFromImageOutputSchema>;

export async function extractTextFromImage(input: ExtractTextFromImageInput): Promise<ExtractTextFromImageOutput> {
  return extractTextFromImageFlow(input);
}

const extractTextPrompt = ai.definePrompt({
    name: 'extractTextPrompt',
    input: { schema: ExtractTextFromImageInputSchema },
    output: { schema: ExtractTextFromImageOutputSchema },
    prompt: `You are an Optical Character Recognition (OCR) tool. Your task is to extract all text from the provided image accurately.
    
    Image: {{media url=imageDataUri}}
    
    Return only the extracted text.`,
});


const extractTextFromImageFlow = ai.defineFlow(
  {
    name: 'extractTextFromImageFlow',
    inputSchema: ExtractTextFromImageInputSchema,
    outputSchema: ExtractTextFromImageOutputSchema,
  },
  async (input) => {
    const { output } = await extractTextPrompt(input);
    return output!;
  }
);
