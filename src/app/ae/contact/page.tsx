import type { Metadata } from 'next';
import { ContactSection } from '@/components/sections/contact/contact-section';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Takhlees Business for UAE business setup, corporate PRO services, document clearance, and visa assistance.',
};

export default function ContactPage() {
  return <ContactSection asPageHeading />;
}
