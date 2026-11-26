import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import {
  getBlogArticleBySlug,
  getBlogArticles,
} from '@/features/blog/data';

export async function generateStaticParams() {
  const articles = await getBlogArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getBlogArticleBySlug(slug);
  if (!article) {
    return { title: 'Article Not Found | Takhlees Journal' };
  }

  return {
    title: `${article.title} | Takhlees Journal`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [{ url: article.image, alt: article.imageAlt }],
      type: 'article',
    },
  };
}

export default async function BlogArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getBlogArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="bg-[#F8F7F2] py-14 transition-colors duration-300 dark:bg-[#050807] sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Link
          href="/ae/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#087A42] transition-colors hover:text-[#064E27] dark:text-[#6EE7A8] dark:hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>Back to All Articles</span>
        </Link>

        <header className="mt-6">
          <span className="inline-block rounded-full bg-[#085A30] px-3.5 py-1 text-xs font-semibold text-white">
            {article.category}
          </span>
          <h1 className="mt-4 font-serif text-3xl font-bold leading-tight text-[#171717] dark:text-white sm:text-4xl">
            {article.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-[#525954] dark:text-white/70">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-[#087A42] dark:text-[#2EB04B]" />
              <time dateTime={article.publishedAt}>{article.formattedDate}</time>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-[#087A42] dark:text-[#2EB04B]" />
              <span>{article.readingTimeMinutes} min read</span>
            </span>
            <span>By {article.author.name}</span>
          </div>
        </header>

        <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-3xl border border-black/10 dark:border-white/10">
          <Image
            src={article.image}
            alt={article.imageAlt}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>

        <div className="mt-8 space-y-5 text-base leading-relaxed text-[#2A302C] dark:text-white/85">
          <p className="text-lg font-medium text-[#171717] dark:text-white">
            {article.excerpt}
          </p>
          {article.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <footer className="mt-12 rounded-3xl border border-[#087A42]/20 bg-white/80 p-6 dark:border-white/12 dark:bg-[#0D1A13]/80">
          <p className="font-serif text-lg font-bold text-[#171717] dark:text-white">
            Need help with {article.category}?
          </p>
          <p className="mt-1 text-sm text-[#4E534F] dark:text-white/75">
            Speak directly with our UAE corporate PRO &amp; licensing team in
            Abu Dhabi.
          </p>
          <Link
            href="/ae/contact"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#087A42] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#065E33]"
          >
            <span>Book a Consultation</span>
          </Link>
        </footer>
      </div>
    </article>
  );
}
