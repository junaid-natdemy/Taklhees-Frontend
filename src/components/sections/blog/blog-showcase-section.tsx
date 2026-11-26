'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ThemeImage } from '@/components/ui/theme-image';
import { useSectionInView } from '@/hooks/use-section-in-view';
import {
  AnimatePresence,
  m,
  useReducedMotion,
} from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Building2,
  Calendar,
  Clock,
  FileCheck2,
  ShieldCheck,
  Stethoscope,
} from 'lucide-react';
import { LiquidButton } from '@/components/ui/liquid-glass-button';
import {
  JOURNAL_PAGE_SIZE,
  paginateBlogArticles,
} from '@/features/blog/data';
import type { BlogArticle } from '@/features/blog/types';

/* Reused LiquidButton 9-layer beveled glass shadow system */
const LIQUID_GLASS_BEVEL =
  'shadow-[0_0_6px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3px_rgba(0,0,0,0.38),inset_-3px_-3px_0.5px_-3px_rgba(0,0,0,0.34),inset_1px_1px_1px_-0.5px_rgba(0,0,0,0.22),inset_-1px_-1px_1px_-0.5px_rgba(0,0,0,0.22),inset_0_0_6px_6px_rgba(0,0,0,0.04),inset_0_0_2px_2px_rgba(0,0,0,0.02),0_0_12px_rgba(255,255,255,0.22)] dark:shadow-[0_0_8px_rgba(0,0,0,0.06),0_2px_6px_rgba(0,0,0,0.14),inset_3px_3px_0.5px_-3.5px_rgba(255,255,255,0.09),inset_-3px_-3px_0.5px_-3.5px_rgba(255,255,255,0.48),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.32),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.32),inset_0_0_6px_6px_rgba(255,255,255,0.06),inset_0_0_2px_2px_rgba(255,255,255,0.04),0_0_12px_rgba(0,0,0,0.18)]';

/* Coordinated asymmetric organic silhouettes (inspired by Contact section without clip-path clipping) */
const FEATURED_ORGANIC_RADIUS =
  'rounded-[32px_20px_36px_22px/24px_32px_22px_30px]';
const FEATURED_IMAGE_RADIUS =
  'rounded-[24px_14px_26px_16px/18px_24px_16px_22px]';
const FEATURED_IMAGE_INSET_RADIUS =
  'after:rounded-[18px_10px_20px_12px/14px_18px_12px_16px]';

const SUPPORTING_ORGANIC_RADII = [
  {
    card: 'rounded-[25px_17px_23px_19px/21px_24px_17px_22px]',
    image: 'rounded-[18px_12px_16px_14px/15px_17px_12px_16px]',
  },
  {
    card: 'rounded-[20px_24px_18px_25px/22px_17px_24px_19px]',
    image: 'rounded-[14px_17px_13px_18px/16px_12px_17px_14px]',
  },
  {
    card: 'rounded-[17px_25px_24px_18px/22px_20px_17px_24px]',
    image: 'rounded-[12px_18px_17px_13px/16px_15px_12px_17px]',
  },
] as const;

function CategoryIcon({ icon }: { icon: BlogArticle['categoryIcon'] }) {
  switch (icon) {
    case 'shield':
      return <ShieldCheck className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />;
    case 'file':
      return <FileCheck2 className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />;
    case 'stethoscope':
      return <Stethoscope className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />;
    case 'briefcase':
      return <Briefcase className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />;
    case 'building':
      return <Building2 className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />;
  }
}

export interface BlogShowcaseSectionProps {
  articles: readonly BlogArticle[];
}

