'use server';

/**
 * @fileOverview Provides AI-powered editing tools to refine course content.
 *
 * - editCourseContent - A function that edits course content based on user instructions.
 * - EditCourseContentInput - The input type for the editCourseContent function.
 * - EditCourseContentOutput - The return type for the editCourseContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EditCourseContentInputSchema = z.object({
  content: z.string().describe('The course content to be edited.'),
  instruction: z.string().describe('The instruction for editing the content (e.g., shorten the content, generate quiz questions, rewrite the paragraph in a different style).'),
});
export type EditCourseContentInput = z.infer<typeof EditCourseContentInputSchema>;

const EditCourseContentOutputSchema = z.object({
  editedContent: z.string().describe('The edited course content.'),
});
export type EditCourseContentOutput = z.infer<typeof EditCourseContentOutputSchema>;

export async function editCourseContent(input: EditCourseContentInput): Promise<EditCourseContentOutput> {
  return editCourseContentFlow(input);
}

const editCourseContentPrompt = ai.definePrompt({
  name: 'editCourseContentPrompt',
  input: {schema: EditCourseContentInputSchema},
  output: {schema: EditCourseContentOutputSchema},
  prompt: `You are an AI-powered editing tool designed to refine course content based on user instructions.

  The course content to be edited is provided below:
  Content: {{{content}}}

  The instruction for editing the content is provided below:
  Instruction: {{{instruction}}}

  Please apply the instruction to the content and return the edited content.
  `,
});

const editCourseContentFlow = ai.defineFlow(
  {
    name: 'editCourseContentFlow',
    inputSchema: EditCourseContentInputSchema,
    outputSchema: EditCourseContentOutputSchema,
  },
  async input => {
    const {output} = await editCourseContentPrompt(input);
    return output!;
  }
);
