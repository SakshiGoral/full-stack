import { ProposalForm } from "@/components/proposals/proposal-form";

export default function NewProposalPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 md:px-6 md:py-12 animate-fade-in">
      <div className="mb-8 text-center">
        <h1 className="font-headline text-3xl font-bold tracking-tight md:text-4xl animate-slide-in-down">
          Create a New Proposal
        </h1>
        <p className="mt-2 text-muted-foreground animate-slide-in-down" style={{ animationDelay: '150ms' }}>
          Fill out the details below or select a template to get started.
        </p>
      </div>
      <ProposalForm />
    </div>
  );
}
