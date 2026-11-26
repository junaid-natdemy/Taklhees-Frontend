import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { UAEHero } from '@/components/sections/uae-hero';
import { ImpactSection } from '@/components/sections/impact/impact-section';
import { getLandingBlogArticles } from '@/features/blog/data';

const EditorialShowcaseSection = dynamic(() =>
  import('@/components/sections/editorial-showcase/editorial-showcase-section').then(
    (m) => m.EditorialShowcaseSection
  )
);
const ServicesSection = dynamic(() =>
  import('@/components/sections/services/services-section').then(
    (m) => m.ServicesSection
  )
);
const HowItWorksSection = dynamic(() =>
  import('@/components/sections/how-it-works/how-it-works-section').then(
    (m) => m.HowItWorksSection
  )
);
const ConsultationPartnersSection = dynamic(() =>
  import('@/components/sections/consultation/consultation-partners-section').then(
    (m) => m.ConsultationPartnersSection
  )
);
const TestimonialsSection = dynamic(() =>
  import('@/components/sections/testimonials/testimonials-section').then(
    (m) => m.TestimonialsSection
  )
);
const LeadershipInsightsSection = dynamic(() =>
  import('@/components/sections/leadership/leadership-insights-section').then(
    (m) => m.LeadershipInsightsSection
  )
);
const BlogShowcaseSection = dynamic(() =>
  import('@/components/sections/blog/blog-showcase-section').then(
    (m) => m.BlogShowcaseSection
  )
);
const ContactSection = dynamic(() =>
  import('@/components/sections/contact/contact-section').then(
    (m) => m.ContactSection
  )
);
const BusinessBriefingSection = dynamic(() =>
  import('@/components/sections/newsletter/business-briefing-section').then(
    (m) => m.BusinessBriefingSection
  )
);

export const revalidate = 300;

export const metadata: Metadata = {
  title: {
    absolute: 'Business Setup & PRO Services in UAE | Takhlees Business',
  },
  description:
    'Simplify UAE business setup, PRO services, trade licence renewal, family visas, DOH licensing, and VAT filing in Abu Dhabi & Dubai with Takhlees Business.',
  keywords: [
    'Business Setup in UAE',
    'PRO Services UAE',
    'PRO Services Abu Dhabi',
    'Business Setup Abu Dhabi',
    'Trade Licence Renewal UAE',
    'DOH Professional Licensing',
    'Family Visa UAE',
    'VAT Registration UAE',
    'Takhlees Business',
  ],
  alternates: {
    canonical: 'https://takhleesbusiness.com/ae',
    languages: {
      'en-AE': 'https://takhleesbusiness.com/ae',
      'en-IN': 'https://takhleesbusiness.com/in',
      'x-default': 'https://takhleesbusiness.com/ae',
    },
  },
  openGraph: {
    title: 'Business Setup & PRO Services in UAE | Takhlees Business',
    description:
      'Simplify UAE business setup, PRO services, trade licence renewal, family visas, DOH licensing, and VAT filing in Abu Dhabi & Dubai with Takhlees Business.',
    url: 'https://takhleesbusiness.com/ae',
    siteName: 'Takhlees Business',
    images: [
      {
        url: '/images/takhlees-hero-visual-dark.png',
        width: 1200,
        height: 630,
        alt: 'Takhlees Business — UAE Business Setup, Corporate PRO Services & Documentation',
      },
    ],
    locale: 'en_AE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Business Setup & PRO Services in UAE | Takhlees Business',
    description:
      'Simplify UAE business setup, PRO services, trade licence renewal, family visas, DOH licensing, and VAT filing in Abu Dhabi & Dubai with Takhlees Business.',
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
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://takhleesbusiness.com/#organization',
      name: 'Takhlees Business',
      legalName: 'Takhlees Transactions LLC',
      url: 'https://takhleesbusiness.com/ae',
      logo: {
        '@type': 'ImageObject',
        url: 'https://takhleesbusiness.com/icons/takhlees-emblem.png',
      },
      email: 'info@takhleesbusiness.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Mussafah Ind. Area M-10',
        addressLocality: 'Abu Dhabi',
        addressCountry: 'AE',
      },
    },
    {
      '@type': ['LocalBusiness', 'ProfessionalService'],
      '@id': 'https://takhleesbusiness.com/ae#localbusiness',
      name: 'Takhlees Business',
      alternateName: 'Takhlees Transactions LLC',
      parentOrganization: {
        '@id': 'https://takhleesbusiness.com/#organization',
      },
      description:
        'Corporate business setup, government PRO services, trade licence renewal, family residence visas, DOH healthcare licensing in Abu Dhabi & Al Ain, and UAE VAT filing.',
      url: 'https://takhleesbusiness.com/ae',
      image: 'https://takhleesbusiness.com/images/takhlees-hero-visual-dark.png',
      email: 'info@takhleesbusiness.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Mussafah Ind. Area M-10',
        addressLocality: 'Abu Dhabi',
        addressCountry: 'AE',
      },
      areaServed: [
        { '@type': 'City', name: 'Abu Dhabi' },
        { '@type': 'City', name: 'Dubai' },
        { '@type': 'Country', name: 'United Arab Emirates' },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'UAE Corporate & Documentation Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Business Setup & Trade Licensing in UAE',
              description:
                'Mainland and Free Zone company formation, trade name reservation, and trade licence issuance.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Corporate PRO Services',
              description:
                'Visa processing, trade licence renewal, Emirates ID coordination, and government document clearing.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'DOH Professional Licensing',
              description:
                'Healthcare professional licensing support for doctors, specialists, and consultants in Abu Dhabi and Al Ain.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'UAE Family Residence Visa Services',
              description:
                'Spouse and dependent visa sponsorship, document attestation, medical scheduling, and ICP coordination.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'VAT Registration & Filing',
              description:
                'UAE VAT registration, return filing, corporate tax setup, and Federal Tax Authority (FTA) compliance.',
            },
          },
        ],
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://takhleesbusiness.com/#website',
      name: 'Takhlees Business',
      url: 'https://takhleesbusiness.com/ae',
      publisher: {
        '@id': 'https://takhleesbusiness.com/#organization',
      },
      inLanguage: 'en-AE',
    },
    {
      '@type': 'WebPage',
      '@id': 'https://takhleesbusiness.com/ae#webpage',
      url: 'https://takhleesbusiness.com/ae',
      name: 'Business Setup & PRO Services in UAE | Takhlees Business',
      description:
        'Simplify UAE business setup, PRO services, trade licence renewal, family visas, DOH licensing, and VAT filing in Abu Dhabi & Dubai with Takhlees Business.',
      isPartOf: {
        '@id': 'https://takhleesbusiness.com/#website',
      },
      about: {
        '@id': 'https://takhleesbusiness.com/ae#localbusiness',
      },
      inLanguage: 'en-AE',
    },
  ],
};

export default async function UAEPage() {
  const articles = await getLandingBlogArticles();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <UAEHero />
      <ImpactSection />
      <EditorialShowcaseSection />
      <ServicesSection />
      <HowItWorksSection />
      <ConsultationPartnersSection />
      <TestimonialsSection />
      <LeadershipInsightsSection />
      <BlogShowcaseSection articles={articles} />
      <ContactSection />
      <BusinessBriefingSection />
    </>
  );
}
