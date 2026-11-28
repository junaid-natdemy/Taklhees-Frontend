import type { Metadata } from 'next';
import {
  BranchDirectorySection,
  BranchHero,
  FeaturedBranchExperience,
} from '@/components/sections/branches';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Branches | Takhlees Business UAE',
  description:
    'Explore Takhlees branches and connect with the branch that works best for you.',
  alternates: {
    canonical: 'https://takhleesbusiness.com/ae/branches',
  },
};

export default function BranchesPage() {
  return (
    <>
      <BranchHero />
      <FeaturedBranchExperience />
      <BranchDirectorySection />
    </>
  );
}
