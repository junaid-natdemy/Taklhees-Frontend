import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Headphones,
  HelpCircle,
  ShieldCheck,
  Users,
  Zap,
} from 'lucide-react';
import { ThemeImage } from '@/components/ui/theme-image';
import { FaqInteractivePanel } from './faq-interactive-panel';

const CONSULTANT_BENEFITS = [
  { icon: Zap, label: 'Quick\nResponse' },
  { icon: ShieldCheck, label: '100%\nCompliant' },
  { icon: Users, label: 'Expert\nSupport' },
] as const;

export function FaqSection() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#ECE4D3_0%,#F6F2E8_14%,#F7F5EE_86%,#ECE4D3_100%)] py-8 transition-colors duration-300 dark:bg-[linear-gradient(180deg,#050907_0%,#07110C_50%,#050807_100%)] sm:py-10 lg:py-11"
    >
      {/* ================= LAYERED ATMOSPHERIC BACKGROUND (WAVES + DUBAI SKYLINE) ================= */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 select-none overflow-hidden"
      >
        {/* Seamless Top Dissolve from BlogShowcaseSection (#ECE4D3 / #050907) */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-12 bg-gradient-to-b from-[#ECE4D3] via-[#ECE4D3]/55 to-transparent dark:from-[#050907] dark:via-[#050907]/55" />

        {/* Multi-Layer Organic Top Waves (Sage, Medium Emerald, Deep Emerald, Champagne Gold) */}
        <svg
          viewBox="0 0 1440 200"
          preserveAspectRatio="none"
          fill="none"
          className="absolute inset-x-0 top-0 z-0 h-[125px] w-full opacity-95 sm:h-[155px]"
          style={{
            maskImage:
              'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.45) 18%, #000 46%, rgba(0,0,0,0.32) 82%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.45) 18%, #000 46%, rgba(0,0,0,0.32) 82%, transparent 100%)',
          }}
        >
          <defs>
            <linearGradient id="faq-top-sage" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#087A42" stopOpacity="0.14" />
              <stop offset="48%" stopColor="#16A05A" stopOpacity="0.09" />
              <stop offset="100%" stopColor="#087A42" stopOpacity="0.18" />
            </linearGradient>
            <linearGradient id="faq-top-mid-emerald" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#086E3B" stopOpacity="0.06" />
              <stop offset="55%" stopColor="#0A7A42" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#064E2B" stopOpacity="0.46" />
            </linearGradient>
            <linearGradient id="faq-top-deep-emerald" x1="15%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#043A1F" stopOpacity="0.05" />
              <stop offset="58%" stopColor="#086E3B" stopOpacity="0.34" />
              <stop offset="100%" stopColor="#032E18" stopOpacity="0.72" />
            </linearGradient>
            <linearGradient id="faq-top-gold" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#C99726" stopOpacity="0.18" />
              <stop offset="46%" stopColor="#F5DDA0" stopOpacity="0.88" />
              <stop offset="86%" stopColor="#E5C158" stopOpacity="0.54" />
              <stop offset="100%" stopColor="#C99726" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          {/* Sage base contour */}
          <path
            d="M0 0 L1440 0 L1440 112 C 1180 148, 890 66, 590 108 C 310 148, 140 82, 0 68 Z"
            fill="url(#faq-top-sage)"
          />
          {/* Medium emerald asymmetric wave */}
          <path
            d="M0 0 L1440 0 L1440 78 C 1160 118, 860 36, 540 74 C 280 106, 120 52, 0 42 Z"
            fill="url(#faq-top-mid-emerald)"
          />
          {/* Deep emerald top-right crest */}
          <path
            d="M360 0 L1440 0 L1440 52 C 1220 92, 970 22, 680 54 C 520 72, 420 28, 360 0 Z"
            fill="url(#faq-top-deep-emerald)"
          />
          {/* Delicate gold edge highlights */}
          <path
            d="M0 42 C 120 52, 280 106, 540 74 C 860 36, 1160 118, 1440 78"
            stroke="url(#faq-top-gold)"
            strokeWidth="1.4"
          />
          <path
            d="M360 0 C 420 28, 520 72, 680 54 C 970 22, 1220 92, 1440 52"
            stroke="#F5DDA0"
            strokeOpacity="0.5"
            strokeWidth="1"
          />
        </svg>

        {/* Atmospheric Panoramic Dubai Skyline Integrated Across Background */}
        <div
          className="absolute inset-x-0 bottom-6 z-0 h-[320px] opacity-80 dark:opacity-75 sm:h-[390px] lg:h-[440px]"
          style={{
            maskImage:
              'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.45) 18%, #000 42%, #000 84%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.45) 18%, #000 42%, #000 84%, transparent 100%)',
          }}
        >
          <ThemeImage
            lightSrc="/images/faq/dubai-skyline-faq-light.webp"
            darkSrc="/images/faq/dubai-skyline-faq-dark.webp"
            alt=""
            width={1920}
            height={720}
            loading="lazy"
            className="h-full w-full object-cover object-center contrast-[1.08]"
          />
        </div>

        {/* Soft Ivory, Champagne & Sage Ambient Blending */}
        <div className="absolute -left-24 top-[22%] h-[360px] w-[480px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(8,122,66,0.09),rgba(229,193,88,0.07)_52%,transparent_76%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(22,160,90,0.14),transparent_76%)]" />
        <div className="absolute right-[4%] top-[16%] h-[420px] w-[520px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(229,193,88,0.13),rgba(8,122,66,0.08)_54%,transparent_78%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(22,160,90,0.16),transparent_78%)]" />

        {/* Multi-Layer Organic Bottom Waves Bridging into ContactSection */}
        <svg
          viewBox="0 0 1440 210"
          preserveAspectRatio="none"
          fill="none"
          className="absolute inset-x-0 bottom-0 z-0 h-[135px] w-full sm:h-[165px]"
          style={{
            maskImage:
              'linear-gradient(to top, transparent 0%, rgba(0,0,0,0.62) 22%, #000 56%, rgba(0,0,0,0.34) 86%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to top, transparent 0%, rgba(0,0,0,0.62) 22%, #000 56%, rgba(0,0,0,0.34) 86%, transparent 100%)',
          }}
        >
          <defs>
            <linearGradient id="faq-bot-sage" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#087A42" stopOpacity="0.16" />
              <stop offset="50%" stopColor="#16A05A" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#087A42" stopOpacity="0.18" />
            </linearGradient>
            <linearGradient id="faq-bot-mid" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#086E3B" stopOpacity="0.42" />
              <stop offset="52%" stopColor="#0A7A42" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#064E2B" stopOpacity="0.46" />
            </linearGradient>
            <linearGradient id="faq-bot-deep" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#043A1F" stopOpacity="0.78" />
              <stop offset="46%" stopColor="#086E3B" stopOpacity="0.52" />
              <stop offset="100%" stopColor="#032E18" stopOpacity="0.68" />
            </linearGradient>
            <linearGradient id="faq-bot-gold" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#C99726" stopOpacity="0.28" />
              <stop offset="48%" stopColor="#F5DDA0" stopOpacity="0.88" />
              <stop offset="100%" stopColor="#C99726" stopOpacity="0.32" />
            </linearGradient>
          </defs>
          {/* Sage upper horizon wave */}
          <path
            d="M0 96 C 280 44, 580 132, 920 82 C 1170 46, 1330 92, 1440 66 L1440 210 L0 210 Z"
            fill="url(#faq-bot-sage)"
          />
          {/* Medium emerald flowing layer */}
          <path
            d="M0 116 C 240 68, 520 148, 860 100 C 1140 62, 1320 108, 1440 84 L1440 210 L0 210 Z"
            fill="url(#faq-bot-mid)"
          />
          {/* Deep emerald foreground wave */}
          <path
            d="M0 132 C 260 92, 540 164, 900 116 C 1160 82, 1335 124, 1440 102 L1440 210 L0 210 Z"
            fill="url(#faq-bot-deep)"
          />
          {/* Gold accent curves */}
          <path
            d="M0 96 C 280 44, 580 132, 920 82 C 1170 46, 1330 92, 1440 66"
            stroke="url(#faq-bot-gold)"
            strokeWidth="1.4"
          />
          <path
            d="M0 132 C 260 92, 540 164, 900 116 C 1160 82, 1335 124, 1440 102"
            stroke="#F5DDA0"
            strokeOpacity="0.45"
            strokeWidth="1"
          />
        </svg>

        {/* Seamless Bottom Dissolve into ContactSection (#ECE4D3 / #050807) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 bg-gradient-to-b from-transparent via-[#ECE4D3]/65 to-[#ECE4D3] dark:via-[#050807]/65 dark:to-[#050807]" />
      </div>

      {/* ================= MAIN TWO-COLUMN EDITORIAL COMPOSITION ================= */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-8">
          {/* ---------- LEFT COLUMN: EDITORIAL INTRO + ASYMMETRICAL SKYLINE + GLASS CONSULTATION CARD ---------- */}
          <div className="flex flex-col lg:col-span-5">
            {/* Eyebrow */}
            <div className="mb-2.5 flex items-center gap-2">
              <span
                aria-hidden="true"
                className="flex h-5 w-5 items-center justify-center rounded-full bg-[#E5C158]/25 text-[#A87914] ring-1 ring-[#C99726]/35 dark:bg-[#E5C158]/20 dark:text-[#F5DDA0]"
              >
                <HelpCircle className="h-3 w-3" strokeWidth={2.2} />
              </span>
              <span className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-[#3B403D] dark:text-white/85">
                FREQUENTLY ASKED QUESTIONS
              </span>
              <span
                aria-hidden="true"
                className="h-[1.5px] w-6 rounded-full bg-[#C99726]/65 dark:bg-[#E5C158]/65"
              />
            </div>

            {/* Serif H2 */}
            <h2
              id="faq-heading"
              className="font-serif text-[24px] font-semibold leading-[1.14] tracking-[-0.015em] text-[#171717] dark:text-[#F5F5F2] sm:text-[28px] lg:text-[30px]"
            >
              Everything You Need to Know About Doing Business in the{' '}
              <span className="relative inline-block italic font-bold">
                <span className="text-[#C2242B] dark:text-[#E4002B]">U</span>
                <span className="text-[#171717] dark:text-[#F5F5F2]">A</span>
                <span className="text-[#00843D] dark:text-[#16A05A]">E.</span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 110 12"
                  fill="none"
                  className="pointer-events-none absolute -bottom-1 left-0 h-2 w-full"
                >
                  <path
                    d="M2 9.5 C 32 3, 76 2.5, 108 7"
                    stroke="#C99726"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h2>

            {/* Supporting Description */}
            <p className="mt-2.5 max-w-[420px] text-[13px] leading-[1.55] text-[#454846] dark:text-white/75 sm:text-[13.5px]">
              Find answers to common questions about UAE company formation, trade
              licensing, PRO services, visas and government documentation.
            </p>

            {/* Architectural Dubai Skyline + Asymmetric Glass Consultation Card */}
            <div className="relative mt-4 sm:mt-5">
              {/* Sculpted Asymmetrical Skyline Image */}
              <div className="relative w-[78%] max-w-[245px] sm:w-[240px]">
                <div
                  className="relative aspect-[4/3.6] w-full overflow-hidden border border-[#C99726]/45 shadow-[0_16px_36px_-14px_rgba(4,48,25,0.22)] dark:border-[#E5C158]/35 dark:shadow-[0_18px_40px_-14px_rgba(0,0,0,0.7)]"
                  style={{
                    borderRadius: '130px 105px 22px 22px / 130px 105px 22px 22px',
                  }}
                >
                  <Image
                    src="/images/contact/dubai-skyline-contact-bg.webp"
                    alt="Architectural Dubai skyline with Burj Khalifa representing Takhlees UAE business setup and corporate advisory"
                    width={560}
                    height={504}
                    sizes="(max-width: 640px) 220px, 240px"
                    loading="lazy"
                    className="h-full w-full object-cover object-center"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_58%,rgba(4,34,18,0.34)_100%)]"
                  />
                </div>
              </div>

              {/* Sculpted Frosted-Glass Consultation Card */}
              <div className="relative z-10 -mt-12 ml-auto w-[86%] max-w-[245px] rounded-[24px_16px_26px_18px/20px_24px_18px_22px] border border-[#C99726]/32 bg-[linear-gradient(150deg,rgba(255,254,250,0.84)_0%,rgba(247,243,233,0.76)_58%,rgba(232,243,236,0.72)_100%)] p-3.5 text-center shadow-[0_16px_36px_-14px_rgba(12,38,24,0.18)] ring-1 ring-inset ring-white/80 backdrop-blur-xl dark:border-[#16A05A]/30 dark:bg-[linear-gradient(150deg,rgba(14,28,20,0.88)_0%,rgba(9,19,14,0.82)_100%)] dark:ring-white/10 dark:shadow-[0_18px_42px_-14px_rgba(0,0,0,0.72)] sm:-mt-36 sm:mr-0 sm:w-[228px]">
                <div className="mx-auto inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#087A42]/18 bg-[#EDF5EF]/90 text-[#065E32] dark:border-[#16A05A]/30 dark:bg-[#0F2418] dark:text-[#2EB04B]">
                  <Headphones className="h-4 w-4" strokeWidth={1.9} aria-hidden="true" />
                </div>

                <h3 className="mt-1.5 font-serif text-[16px] font-semibold leading-snug text-[#171717] dark:text-white">
                  Still Have a Question?
                </h3>

                <p className="mt-1 text-[11.5px] leading-[1.48] text-[#4A504D] dark:text-[#D5E0D9]">
                  Get expert guidance from our Takhlees consultants and make your
                  UAE business journey simple and hassle-free.
                </p>

                <div className="mt-2.5">
                  <Link
                    href="/ae/contact"
                    className="group/btn inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-[#065E32] px-3.5 py-1.5 text-[12px] font-semibold text-white shadow-[0_6px_16px_-4px_rgba(6,94,50,0.45)] transition-all duration-200 hover:bg-[#054A27] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087A42] dark:bg-[#16A05A] dark:text-[#041A0E] dark:hover:bg-[#2EB04B]"
                  >
                    <span>Talk to a Consultant</span>
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                </div>

                <div className="mt-2.5 grid grid-cols-3 divide-x divide-[#087A42]/12 border-t border-[#087A42]/12 pt-2 dark:divide-white/10 dark:border-white/10">
                  {CONSULTANT_BENEFITS.map(({ icon: Icon, label }) => (
                    <div
                      key={label}
                      className="flex flex-col items-center gap-0.5 px-1"
                    >
                      <Icon
                        className="h-3 w-3 text-[#065E32] dark:text-[#E5C158]"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                      <span className="whitespace-pre-line text-[10px] font-medium leading-tight text-[#3B403D] dark:text-[#D7E2DB]">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ---------- RIGHT COLUMN: SCULPTED TRANSLUCENT GLASS FAQ PANEL ---------- */}
          <div className="lg:col-span-7">
            <FaqInteractivePanel />
          </div>
        </div>
      </div>
    </section>
  );
}

export default FaqSection;
