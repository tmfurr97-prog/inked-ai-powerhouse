'use server';

/**
 * @fileOverview Flow for generating customized business forms based on user descriptions.
 *
 * - generateBusinessForm - A function that generates a business form.
 * - GenerateBusinessFormInput - The input type for the generateBusinessForm function.
 * - GenerateBusinessFormOutput - The return type for the generateBusinessForm function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateBusinessFormInputSchema = z.object({
  formDescription: z
    .string()
    .describe(
      'Detailed description of the desired business form, including its purpose and required fields.'
    ),
  formStyle: z.enum(['fill-in', 'completed']).describe("The style of the form to generate: 'fill-in' for a blank template, or 'completed' for a pre-filled document."),
  businessInformation: z
    .string()
    .optional()
    .describe(
      'Information about the business (name, address, contact details) to be used if form style is "completed".'
    ),
  recipientInformation: z
    .string()
    .optional()
    .describe(
      'Information about the recipient (name, address) to be used if form style is "completed".'
    ),
});
export type GenerateBusinessFormInput = z.infer<typeof GenerateBusinessFormInputSchema>;

const GenerateBusinessFormOutputSchema = z.object({
  formContent: z.string().describe('The generated business form content.'),
});
export type GenerateBusinessFormOutput = z.infer<typeof GenerateBusinessFormOutputSchema>;

export async function generateBusinessForm(
  input: GenerateBusinessFormInput
): Promise<GenerateBusinessFormOutput> {
  return generateBusinessFormFlow(input);
}

const generateBusinessFormPrompt = ai.definePrompt({
  name: 'generateBusinessFormPrompt',
  input: {schema: GenerateBusinessFormInputSchema},
  output: {schema: GenerateBusinessFormOutputSchema},
  prompt: `You are an AI assistant specialized in generating professional business forms in markdown format.

  **Form Description:**
  {{{formDescription}}}

  {{#if (eq formStyle "completed")}}
  **Task:** Generate a COMPLETED business form. Use the following information to fill in all relevant fields. The form should look like a finished document.

  **Business Information:**
  {{{businessInformation}}}

  **Recipient Information:**
  {{{recipientInformation}}}
  {{else}}
  **Task:** Generate a BLANK, FILL-IN-THE-BLANK business form that can be printed or filled out later. Use underscores, brackets, or blank lines (e.g., "Name: __________") for fields that need to be completed. DO NOT use the business or recipient information, even if it is provided.
  {{/if}}

  Ensure the generated markdown form is clear, well-formatted, and suitable for its intended purpose.
  If the description is vague, use your best judgement to create a logical and common business form.
  Do not use HTML.
  `,
});

const generateBusinessFormFlow = ai.defineFlow(
  {
    name: 'generateBusinessFormFlow',
    inputSchema: GenerateBusinessFormInputSchema,
    outputSchema: GenerateBusinessFormOutputSchema,
  },
  async input => {
    const {output} = await generateBusinessFormPrompt(input);
    return output!;
  }
);
