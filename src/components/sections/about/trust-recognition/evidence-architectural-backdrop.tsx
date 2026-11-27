'use client';

/* ===================================================================
 * Evidence Architectural Backdrop — UAE Exhibition Gallery Environment
 * ===================================================================
 * Layered luxury UAE architectural space:
 * 1. Honed ivory/champagne limestone wall texture
 * 2. Receding architectural arches & recessed wall paneling
 * 3. Right-side arched Arabic Mashrabiya lattice screen
 * 4. Directional golden-hour sunlight & diagonal floor reflections
 * =================================================================== */

import Image from 'next/image';

export function EvidenceArchitecturalBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden"
    >
      {/* Layer 1: Honed warm limestone wall base */}
      <Image
        src="/images/about/trust-recognition-bg.webp"
        alt=""
        fill
        loading="eager"
        unoptimized
        sizes="100vw"
        className="object-cover object-center opacity-80 dark:hidden"
      />

      {/* Layer 2: Warm directional sunlight from upper-right */}
      <div className="absolute inset-0 bg-[radial-gradient(64%_58%_at_88%_14%,rgba(255,248,225,0.78)_0%,rgba(248,238,214,0.32)_46%,transparent_78%)] dark:bg-[radial-gradient(58%_52%_at_86%_16%,rgba(201,164,92,0.09)_0%,transparent_72%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(48%_52%_at_12%_75%,rgba(235,228,210,0.45)_0%,transparent_70%)] dark:bg-none" />

      {/* Layer 3: Receding architectural arches, pilasters & travertine floor */}
      <svg
        viewBox="0 0 1440 820"
        preserveAspectRatio="none"
        fill="none"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id="atelier-sun-beam-1" x1="1" y1="0" x2="0.18" y2="0.88">
            <stop offset="0%" stopColor="#FFF8E2" stopOpacity="0.58" />
            <stop offset="52%" stopColor="#F5E8C8" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#F5E8C8" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="atelier-arch-depth" x1="0.5" y1="0" x2="0.5" y2="1">
            <stop offset="0%" stopColor="#E6DEC8" stopOpacity="0.34" />
            <stop offset="100%" stopColor="#EFE8D6" stopOpacity="0.06" />
          </linearGradient>
          <linearGradient id="atelier-floor-wash" x1="0.5" y1="0" x2="0.5" y2="1">
            <stop offset="0%" stopColor="#EAE2D0" stopOpacity="0" />
            <stop offset="40%" stopColor="#E5DBC4" stopOpacity="0.36" />
            <stop offset="100%" stopColor="#DBD0B6" stopOpacity="0.58" />
          </linearGradient>
        </defs>

        {/* Subtle recessed architectural gallery arch on left-center background */}
        <path
          d="M 40 620 L 40 240 C 40 120, 125 46, 225 46 C 325 46, 410 120, 410 240 L 410 620 Z"
          fill="url(#atelier-arch-depth)"
          className="dark:opacity-15"
        />
        <path
          d="M 40 620 L 40 240 C 40 120, 125 46, 225 46 C 325 46, 410 120, 410 240 L 410 620"
          stroke="#C9A45C"
          strokeOpacity="0.18"
          strokeWidth="1"
        />

        {/* Subtle recessed central exhibition niche */}
        <path
          d="M 470 620 L 470 210 C 470 85, 580 18, 720 18 C 860 18, 970 85, 970 210 L 970 620"
          stroke="#C9A45C"
          strokeOpacity="0.14"
          strokeWidth="1"
        />

        {/* Architectural limestone wall pilasters */}
        <line x1="120" y1="0" x2="120" y2="620" stroke="#C9A45C" strokeOpacity="0.12" strokeWidth="1" />
        <line x1="1030" y1="0" x2="1030" y2="620" stroke="#C9A45C" strokeOpacity="0.14" strokeWidth="1" />

        {/* Travertine gallery floor plane */}
        <rect x="0" y="618" width="1440" height="202" fill="url(#atelier-floor-wash)" className="dark:opacity-15" />
        <line x1="0" y1="618" x2="1440" y2="618" stroke="#C9A45C" strokeOpacity="0.24" strokeWidth="1" />

        {/* Diagonal architectural sunlight shafts */}
        <polygon
          points="1440,0 1160,0 520,660 900,660"
          fill="url(#atelier-sun-beam-1)"
          className="dark:opacity-15"
        />
        <polygon
          points="1440,120 1440,360 790,690 610,690"
          fill="url(#atelier-sun-beam-1)"
          opacity="0.72"
          className="dark:opacity-10"
        />
      </svg>

      {/* Layer 4: Right-side arched Arabic geometric Mashrabiya screen */}
      <svg
        viewBox="0 0 360 580"
        fill="none"
        className="absolute -right-8 top-0 h-[370px] w-[235px] opacity-70 sm:right-0 sm:h-[460px] sm:w-[300px] lg:h-[560px] lg:w-[360px] dark:opacity-30"
      >
        <defs>
          <clipPath id="mashrabiya-arch-clip-v3">
            <path d="M 36 580 L 36 215 C 36 96, 114 22, 212 22 C 310 22, 360 96, 360 215 L 360 580 Z" />
          </clipPath>
          <pattern
            id="mashrabiya-lattice-v3"
            width="44"
            height="44"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M22 0 L28 16 L44 22 L28 28 L22 44 L16 28 L0 22 L16 16 Z"
              stroke="#C9A45C"
              strokeOpacity="0.38"
              strokeWidth="0.95"
            />
            <rect
              x="7"
              y="7"
              width="30"
              height="30"
              stroke="#C9A45C"
              strokeOpacity="0.24"
              strokeWidth="0.75"
            />
            <circle
              cx="22"
              cy="22"
              r="5"
              stroke="#C9A45C"
              strokeOpacity="0.3"
              strokeWidth="0.75"
            />
          </pattern>
        </defs>

        <path
          d="M 36 580 L 36 215 C 36 96, 114 22, 212 22 C 310 22, 360 96, 360 215 L 360 580 Z"
          fill="#FFF8E7"
          fillOpacity="0.62"
          className="dark:fill-[#0B1D15]/40"
        />

        <rect
          x="0"
          y="0"
          width="360"
          height="580"
          fill="url(#mashrabiya-lattice-v3)"
          clipPath="url(#mashrabiya-arch-clip-v3)"
        />

        <path
          d="M 36 580 L 36 215 C 36 96, 114 22, 212 22 C 310 22, 360 96, 360 215"
          stroke="#C9A45C"
          strokeOpacity="0.48"
          strokeWidth="1.5"
        />
        <path
          d="M 24 580 L 24 210 C 24 84, 108 10, 212 10 C 316 10, 360 84, 360 210"
          stroke="#C9A45C"
          strokeOpacity="0.24"
          strokeWidth="1"
        />
      </svg>

      {/* Soft upper continuity veil */}
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#F5F1E6] via-[#F5F1E6]/45 to-transparent dark:from-[#060807] dark:via-[#060807]/55" />
    </div>
  );
}
