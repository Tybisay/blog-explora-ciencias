'use server';
/**
 * @fileOverview Generates initial website content including homepage text and basic website structure.
 *
 * - generateWebsiteContent - A function that generates website content based on the provided website name and description.
 * - GenerateWebsiteContentInput - The input type for the generateWebsiteContent function.
 * - GenerateWebsiteContentOutput - The return type for the generateWebsiteContent function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GenerateWebsiteContentInputSchema = z.object({
  websiteName: z.string().describe('The name of the website.'),
  websiteDescription: z.string().describe('A brief description of the website purpose.'),
});
export type GenerateWebsiteContentInput = z.infer<typeof GenerateWebsiteContentInputSchema>;

const GenerateWebsiteContentOutputSchema = z.object({
  homePageText: z.string().describe('The generated home page text.'),
  websiteStructure: z.string().describe('The suggested website structure.'),
});
export type GenerateWebsiteContentOutput = z.infer<typeof GenerateWebsiteContentOutputSchema>;

export async function generateWebsiteContent(input: GenerateWebsiteContentInput): Promise<GenerateWebsiteContentOutput> {
  return generateWebsiteContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateWebsiteContentPrompt',
  input: {
    schema: z.object({
      websiteName: z.string().describe('The name of the website.'),
      websiteDescription: z.string().describe('A brief description of the website purpose.'),
    }),
  },
  output: {
    schema: z.object({
      homePageText: z.string().describe('The generated home page text.'),
      websiteStructure: z.string().describe('The suggested website structure.'),
    }),
  },
  prompt: `You are a website content generator. Generate home page text and a basic website structure based on the user's input.

Website Name: {{{websiteName}}}
Website Description: {{{websiteDescription}}}

Here is the generated website structure and home page text:
`,
});

const generateWebsiteContentFlow = ai.defineFlow<
  typeof GenerateWebsiteContentInputSchema,
  typeof GenerateWebsiteContentOutputSchema
>({
  name: 'generateWebsiteContentFlow',
  inputSchema: GenerateWebsiteContentInputSchema,
  outputSchema: GenerateWebsiteContentOutputSchema,
}, async input => {
  const {output} = await prompt(input);
  return output!;
});
