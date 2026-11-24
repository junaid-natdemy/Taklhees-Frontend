import type { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://takhleesbusiness.com'),
  title: {
    default: 'Takhlees Business | PRO Services & Business Setup in UAE',
    template: '%s | Takhlees Business',
  },
  description:
    'Looking for PRO services or business setup support in the UAE? Explore Takhlees services for business documentation, visa support and more.',
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
        alt: 'Takhlees Business UAE',
      },
    ],
    locale: 'en_AE',
    type: 'website',
  },
};

export default function UAELayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col bg-[#F7F5F0] dark:bg-[#080909] transition-colors duration-300 overflow-x-hidden">
      {/* Dark mode subtle charcoal tonal variation (Zero green background wash) */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 z-0 hidden h-[500px] w-[1000px] rounded-full bg-[#101111]/60 blur-[140px] dark:block" />

      {/* Floating Header Navbar (persists across all /ae navigation) */}
      <Header country="ae" />

      {/* Main Content */}
      <main className="relative z-10 flex-1">{children}</main>

      {/* Footer */}
      <Footer country="ae" />
    </div>
  );
}