function SupportingArticleCard({
  article,
  index,
  prefersReducedMotion,
}: {
  article: BlogArticle;
  index: number;
  prefersReducedMotion: boolean | null;
}) {
  const shape =
    SUPPORTING_ORGANIC_RADII[index % SUPPORTING_ORGANIC_RADII.length];
  return (
    <m.article
      initial={
        prefersReducedMotion
          ? false
          : { opacity: 0, y: 14, rotateX: 3 }
      }
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{
        duration: 0.35,
        delay: prefersReducedMotion ? 0 : 0.05 * (index + 1),
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`group relative isolate flex h-full flex-col justify-between overflow-hidden ${shape.card} bg-[linear-gradient(148deg,rgba(255,254,250,0.86)_0%,rgba(249,245,233,0.74)_56%,rgba(232,243,236,0.68)_100%)] p-2.5 shadow-[0_14px_32px_-12px_rgba(12,38,24,0.12)] backdrop-blur-md backdrop-saturate-150 transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[0_20px_38px_-14px_rgba(12,38,24,0.16)] dark:bg-[linear-gradient(148deg,rgba(16,32,24,0.84)_0%,rgba(11,22,17,0.76)_60%,rgba(7,26,18,0.84)_100%)] dark:shadow-[0_16px_34px_-12px_rgba(0,0,0,0.52)]`}
    >
      {/* Bevel, Contact-style Specular + Caustic Reflections, Subtle Golden Sheen & Emerald-Gold Edge */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 z-0 ${shape.card} ${LIQUID_GLASS_BEVEL}`}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(80%_50%_at_18%_16%,rgba(255,255,255,0.45)_0%,transparent_64%),radial-gradient(70%_45%_at_84%_88%,rgba(8,122,66,0.10)_0%,transparent_62%)] dark:bg-[radial-gradient(80%_50%_at_18%_16%,rgba(255,255,255,0.07)_0%,transparent_64%),radial-gradient(70%_45%_at_84%_88%,rgba(22,160,90,0.13)_0%,transparent_62%)]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-5 top-0 z-20 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent dark:via-white/20"
      />
      <span
        aria-hidden="true"
        className="leadership-glass-sheen pointer-events-none absolute inset-y-0 left-0 z-[2] w-[38%] bg-gradient-to-r from-transparent via-[#F5DDA0]/[0.13] to-transparent dark:via-[#F5DDA0]/[0.06]"
        style={{
          animationDuration: '11s',
          animationDelay: `${index * 1.4}s`,
        }}
      />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 z-20 ${shape.card} [background:linear-gradient(132deg,rgba(255,255,255,0.9)_0%,rgba(229,193,88,0.65)_36%,rgba(8,122,66,0.28)_68%,rgba(245,215,127,0.72)_100%)] dark:[background:linear-gradient(132deg,rgba(255,255,255,0.20)_0%,rgba(229,193,88,0.5)_36%,rgba(22,160,90,0.36)_68%,rgba(245,215,127,0.45)_100%)]`}
        style={{
          padding: '1.25px',
          WebkitMask:
            'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
        }}
      />

      <div className="relative z-10 flex h-full flex-col justify-between">
        <div>
          <Link
            href={`/ae/blog/${article.slug}`}
            tabIndex={-1}
            aria-hidden="true"
            className={`relative block h-[116px] w-full overflow-hidden ${shape.image} ring-1 ring-inset ring-[#C99726]/25 dark:ring-[#E5C158]/20 sm:h-[120px]`}
          >
            <Image
              src={article.image}
              alt={article.imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 340px"
              loading="lazy"
              className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.035]"
            />
            <span className="absolute left-2.5 top-2.5 inline-flex items-center gap-1 rounded-full border border-white/25 bg-[#085A30]/90 px-2.5 py-0.5 text-[10.5px] font-semibold text-white shadow-sm backdrop-blur-md">
              <CategoryIcon icon={article.categoryIcon} />
              <span>{article.category}</span>
            </span>
          </Link>

          <h3 className="mt-2.5 line-clamp-2 min-h-[2.55rem] px-1 font-serif text-[15px] font-bold leading-[1.3] tracking-tight text-[#141715] transition-colors group-hover:text-[#087A42] dark:text-[#F6F5F0] dark:group-hover:text-[#6EE7A8]">
            <Link
              href={`/ae/blog/${article.slug}`}
              className="focus-visible:outline-none focus-visible:underline"
            >
              {article.title}
            </Link>
          </h3>
        </div>

        <div className="mt-2.5 flex items-center justify-between gap-2 border-t border-black/8 px-1 pb-0.5 pt-2 dark:border-white/10">
          <div className="flex flex-wrap items-center gap-2.5 text-[11px] font-medium text-[#525954] dark:text-white/70">
            <span className="inline-flex items-center gap-1">
              <Calendar
                className="h-3 w-3 text-[#087A42] dark:text-[#2EB04B]"
                aria-hidden="true"
              />
              <time dateTime={article.publishedAt}>
                {article.formattedDate}
              </time>
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock
                className="h-3 w-3 text-[#087A42] dark:text-[#2EB04B]"
                aria-hidden="true"
              />
              <span>{article.readingTimeMinutes} min read</span>
            </span>
          </div>

          <Link
            href={`/ae/blog/${article.slug}`}
            aria-label={`Read ${article.title}`}
            className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white/80 text-[#085A30] transition-all duration-200 group-hover:border-[#087A42]/45 group-hover:bg-[#087A42] group-hover:text-white dark:border-white/15 dark:bg-[#101C16] dark:text-[#6EE7A8] dark:group-hover:bg-[#16A05A] dark:group-hover:text-white"
          >
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </m.article>
  );
}

export function BlogShowcaseSection({ articles }: BlogShowcaseSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = React.useRef<HTMLElement>(null);
  const inView = useSectionInView(sectionRef);
  const shouldAnimate = !prefersReducedMotion && inView;
  const [requestedPage, setRequestedPage] = React.useState(1);
  const [mobileIndex, setMobileIndex] = React.useState(0);
  const [direction, setDirection] = React.useState<1 | -1>(1);
  const [isTransitioning, setIsTransitioning] = React.useState(false);

  const totalMobileArticles = articles.length;
  const safeMobileIndex =
    totalMobileArticles > 0 ? mobileIndex % totalMobileArticles : 0;
  const activeMobileArticle = articles[safeMobileIndex];

  const handleMobilePrev = () => {
    if (totalMobileArticles <= 1) return;
    setMobileIndex(
      (prev) => (prev - 1 + totalMobileArticles) % totalMobileArticles
    );
  };

  const handleMobileNext = () => {
    if (totalMobileArticles <= 1) return;
    setMobileIndex((prev) => (prev + 1) % totalMobileArticles);
  };

  const pagination = React.useMemo(
    () => paginateBlogArticles(articles, requestedPage, JOURNAL_PAGE_SIZE),
    [articles, requestedPage]
  );

  /* Keep requestedPage synchronized if articles prop changes dynamically */
  React.useEffect(() => {
    if (pagination.totalPages > 0 && requestedPage > pagination.totalPages) {
      setRequestedPage(pagination.totalPages);
    } else if (pagination.totalPages === 0 && requestedPage !== 1) {
      setRequestedPage(1);
    }
  }, [pagination.totalPages, requestedPage]);

  /* Fallback unlock in case reduced motion is enabled or animation completes early */
  React.useEffect(() => {
    if (!isTransitioning) return;
    const timer = window.setTimeout(() => setIsTransitioning(false), 450);
    return () => window.clearTimeout(timer);
  }, [isTransitioning]);

  const handlePrevious = () => {
    if (isTransitioning || !pagination.hasPrevious) return;
    setDirection(-1);
    if (!prefersReducedMotion) setIsTransitioning(true);
    setRequestedPage((p) => Math.max(1, p - 1));
  };

  const handleNext = () => {
    if (isTransitioning || !pagination.hasNext) return;
    setDirection(1);
    if (!prefersReducedMotion) setIsTransitioning(true);
    setRequestedPage((p) =>
      Math.min(Math.max(1, pagination.totalPages), p + 1)
    );
  };

  /* Adaptive supporting grid columns based on actual remaining article count */
  const supportingCount = pagination.supporting.length;
  const supportingGridClass =
    supportingCount === 1
      ? 'grid-cols-1 max-w-md mx-auto'
      : supportingCount === 2
        ? 'grid-cols-1 md:grid-cols-2'
        : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';

  return (
    <section
      ref={sectionRef}
      id="blog"
      aria-labelledby="blog-showcase-heading"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#FAF8F3_0%,#F4EFE3_56%,#ECE4D3_100%)] pt-7 pb-14 transition-colors duration-300 dark:bg-[linear-gradient(180deg,#050807_0%,#07100C_56%,#050907_100%)] sm:pt-8 sm:pb-16 lg:pt-9 lg:pb-16"
    >
        {/* ═══════════════ BACKGROUND: FULL-BLEED BESPOKE DUBAI SKYLINE & EMERALD-GOLD WAVES ═══════════════ */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 select-none overflow-hidden"
        >
          {/* Full-Section Bespoke Architectural Dubai Skyline Backdrop (100% Visible Light & Dark Mode) */}
          <div
            className="pointer-events-none absolute inset-0 z-0 opacity-100"
            style={{
              maskImage:
                'linear-gradient(to bottom, rgba(0,0,0,0.88) 0%, #000 8%, #000 90%, rgba(0,0,0,0.75) 100%)',
              WebkitMaskImage:
                'linear-gradient(to bottom, rgba(0,0,0,0.88) 0%, #000 8%, #000 90%, rgba(0,0,0,0.75) 100%)',
            }}
          >
            <ThemeImage
              lightSrc="/images/blog/dubai-journal-bg-light.webp"
              darkSrc="/images/blog/dubai-journal-bg-dark.webp"
              alt=""
              fill
              sizes="100vw"
              loading="lazy"
              className="object-cover object-center"
            />
          </div>

          {/* Subtle Atmospheric Depth Tint Only Behind Center Cards for Crisp Readability */}
          <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_75%_65%_at_38%_52%,rgba(250,248,243,0.34)_0%,transparent_72%)] dark:bg-[radial-gradient(ellipse_75%_65%_at_38%_52%,rgba(5,8,7,0.28)_0%,transparent_72%)]" />

          {/* Upper-Left Flowing Emerald Wave with Champagne-Gold Rim */}
          <svg
            viewBox="0 0 380 380"
            fill="none"
            className="absolute -left-8 -top-4 z-0 h-[200px] w-[210px] sm:h-[250px] sm:w-[260px]"
            style={{
              maskImage:
                'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.45) 22%, #000 55%)',
              WebkitMaskImage:
                'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.45) 22%, #000 55%)',
            }}
          >
            <defs>
              <linearGradient
                id="blog-tl-emerald"
                x1="0"
                y1="0"
                x2="1"
                y2="1"
              >
                <stop offset="0%" stopColor="#043A1F" stopOpacity="0.94" />
                <stop offset="58%" stopColor="#086E3B" stopOpacity="0.78" />
                <stop offset="100%" stopColor="#087A42" stopOpacity="0.04" />
              </linearGradient>
              <linearGradient id="blog-tl-gold" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0%" stopColor="#E5C158" stopOpacity="0.12" />
                <stop offset="50%" stopColor="#F5D77F" stopOpacity="0.82" />
                <stop offset="100%" stopColor="#C99726" stopOpacity="0.36" />
              </linearGradient>
            </defs>
            <path
              d="M0 14 C 72 4, 148 16, 226 10 C 168 78, 98 166, 32 284 C 16 312, 6 336, 0 356 Z"
              fill="url(#blog-tl-emerald)"
            />
            <path
              d="M222 12 C 164 80, 96 168, 30 286"
              stroke="url(#blog-tl-gold)"
              strokeWidth="1.6"
            />
          </svg>

          {/* Soft Cream-to-Emerald Horizon Transition & Bottom Flowing Organic Waves */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-32 bg-gradient-to-b from-transparent via-[#087A42]/[0.04] to-[#087A42]/[0.10] dark:via-[#16A05A]/[0.05] dark:to-[#16A05A]/[0.12]"
          />
          <svg
            viewBox="0 0 1440 240"
            preserveAspectRatio="none"
            fill="none"
            className="absolute inset-x-0 bottom-0 z-0 h-[82px] w-full sm:h-[96px] lg:h-[112px]"
          >
            <defs>
              <linearGradient
                id="blog-wave-emerald"
                x1="0%"
                y1="100%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#04381E" stopOpacity="0.96" />
                <stop offset="50%" stopColor="#076435" stopOpacity="0.88" />
                <stop offset="100%" stopColor="#022412" stopOpacity="0.98" />
              </linearGradient>
              <linearGradient
                id="blog-wave-gold"
                x1="0%"
                y1="50%"
                x2="100%"
                y2="50%"
              >
                <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.22" />
                <stop offset="42%" stopColor="#F5DDA0" stopOpacity="0.92" />
                <stop offset="76%" stopColor="#C89B3C" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#E5C158" stopOpacity="0.38" />
              </linearGradient>
            </defs>
            <m.g
              style={{ transformOrigin: 'center bottom' }}
              animate={
                shouldAnimate
                  ? { x: [0, -22, 0], scaleX: [1.03, 1.05, 1.03] }
                  : undefined
              }
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <path
                d="M0 162 C 210 112, 460 186, 780 148 C 1060 116, 1280 78, 1440 94 L1440 240 L0 240 Z"
                fill="url(#blog-wave-emerald)"
                fillOpacity="0.86"
              />
              <path
                d="M0 162 C 210 112, 460 186, 780 148 C 1060 116, 1280 78, 1440 94"
                stroke="url(#blog-wave-gold)"
                strokeWidth="1.5"
              />
            </m.g>
            <m.g
              style={{ transformOrigin: 'center bottom' }}
              animate={
                shouldAnimate
                  ? { x: [0, 20, 0], scaleX: [1.04, 1.06, 1.04] }
                  : undefined
              }
              transition={{
                duration: 17,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <path
                d="M400 240 C 690 192, 980 180, 1235 126 C 1335 104, 1398 88, 1440 96 L1440 240 Z"
                fill="url(#blog-wave-emerald)"
              />
              <path
                d="M400 240 C 690 192, 980 180, 1235 126 C 1335 104, 1398 88, 1440 96"
                stroke="url(#blog-wave-gold)"
                strokeWidth="1.6"
              />
            </m.g>
          </svg>
        </div>

        {/* ═══════════════ MAIN CONTENT ═══════════════ */}
        <div className="relative z-10 mx-auto max-w-[1060px] px-4 sm:px-6 lg:px-8">
          {/* ─── Centered Editorial Section Header ─── */}
          <m.header
            initial={prefersReducedMotion ? false : { opacity: 0.99, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 'some' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-2xl text-center"
          >
            <div className="mb-1.5 flex items-center justify-center gap-3">
              <span
                aria-hidden="true"
                className="h-px w-8 bg-gradient-to-r from-transparent to-[#C99726] dark:to-[#E0B13A]"
              />
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#2B332E] dark:text-white/85">
                THE TAKHLEES JOURNAL
              </span>
              <span
                aria-hidden="true"
                className="h-px w-8 bg-gradient-to-l from-transparent to-[#C99726] dark:to-[#E0B13A]"
              />
            </div>

            <h2
              id="blog-showcase-heading"
              className="font-serif text-[26px] font-semibold leading-[1.12] tracking-[-0.015em] text-[#1C1C1C] dark:text-[#F5F5F2] sm:text-[30px] lg:text-[34px]"
            >
              Insights That Move{' '}
              <span className="relative inline-block font-bold italic text-[#087A42] dark:text-[#16A05A]">
                Business
                <svg
                  aria-hidden="true"
                  viewBox="0 0 180 12"
                  fill="none"
                  className="pointer-events-none absolute -bottom-1 left-0 h-2 w-full"
                >
                  <path
                    d="M3 9.5 C 55 3, 125 2.5, 177 6.5"
                    stroke="#C99726"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{' '}
              Forward
            </h2>

            <p className="mx-auto mt-1.5 max-w-xl text-[12.5px] leading-relaxed text-[#4E534F] dark:text-white/70 sm:text-[13px]">
              Explore valuable resources and the latest updates about Takhlees,
              UAE business setup, trade licensing and compliance.
            </p>
          </m.header>

          {/* ═══════════════ JOURNAL CONTENT AREA ═══════════════ */}
          {pagination.totalItems === 0 ? (
            /* Clean Intentional Empty State (0 articles) */
            <div className="mx-auto mt-10 max-w-xl rounded-[28px] border border-[#C99726]/30 bg-white/75 px-8 py-12 text-center backdrop-blur-md dark:border-white/15 dark:bg-[#0D1A13]/80">
              <p className="font-serif text-xl font-semibold text-[#171717] dark:text-white">
                No journal articles published yet
              </p>
              <p className="mt-2 text-sm text-[#4E534F] dark:text-white/70">
                Our editorial team is preparing new UAE regulatory and business
                setup guides. Check back soon or explore our blog hub.
              </p>
              <div className="mt-6 flex justify-center">
                <LiquidButton asChild variant="emerald" size="md">
                  <Link href="/ae/blog">
                    <span>Show All Articles</span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </LiquidButton>
              </div>
            </div>
          ) : (
            <div className="mt-5 hidden md:block" style={{ perspective: 1200 }}>
              <AnimatePresence mode="wait" initial={false}>
                <m.div
                  key={`journal-page-${pagination.currentPage}`}
                  initial={
                    prefersReducedMotion
                      ? false
                      : {
                          opacity: 0,
                          rotateX: direction > 0 ? 4 : -4,
                          y: 12,
                        }
                  }
                  animate={{ opacity: 1, rotateX: 0, y: 0 }}
                  exit={
                    prefersReducedMotion
                      ? undefined
                      : {
                          opacity: 0,
                          rotateX: direction > 0 ? -4 : 4,
                          y: -10,
                        }
                  }
                  transition={{
                    duration: 0.36,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  onAnimationComplete={() => setIsTransitioning(false)}
                  className="space-y-4"
                >
                  {/* ── 1. FEATURED EDITORIAL ARTICLE ── */}
                  {pagination.featured && (
                    <article
                      className={`group relative isolate overflow-hidden ${FEATURED_ORGANIC_RADIUS} bg-[linear-gradient(148deg,rgba(255,254,250,0.86)_0%,rgba(249,245,233,0.74)_54%,rgba(230,242,235,0.68)_100%)] p-2.5 shadow-[0_18px_40px_-14px_rgba(12,38,24,0.14)] backdrop-blur-md backdrop-saturate-150 transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_24px_46px_-14px_rgba(12,38,24,0.18)] dark:bg-[linear-gradient(148deg,rgba(16,32,24,0.86)_0%,rgba(11,22,17,0.78)_60%,rgba(7,26,18,0.86)_100%)] dark:shadow-[0_20px_44px_-14px_rgba(0,0,0,0.58)] sm:p-3`}
                    >
                      {/* Shared LiquidButton Bevel + Contact-style Multi-Layer Glass Reflections + Emerald-Gold Rim */}
                      <div
                        aria-hidden="true"
                        className={`pointer-events-none absolute inset-0 z-0 ${FEATURED_ORGANIC_RADIUS} ${LIQUID_GLASS_BEVEL}`}
                      />
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -left-16 -top-10 z-[1] h-40 w-[60%] -rotate-12 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.52)_0%,transparent_72%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08)_0%,transparent_72%)]"
                      />
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(85%_55%_at_18%_18%,rgba(255,255,255,0.48)_0%,transparent_64%),radial-gradient(75%_45%_at_84%_85%,rgba(8,122,66,0.11)_0%,transparent_62%)] dark:bg-[radial-gradient(85%_55%_at_18%_18%,rgba(255,255,255,0.08)_0%,transparent_64%),radial-gradient(75%_45%_at_84%_85%,rgba(22,160,90,0.14)_0%,transparent_62%)]"
                      />
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-8 top-0 z-20 h-px bg-gradient-to-r from-transparent via-white/85 to-transparent dark:via-white/25"
                      />
                      <span
                        aria-hidden="true"
                        className="leadership-glass-sheen pointer-events-none absolute inset-y-0 left-0 z-[2] w-[36%] bg-gradient-to-r from-transparent via-[#F5DDA0]/[0.16] to-transparent dark:via-[#F5DDA0]/[0.07]"
                        style={{ animationDuration: '10s' }}
                      />
                      <div
                        aria-hidden="true"
                        className={`pointer-events-none absolute inset-0 z-20 ${FEATURED_ORGANIC_RADIUS} [background:linear-gradient(132deg,rgba(255,255,255,0.92)_0%,rgba(229,193,88,0.72)_34%,rgba(8,122,66,0.34)_66%,rgba(245,215,127,0.78)_100%)] dark:[background:linear-gradient(132deg,rgba(255,255,255,0.22)_0%,rgba(229,193,88,0.55)_35%,rgba(22,160,90,0.40)_68%,rgba(245,215,127,0.5)_100%)]`}
                        style={{
                          padding: '1.5px',
                          WebkitMask:
                            'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                          WebkitMaskComposite: 'xor',
                          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                          maskComposite: 'exclude',
                        }}
                      />

                      <div className="relative z-10 grid grid-cols-1 items-center gap-4 lg:grid-cols-12 lg:gap-6">
                        {/* Left Large Article Image with Organic Frame & Delicate Inset Gold Reflection */}
                        <Link
                          href={`/ae/blog/${pagination.featured.slug}`}
                          tabIndex={-1}
                          aria-hidden="true"
                          className={`relative block h-[165px] w-full overflow-hidden ${FEATURED_IMAGE_RADIUS} ring-1 ring-inset ring-[#C99726]/20 dark:ring-[#E5C158]/18 after:pointer-events-none after:absolute after:inset-1.5 after:z-10 ${FEATURED_IMAGE_INSET_RADIUS} after:border after:border-[#F5D77F]/24 dark:after:border-[#E5C158]/16 sm:h-[180px] lg:col-span-5 lg:h-[175px]`}
                        >
                          <Image
                            src={pagination.featured.image}
                            alt={pagination.featured.imageAlt}
                            fill
                            sizes="(max-width: 1024px) 100vw, 440px"
                            loading="lazy"
                            className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.035]"
                          />
                          <div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent"
                          />
                          <span className="absolute left-3 top-3 z-20 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-[#085A30]/90 px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm backdrop-blur-md">
                            <CategoryIcon
                              icon={pagination.featured.categoryIcon}
                            />
                            <span>{pagination.featured.category}</span>
                          </span>
                        </Link>

                        {/* Right Editorial Content */}
                        <div className="flex flex-col justify-between px-2 pb-1.5 lg:col-span-7 lg:py-2 lg:pr-4">
                          <div>
                            <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#087A42] dark:text-[#6EE7A8]">
                              <span
                                aria-hidden="true"
                                className="h-1.5 w-1.5 rounded-full bg-[#C99726] dark:bg-[#E5C158]"
                              />
                              Featured Article
                            </span>
                            <h3 className="mt-1.5 font-serif text-[19px] font-bold leading-[1.24] tracking-[-0.014em] text-[#141715] transition-colors group-hover:text-[#0B0E0C] dark:text-[#F6F5F0] dark:group-hover:text-white sm:text-[21px] lg:text-[23px]">
                              <Link
                                href={`/ae/blog/${pagination.featured.slug}`}
                                className="focus-visible:outline-none focus-visible:underline"
                              >
                                {pagination.featured.title}
                              </Link>
                            </h3>
                            <p className="mt-2 line-clamp-2 text-[12.5px] leading-[1.6] text-[#4A504B] dark:text-white/75 sm:text-[13px]">
                              {pagination.featured.excerpt}
                            </p>
                          </div>

                          <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-black/8 pt-2.5 dark:border-white/10">
                            <div className="flex flex-wrap items-center gap-3.5 text-[11.5px] font-medium text-[#525954] dark:text-white/70">
                              <span className="inline-flex items-center gap-1.5">
                                <Calendar
                                  className="h-3.5 w-3.5 text-[#087A42] dark:text-[#2EB04B]"
                                  aria-hidden="true"
                                />
                                <time dateTime={pagination.featured.publishedAt}>
                                  {pagination.featured.formattedDate}
                                </time>
                              </span>
                              <span className="inline-flex items-center gap-1.5">
                                <Clock
                                  className="h-3.5 w-3.5 text-[#087A42] dark:text-[#2EB04B]"
                                  aria-hidden="true"
                                />
                                <span>
                                  {pagination.featured.readingTimeMinutes} min
                                  read
                                </span>
                              </span>
                            </div>

                            <Link
                              href={`/ae/blog/${pagination.featured.slug}`}
                              className="inline-flex items-center gap-1.5 border-b border-[#C99726] pb-0.5 text-[12.5px] font-bold text-[#085A30] transition-colors hover:text-[#087A42] dark:border-[#E5C158] dark:text-[#6EE7A8] dark:hover:text-white"
                            >
                              <span>Read Article</span>
                              <ArrowRight
                                className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                                aria-hidden="true"
                              />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </article>
                  )}

                  {/* ── 2. ADAPTIVE SUPPORTING ARTICLES GRID (0..3 CARDS, ZERO PLACEHOLDERS) ── */}
                  {supportingCount > 0 && (
                    <div className={`grid gap-4 ${supportingGridClass}`}>
                      {pagination.supporting.map((article, index) => (
                        <SupportingArticleCard
                          key={article.id}
                          article={article}
                          index={index}
                          prefersReducedMotion={prefersReducedMotion}
                        />
                      ))}
                    </div>
                  )}
                </m.div>
              </AnimatePresence>
            </div>
          )}

          {/* Mobile-Only Single Article Card + Prev/Next Controls */}
          {pagination.totalItems > 0 && activeMobileArticle && (
            <div className="mt-5 md:hidden">
              <SupportingArticleCard
                key={`mobile-article-${activeMobileArticle.id}`}
                article={activeMobileArticle}
                index={safeMobileIndex}
                prefersReducedMotion={prefersReducedMotion}
              />

              <nav
                aria-label="Mobile journal pagination and archive"
                className="mt-4 flex flex-col items-center justify-center gap-3"
              >
                {totalMobileArticles > 1 && (
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={handleMobilePrev}
                      aria-label="Previous article"
                      className={`group/prev inline-flex h-10 cursor-pointer items-center gap-1.5 rounded-[22px_14px_22px_16px/18px_14px_18px_16px] border border-[#C99726]/35 bg-white/80 px-4 text-[13px] font-semibold text-[#1C2A21] backdrop-blur-xl transition-all duration-200 active:scale-95 dark:border-white/15 dark:bg-[#101C16]/85 dark:text-white ${LIQUID_GLASS_BEVEL}`}
                    >
                      <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Previous</span>
                    </button>

                    <span
                      aria-live="polite"
                      className="inline-flex h-9 min-w-[74px] items-center justify-center rounded-[16px_22px_16px_22px/18px_16px_18px_16px] border border-[#087A42]/20 bg-[linear-gradient(145deg,rgba(255,254,250,0.68)_0%,rgba(247,243,232,0.48)_100%)] px-3 text-center text-[12.5px] font-semibold tabular-nums text-[#1C1C1C] ring-1 ring-inset ring-white/70 backdrop-blur-xl dark:border-[#2EB04B]/25 dark:bg-[linear-gradient(145deg,rgba(16,32,24,0.64)_0%,rgba(10,22,16,0.48)_100%)] dark:text-white/90 dark:ring-white/10"
                    >
                      {safeMobileIndex + 1} of {totalMobileArticles}
                    </span>

                    <button
                      type="button"
                      onClick={handleMobileNext}
                      aria-label="Next article"
                      className={`group/next inline-flex h-10 cursor-pointer items-center gap-1.5 rounded-[14px_22px_16px_22px/16px_18px_16px_18px] border border-[#087A42]/45 bg-[linear-gradient(135deg,rgba(255,255,255,0.92)_0%,rgba(232,245,237,0.86)_100%)] px-4 text-[13px] font-semibold text-[#085A30] backdrop-blur-xl transition-all duration-200 active:scale-95 dark:border-[#2EB04B]/45 dark:bg-[linear-gradient(135deg,rgba(16,32,24,0.92)_0%,rgba(11,26,18,0.88)_100%)] dark:text-[#6EE7A8] ${LIQUID_GLASS_BEVEL}`}
                    >
                      <span>Next</span>
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  </div>
                )}

                <LiquidButton asChild variant="emerald" size="md">
                  <Link href="/ae/blog">
                    <span>Show All Articles</span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </LiquidButton>
              </nav>
            </div>
          )}

          {/* ═══════════════ DESKTOP/TABLET PAGINATION BAR & SHOW ALL ARTICLES CTA ═══════════════ */}
          {pagination.totalItems > 0 && (
            <nav
              aria-label="Journal pagination and archive"
              className="mt-5 hidden flex-col items-center justify-center gap-3 sm:flex-row sm:gap-5 md:flex"
            >
              {pagination.totalPages > 1 && (
                <>
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <button
                      type="button"
                      onClick={handlePrevious}
                      disabled={isTransitioning || !pagination.hasPrevious}
                      aria-label="Previous articles page"
                      className={`group/prev inline-flex h-10 cursor-pointer items-center gap-1.5 rounded-[22px_14px_22px_16px/18px_14px_18px_16px] border border-[#C99726]/35 bg-white/80 px-4 text-[13px] font-semibold text-[#1C2A21] backdrop-blur-xl transition-all duration-200 hover:border-[#087A42]/55 hover:bg-white disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/15 dark:bg-[#101C16]/85 dark:text-white dark:hover:border-[#2EB04B]/60 ${LIQUID_GLASS_BEVEL}`}
                    >
                      <ArrowLeft
                        className="h-3.5 w-3.5 transition-transform duration-200 group-hover/prev:-translate-x-0.5 group-disabled/prev:translate-x-0"
                        aria-hidden="true"
                      />
                      <span>Previous</span>
                    </button>

                    <span
                      aria-live="polite"
                      className="inline-flex h-9 min-w-[74px] items-center justify-center rounded-[16px_22px_16px_22px/18px_16px_18px_16px] border border-[#087A42]/20 bg-[linear-gradient(145deg,rgba(255,254,250,0.68)_0%,rgba(247,243,232,0.48)_100%)] px-3 text-center text-[12.5px] font-semibold tabular-nums text-[#1C1C1C] ring-1 ring-inset ring-white/70 shadow-[inset_0_1px_1px_rgba(255,255,255,0.85),0_2px_8px_-2px_rgba(12,38,24,0.08)] backdrop-blur-xl backdrop-saturate-150 dark:border-[#2EB04B]/25 dark:bg-[linear-gradient(145deg,rgba(16,32,24,0.64)_0%,rgba(10,22,16,0.48)_100%)] dark:text-white/90 dark:ring-white/10 dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.12),0_2px_10px_-2px_rgba(0,0,0,0.4)]"
                    >
                      {pagination.currentPage} of {pagination.totalPages}
                    </span>

                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={isTransitioning || !pagination.hasNext}
                      aria-label="Next articles page"
                      className={`group/next inline-flex h-10 cursor-pointer items-center gap-1.5 rounded-[14px_22px_16px_22px/16px_18px_16px_18px] border border-[#087A42]/45 bg-[linear-gradient(135deg,rgba(255,255,255,0.92)_0%,rgba(232,245,237,0.86)_100%)] px-4 text-[13px] font-semibold text-[#085A30] backdrop-blur-xl transition-all duration-200 hover:border-[#087A42] hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-40 dark:border-[#2EB04B]/45 dark:bg-[linear-gradient(135deg,rgba(16,32,24,0.92)_0%,rgba(11,26,18,0.88)_100%)] dark:text-[#6EE7A8] dark:hover:border-[#2EB04B] ${LIQUID_GLASS_BEVEL}`}
                    >
                      <span>Next</span>
                      <ArrowRight
                        className="h-3.5 w-3.5 transition-transform duration-200 group-hover/next:translate-x-0.5 group-disabled/next:translate-x-0"
                        aria-hidden="true"
                      />
                    </button>
                  </div>

                  <span
                    aria-hidden="true"
                    className="hidden h-6 w-px bg-black/12 dark:bg-white/15 sm:inline-block"
                  />
                </>
              )}

              {/* Separate Show All Articles Liquid Button */}
              <LiquidButton asChild variant="emerald" size="md">
                <Link href="/ae/blog">
                  <span>Show All Articles</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </LiquidButton>
            </nav>
          )}
        </div>
      </section>
  );
}

export default BlogShowcaseSection;
