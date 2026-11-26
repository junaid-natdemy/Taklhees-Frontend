'use client';

import * as React from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  AnimatePresence,
  m,
  useReducedMotion,
} from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Globe,
  Loader2,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  RotateCcw,
  User,
} from 'lucide-react';
import { MotionTiltCard } from '@/components/ui/motion-tilt-card';
import { useSectionInView } from '@/hooks/use-section-in-view';
import { siteConfig } from '@/config/site';

/* ━━━━━━━━━━━━━━━━━━ FORM SCHEMA ━━━━━━━━━━━━━━━━━━ */
const contactSchema = z
  .object({
    name: z.string().trim().min(2, 'Please enter your full name.'),
    email: z
      .string()
      .trim()
      .min(1, 'Please enter your email address.')
      .email('Please enter a valid email address.'),
    phone: z.string().trim().min(6, 'Please enter a valid phone number.'),
    country: z.enum(['AE', 'IN', 'OTHER'], {
      message: 'Please select a country.',
    }),
    otherCountry: z.string().trim().optional(),
    message: z
      .string()
      .trim()
      .min(10, 'Please enter a message (at least 10 characters).'),
  })
  .superRefine((data, ctx) => {
    if (
      data.country === 'OTHER' &&
      (!data.otherCountry || data.otherCountry.trim().length < 2)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['otherCountry'],
        message: 'Please enter your country name.',
      });
    }
  });

type ContactFormValues = z.infer<typeof contactSchema>;

function UAEFlagIcon() {
  return (
    <span
      aria-hidden="true"
      className="relative inline-block h-3.5 w-5 shrink-0 overflow-hidden rounded-[2px] border border-black/15 dark:border-white/20 shadow-xs"
    >
      <span className="absolute inset-y-0 left-0 w-[28%] bg-[#E4002B]" />
      <span className="absolute left-[28%] right-0 top-0 h-1/3 bg-[#00732F]" />
      <span className="absolute left-[28%] right-0 top-1/3 h-1/3 bg-white" />
      <span className="absolute bottom-0 left-[28%] right-0 h-1/3 bg-black" />
    </span>
  );
}

function IndiaFlagIcon() {
  return (
    <span
      aria-hidden="true"
      className="relative inline-block h-3.5 w-5 shrink-0 overflow-hidden rounded-[2px] border border-black/15 dark:border-white/20 shadow-xs"
    >
      <span className="absolute inset-x-0 top-0 h-1/3 bg-[#FF9933]" />
      <span className="absolute inset-x-0 top-1/3 flex h-1/3 items-center justify-center bg-white">
        <span className="h-1 w-1 rounded-full border border-[#000080]" />
      </span>
      <span className="absolute inset-x-0 bottom-0 h-1/3 bg-[#128807]" />
    </span>
  );
}

const COUNTRY_OPTIONS = [
  { value: 'AE', label: 'UAE', icon: <UAEFlagIcon /> },
  { value: 'IN', label: 'India', icon: <IndiaFlagIcon /> },
  {
    value: 'OTHER',
    label: 'Other',
    icon: (
      <Globe
        className="h-4 w-4 shrink-0 text-[#087A42] dark:text-[#6EE7A8]"
        aria-hidden="true"
      />
    ),
  },
] as const;

/* ━━━━━━━━━━━━━━━━━━ REUSED LIQUID GLASS SYSTEM ━━━━━━━━━━━━━━━━━━
 * Exact 9-layer beveled shadow from LiquidButton for icon tiles & controls.
 */
const LIQUID_GLASS_BEVEL =
  'shadow-[0_0_6px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3px_rgba(0,0,0,0.45),inset_-3px_-3px_0.5px_-3px_rgba(0,0,0,0.4),inset_1px_1px_1px_-0.5px_rgba(0,0,0,0.28),inset_-1px_-1px_1px_-0.5px_rgba(0,0,0,0.28),inset_0_0_6px_6px_rgba(0,0,0,0.06),inset_0_0_2px_2px_rgba(0,0,0,0.03),0_0_12px_rgba(255,255,255,0.22)] dark:shadow-[0_0_8px_rgba(0,0,0,0.06),0_2px_6px_rgba(0,0,0,0.14),inset_3px_3px_0.5px_-3.5px_rgba(255,255,255,0.09),inset_-3px_-3px_0.5px_-3.5px_rgba(255,255,255,0.55),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.38),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.38),inset_0_0_6px_6px_rgba(255,255,255,0.08),inset_0_0_2px_2px_rgba(255,255,255,0.04),0_0_12px_rgba(0,0,0,0.18)]';

const LIQUID_INPUT_CLASS =
  'w-full rounded-2xl border border-black/10 bg-white/75 text-[14px] text-[#171717] placeholder:text-[#6B706C] shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.05),inset_0_-1px_1px_rgba(255,255,255,0.9)] backdrop-blur-md transition-all duration-200 focus:border-[#087A42]/55 focus:bg-white/95 focus:outline-none focus:ring-2 focus:ring-[#087A42]/20 dark:border-white/14 dark:bg-[#101C16]/80 dark:text-white dark:placeholder:text-white/45 dark:shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.45)] dark:focus:border-[#2EB04B]/60 dark:focus:ring-[#2EB04B]/20';

/* ━━━━━━━━━━━━━━━━━━ PAIRED ORGANIC SVG SILHOUETTES ━━━━━━━━━━━━━━━━━━
 * - Left Emerald: preserved from Pass 5 as requested.
 * - Right Ivory: refined sculptural silhouette with controlled asymmetrical upper
 *   edge, outward right-side curvature, and flowing bottom contour.
 */
const EMERALD_SCULPTED_PATH =
  'M 0.16,0.04 C 0.36,-0.01 0.64,0.01 0.87,0.06 C 0.96,0.08 0.99,0.16 0.97,0.28 C 0.93,0.42 0.92,0.52 0.97,0.68 C 1.00,0.79 0.98,0.90 0.86,0.94 C 0.64,1.00 0.36,1.00 0.15,0.95 C 0.05,0.92 0.01,0.82 0.00,0.66 C 0.00,0.46 0.00,0.28 0.04,0.14 C 0.07,0.08 0.10,0.05 0.16,0.04 Z';

