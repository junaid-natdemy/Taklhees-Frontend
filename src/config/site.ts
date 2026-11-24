import { CountryInfo } from '@/types';

export const siteConfig = {
  name: 'Takhlees Business',
  description:
    'Premier UAE Business Setup, Government PRO Services, and Professional Career Academy training.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1',
  countries: {
    ae: {
      code: 'ae',
      name: 'United Arab Emirates',
      label: 'UAE — Business & PRO Services',
      currency: 'AED',
      currencySymbol: 'AED',
      defaultPath: '/ae',
    } as CountryInfo,
    in: {
      code: 'in',
      name: 'India',
      label: 'India — Career Academy',
      currency: 'INR',
      currencySymbol: '₹',
      defaultPath: '/in',
    } as CountryInfo,
  },
  contacts: {
    ae: {
      phone: '+971 2 000 0000',
      whatsapp: '+971500000000',
      email: 'info@takhleesbusiness.com',
      location: 'Abu Dhabi, United Arab Emirates',
    },
    in: {
      phone: '+91 70342 12238',
      whatsapp: '+917034212238',
      email: 'admissions@takhleesbusiness.com',
      location: 'Kerala, India',
    },
  },
};
