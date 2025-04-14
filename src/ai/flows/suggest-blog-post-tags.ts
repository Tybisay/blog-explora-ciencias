// src/ai/flows/suggest-blog-post-tags.ts
'use server';
/**
 * @fileOverview AI-powered blog post tag suggester.
 *
 * - suggestBlogPostTags - A function that suggests relevant tags for a blog post based on its content.
 * - SuggestBlogPostTagsInput - The input type for the suggestBlogPostTags function.
 * - SuggestBlogPostTagsOutput - The return type for the suggestBlogPostTags function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const SuggestBlogPostTagsInputSchema = z.object({
  content: z.string().describe('The content of the blog post.'),
});
export type SuggestBlogPostTagsInput = z.infer<typeof SuggestBlogPostTagsInputSchema>;

const SuggestBlogPostTagsOutputSchema = z.object({
  tags: z.array(
    z.string().describe('A relevant tag for the blog post.')
  ).describe('The suggested tags for the blog post.'),
});
export type SuggestBlogPostTagsOutput = z.infer<typeof SuggestBlogPostTagsOutputSchema>;

export async function suggestBlogPostTags(input: SuggestBlogPostTagsInput): Promise<SuggestBlogPostTagsOutput> {
  return suggestBlogPostTagsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestBlogPostTagsPrompt',
  input: {
    schema: z.object({
      content: z.string().describe('The content of the blog post.'),
    }),
  },
  output: {
    schema: z.object({
      tags: z.array(
        z.string().describe('A relevant tag for the blog post.')
      ).describe('The suggested tags for the blog post.'),
    }),
  },
  prompt: `You are an expert blog post tag suggester.

  Given the following blog post content, suggest a list of relevant tags that would help improve the discoverability of the post.

  Content: {{{content}}}

  Please provide the tags as a JSON array of strings.
  `,
});

const suggestBlogPostTagsFlow = ai.defineFlow<
  typeof SuggestBlogPostTagsInputSchema,
  typeof SuggestBlogPostTagsOutputSchema
>({
  name: 'suggestBlogPostTagsFlow',
  inputSchema: SuggestBlogPostTagsInputSchema,
  outputSchema: SuggestBlogPostTagsOutputSchema,
}, async input => {
  const {output} = await prompt(input);
  return output!;
});
