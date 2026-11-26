import type { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export const metadata: Metadata = {
  title: 'India — Career Academy',
  description: 'Takhlees Career Academy India: Certified training programs for UAE PR, typing, and business setup.',
};

export default function IndiaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col bg-[#F7F5F0] dark:bg-[#080909] transition-colors duration-300 overflow-x-clip">
      {/* Dark mode unified ambient emerald atmosphere across header and hero */}
      <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 z-0 hidden h-[650px] w-[1200px] rounded-full bg-[#107C41]/20 blur-[160px] dark:block" />

      <Header country="in" />
      <main className="relative z-10 flex-1 pt-[60px] sm:pt-[62px] lg:pt-[60px] xl:pt-[62px]">{children}</main>
      <Footer country="in" />
    </div>
  );
}
