'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Calendar, Clock, Search } from 'lucide-react';
import type { BlogArticle } from '@/features/blog/types';

const ARCHIVE_PAGE_SIZE = 6;

export function BlogArchiveClient({
  articles,
}: {
  articles: readonly BlogArticle[];
}) {
  const [query, setQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [page, setPage] = React.useState(1);

  const categories = React.useMemo(() => {
    const unique = Array.from(new Set(articles.map((a) => a.category)));
    return ['All', ...unique];
  }, [articles]);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter((article) => {
      const matchesCategory =
        selectedCategory === 'All' || article.category === selectedCategory;
      const matchesQuery =
        q.length === 0 ||
        article.title.toLowerCase().includes(q) ||
        article.excerpt.toLowerCase().includes(q) ||
        article.category.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [articles, query, selectedCategory]);

  const totalPages = Math.ceil(filtered.length / ARCHIVE_PAGE_SIZE);
  const currentPage = Math.min(Math.max(1, page), Math.max(1, totalPages));
  const pagedArticles = filtered.slice(
    (currentPage - 1) * ARCHIVE_PAGE_SIZE,
    currentPage * ARCHIVE_PAGE_SIZE
  );

  React.useEffect(() => {
    setPage(1);
  }, [query, selectedCategory]);

  return (
    <div className="mt-10 space-y-8">
      {/* Search & Category Filter Controls */}
      <div className="flex flex-col gap-4 rounded-3xl border border-black/10 bg-white/80 p-4 backdrop-blur-md dark:border-white/12 dark:bg-[#0D1A13]/80 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-xs">
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-[#2F4738] dark:text-white/70"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles..."
            aria-label="Search blog articles"
            className="h-10 w-full rounded-2xl border border-black/10 bg-white/85 pl-10 pr-4 text-sm text-[#171717] placeholder:text-[#6B706C] focus:border-[#087A42] focus:outline-none focus:ring-2 focus:ring-[#087A42]/20 dark:border-white/15 dark:bg-[#101C16] dark:text-white dark:placeholder:text-white/45"
          />
        </div>

        <div
          className="flex flex-wrap items-center gap-2"
          role="group"
          aria-label="Filter articles by category"
        >
          {categories.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                  active
                    ? 'bg-[#085A30] text-white dark:bg-[#16A05A]'
                    : 'border border-black/10 bg-white/70 text-[#2B332E] hover:border-[#087A42]/45 dark:border-white/15 dark:bg-[#101C16] dark:text-white/80'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Filtered Article Grid */}
      {pagedArticles.length === 0 ? (
        <div className="mx-auto max-w-lg rounded-3xl border border-black/10 bg-white/80 p-10 text-center dark:border-white/10 dark:bg-[#101C16]/80">
          <p className="font-serif text-xl font-semibold text-[#171717] dark:text-white">
            No matching articles found
          </p>
          <p className="mt-2 text-sm text-[#4E534F] dark:text-white/70">
            Try clearing your search query or selecting a different category.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pagedArticles.map((article) => (
            <article
              key={article.id}
              className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-black/8 bg-white/85 p-3.5 shadow-sm backdrop-blur-md transition-transform duration-300 hover:-translate-y-0.5 dark:border-white/12 dark:bg-[#0D1A13]/85"
            >
              <div>
                <Link
                  href={`/ae/blog/${article.slug}`}
                  className="relative block aspect-[16/10] w-full overflow-hidden rounded-2xl"
                >
                  <Image
                    src={article.image}
                    alt={article.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 380px"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-[#085A30]/90 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
                    {article.category}
                  </span>
                </Link>
                <h2 className="mt-4 line-clamp-2 px-1.5 font-serif text-lg font-bold leading-snug text-[#171717] transition-colors group-hover:text-[#087A42] dark:text-white dark:group-hover:text-[#6EE7A8]">
                  <Link href={`/ae/blog/${article.slug}`}>{article.title}</Link>
                </h2>
                <p className="mt-2 line-clamp-3 px-1.5 text-sm leading-relaxed text-[#4E534F] dark:text-white/70">
                  {article.excerpt}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-black/8 px-1.5 pb-1 pt-3 text-xs font-medium text-[#525954] dark:border-white/10 dark:text-white/70">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-[#087A42] dark:text-[#2EB04B]" />
                    <time dateTime={article.publishedAt}>
                      {article.formattedDate}
                    </time>
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-[#087A42] dark:text-[#2EB04B]" />
                    <span>{article.readingTimeMinutes} min read</span>
                  </span>
                </div>
                <Link
                  href={`/ae/blog/${article.slug}`}
                  className="inline-flex items-center gap-1 font-semibold text-[#085A30] dark:text-[#6EE7A8]"
                >
                  <span>Read</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Archive Pagination */}
      {totalPages > 1 && (
        <nav
          aria-label="Blog archive pagination"
          className="flex items-center justify-center gap-3 pt-2"
        >
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="inline-flex h-10 items-center gap-1.5 rounded-full border border-[#087A42]/30 bg-white/80 px-4 text-sm font-semibold text-[#1C2A21] disabled:cursor-not-allowed disabled:opacity-45 dark:border-white/15 dark:bg-[#101C16] dark:text-white"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Previous</span>
          </button>
          <span className="min-w-[68px] text-center text-sm font-semibold text-[#1C1C1C] dark:text-white">
            {currentPage} of {totalPages}
          </span>
          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="inline-flex h-10 items-center gap-1.5 rounded-full border border-[#087A42]/45 bg-white/85 px-4 text-sm font-semibold text-[#085A30] disabled:cursor-not-allowed disabled:opacity-45 dark:border-[#2EB04B]/45 dark:bg-[#101C16] dark:text-[#6EE7A8]"
          >
            <span>Next</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </nav>
      )}
    </div>
  );
}
