'use client';

import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Globe } from 'lucide-react';
import { useCountryStore, CountryCode } from '@/stores/country-store';
import { siteConfig } from '@/config/site';

export function CountrySelector() {
  const router = useRouter();
  const pathname = usePathname();
  const { country, setCountry } = useCountryStore();

  // Sync state if pathname starts with /ae or /in
  React.useEffect(() => {
    if (pathname.startsWith('/ae') && country !== 'ae') {
      setCountry('ae');
    } else if (pathname.startsWith('/in') && country !== 'in') {
      setCountry('in');
    }
  }, [pathname, country, setCountry]);

  const handleCountryChange = (newCountry: CountryCode) => {
    setCountry(newCountry);
    // Replace current country prefix in path or navigate to default
    if (pathname.startsWith('/ae')) {
      const rest = pathname.replace(/^\/ae/, '');
      router.push(`/in${rest}`);
    } else if (pathname.startsWith('/in')) {
      const rest = pathname.replace(/^\/in/, '');
      router.push(`/ae${rest}`);
    } else {
      router.push(`/${newCountry}`);
    }
  };

  return (
    <div className="flex items-center gap-1.5 rounded-full border bg-background/80 px-2.5 py-1 text-xs font-medium shadow-sm backdrop-blur">
      <Globe className="h-3.5 w-3.5 text-muted-foreground" />
      <button
        type="button"
        onClick={() => handleCountryChange('ae')}
        className={`rounded px-1.5 py-0.5 transition-colors ${
          country === 'ae'
            ? 'bg-brand-green-600 font-semibold text-white'
            : 'text-muted-foreground hover:text-foreground'
        }`}
        title={siteConfig.countries.ae.label}
      >
        🇦🇪 UAE
      </button>
      <span className="text-muted-foreground/40">|</span>
      <button
        type="button"
        onClick={() => handleCountryChange('in')}
        className={`rounded px-1.5 py-0.5 transition-colors ${
          country === 'in'
            ? 'bg-brand-green-600 font-semibold text-white'
            : 'text-muted-foreground hover:text-foreground'
        }`}
        title={siteConfig.countries.in.label}
      >
        🇮🇳 India
      </button>
    </div>
  );
}
