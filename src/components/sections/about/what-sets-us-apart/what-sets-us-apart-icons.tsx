import type { PillarIconKey } from './what-sets-us-apart-data';

interface PillarIconProps {
  icon: PillarIconKey;
  className?: string;
}

/**
 * Custom fine-line champagne-gold architectural icons matching the reference visual weight.
 */
export function WhatSetsUsApartIcon({ icon, className }: PillarIconProps) {
  switch (icon) {
    case 'uae-skyline':
      return (
        <svg
          viewBox="0 0 44 44"
          fill="none"
          aria-hidden="true"
          className={className}
        >
          {/* Central Burj Khalifa Spire */}
          <path
            d="M22 4V11M20.5 11H23.5V17H19V23H17.5V37H26.5V23H25V17H23.5"
            stroke="#C9A45C"
            strokeWidth="1.45"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Left Commercial Towers */}
          <path
            d="M7 37V27H11.5V37M11.5 22H15.5V37"
            stroke="#C9A45C"
            strokeWidth="1.45"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Right Commercial Towers */}
          <path
            d="M28.5 37V20L32.5 17.5V37M32.5 26H37V37"
            stroke="#C9A45C"
            strokeWidth="1.45"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Horizon Baseline */}
          <path
            d="M4.5 37H39.5"
            stroke="#C9A45C"
            strokeWidth="1.45"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'comprehensive-support':
      return (
        <svg
          viewBox="0 0 44 44"
          fill="none"
          aria-hidden="true"
          className={className}
        >
          <path
            d="M22 8L35 15L22 22L9 15L22 8Z"
            stroke="#C9A45C"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 22L22 29L35 22"
            stroke="#C9A45C"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 28.5L22 35.5L35 28.5"
            stroke="#C9A45C"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'client-focused':
      return (
        <svg
          viewBox="0 0 44 44"
          fill="none"
          aria-hidden="true"
          className={className}
        >
          {/* Foreground Client Profile (Champagne Gold) */}
          <circle
            cx="17.5"
            cy="15.5"
            r="4.5"
            stroke="#C9A45C"
            strokeWidth="1.5"
          />
          <path
            d="M9.5 32.5C9.5 27.8 13.1 24.2 17.5 24.2C21.9 24.2 25.5 27.8 25.5 32.5"
            stroke="#C9A45C"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Secondary Advisor Profile (Deep Emerald Accent) */}
          <circle
            cx="28.5"
            cy="17"
            r="3.8"
            className="stroke-[#063D29] dark:stroke-[#2EB04B]"
            strokeWidth="1.45"
          />
          <path
            d="M27.5 24.5C31.3 24.8 34.5 28 34.5 32.2"
            className="stroke-[#063D29] dark:stroke-[#2EB04B]"
            strokeWidth="1.45"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'long-term':
      return (
        <svg
          viewBox="0 0 44 44"
          fill="none"
          aria-hidden="true"
          className={className}
        >
          {/* Partnership Handshake */}
          <path
            d="M6.5 19.5L13 13.5L19.5 17.5L25 13.5L31 19L37.5 14"
            stroke="#C9A45C"
            strokeWidth="1.45"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6.5 19.5L11.5 26.5L16.5 30.5C17.8 31.5 19.6 31.4 20.8 30.2L22 29L24.5 31C25.6 31.8 27.2 31.6 28.1 30.5L33.5 24.5L37.5 20.5"
            stroke="#C9A45C"
            strokeWidth="1.45"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17.5 24.5L20 27M21.5 22L24.5 25M25.5 19.5L28.5 22.5"
            stroke="#C9A45C"
            strokeWidth="1.35"
            strokeLinecap="round"
          />
        </svg>
      );
  }
}
