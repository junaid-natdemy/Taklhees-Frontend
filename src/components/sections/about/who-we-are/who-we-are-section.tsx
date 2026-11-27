import Image from 'next/image';

/*
 * Distinctive organic asymmetrical silhouette for Who We Are (different from AboutHero's arch).
 * Features a sweeping curved left edge, gentle upper crest, and flowing lower boundary.
 */
const WHO_DESKTOP_MASK_100 =
  'M 16,12 C 36,1 66,2 90,9 C 97,11 99,24 98,46 C 97,70 93,82 82,88 C 58,97 30,97 10,92 C 2,90 1,72 5,50 C 8,30 9,16 16,12 Z';

const WHO_MOBILE_MASK_100 =
  'M 6,16 C 28,2 68,2 93,10 C 99,12 99,32 98,58 C 97,80 92,90 78,94 C 50,99 22,97 7,90 C 1,87 1,68 2,48 C 3,30 3,20 6,16 Z';

function toNormalizedPath(path100: string): string {
  return path100.replace(/(\d+(?:\.\d+)?)/g, (m) =>
    (parseFloat(m) / 100).toFixed(4)
  );
}

const WHO_DESKTOP_CLIP = toNormalizedPath(WHO_DESKTOP_MASK_100);
const WHO_MOBILE_CLIP = toNormalizedPath(WHO_MOBILE_MASK_100);