const IVORY_SCULPTED_PATH =
  'M 0.10,0.07 C 0.28,0.05 0.48,0.06 0.82,0.00 C 0.94,-0.01 0.99,0.07 1.00,0.22 C 1.01,0.42 0.98,0.62 0.94,0.78 C 0.91,0.90 0.83,0.95 0.68,0.97 C 0.48,1.00 0.28,0.99 0.12,0.94 C 0.03,0.91 0.00,0.82 0.01,0.68 C 0.02,0.48 0.00,0.30 0.03,0.16 C 0.04,0.10 0.06,0.08 0.10,0.07 Z';

function OrganicClipDefs() {
  return (
    <svg className="pointer-events-none absolute h-0 w-0" aria-hidden="true">
      <defs>
        <clipPath id="contact-emerald-shape" clipPathUnits="objectBoundingBox">
          <path d={EMERALD_SCULPTED_PATH} />
        </clipPath>
        <clipPath id="contact-ivory-shape" clipPathUnits="objectBoundingBox">
          <path d={IVORY_SCULPTED_PATH} />
        </clipPath>
      </defs>
    </svg>
  );
}

/**
 * Renders the internal glass bevel, metallic champagne-gold edge lighting,
 * and slow-moving champagne-gold reflection streak directly along the clipped contour.
 */
