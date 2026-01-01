'use server';

import { refineProposal, AIPoweredProposalRefinementInput } from '@/ai/flows/ai-powered-proposal-refinement';
import { z } from 'zod';

const refineSchema = z.object({
  clientInformation: z.string().min(1, 'Client Information is required.'),
  projectScope: z.string().min(1, 'Project Scope is required.'),
  pricingBreakdown: z.string().min(1, 'Pricing Breakdown is required.'),
  timelines: z.string().min(1, 'Timelines are required.'),
});

export async function refineProposalAction(input: AIPoweredProposalRefinementInput): Promise<{ refinedContent?: string; error?: string }> {
    const parsedInput = refineSchema.safeParse(input);
    if (!parsedInput.success) {
        const issues = parsedInput.error.issues.map((issue) => issue.message).join(' ');
        return { error: `Invalid input: ${issues}` };
    }

    try {
        const result = await refineProposal(parsedInput.data);
        if (result && result.refinedContent) {
          return { refinedContent: result.refinedContent };
        }
        return { error: 'AI refinement did not produce any content.' };
    } catch (e) {
        console.error(e);
        return { error: 'An unexpected error occurred while refining the proposal with AI.' };
    }
}
