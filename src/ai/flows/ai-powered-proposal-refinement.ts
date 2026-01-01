'use server';
/**
 * @fileOverview AI-powered proposal refinement flow.
 *
 * This file defines a Genkit flow that analyzes proposal content,
 * with a focus on pricing, and suggests improvements for clarity
 * and persuasiveness, based on industry best practices.
 *
 * @interface AIPoweredProposalRefinementInput - Defines the input schema for the flow.
 * @interface AIPoweredProposalRefinementOutput - Defines the output schema for the flow.
 * @function refineProposal - The main function to trigger the proposal refinement flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIPoweredProposalRefinementInputSchema = z.object({
  clientInformation: z.string().describe('Information about the client.'),
  projectScope: z.string().describe('Detailed scope of the project.'),
  pricingBreakdown: z.string().describe('Detailed breakdown of the project pricing.'),
  timelines: z.string().describe('Project timelines and milestones.'),
});

export type AIPoweredProposalRefinementInput = z.infer<
  typeof AIPoweredProposalRefinementInputSchema
>;

const AIPoweredProposalRefinementOutputSchema = z.object({
  refinedContent: z.string().describe('The refined proposal content with suggested improvements.'),
});

export type AIPoweredProposalRefinementOutput = z.infer<
  typeof AIPoweredProposalRefinementOutputSchema
>;

export async function refineProposal(
  input: AIPoweredProposalRefinementInput
): Promise<AIPoweredProposalRefinementOutput> {
  return aiPoweredProposalRefinementFlow(input);
}

const refineProposalPrompt = ai.definePrompt({
  name: 'refineProposalPrompt',
  input: {schema: AIPoweredProposalRefinementInputSchema},
  output: {schema: AIPoweredProposalRefinementOutputSchema},
  prompt: `You are an AI assistant designed to refine project proposals for clarity and persuasiveness.

  Analyze the following proposal content, especially the pricing information, and suggest improvements based on industry best practices.
  Provide specific recommendations on how to make the proposal more compelling and increase the chances of winning the project.

  Here's the proposal content:

  Client Information: {{{clientInformation}}}
  Project Scope: {{{projectScope}}}
  Pricing Breakdown: {{{pricingBreakdown}}}
  Timelines: {{{timelines}}}

  Refined Content:`,
});

const aiPoweredProposalRefinementFlow = ai.defineFlow(
  {
    name: 'aiPoweredProposalRefinementFlow',
    inputSchema: AIPoweredProposalRefinementInputSchema,
    outputSchema: AIPoweredProposalRefinementOutputSchema,
  },
  async input => {
    const {output} = await refineProposalPrompt(input);
    return output!;
  }
);
