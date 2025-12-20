'use server';

/**
 * @fileOverview Summarizes a document, highlighting key terms and conditions.
 *
 * - summarizeDocument - A function that summarizes a document.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeDocumentInputSchema = z.object({
  documentText: z
    .string()
    .describe('The text content of the document to be summarized.'),
});

const SummarizeDocumentOutputSchema = z.object({
  summary: z.string().describe('A summarized version of the document.'),
});

export async function summarizeDocument(input: z.infer<typeof SummarizeDocumentInputSchema>): Promise<z.infer<typeof SummarizeDocumentOutputSchema>> {
  return summarizeDocumentFlow(input);
}

const summarizeDocumentPrompt = ai.definePrompt({
  name: 'summarizeDocumentPrompt',
  input: {schema: SummarizeDocumentInputSchema},
  output: {schema: SummarizeDocumentOutputSchema},
  prompt: `Summarize the following document, highlighting key terms and conditions in an easy-to-understand format:\n\n{{{documentText}}}`,
});

const summarizeDocumentFlow = ai.defineFlow(
  {
    name: 'summarizeDocumentFlow',
    inputSchema: SummarizeDocumentInputSchema,
    outputSchema: SummarizeDocumentOutputSchema,
  },
  async input => {
    const {output} = await summarizeDocumentPrompt(input);
    return output!;
  }
);
