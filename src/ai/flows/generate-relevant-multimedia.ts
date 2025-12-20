'use server';

/**
 * @fileOverview Generates relevant multimedia resources (images and videos) for a given lesson.
 *
 * - generateRelevantMultimedia - A function that orchestrates the process of suggesting images and videos.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateRelevantMultimediaInputSchema = z.object({
  lessonContent: z
    .string()
    .describe('The content of the lesson for which multimedia resources are to be generated.'),
});

const GenerateRelevantMultimediaOutputSchema = z.object({
  suggestedImages: z.array(
    z.object({
      url: z.string().describe('URL of the suggested image.'),
      description: z.string().describe('Description of the image.'),
    })
  ).describe('A list of suggested images.'),
  suggestedVideos: z.array(
    z.object({
      url: z.string().describe('URL of the suggested video.'),
      title: z.string().describe('Title of the video.'),
    })
  ).describe('A list of suggested videos.'),
});

export async function generateRelevantMultimedia(
  input: z.infer<typeof GenerateRelevantMultimediaInputSchema>
): Promise<z.infer<typeof GenerateRelevantMultimediaOutputSchema>> {
  return generateRelevantMultimediaFlow(input);
}

const generateImagesPrompt = ai.definePrompt({
  name: 'generateImagesPrompt',
  input: {schema: GenerateRelevantMultimediaInputSchema},
  output: {schema: z.array(z.object({url: z.string(), description: z.string()}))},
  prompt: `Based on the following lesson content, suggest relevant images with descriptions.  Return the result as a JSON array. Do not include any images that would be considered offensive, dangerous, or illegal.\n\nLesson Content: {{{lessonContent}}}`,
  config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_ONLY_HIGH',
      },
    ],
  },
});

const generateVideosPrompt = ai.definePrompt({
  name: 'generateVideosPrompt',
  input: {schema: GenerateRelevantMultimediaInputSchema},
  output: {schema: z.array(z.object({url: z.string(), title: z.string()}))},
  prompt: `Based on the following lesson content, suggest relevant YouTube videos with titles. Return the result as a JSON array. Do not include any videos that would be considered offensive, dangerous, or illegal.\n\nLesson Content: {{{lessonContent}}}`,
  config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_ONLY_HIGH',
      },
    ],
  },
});

const generateRelevantMultimediaFlow = ai.defineFlow(
  {
    name: 'generateRelevantMultimediaFlow',
    inputSchema: GenerateRelevantMultimediaInputSchema,
    outputSchema: GenerateRelevantMultimediaOutputSchema,
  },
  async input => {
    // Call both prompts in parallel
    const [imagesResult, videosResult] = await Promise.all([
      generateImagesPrompt(input),
      generateVideosPrompt(input),
    ]);

    return {
      suggestedImages: imagesResult.output ?? [],
      suggestedVideos: videosResult.output ?? [],
    };
  }
);
