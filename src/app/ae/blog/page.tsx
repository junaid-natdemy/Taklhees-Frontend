import type { Metadata } from 'next';
import { getBlogArticles } from '@/features/blog/data';
import { BlogArchiveClient } from '@/components/sections/blog/blog-archive-client';

export const metadata: Metadata = {
  title: 'UAE Business & Visa Blog | Takhlees Journal',
  description:
    'Expert articles, regulation updates, ADMCC CCTV permits, DOH licensing, and UAE business setup compliance guides from Takhlees Business.',
};

export default async function BlogPage() {
  const articles = await getBlogArticles();

  return (
    <section className="relative overflow-hidden bg-[#F8F7F2] py-16 transition-colors duration-300 dark:bg-[#050807] sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto max-w-2xl text-center">
          <div className="mb-3 flex items-center justify-center gap-3">
            <span
              aria-hidden="true"
              className="h-px w-8 bg-gradient-to-r from-transparent to-[#C99726]"
            />
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#087A42] dark:text-[#2EB04B]">
              THE TAKHLEES JOURNAL
            </span>
            <span
              aria-hidden="true"
              className="h-px w-8 bg-gradient-to-l from-transparent to-[#C99726]"
            />
          </div>
          <h1 className="font-serif text-3xl font-bold tracking-tight text-[#171717] dark:text-white sm:text-4xl lg:text-5xl">
            UAE Business &amp; Visa Blog
          </h1>
          <p className="mt-3 text-base leading-relaxed text-[#4E534F] dark:text-white/75">
            Expert articles, regulation updates, and compliance guides for UAE
            entrepreneurs and corporate teams.
          </p>
        </header>

        <BlogArchiveClient articles={articles} />
      </div>
    </section>
  );
}