export function WhoWeAreSection() {
  return (
    <section
      id="who-we-are"
      aria-labelledby="who-we-are-heading"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#F7F5EF_0%,#F7F5EF_42%,#F4F1E8_78%,#F1EEE5_100%)] pb-10 pt-6 transition-colors duration-300 dark:bg-[#050B08] dark:bg-none sm:pb-12 sm:pt-8 lg:pb-14 lg:pt-8"
    >
      {/* Hidden SVG ClipPaths */}
      <svg
        className="pointer-events-none absolute h-0 w-0 overflow-hidden"
        aria-hidden="true"
      >
        <defs>
          <clipPath id="who-we-are-desktop-mask" clipPathUnits="objectBoundingBox">
            <path d={WHO_DESKTOP_CLIP} />
          </clipPath>
          <clipPath id="who-we-are-mobile-mask" clipPathUnits="objectBoundingBox">
            <path d={WHO_MOBILE_CLIP} />
          </clipPath>
        </defs>
      </svg>

      {/* ================= CALM BACKGROUND CONTINUITY & FOOTER TRANSITION ================= */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden"
      >
        {/* Seamless Continuation of AboutHero's Right Emerald Wave (Zero Horizontal Seam) */}
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          fill="none"
          className="hidden h-[76px] w-full lg:block"
        >
          <defs>
            <linearGradient id="who-top-emerald-bridge" x1="15%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#063D29" stopOpacity="0.98" />
              <stop offset="55%" stopColor="#075C3D" stopOpacity="0.98" />
              <stop offset="100%" stopColor="#033120" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="who-top-emerald-bridge-dark" x1="15%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#095236" stopOpacity="0.98" />
              <stop offset="55%" stopColor="#0B6B45" stopOpacity="0.98" />
              <stop offset="100%" stopColor="#063B26" stopOpacity="1" />
            </linearGradient>
          </defs>
          <path
            d="M 1065 0 L 1440 0 L 1440 96 C 1335 46, 1210 14, 1065 0 Z"
            fill="url(#who-top-emerald-bridge)"
            className="dark:hidden"
          />
          <path
            d="M 1065 0 L 1440 0 L 1440 96 C 1335 46, 1210 14, 1065 0 Z"
            fill="url(#who-top-emerald-bridge-dark)"
            className="hidden dark:block"
          />
        </svg>

        {/* Subtle Champagne-Gold & Sage Ambient Softness */}
        <div className="absolute left-[4%] top-[18%] h-[320px] w-[440px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(221,229,216,0.32),transparent_72%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(7,92,61,0.12),transparent_72%)]" />
      </div>

      {/* ================= TWO-COLUMN EDITORIAL COMPOSITION (40% / 60%) ================= */}
      <div className="relative z-10 mx-auto max-w-[1440px] px-5 sm:px-8 lg:pl-[7%] lg:pr-[5%]">
        <div className="grid grid-cols-1 items-center gap-8 md:gap-10 lg:grid-cols-12 lg:gap-12">
          {/* ---------- LEFT COLUMN (~40%): COMPANY INTRODUCTION ---------- */}
          <div className="max-w-[480px] lg:col-span-5">
            {/* Eyebrow Label with Short Emerald Horizontal Line */}
            <div className="mb-3.5 flex items-center gap-3.5">
              <span
                aria-hidden="true"
                className="h-[1.5px] w-7 rounded-full bg-[#075C3D] dark:bg-[#2EB04B]"
              />
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#454846] dark:text-[#929D95]">
                WHO WE ARE
              </span>
            </div>

            {/* Editorial Serif Headline */}
            <h2
              id="who-we-are-heading"
              className="font-serif text-[30px] font-semibold leading-[1.12] tracking-[-0.015em] text-[#1C1C1C] dark:text-[#F4F0E8] sm:text-[36px] lg:text-[42px]"
            >
              More Than Services.
              <br />
              A Partner in Your
              <br />
              <span className="relative inline-block italic font-semibold text-[#075C3D] dark:text-[#2EB04B]">
                Business Journey.
                {/* Subtle Champagne-Gold Curved Underline */}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 210 12"
                  fill="none"
                  className="pointer-events-none absolute -bottom-1.5 left-0 h-2.5 w-[78%]"
                >
                  <path
                    d="M3 9.5 C 58 3, 148 2, 207 7"
                    stroke="#C9A45C"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h2>

            {/* Single Concise Supporting Paragraph */}
            <p className="mt-5 max-w-[445px] text-[14.5px] leading-[1.68] text-[#4A4E4B] dark:text-[#C1C8C1] sm:text-[15.5px]">
              Takhlees Transactions is a UAE-based business services company
              that helps entrepreneurs, investors and growing businesses
              establish, manage and operate in the UAE with confidence.
            </p>
          </div>

          {/* ---------- RIGHT COLUMN (~60%): BUSINESS CONSULTATION PHOTOGRAPHY ---------- */}
          <div className="lg:col-span-7">
            {/* Desktop & Tablet Organic Silhouette */}
            <div className="relative hidden aspect-[16/10] w-full md:block">
              {/* Restrained Deep Emerald Organic Wave Following Lower Image Boundary */}
              <svg
                aria-hidden="true"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="pointer-events-none absolute inset-0 z-0 h-full w-full"
              >
                <defs>
                  <linearGradient id="who-emerald-wave" x1="15%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#075C3D" stopOpacity="0.92" />
                    <stop offset="100%" stopColor="#043D28" stopOpacity="0.98" />
                  </linearGradient>
                  <linearGradient id="who-emerald-wave-dark" x1="15%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0B6B45" stopOpacity="0.96" />
                    <stop offset="100%" stopColor="#063D27" stopOpacity="1" />
                  </linearGradient>
                </defs>
                <path
                  d="M 28,96 C 52,95 72,90 92,78 C 96,75 98,79 95,85 C 88,94 64,98 28,96 Z"
                  fill="url(#who-emerald-wave)"
                  className="dark:hidden"
                />
                <path
                  d="M 28,96 C 52,95 72,90 92,78 C 96,75 98,79 95,85 C 88,94 64,98 28,96 Z"
                  fill="url(#who-emerald-wave-dark)"
                  className="hidden dark:block"
                />
                {/* Subtle Champagne-Gold Hairline Along Lower-Right Wave */}
                <path
                  d="M 50,95 C 68,92 82,86 92,78"
                  fill="none"
                  stroke="#C9A45C"
                  strokeOpacity="0.55"
                  strokeWidth="1.1"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

              {/* Main Office Consultation Photograph Clipped to Organic Silhouette */}
              <div
                className="relative z-[1] h-full w-full overflow-hidden"
                style={{
                  clipPath: 'url(#who-we-are-desktop-mask)',
                  WebkitClipPath: 'url(#who-we-are-desktop-mask)',
                }}
              >
                <Image
                  src="/images/consultation/uae-consultation.webp"
                  alt="UAE corporate business consultation meeting in a bright modern office"
                  fill
                  sizes="(min-width: 1024px) 56vw, 92vw"
                  loading="lazy"
                  className="object-cover object-center"
                />
              </div>
            </div>

            {/* Mobile Simplified Organic Mask (< md) */}
            <div className="relative aspect-[4/3] w-full md:hidden">
              <svg
                aria-hidden="true"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="pointer-events-none absolute inset-0 z-0 h-full w-full"
              >
                <path
                  d="M 28,96 C 52,95 72,90 92,78 C 96,75 98,79 95,85 C 88,94 64,98 28,96 Z"
                  fill="#075C3D"
                />
                <path
                  d="M 50,95 C 68,92 82,86 92,78"
                  fill="none"
                  stroke="#C9A45C"
                  strokeOpacity="0.55"
                  strokeWidth="1.1"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
              <div
                className="relative z-[1] h-full w-full overflow-hidden"
                style={{
                  clipPath: 'url(#who-we-are-mobile-mask)',
                  WebkitClipPath: 'url(#who-we-are-mobile-mask)',
                }}
              >
                <Image
                  src="/images/consultation/uae-consultation.webp"
                  alt="UAE corporate business consultation meeting in a bright modern office"
                  fill
                  sizes="96vw"
                  loading="lazy"
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhoWeAreSection;
