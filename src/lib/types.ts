export type Proposal = {
  id: string;
  title: string;
  clientName: string;
  status: 'Draft' | 'Sent' | 'Accepted';
  createdAt: string;
  clientInformation: string;
  projectScope: string;
  pricingBreakdown: string;
  timelines: string;
};

export type ProposalTemplate = {
  id: string;
  name: string;
  description: string;
  content: {
    clientInformation: string;
    projectScope: string;
    pricingBreakdown: string;
    timelines: string;
  }
};
