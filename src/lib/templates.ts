import type { ProposalTemplate } from './types';

export const proposalTemplates: ProposalTemplate[] = [
  {
    id: 'template-simple',
    name: 'Simple Project',
    description: 'A clean and straightforward template for small-scale projects.',
    content: {
      clientInformation: 'Client Name:\nContact Person:\nEmail:\nPhone:',
      projectScope: '### Project Overview\n\n[Provide a brief summary of the project goals and objectives.]\n\n### Key Deliverables\n\n- Deliverable 1\n- Deliverable 2\n- Deliverable 3',
      pricingBreakdown: '### Investment\n\n- **Total Project Cost:** $[Amount]\n\nThis is a flat fee for the services outlined in the project scope.',
      timelines: '### Estimated Timeline\n\n- **Start Date:** [Date]\n- **Completion Date:** [Date]\n\nThis timeline is an estimate and may be subject to change.',
    },
  },
  {
    id: 'template-creative',
    name: 'Creative Services',
    description: 'Ideal for design, branding, and other creative service proposals.',
    content: {
      clientInformation: 'Prepared for:\n[Client Company Name]\n\nContact:\n[Contact Person Name]\n[Contact Person Title]',
      projectScope: '### The Vision\n\n[Describe the creative vision and the problem you are solving for the client.]\n\n### Scope of Work\n\n**Phase 1: Discovery & Strategy**\n- Item 1\n\n**Phase 2: Design & Development**\n- Item 2\n\n**Phase 3: Launch & Handover**\n- Item 3',
      pricingBreakdown: '### Pricing Options\n\n**Option A: Basic Package** - $[Amount]\n- Details...\n\n**Option B: Premium Package** - $[Amount]\n- Details...',
      timelines: '### Project Phases & Timeline\n\n- **Phase 1 (1-2 Weeks):** Discovery\n- **Phase 2 (3-4 Weeks):** Design\n- **Phase 3 (1 Week):** Final Revisions & Delivery',
    },
  },
  {
    id: 'template-corporate',
    name: 'Corporate Consulting',
    description: 'A formal and detailed template for corporate and consulting projects.',
    content: {
      clientInformation: 'Client:\n[Company Name]\n\nAddress:\n[Company Address]\n\nPrimary Contact:\n[Name, Title]',
      projectScope: '### 1. Executive Summary\n\n[A high-level overview of the proposed solution and its value.]\n\n### 2. Project Scope\n\nOur engagement will cover the following areas:\n- Area 1\n- Area 2\n\n### 3. Exclusions\n\nThis proposal does not include:\n- Exclusion 1',
      pricingBreakdown: '### 4. Fee Structure\n\nOur professional fees are structured as follows:\n\n- **Service/Phase 1:** $[Amount]\n- **Service/Phase 2:** $[Amount]\n\n**Total Investment:** $[Total Amount]\n\nPayment Terms: 50% upfront, 50% on completion.',
      timelines: '### 5. Proposed Timeline\n\nA detailed project plan with key milestones will be provided upon project initiation. The estimated duration is [Number] weeks.',
    },
  },
];