function OrganicGlassRim({
  pathD,
  id,
  variant,
  prefersReducedMotion,
}: {
  pathD: string;
  id: string;
  variant: 'emerald' | 'ivory';
  prefersReducedMotion: boolean | null;
}) {
  return (
    <svg
      viewBox="0 0 1 1"
      preserveAspectRatio="none"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-20 h-full w-full"
    >
      <defs>
        <linearGradient id={`${id}-gold-rim`} x1="0" y1="0" x2="1" y2="1">
          {variant === 'emerald' ? (
            <>
              <stop offset="0%" stopColor="rgba(255,252,240,0.9)" />
              <stop offset="26%" stopColor="rgba(240,213,140,0.82)" />
              <stop offset="54%" stopColor="rgba(22,160,90,0.34)" />
              <stop offset="80%" stopColor="rgba(196,154,68,0.78)" />
              <stop offset="100%" stopColor="rgba(255,247,222,0.74)" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
              <stop offset="28%" stopColor="rgba(232,202,128,0.68)" />
              <stop offset="58%" stopColor="rgba(8,122,66,0.24)" />
              <stop offset="84%" stopColor="rgba(238,210,136,0.74)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.76)" />
            </>
          )}
        </linearGradient>
        <linearGradient id={`${id}-inner-bevel`} x1="0" y1="0" x2="0" y2="1">
          <stop
            offset="0%"
            stopColor={
              variant === 'emerald'
                ? 'rgba(255,255,255,0.3)'
                : 'rgba(255,255,255,0.78)'
            }
          />
          <stop offset="50%" stopColor="rgba(255,255,255,0.03)" />
          <stop
            offset="100%"
            stopColor={
              variant === 'emerald'
                ? 'rgba(0,22,11,0.42)'
                : 'rgba(8,122,66,0.12)'
            }
          />
        </linearGradient>
      </defs>

      {/* 3D Liquid-Glass Lens Thickness Band (adapted from LiquidToggle fresnel rim) */}
      <path
        d={pathD}
        fill="none"
        stroke={
          variant === 'emerald'
            ? 'rgba(139,232,172,0.16)'
            : 'rgba(255,255,255,0.52)'
        }
        vectorEffect="non-scaling-stroke"
        style={{ strokeWidth: '16px' }}
      />
      {/* Soft inner bevel depth stroke (matches LiquidButton inset bevel) */}
      <path
        d={pathD}
        fill="none"
        stroke={`url(#${id}-inner-bevel)`}
        vectorEffect="non-scaling-stroke"
        style={{ strokeWidth: '7px' }}
      />
      {/* Metallic champagne-gold perimeter */}
      <path
        d={pathD}
        fill="none"
        stroke={`url(#${id}-gold-rim)`}
        vectorEffect="non-scaling-stroke"
        style={{ strokeWidth: '2.8px' }}
      />
      {/* Slow-moving reflected champagne-gold highlight */}
      {!prefersReducedMotion && (
        <m.path
          d={pathD}
          fill="none"
          stroke="#FFF6DC"
          strokeOpacity="0.82"
          strokeLinecap="round"
          pathLength={100}
          strokeDasharray="15 85"
          vectorEffect="non-scaling-stroke"
          style={{ strokeWidth: '3px' }}
          initial={{ strokeDashoffset: 0 }}
          animate={{ strokeDashoffset: -100 }}
          transition={{
            duration: variant === 'emerald' ? 14 : 18,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      )}
    </svg>
  );
}

export function ContactSection({
  asPageHeading = false,
}: {
  asPageHeading?: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = React.useRef<HTMLElement>(null);
  const inView = useSectionInView(sectionRef);
  const shouldAnimate = !prefersReducedMotion && inView;
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [submittedMessage, setSubmittedMessage] = React.useState<string | null>(
    null
  );
  const [lockedPanelHeight, setLockedPanelHeight] = React.useState<
    number | null
  >(null);
  const panelContentRef = React.useRef<HTMLDivElement>(null);
  const [countryMenuOpen, setCountryMenuOpen] = React.useState(false);
  const countryMenuRef = React.useRef<HTMLDivElement>(null);

  const HeadingTag = asPageHeading ? 'h1' : 'h2';

  const contact = siteConfig.contacts.ae;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      country: 'AE',
      otherCountry: '',
      message: '',
    },
  });

  const selectedCountry = watch('country');
  const activeCountryOption =
    COUNTRY_OPTIONS.find((opt) => opt.value === selectedCountry) ??
    COUNTRY_OPTIONS[0];

  React.useEffect(() => {
    if (!countryMenuOpen) return;
    const handleOutside = (event: MouseEvent) => {
      if (
        countryMenuRef.current &&
        !countryMenuRef.current.contains(event.target as Node)
      ) {
        setCountryMenuOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setCountryMenuOpen(false);
    };
    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [countryMenuOpen]);

  const onSubmit = async (values: ContactFormValues) => {
    if (submittedMessage) return;
    setServerError(null);
    const resolvedCountry =
      values.country === 'OTHER'
        ? (values.otherCountry?.trim() ?? 'Other')
        : values.country;
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          phone: values.phone,
          country: resolvedCountry,
          message: values.message,
        }),
      });

      const data = (await response.json()) as {
        message?: string;
        errors?: Record<string, string[]>;
      };

      if (!response.ok) {
        setServerError(
          data.message ?? 'Unable to send your message. Please try again.'
        );
        return;
      }

      const measuredHeight = panelContentRef.current?.offsetHeight ?? null;
      if (measuredHeight) setLockedPanelHeight(measuredHeight);
      setSubmittedMessage(
        data.message ??
          'Thank you for reaching out to Takhlees. Your enquiry has been received successfully. Our UAE corporate consultancy team will review your message and get back to you shortly.'
      );
      reset();
    } catch {
      setServerError(
        'Network error while sending your message. Please try again.'
      );
    }
  };

  const handleResetSuccess = () => {
    setSubmittedMessage(null);
    setLockedPanelHeight(null);
    setServerError(null);
    setCountryMenuOpen(false);
    reset({
      name: '',
      email: '',
      phone: '',
      country: 'AE',
      otherCountry: '',
      message: '',
    });
  };

  const isSuccess = Boolean(submittedMessage);

  return (
    <section
      ref={sectionRef}
      id="contact"
      data-section-paused={!inView ? 'true' : undefined}
      aria-labelledby="contact-heading"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#FAF8F3_0%,#F3EDE0_55%,#EAE1CE_100%)] py-14 transition-colors duration-300 dark:bg-[linear-gradient(180deg,#050807_0%,#07100C_55%,#050907_100%)] sm:py-16 lg:py-20"
    >
        {/* Organic clipPaths (shared #container-glass mounted once in Providers) */}
        <OrganicClipDefs />

        {/* ═══════════════ PANORAMIC DUBAI SKYLINE & EMERALD-GOLD WAVE SYSTEM ═══════════════ */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 select-none overflow-hidden"
        >
          {/* Warm Golden-Hour Horizon Glow & Emerald Ambient Reflections */}
          <div className="absolute left-[14%] top-[8%] h-[420px] w-[580px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,253,247,0.96),transparent_76%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(8,122,66,0.14),transparent_76%)]" />
          <div className="absolute right-[2%] top-[10%] h-[500px] w-[680px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(229,189,98,0.28),rgba(8,122,66,0.08)_54%,transparent_78%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(0,168,90,0.2),rgba(212,175,55,0.12)_55%,transparent_78%)]" />

          {/* Dedicated Panoramic Dubai Skyline with Burj Khalifa & Emerald-Gold Waves */}
          <div
            className="absolute inset-x-0 bottom-0 z-0 mx-auto h-[420px] max-w-[1600px] opacity-85 sm:h-[480px] lg:h-[540px] dark:opacity-35"
            style={{
              maskImage:
                'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.55) 26%, #000 58%, #000 100%)',
              WebkitMaskImage:
                'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.55) 26%, #000 58%, #000 100%)',
            }}
          >
            <Image
              src="/images/contact/dubai-skyline-contact-bg.webp"
              alt=""
              fill
              sizes="100vw"
              loading="lazy"
              className="object-cover object-bottom dark:brightness-75 dark:contrast-110"
            />
          </div>

          {/* Upper-Left Flowing Emerald Wave with Thin Champagne-Gold Boundary */}
          <svg
            viewBox="0 0 380 380"
            fill="none"
            className="absolute -left-8 -top-4 z-0 h-[210px] w-[220px] sm:h-[260px] sm:w-[270px]"
            style={{
              maskImage:
                'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.45) 22%, #000 55%)',
              WebkitMaskImage:
                'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.45) 22%, #000 55%)',
            }}
          >
            <defs>
              <linearGradient
                id="contact-tl-emerald"
                x1="0"
                y1="0"
                x2="1"
                y2="1"
              >
                <stop offset="0%" stopColor="#043A1F" stopOpacity="0.94" />
                <stop offset="58%" stopColor="#086E3B" stopOpacity="0.78" />
                <stop offset="100%" stopColor="#087A42" stopOpacity="0.04" />
              </linearGradient>
              <linearGradient
                id="contact-tl-gold"
                x1="0"
                y1="1"
                x2="1"
                y2="0"
              >
                <stop offset="0%" stopColor="#E5C158" stopOpacity="0.12" />
                <stop offset="50%" stopColor="#F5D77F" stopOpacity="0.82" />
                <stop offset="100%" stopColor="#C99726" stopOpacity="0.36" />
              </linearGradient>
            </defs>
            <path
              d="M0 14 C 72 4, 148 16, 226 10 C 168 78, 98 166, 32 284 C 16 312, 6 336, 0 356 Z"
              fill="url(#contact-tl-emerald)"
            />
            <path
              d="M222 12 C 164 80, 96 168, 30 286"
              stroke="url(#contact-tl-gold)"
              strokeWidth="1.6"
            />
          </svg>

          {/* Bottom Flowing Emerald Waves & Champagne-Gold Illuminated Boundaries */}
          <svg
            viewBox="0 0 1440 300"
            preserveAspectRatio="none"
            fill="none"
            className="absolute inset-x-0 bottom-0 z-0 h-[175px] w-full sm:h-[215px] lg:h-[240px]"
          >
            <defs>
              <linearGradient
                id="contact-wave-ivory-bg"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#EFEBE0" stopOpacity="0.84" />
                <stop offset="60%" stopColor="#E5DFCE" stopOpacity="0.48" />
                <stop offset="100%" stopColor="#DCD5C2" stopOpacity="0.18" />
              </linearGradient>
              <linearGradient
                id="contact-wave-emerald-mid"
                x1="25%"
                y1="100%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#087A42" stopOpacity="0.22" />
                <stop offset="60%" stopColor="#065C30" stopOpacity="0.42" />
                <stop offset="100%" stopColor="#043A1F" stopOpacity="0.58" />
              </linearGradient>
              <linearGradient
                id="contact-wave-emerald-bg"
                x1="35%"
                y1="100%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#04381E" stopOpacity="0.96" />
                <stop offset="55%" stopColor="#076435" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#022412" stopOpacity="0.98" />
              </linearGradient>
              <linearGradient
                id="contact-wave-gold-bg"
                x1="0%"
                y1="50%"
                x2="100%"
                y2="50%"
              >
                <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.08" />
                <stop offset="35%" stopColor="#F5DDA0" stopOpacity="0.9" />
                <stop offset="72%" stopColor="#C89B3C" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#E5C158" stopOpacity="0.35" />
              </linearGradient>
            </defs>

            <m.g
              style={{ transformOrigin: 'center bottom' }}
              animate={
                shouldAnimate
                  ? { x: [0, -24, 0], scaleX: [1.03, 1.05, 1.03] }
                  : undefined
              }
              transition={{
                duration: 21,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <path
                d="M0 175 C 320 105, 620 218, 950 158 C 1170 120, 1320 74, 1440 94 L1440 300 L0 300 Z"
                fill="url(#contact-wave-ivory-bg)"
                className="dark:hidden"
              />
              <path
                d="M360 300 C 680 232, 960 185, 1190 118 C 1300 86, 1380 62, 1440 72 L1440 300 Z"
                fill="url(#contact-wave-emerald-mid)"
              />
              <path
                d="M360 300 C 680 232, 960 185, 1190 118 C 1300 86, 1380 62, 1440 72"
                stroke="url(#contact-wave-gold-bg)"
                strokeOpacity="0.48"
                strokeWidth="1.2"
              />
            </m.g>
            <m.g
              style={{ transformOrigin: 'center bottom' }}
              animate={
                shouldAnimate
                  ? { x: [0, 22, 0], scaleX: [1.04, 1.06, 1.04] }
                  : undefined
              }
              transition={{
                duration: 17,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <path
                d="M500 300 C 780 240, 1035 208, 1235 142 C 1330 110, 1395 86, 1440 96 L1440 300 Z"
                fill="url(#contact-wave-emerald-bg)"
              />
              <path
                d="M500 300 C 780 240, 1035 208, 1235 142 C 1330 110, 1395 86, 1440 96"
                stroke="url(#contact-wave-gold-bg)"
                strokeWidth="1.8"
              />
            </m.g>
          </svg>
        </div>

        {/* ═══════════════ MAIN CONTENT ═══════════════ */}
        <div className="relative z-10 mx-auto max-w-[1060px] px-4 sm:px-6 lg:px-8">
          {/* ─── Centered Editorial Section Header ─── */}
          <m.div
            initial={prefersReducedMotion ? false : { opacity: 0.99, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 'some' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-xl text-center"
          >
            <div className="mb-3 flex items-center justify-center gap-3">
              <span
                aria-hidden="true"
                className="h-px w-8 bg-gradient-to-r from-transparent to-[#C99726] dark:to-[#E0B13A]"
              />
              <span className="text-[10.5px] font-semibold uppercase tracking-[0.22em] text-[#2B332E] dark:text-white/85">
                GET IN TOUCH
              </span>
              <span
                aria-hidden="true"
                className="h-px w-8 bg-gradient-to-l from-transparent to-[#C99726] dark:to-[#E0B13A]"
              />
            </div>

            <HeadingTag
              id="contact-heading"
              className="font-serif text-[30px] font-semibold leading-[1.12] tracking-[-0.015em] text-[#1C1C1C] dark:text-[#F5F5F2] sm:text-[36px] lg:text-[42px]"
            >
              Let&apos;s Have a{' '}
              <span className="relative inline-block font-bold italic text-[#087A42] dark:text-[#16A05A]">
                Conversation
                <svg
                  aria-hidden="true"
                  viewBox="0 0 220 12"
                  fill="none"
                  className="pointer-events-none absolute -bottom-1.5 left-0 h-2.5 w-full"
                >
                  <path
                    d="M3 9.5 C 65 3, 155 2.5, 217 6.5"
                    stroke="#C99726"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </HeadingTag>

            <p className="mx-auto mt-3 max-w-lg text-[13.5px] leading-relaxed text-[#4E534F] dark:text-white/70 sm:text-[14.5px]">
              We&apos;re open to talking to good people. Just say hello, and
              we&apos;ll start productive cooperation. Start your own success
              story.
            </p>
          </m.div>

          {/* ═══════════════ TWO-COLUMN LIQUID-GLASS COMPOSITION ═══════════════ */}
          <div className="mt-9 grid grid-cols-1 items-stretch gap-5 lg:grid-cols-12 lg:gap-6">
            {/* ══════ LEFT: PRESERVED SILHOUETTE + UPGRADED EMERALD LIQUID-GLASS MATERIAL ══════ */}
            <m.div
              initial={prefersReducedMotion ? false : { opacity: 0.99, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 'some' }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5"
            >
              <MotionTiltCard
                maxTilt={2.2}
                perspective={1200}
                hoverZ={-4}
                className="h-full w-full"
              >
                <div className="h-full w-full drop-shadow-[0_18px_34px_rgba(4,42,23,0.3)]">
                  <div
                    className="group relative isolate flex h-full flex-col justify-between overflow-hidden bg-[linear-gradient(152deg,rgba(16,142,76,0.78)_0%,rgba(7,92,48,0.86)_48%,rgba(4,52,27,0.90)_100%)] px-8 py-9 text-white backdrop-blur-md saturate-[1.35] sm:px-9 sm:py-10"
                    style={{ clipPath: 'url(#contact-emerald-shape)' }}
                  >

                    {/* Exact-edge internal bevel + champagne-gold light streak */}
                    <OrganicGlassRim
                      pathD={EMERALD_SCULPTED_PATH}
                      id="emerald-panel"
                      variant="emerald"
                      prefersReducedMotion={!shouldAnimate}
                    />

                    {/* Multi-layered Liquid Glass Reflections (LiquidToggle dual speculars + skylight gloss + meniscus + caustic bounce) */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -left-16 -top-12 z-[1] h-56 w-[75%] -rotate-12 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.22)_0%,transparent_72%)]"
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-4 top-1.5 z-[1] h-28 rounded-t-[40px] bg-gradient-to-b from-white/[0.26] via-white/[0.08] to-transparent"
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(85%_55%_at_18%_22%,rgba(110,231,168,0.22)_0%,transparent_65%),radial-gradient(70%_45%_at_84%_80%,rgba(245,215,127,0.14)_0%,transparent_62%)]"
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-6 bottom-1.5 z-[1] h-24 rounded-b-[40px] bg-gradient-to-t from-[#34D399]/24 via-[#16A05A]/12 to-transparent"
                    />
                    {/* Animated Champagne-Gold & Emerald Glass Reflection (behind z-10 content) */}
                    <span
                      aria-hidden="true"
                      className="leadership-glass-sheen pointer-events-none absolute inset-y-0 left-0 z-[2] w-[42%] bg-gradient-to-r from-transparent via-[#F5DDA0]/[0.16] to-transparent"
                      style={{ animationDuration: '8.5s' }}
                    />

                    {/* Integrated UAE Golden Skyline Along Lower Portion */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-28 opacity-45"
                      style={{
                        maskImage:
                          'linear-gradient(to top, #000 18%, rgba(0,0,0,0.48) 58%, transparent 100%)',
                        WebkitMaskImage:
                          'linear-gradient(to top, #000 18%, rgba(0,0,0,0.48) 58%, transparent 100%)',
                      }}
                    >
                      <Image
                        src="/images/testimonials/dubai-skyline-dark.webp"
                        alt=""
                        width={1920}
                        height={320}
                        loading="lazy"
                        className="h-full w-full object-cover object-right-bottom sepia-[0.28] saturate-[1.3]"
                      />
                    </div>

                    {/* Three Contact Information Groups */}
                    <div className="relative z-10 space-y-5 pb-6">
                      {/* Address */}
                      <div className="flex items-start gap-4">
                        <div className="relative isolate flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#FAF7EE]/95 text-[#06522B]">
                          <div
                            aria-hidden="true"
                            className={`pointer-events-none absolute inset-0 z-0 rounded-xl ${LIQUID_GLASS_BEVEL}`}
                          />
                          <MapPin
                            className="relative z-10 h-[18px] w-[18px]"
                            strokeWidth={1.85}
                            aria-hidden="true"
                          />
                        </div>
                        <div className="space-y-0.5">
                          <h3 className="text-[14.5px] font-bold tracking-tight text-white">
                            Address
                          </h3>
                          <p className="text-[12.5px] leading-relaxed text-white/86">
                            Mussafah Ind. Area M-10
                            <br />
                            {contact.location}
                          </p>
                          <a
                            href="https://maps.google.com/?q=Mussafah+Industrial+Area+M-10+Abu+Dhabi+UAE"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-0.5 inline-flex items-center gap-1 text-[12px] font-medium text-[#F5D77F] underline underline-offset-4 transition-colors hover:text-white"
                          >
                            <span>See Map</span>
                            <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                          </a>
                        </div>
                      </div>

                      {/* Thin Champagne-Gold Separator */}
                      <div
                        aria-hidden="true"
                        className="h-px w-full bg-gradient-to-r from-[#E5C158]/48 via-[#E5C158]/18 to-transparent"
                      />

                      {/* Email */}
                      <div className="flex items-start gap-4">
                        <div className="relative isolate flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#FAF7EE]/95 text-[#06522B]">
                          <div
                            aria-hidden="true"
                            className={`pointer-events-none absolute inset-0 z-0 rounded-xl ${LIQUID_GLASS_BEVEL}`}
                          />
                          <Mail
                            className="relative z-10 h-[18px] w-[18px]"
                            strokeWidth={1.85}
                            aria-hidden="true"
                          />
                        </div>
                        <div className="space-y-0.5">
                          <h3 className="text-[14.5px] font-bold tracking-tight text-white">
                            Email
                          </h3>
                          <p className="text-[12.5px] text-white/86">
                            {contact.email}
                          </p>
                          <a
                            href={`mailto:${contact.email}`}
                            className="mt-0.5 inline-flex items-center gap-1 text-[12px] font-medium text-[#F5D77F] underline underline-offset-4 transition-colors hover:text-white"
                          >
                            <span>Say Hello</span>
                            <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                          </a>
                        </div>
                      </div>

                      {/* Thin Champagne-Gold Separator */}
                      <div
                        aria-hidden="true"
                        className="h-px w-full bg-gradient-to-r from-[#E5C158]/48 via-[#E5C158]/18 to-transparent"
                      />

                      {/* Phone */}
                      <div className="flex items-start gap-4">
                        <div className="relative isolate flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#FAF7EE]/95 text-[#06522B]">
                          <div
                            aria-hidden="true"
                            className={`pointer-events-none absolute inset-0 z-0 rounded-xl ${LIQUID_GLASS_BEVEL}`}
                          />
                          <Phone
                            className="relative z-10 h-[18px] w-[18px]"
                            strokeWidth={1.85}
                            aria-hidden="true"
                          />
                        </div>
                        <div className="space-y-0.5">
                          <h3 className="text-[14.5px] font-bold tracking-tight text-white">
                            Phone
                          </h3>
                          <p className="text-[12.5px] text-white/86">
                            {contact.phone}
                          </p>
                          <a
                            href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                            className="mt-0.5 inline-flex items-center gap-1 text-[12px] font-medium text-[#F5D77F] underline underline-offset-4 transition-colors hover:text-white"
                          >
                            <span>Call Now</span>
                            <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </MotionTiltCard>
            </m.div>

            {/* ══════ RIGHT: SCULPTED ORGANIC IVORY LIQUID-GLASS FORM ══════ */}
            <m.div
              initial={prefersReducedMotion ? false : { opacity: 0.99, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 'some' }}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7"
            >
              <div className="group relative isolate h-full w-full drop-shadow-[0_22px_40px_rgba(12,38,24,0.16)] dark:drop-shadow-[0_22px_42px_rgba(0,0,0,0.52)]">
                {/* Clipped Organic Frosted-Ivory Liquid Glass Surface (separated so form controls are never clipped) */}
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-0 z-0 overflow-hidden backdrop-blur-md saturate-[1.35] transition-colors duration-300 ${
                    isSuccess
                      ? 'bg-[linear-gradient(148deg,rgba(255,254,250,0.88)_0%,rgba(248,245,234,0.80)_52%,rgba(227,242,233,0.78)_100%)] dark:bg-[linear-gradient(148deg,rgba(14,30,22,0.88)_0%,rgba(10,22,16,0.82)_60%,rgba(7,26,18,0.88)_100%)]'
                      : 'bg-[linear-gradient(148deg,rgba(255,254,250,0.72)_0%,rgba(249,245,233,0.58)_52%,rgba(229,242,234,0.54)_100%)] dark:bg-[linear-gradient(148deg,rgba(16,32,24,0.78)_0%,rgba(11,22,17,0.68)_60%,rgba(7,26,18,0.78)_100%)]'
                  }`}
                  style={{ clipPath: 'url(#contact-ivory-shape)' }}
                >

                  {/* Exact-edge internal bevel + lens thickness + champagne-gold light streak */}
                  <OrganicGlassRim
                    pathD={IVORY_SCULPTED_PATH}
                    id="ivory-panel"
                    variant="ivory"
                    prefersReducedMotion={!shouldAnimate}
                  />

                  {/* Multi-layered Frosted Ivory Glass Depth & Emerald/Champagne Reflections */}
                  <div className="pointer-events-none absolute -left-16 -top-12 z-[1] h-56 w-[72%] -rotate-12 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.55)_0%,transparent_72%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08)_0%,transparent_72%)]" />
                  <div className="pointer-events-none absolute inset-x-4 top-1.5 z-[1] h-32 rounded-t-[40px] bg-gradient-to-b from-white/85 via-white/28 to-transparent dark:from-white/[0.14] dark:via-white/[0.04]" />
                  <div
                    className={`pointer-events-none absolute inset-0 z-[1] transition-opacity duration-500 ${
                      isSuccess
                        ? 'bg-[radial-gradient(85%_60%_at_50%_18%,rgba(8,122,66,0.12)_0%,transparent_64%),radial-gradient(80%_50%_at_50%_85%,rgba(229,193,88,0.12)_0%,transparent_65%)] dark:bg-[radial-gradient(85%_60%_at_50%_18%,rgba(22,160,90,0.20)_0%,transparent_64%),radial-gradient(80%_50%_at_50%_85%,rgba(229,193,88,0.12)_0%,transparent_65%)]'
                        : 'bg-[radial-gradient(85%_55%_at_18%_18%,rgba(255,255,255,0.55)_0%,transparent_64%),radial-gradient(75%_45%_at_82%_85%,rgba(8,122,66,0.14)_0%,transparent_62%)] dark:bg-[radial-gradient(85%_55%_at_18%_18%,rgba(255,255,255,0.1)_0%,transparent_64%),radial-gradient(75%_45%_at_82%_85%,rgba(22,160,90,0.16)_0%,transparent_62%)]'
                    }`}
                  />
                  <div className="pointer-events-none absolute inset-x-6 bottom-1.5 z-[1] h-24 rounded-b-[40px] bg-gradient-to-t from-[#087A42]/16 via-[#E5C158]/[0.08] to-transparent dark:from-[#16A05A]/16" />
                  {/* Staggered Champagne-Gold Reflection Streak */}
                  <span
                    className="leadership-glass-sheen pointer-events-none absolute inset-y-0 left-0 z-[2] w-[42%] bg-gradient-to-r from-transparent via-[#F5DDA0]/[0.2] to-transparent dark:via-[#F5DDA0]/[0.09]"
                    style={{
                      animationDuration: '9.5s',
                      animationDelay: '3.2s',
                    }}
                  />
                </div>

                {/* Form / Success Content with Safe Horizontal & Bottom Padding (keeps exact form height on success) */}
                <div
                  ref={panelContentRef}
                  style={
                    isSuccess && lockedPanelHeight
                      ? { height: `${lockedPanelHeight}px` }
                      : undefined
                  }
                  className="relative z-10 flex h-full flex-col justify-center px-8 pt-8 pb-12 sm:px-16 sm:pt-10 sm:pb-16"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {submittedMessage ? (
                      <m.div
                        key="contact-success-panel"
                        role="status"
                        aria-live="polite"
                        initial={
                          prefersReducedMotion ? false : { opacity: 0, y: 6 }
                        }
                        animate={{ opacity: 1, y: 0 }}
                        exit={
                          prefersReducedMotion ? undefined : { opacity: 0, y: -4 }
                        }
                        transition={{
                          duration: 0.28,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="mx-auto flex w-full max-w-[420px] flex-col items-center justify-center text-center"
                      >
                        {/* Emerald Circular Liquid-Glass Indicator with Delicate Gold Rim */}
                        <m.div
                          initial={
                            prefersReducedMotion
                              ? false
                              : { opacity: 0, scale: 0.85 }
                          }
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            duration: 0.34,
                            delay: prefersReducedMotion ? 0 : 0.04,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="relative mb-3.5 flex h-[54px] w-[54px] items-center justify-center rounded-full bg-[linear-gradient(135deg,#F5D77F_0%,#C99726_48%,#E5C158_100%)] p-[1.5px] shadow-[0_12px_24px_-6px_rgba(8,122,66,0.42),0_0_18px_rgba(229,193,88,0.3)]"
                        >
                          <div className="relative isolate flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-[radial-gradient(110%_110%_at_30%_18%,#2EB04B_0%,#087A42_56%,#044323_100%)]">
                            <span
                              aria-hidden="true"
                              className={`pointer-events-none absolute inset-0 rounded-full ${LIQUID_GLASS_BEVEL}`}
                            />
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute inset-x-2 top-1 h-[44%] rounded-full bg-gradient-to-b from-white/55 via-white/15 to-transparent"
                            />
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute inset-x-3 bottom-1 h-[22%] rounded-full bg-gradient-to-t from-[#8BE8AC]/45 to-transparent"
                            />
                            <Check
                              className="relative z-10 h-6 w-6 text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)]"
                              strokeWidth={2.75}
                              aria-hidden="true"
                            />
                          </div>
                        </m.div>

                        {/* Success Eyebrow & Editorial Heading */}
                        <m.div
                          initial={
                            prefersReducedMotion
                              ? false
                              : { opacity: 0, y: 8 }
                          }
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.32,
                            delay: prefersReducedMotion ? 0 : 0.12,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="flex flex-col items-center"
                        >
                          <span className="inline-flex items-center rounded-full border border-[#087A42]/18 bg-white/78 px-3.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#085A30] shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] backdrop-blur-md dark:border-[#2EB04B]/30 dark:bg-[#0D1E15]/85 dark:text-[#6EE7A8]">
                            MESSAGE DELIVERED
                          </span>

                          <h3 className="mt-3 font-serif text-[23px] font-bold leading-[1.18] tracking-[-0.015em] text-[#171717] dark:text-white sm:text-[27px]">
                            Message{' '}
                            <span className="italic text-[#087A42] dark:text-[#2EB04B]">
                              Successfully
                            </span>{' '}
                            Sent
                          </h3>

                          <p className="mt-2 max-w-[390px] text-[13px] leading-[1.6] text-[#454D47] dark:text-white/78 sm:text-[13.5px]">
                            Thank you for reaching out to Takhlees. Your enquiry
                            has been received successfully. Our UAE corporate
                            consultancy team will review your message and get back
                            to you shortly.
                          </p>
                        </m.div>

                        {/* Secondary Minimal Link Action */}
                        <m.div
                          initial={
                            prefersReducedMotion
                              ? false
                              : { opacity: 0, y: 6 }
                          }
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.28,
                            delay: prefersReducedMotion ? 0 : 0.2,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="mt-4"
                        >
                          <button
                            type="button"
                            onClick={handleResetSuccess}
                            className="group/reset inline-flex cursor-pointer items-center gap-1.5 border-b-[1.5px] border-[#C99726] pb-0.5 text-[13px] font-bold text-[#085A30] transition-colors hover:text-[#087A42] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087A42] focus-visible:ring-offset-4 dark:border-[#E5C158] dark:text-[#6EE7A8] dark:hover:text-white"
                          >
                            <span>Send another message</span>
                            <RotateCcw
                              className="h-3.5 w-3.5 text-[#1C2A21] transition-transform duration-300 group-hover/reset:-rotate-45 dark:text-[#E5C158]"
                              aria-hidden="true"
                            />
                          </button>
                        </m.div>
                      </m.div>
                    ) : (
                      <m.div
                        key="contact-form-panel"
                        initial={
                          prefersReducedMotion
                            ? false
                            : { opacity: 0, scale: 0.985 }
                        }
                        animate={{ opacity: 1, scale: 1 }}
                        exit={
                          prefersReducedMotion
                            ? undefined
                            : { opacity: 0, scale: 0.98 }
                        }
                        transition={{
                          duration: 0.24,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        {/* Heading Row */}
                        <div className="mb-4 flex items-center gap-3.5">
                          <div className="relative isolate flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white/75 dark:bg-[#112219]/80">
                            <div
                              aria-hidden="true"
                              className={`pointer-events-none absolute inset-0 z-0 rounded-xl ${LIQUID_GLASS_BEVEL}`}
                            />
                            <MessageSquare
                              className="relative z-10 h-[18px] w-[18px] text-[#087A42] dark:text-[#2EB04B]"
                              strokeWidth={1.8}
                              aria-hidden="true"
                            />
                          </div>
                          <h3 className="text-[20px] font-bold tracking-tight text-[#0B3B22] dark:text-white sm:text-[22px]">
                            We&apos;d love to hear from you
                          </h3>
                        </div>

                        <form
                          onSubmit={handleSubmit(onSubmit)}
                          noValidate
                          className="space-y-3.5"
                        >
                        {/* Row 1: Name & Email */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div>
                            <label
                              htmlFor="contact-name"
                              className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.12em] text-[#2A332D] dark:text-white/80"
                            >
                              Name
                            </label>
                            <div className="relative flex items-center">
                              <User
                                className="pointer-events-none absolute left-3.5 z-10 h-4 w-4 text-[#2F4738] dark:text-white/75"
                                aria-hidden="true"
                              />
                              <input
                                id="contact-name"
                                type="text"
                                autoComplete="name"
                                placeholder="Enter your name"
                                aria-invalid={Boolean(errors.name)}
                                aria-describedby={errors.name ? 'contact-name-error' : undefined}
                                {...register('name')}
                                className={`${LIQUID_INPUT_CLASS} h-10 pl-10 pr-4`}
                              />
                            </div>
                            {errors.name && (
                              <p
                                id="contact-name-error"
                                role="alert"
                                className="mt-1 text-[12px] font-medium text-[#C2242B] dark:text-[#F87171]"
                              >
                                {errors.name.message}
                              </p>
                            )}
                          </div>

                          <div>
                            <label
                              htmlFor="contact-email"
                              className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.12em] text-[#2A332D] dark:text-white/80"
                            >
                              Email
                            </label>
                            <div className="relative flex items-center">
                              <Mail
                                className="pointer-events-none absolute left-3.5 z-10 h-4 w-4 text-[#2F4738] dark:text-white/75"
                                aria-hidden="true"
                              />
                              <input
                                id="contact-email"
                                type="email"
                                autoComplete="email"
                                spellCheck={false}
                                placeholder="Enter your email"
                                aria-invalid={Boolean(errors.email)}
                                aria-describedby={errors.email ? 'contact-email-error' : undefined}
                                {...register('email')}
                                className={`${LIQUID_INPUT_CLASS} h-10 pl-10 pr-4`}
                              />
                            </div>
                            {errors.email && (
                              <p
                                id="contact-email-error"
                                role="alert"
                                className="mt-1 text-[12px] font-medium text-[#C2242B] dark:text-[#F87171]"
                              >
                                {errors.email.message}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Row 2: Phone Number & Country */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div>
                            <label
                              htmlFor="contact-phone"
                              className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.12em] text-[#2A332D] dark:text-white/80"
                            >
                              Phone Number
                            </label>
                            <div className="relative flex items-center">
                              <Phone
                                className="pointer-events-none absolute left-3.5 z-10 h-4 w-4 text-[#2F4738] dark:text-white/75"
                                aria-hidden="true"
                              />
                              <input
                                id="contact-phone"
                                type="tel"
                                autoComplete="tel"
                                placeholder="Enter phone number"
                                aria-invalid={Boolean(errors.phone)}
                                aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
                                {...register('phone')}
                                className={`${LIQUID_INPUT_CLASS} h-10 pl-10 pr-3 text-[13.5px]`}
                              />
                            </div>
                            {errors.phone && (
                              <p
                                id="contact-phone-error"
                                role="alert"
                                className="mt-1 text-[12px] font-medium text-[#C2242B] dark:text-[#F87171]"
                              >
                                {errors.phone.message}
                              </p>
                            )}
                          </div>

                          <div
                            ref={countryMenuRef}
                            className="relative"
                            onKeyDown={(e) => {
                              if (e.key === 'Escape') setCountryMenuOpen(false);
                            }}
                          >
                            <label
                              htmlFor="contact-country-trigger"
                              className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.12em] text-[#2A332D] dark:text-white/80"
                            >
                              Country
                            </label>
                            <button
                              id="contact-country-trigger"
                              type="button"
                              aria-haspopup="listbox"
                              aria-expanded={countryMenuOpen}
                              onClick={() =>
                                setCountryMenuOpen((prev) => !prev)
                              }
                              className={`${LIQUID_INPUT_CLASS} flex h-10 items-center justify-between px-3.5 text-left`}
                            >
                              <span className="flex items-center gap-2.5 truncate">
                                {activeCountryOption.icon}
                                <span className="truncate font-medium">
                                  {activeCountryOption.label}
                                </span>
                              </span>
                              <ChevronDown
                                className={`h-4 w-4 shrink-0 text-[#2F4738] transition-transform duration-200 dark:text-white/75 ${
                                  countryMenuOpen ? 'rotate-180' : ''
                                }`}
                                aria-hidden="true"
                              />
                            </button>

                            {countryMenuOpen && (
                              <ul
                                role="listbox"
                                aria-label="Select country"
                                className="absolute left-0 right-0 top-full z-40 mt-1.5 overflow-hidden rounded-2xl border border-black/10 bg-[#FAF8F3]/95 p-1 shadow-[0_14px_30px_rgba(6,42,23,0.16)] backdrop-blur-xl dark:border-white/15 dark:bg-[#0D1A13]/95 dark:shadow-[0_16px_34px_rgba(0,0,0,0.65)]"
                              >
                                {COUNTRY_OPTIONS.map((opt) => {
                                  const isSelected =
                                    opt.value === selectedCountry;
                                  return (
                                    <li key={opt.value} role="none">
                                      <button
                                        type="button"
                                        role="option"
                                        aria-selected={isSelected}
                                        onClick={() => {
                                          setValue('country', opt.value, {
                                            shouldValidate: true,
                                          });
                                          if (opt.value !== 'OTHER') {
                                            setValue('otherCountry', '', {
                                              shouldValidate: false,
                                            });
                                          }
                                          setCountryMenuOpen(false);
                                        }}
                                        className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-[13.5px] transition-colors ${
                                          isSelected
                                            ? 'bg-[#087A42]/12 font-semibold text-[#064E27] dark:bg-[#16A05A]/22 dark:text-white'
                                            : 'text-[#171717] hover:bg-black/5 dark:text-white/85 dark:hover:bg-white/10'
                                        }`}
                                      >
                                        <span className="flex items-center gap-2.5">
                                          {opt.icon}
                                          <span>{opt.label}</span>
                                        </span>
                                        {isSelected && (
                                          <Check
                                            className="h-3.5 w-3.5 text-[#087A42] dark:text-[#6EE7A8]"
                                            aria-hidden="true"
                                          />
                                        )}
                                      </button>
                                    </li>
                                  );
                                })}
                              </ul>
                            )}

                            {errors.country && (
                              <p
                                id="contact-country-error"
                                role="alert"
                                className="mt-1 text-[12px] font-medium text-[#C2242B] dark:text-[#F87171]"
                              >
                                {errors.country.message}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Conditional Other Country Input */}
                        {selectedCountry === 'OTHER' && (
                          <div>
                            <label
                              htmlFor="contact-other-country"
                              className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.12em] text-[#2A332D] dark:text-white/80"
                            >
                              Specify Country
                            </label>
                            <div className="relative flex items-center">
                              <Globe
                                className="pointer-events-none absolute left-3.5 z-10 h-4 w-4 text-[#2F4738] dark:text-white/75"
                                aria-hidden="true"
                              />
                              <input
                                id="contact-other-country"
                                type="text"
                                autoComplete="country-name"
                                placeholder="Enter your country"
                                aria-invalid={Boolean(errors.otherCountry)}
                                aria-describedby={errors.otherCountry ? 'contact-other-country-error' : undefined}
                                {...register('otherCountry')}
                                className={`${LIQUID_INPUT_CLASS} h-10 pl-10 pr-4`}
                              />
                            </div>
                            {errors.otherCountry && (
                              <p
                                id="contact-other-country-error"
                                role="alert"
                                className="mt-1 text-[12px] font-medium text-[#C2242B] dark:text-[#F87171]"
                              >
                                {errors.otherCountry.message}
                              </p>
                            )}
                          </div>
                        )}

                        {/* Row 3: Full-Width Message Field */}
                        <div>
                          <label
                            htmlFor="contact-message"
                            className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.12em] text-[#2A332D] dark:text-white/80"
                          >
                            Message
                          </label>
                          <div className="relative">
                            <MessageSquare
                              className="pointer-events-none absolute left-3.5 top-3.5 z-10 h-4 w-4 text-[#2F4738] dark:text-white/75"
                              aria-hidden="true"
                            />
                            <textarea
                              id="contact-message"
                              rows={3}
                              placeholder="Enter your message"
                              aria-invalid={Boolean(errors.message)}
                              aria-describedby={errors.message ? 'contact-message-error' : undefined}
                              {...register('message')}
                              className={`${LIQUID_INPUT_CLASS} resize-y py-2.5 pl-10 pr-4`}
                            />
                          </div>
                          {errors.message && (
                            <p
                              id="contact-message-error"
                              role="alert"
                              className="mt-1 text-[12px] font-medium text-[#C2242B] dark:text-[#F87171]"
                            >
                              {errors.message.message}
                            </p>
                          )}
                        </div>

                        {serverError && (
                          <p
                            role="alert"
                            className="text-[12.5px] font-medium text-[#C2242B] dark:text-[#F87171]"
                          >
                            {serverError}
                          </p>
                        )}

                        {/* Single Prominent Send Message Water-Glass Button */}
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="group relative isolate mt-1 inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full border border-[#D4AF37]/55 bg-[linear-gradient(180deg,#16A34A_0%,#00843D_50%,#064E27_100%)] px-8 text-[14.5px] font-semibold tracking-wide text-white shadow-[0_12px_28px_-6px_rgba(0,132,61,0.48)] transition-all duration-300 hover:scale-[1.012] hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16A05A] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60 dark:bg-[linear-gradient(180deg,#2EB04B_0%,#0E8A48_52%,#064523_100%)]"
                        >
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 z-0 rounded-full shadow-[inset_0_2px_3px_rgba(255,255,255,0.55),inset_0_-3px_6px_rgba(0,25,12,0.5),inset_3px_3px_0.5px_-3px_rgba(0,0,0,0.65),inset_-3px_-3px_0.5px_-3px_rgba(0,0,0,0.65),inset_0_0_8px_4px_rgba(255,255,255,0.14)]"
                          />
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-x-3 top-1 z-[1] h-[44%] rounded-full bg-gradient-to-b from-white/50 via-white/15 to-transparent"
                          />
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-x-8 bottom-1 z-[1] h-[24%] rounded-full bg-gradient-to-t from-[#8BE8AC]/45 to-transparent"
                          />

                          <span className="relative z-10 inline-flex items-center gap-2 drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]">
                            {isSubmitting ? (
                              <>
                                <Loader2
                                  className="h-4 w-4 animate-spin"
                                  aria-hidden="true"
                                />
                                <span>Sending...</span>
                              </>
                            ) : (
                              <>
                                <span>Send Message</span>
                                <ArrowRight
                                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                                  aria-hidden="true"
                                />
                              </>
                            )}
                          </span>
                        </button>
                        </form>
                      </m.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </m.div>
          </div>
        </div>
      </section>
  );
}

export default ContactSection;
