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
      'Select your UAE business activity, reserve a trade name and secure licensing.',
    iconName: 'building',
  },
  {
    id: 'step-02',
    number: '02',
    title: 'Complete Your Documentation',
    description:
      'We manage attestations, typing, ministry approvals and government submissions.',
    iconName: 'file-check',
  },
  {
    id: 'step-03',
    number: '03',
    title: 'Launch with Confidence',
    description:
      'Establish your company with ongoing PRO, visa renewal and compliance support.',
    iconName: 'rocket',
  },
];
