import type { Metadata } from 'next';
import {
  AboutHero,
  WhoWeAreSection,
  WhatSetsUsApartSection,
  OurStoryJourney,
  TrustRecognitionSection,
  UaeWithinReachSection,
} from '@/components/sections/about';

export const revalidate = 3600;

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
