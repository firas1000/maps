'use server';
/**
 * @fileOverview An AI agent for analyzing luxury villa images.
 *
 * - analyzeVillaDetails - A function that handles the analysis of a villa image.
 * - AnalyzeVillaDetailsInput - The input type for the analyzeVillaDetails function.
 * - AnalyzeVillaDetailsOutput - The return type for the analyzeVillaDetails function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AnalyzeVillaDetailsInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a luxury villa, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AnalyzeVillaDetailsInput = z.infer<typeof AnalyzeVillaDetailsInputSchema>;

const AnalyzeVillaDetailsOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the villa\'s overall aesthetic and luxury appeal.').default(''),
  architecturalStyles: z.array(z.string()).describe('A list of identified architectural styles present in the villa.').default([]),
  luxuryFeatures: z.array(z.string()).describe('A list of prominent luxury features visible in the villa.').default([]),
  colorPalette: z.array(z.string()).describe('A list of dominant colors and their tones observed in the villa\'s design.').default([]),
});
export type AnalyzeVillaDetailsOutput = z.infer<typeof AnalyzeVillaDetailsOutputSchema>;

export async function analyzeVillaDetails(input: AnalyzeVillaDetailsInput): Promise<AnalyzeVillaDetailsOutput> {
  return analyzeVillaDetailsFlow(input);
}

const analyzeVillaDetailsPrompt = ai.definePrompt({
  name: 'analyzeVillaDetailsPrompt',
  input: { schema: AnalyzeVillaDetailsInputSchema },
  output: { schema: AnalyzeVillaDetailsOutputSchema },
  prompt: `You are an expert in luxury real estate and architectural design. Your task is to analyze the provided image of a luxury villa. Identify its architectural styles, prominent luxury features, and dominant color palette. Provide a concise summary of its overall aesthetic and luxury appeal. The response must be a JSON object.

Image: {{media url=photoDataUri}}`,
});

const analyzeVillaDetailsFlow = ai.defineFlow(
  {
    name: 'analyzeVillaDetailsFlow',
    inputSchema: AnalyzeVillaDetailsInputSchema,
    outputSchema: AnalyzeVillaDetailsOutputSchema,
  },
  async (input) => {
    const { output } = await ai.generate({
      model: 'googleai/gemini-2.5-flash-image',
      prompt: [
        {
          text: `You are an expert in luxury real estate and architectural design. Your task is to analyze the provided image of a luxury villa. Identify its architectural styles, prominent luxury features, and dominant color palette. Provide a concise summary of its overall aesthetic and luxury appeal. The response must be a JSON object matching the following schema:\n\n${JSON.stringify(AnalyzeVillaDetailsOutputSchema.toJsonSchema(), null, 2)}`,
        },
        {
          media: {
            url: input.photoDataUri,
          },
        },
      ],
      config: {
        responseModalities: ['TEXT'],
      },
    });
    if (!output || !output.text) {
      throw new Error('Failed to get text output from the model.');
    }
    try {
      return JSON.parse(output.text);
    } catch (e) {
      console.error('Failed to parse JSON response:', output.text, e);
      throw new Error('Invalid JSON response from model.');
    }
  }
);
