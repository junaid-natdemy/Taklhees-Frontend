import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import {
  AboutHero,
  WhoWeAreSection,
} from '@/components/sections/about';

const WhatSetsUsApartSection = dynamic(
  () => import('@/components/sections/about/what-sets-us-apart/what-sets-us-apart-section')
);
const OurStoryJourney = dynamic(
  () => import('@/components/sections/about/our-story/our-story-journey')
);
const TrustRecognitionSection = dynamic(
  () => import('@/components/sections/about/trust-recognition/trust-recognition-section')
);
const UaeWithinReachSection = dynamic(
  () => import('@/components/sections/about/within-reach/uae-within-reach-section')
);

export const metadata: Metadata = {
  title: 'About Us | Takhlees Business UAE',
  description:
    'Empowering businesses and investors with comprehensive setup, PRO and documentation support across the UAE since 2010.',
  alternates: {
    canonical: 'https://takhleesbusiness.com/ae/about',
  },
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <WhoWeAreSection />
      <WhatSetsUsApartSection />
      <OurStoryJourney />
      <TrustRecognitionSection />
      <UaeWithinReachSection />
    </>
  );
}
