export type HowItWorksIconName = 'building' | 'file-check' | 'rocket';

export interface HowItWorksStepData {
  id: string;
  number: string;
  title: string;
  description: string;
  iconName: HowItWorksIconName;
}

export const HOW_IT_WORKS_STEPS: HowItWorksStepData[] = [
  {
    id: 'step-01',
    number: '01',
    title: 'Choose Your Business Activity',
    description:
      'Find the right activity, reserve your trade name and secure the right license.',
    iconName: 'building',
  },
  {
    id: 'step-02',
    number: '02',
    title: 'Complete Your Documentation',
    description:
      'We coordinate approvals, paperwork and government submissions.',
    iconName: 'file-check',
  },
  {
    id: 'step-03',
    number: '03',
    title: 'Launch with Confidence',
    description:
      'Get ongoing support to establish and grow your business in the UAE.',
    iconName: 'rocket',
  },
];
