'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating a course outline from uploaded SME content.
 *
 * generateCourseOutline - A function that takes SME content and user parameters to generate a course outline.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCourseOutlineInputSchema = z.object({
  content: z
    .string()
    .describe('The uploaded content from the SME, including documents, lectures, and manuals.'),
  numModules: z
    .number()
    .int()
    .positive()
    .default(5)
    .describe('The desired number of modules for the course.'),
  targetAudience: z
    .string()
    .default('Beginner')
    .describe('The target audience for the course (e.g., Beginner, Intermediate, Expert).'),
});

const GenerateCourseOutlineOutputSchema = z.object({
  outline: z.string().describe('The generated course outline.'),
});

export async function generateCourseOutline(input: z.infer<typeof GenerateCourseOutlineInputSchema>): Promise<z.infer<typeof GenerateCourseOutlineOutputSchema>> {
  return generateCourseOutlineFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCourseOutlinePrompt',
  input: {schema: GenerateCourseOutlineInputSchema},
  output: {schema: GenerateCourseOutlineOutputSchema},
  prompt: `You are an expert course designer. Generate a course outline based on the provided content and user parameters.

Content: {{{content}}}
Number of Modules: {{{numModules}}}
Target Audience: {{{targetAudience}}}

Outline:
`,
});

const generateCourseOutlineFlow = ai.defineFlow(
  {
    name: 'generateCourseOutlineFlow',
    inputSchema: GenerateCourseOutlineInputSchema,
    outputSchema: GenerateCourseOutlineOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
