import type { Metadata } from 'next';
import { UAEHero } from '@/components/sections/uae-hero';

export const metadata: Metadata = {
  title: {
    absolute: 'Takhlees Business | PRO Services & Business Setup in UAE',
  },
  description:
    'Looking for PRO services or business setup support in the UAE? Explore Takhlees services for business documentation, visa support and more.',
  keywords: [
    'PRO Services UAE',
    'Business Setup UAE',
    'UAE Documentation Services',
    'Visa Services UAE',
    'Company Formation UAE',
    'Government Typing Services UAE',
    'Takhlees Business',
  ],
  alternates: {
    canonical: 'https://takhleesbusiness.com/ae',
  },
  openGraph: {
    title: 'Takhlees Business | PRO Services & Business Setup in UAE',
    description:
      'Looking for PRO services or business setup support in the UAE? Explore Takhlees services for business documentation, visa support and more.',
    url: 'https://takhleesbusiness.com/ae',
    siteName: 'Takhlees Business',
    images: [
      {
        url: '/images/takhlees-hero-visual-dark.png',
        width: 1200,
        height: 630,
        alt: 'Takhlees Business PRO Services & Business Setup in UAE',
      },
    ],
    locale: 'en_AE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Takhlees Business | PRO Services & Business Setup in UAE',
    description:
      'Looking for PRO services or business setup support in the UAE? Explore Takhlees services for business documentation, visa support and more.',
    images: ['/images/takhlees-hero-visual-dark.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Takhlees Business',
  alternateName: 'Takhlees Corporate Services',
  description:
    'Professional corporate PRO services, typing, business setup support and government documentation clearing across the United Arab Emirates.',
  url: 'https://takhleesbusiness.com/ae',
  logo: 'https://takhleesbusiness.com/icons/takhlees-emblem.png',
  image: 'https://takhleesbusiness.com/images/takhlees-hero-visual-dark.png',
  telephone: '+97120000000',
  email: 'info@takhleesbusiness.com',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'AE',
    addressLocality: 'Abu Dhabi',
  },
  areaServed: {
    '@type': 'Country',
    name: 'United Arab Emirates',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Corporate PRO & Business Setup Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Business Setup in UAE',
          description:
            'Comprehensive company formation, mainland and free zone trade license registration assistance.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Corporate PRO Services',
          description:
            'Government liaison, ministry documentation clearing, and corporate labor/immigration processing.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Documentation Support & Visa Services',
          description:
            'Official document typing, visa processing assistance, and certified regulatory documentation clearing.',
        },
      },
    ],
  },
};

export default function UAEPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <UAEHero />
    </>
  );
}
