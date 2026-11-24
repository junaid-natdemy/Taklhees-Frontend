import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/config/site';

interface FooterProps {
  country?: 'ae' | 'in';
}

export function Footer({ country = 'ae' }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const contact = siteConfig.contacts[country];
  const isUAE = country === 'ae';

  return (
    <footer className="border-t bg-brand-charcoal-900 text-brand-charcoal-100">
      <div className="container mx-auto px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 shrink-0">
                <Image
                  src="/icons/takhlees-emblem.png"
                  alt="Takhlees Logo"
                  width={40}
                  height={40}
                  className="h-10 w-10 object-contain"
                />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                TAKHLLES
              </span>
            </div>
            <p className="text-sm text-brand-charcoal-400">
              {isUAE
                ? 'Your trusted partner for UAE company formation, government document clearing, and executive PRO services.'
                : 'Premier career training academy empowering professionals with comprehensive UAE business setup and PR mastery.'}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              {isUAE ? 'Services' : 'Academy'}
            </h4>
            <ul className="space-y-2 text-sm text-brand-charcoal-400">
              {isUAE ? (
                <>
                  <li><Link href="/ae/services" className="hover:text-white transition-colors">PRO Services</Link></li>
                  <li><Link href="/ae/services" className="hover:text-white transition-colors">Company Setup</Link></li>
                  <li><Link href="/ae/branches" className="hover:text-white transition-colors">Branch Locator</Link></li>
                  <li><Link href="/ae/career" className="hover:text-white transition-colors">Careers</Link></li>
                </>
              ) : (
                <>
                  <li><Link href="/in/courses" className="hover:text-white transition-colors">Courses</Link></li>
                  <li><Link href="/in/teachers" className="hover:text-white transition-colors">Faculty</Link></li>
                  <li><Link href="/in/admissions" className="hover:text-white transition-colors">Admissions</Link></li>
                  <li><Link href="/in/contact" className="hover:text-white transition-colors">Enquiries</Link></li>
                </>
              )}
            </ul>
          </div>

          {/* Legal & Governance */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Legal & Policy
            </h4>
            <ul className="space-y-2 text-sm text-brand-charcoal-400">
              <li><Link href={`/${country}/privacy`} className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href={`/${country}/terms`} className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href={`/${country}/contact`} className="hover:text-white transition-colors">Support</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Contact
            </h4>
            <div className="space-y-1.5 text-sm text-brand-charcoal-400">
              <p>{contact.location}</p>
              <p>Email: <a href={`mailto:${contact.email}`} className="text-brand-green-400 hover:underline">{contact.email}</a></p>
              <p>Phone: {contact.phone}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-brand-charcoal-800 pt-6 text-center text-xs text-brand-charcoal-500">
          <p>© {currentYear} Takhlees Business. All rights reserved. Official UAE & India platform.</p>
        </div>
      </div>
    </footer>
  );
}
