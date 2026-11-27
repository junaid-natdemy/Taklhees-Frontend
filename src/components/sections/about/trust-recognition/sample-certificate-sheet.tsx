'use client';

/* ===================================================================
 * Sample Certificate Sheet — Physical Paper Certificate Inside Glass
 * ===================================================================
 * Renders a realistic, high-craft UAE business-services sample
 * certificate in crisp HTML/SVG for clear legibility inside the
 * 3D liquid-glass display and enlarged document viewer modal.
 * Clearly marked SAMPLE / DEMONSTRATION — no invented credentials.
 * =================================================================== */

import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { EvidenceDocument } from './trust-recognition-data';

interface SampleCertificateSheetProps {
  doc: EvidenceDocument;
  variant?: 'foreground' | 'secondary' | 'modal';
  className?: string;
}

/* Delicate Arabic geometric corner ornament */
function CornerFiligree({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={cn('pointer-events-none select-none', className)}
      aria-hidden="true"
    >
      <path
        d="M2 2 H44 M2 2 V44 M8 2 C8 14 14 20 26 20 M2 8 C14 8 20 14 20 26 M14 2 L2 14 M24 2 L2 24 M34 2 L2 34"
        stroke="#C9A45C"
        strokeWidth="0.9"
        strokeOpacity="0.65"
      />
      <circle cx="10" cy="10" r="2" stroke="#C9A45C" strokeWidth="0.7" strokeOpacity="0.6" />
    </svg>
  );
}

/* Embossed gold foil laurel seal */
function EmbossedGoldSeal({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className={cn('pointer-events-none select-none', className)}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="cert-seal-gold" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FFF0BA" />
          <stop offset="48%" stopColor="#D7B15B" />
          <stop offset="100%" stopColor="#9A7225" />
        </radialGradient>
      </defs>
      {/* Serrated outer foil rim */}
      <circle cx="32" cy="32" r="28" fill="url(#cert-seal-gold)" />
      <circle
        cx="32"
        cy="32"
        r="24"
        stroke="#FFF7D6"
        strokeOpacity="0.75"
        strokeWidth="0.9"
        strokeDasharray="2 1.5"
      />
      <circle cx="32" cy="32" r="19" stroke="#7E5B18" strokeOpacity="0.55" strokeWidth="0.9" />
      {/* Subtle laurel arcs */}
      <path
        d="M20 39 C16 33 17 24 23 19 M44 39 C48 33 47 24 41 19"
        stroke="#6B4B10"
        strokeOpacity="0.75"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {/* Inner emblem */}
      <path
        d="M27 36 L32 23 L37 36 L32 33 Z"
        fill="#6B4B10"
        fillOpacity="0.78"
      />
    </svg>
  );
}

export function SampleCertificateSheet({
  doc,
  variant = 'foreground',
  className,
}: SampleCertificateSheetProps) {
  const isSecondary = variant === 'secondary';
  const isModal = variant === 'modal';

  return (
    <div
      className={cn(
        'relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[6px] bg-[linear-gradient(155deg,#FCF9F0_0%,#F6F0E1_55%,#F2EAD6_100%)] text-[#222321] shadow-[0_6px_18px_rgba(30,24,14,0.14),inset_0_0_0_1px_rgba(201,164,92,0.45)]',
        isModal ? 'p-6 sm:p-7' : isSecondary ? 'p-3.5 sm:p-4' : 'p-4 sm:p-5',
        className
      )}
    >
      {/* Subtle paper grain / warm light wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_70%_at_18%_12%,rgba(255,255,255,0.72)_0%,transparent_68%)]"
      />

      {/* Top-left emerald & gold corner ribbon */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-7 top-3 h-3 w-28 -rotate-45 bg-[linear-gradient(90deg,#043322_0%,#0B5E3D_52%,#C9A45C_100%)] opacity-90 shadow-sm"
      />
      {/* Bottom-right emerald & gold corner ribbon */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-7 bottom-3 h-3 w-28 -rotate-45 bg-[linear-gradient(90deg,#C9A45C_0%,#0B5E3D_48%,#043322_100%)] opacity-90 shadow-sm"
      />

      {/* Inner double champagne-gold frame */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[8px] rounded-[3px] border border-[#C9A45C]/60"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[12px] rounded-[2px] border border-[#C9A45C]/30"
      />

      {/* Corner geometric ornaments */}
      <CornerFiligree className="absolute right-[13px] top-[13px] h-9 w-9 -scale-x-100" />
      <CornerFiligree className="absolute bottom-[13px] left-[13px] h-9 w-9 -scale-y-100" />

      {/* Header: Brand emblem & label */}
      <div className="relative z-10 flex flex-col items-center pt-1.5 text-center">
        <div className="flex items-center gap-1.5">
          <Image
            src="/icons/takhlees-emblem.png"
            alt=""
            width={22}
            height={22}
            loading="eager"
            unoptimized
            className={cn('object-contain', isSecondary ? 'h-4 w-4' : 'h-5 w-5')}
          />
        </div>
        <p
          className={cn(
            'mt-1 font-serif font-semibold tracking-[0.2em] text-[#222321]',
            isModal ? 'text-[11px]' : 'text-[8.5px] sm:text-[9.5px]'
          )}
        >
          TAKHLEES
        </p>
        <p
          className={cn(
            'uppercase tracking-[0.24em] text-[#7D715B]',
            isModal ? 'text-[7.5px]' : 'text-[6px] sm:text-[6.5px]'
          )}
        >
          Business Services
        </p>
      </div>

      {/* Center: Certificate Title + Sample Badge + Statement */}
      <div className="relative z-10 my-auto flex flex-col items-center px-2 text-center">
        {isSecondary ? (
          <>
            <p className="font-serif text-[11px] font-semibold uppercase tracking-[0.06em] text-[#222321]/85 sm:text-[12.5px]">
              {doc.categoryLabel}
            </p>
            <span className="mt-1.5 inline-block rounded-full border border-[#C9A45C]/50 bg-[#EFE6CE] px-2.5 py-0.5 text-[7px] font-semibold uppercase tracking-[0.16em] text-[#6B5733]">
              Sample
            </span>
            <div className="mt-3 w-4/5 space-y-1.5">
              <div className="h-[2px] w-full rounded bg-[#8C7E65]/25" />
              <div className="mx-auto h-[2px] w-4/5 rounded bg-[#8C7E65]/20" />
              <div className="mx-auto h-[2px] w-3/5 rounded bg-[#8C7E65]/15" />
            </div>
          </>
        ) : (
          <>
            <h4
              className={cn(
                'font-serif font-semibold leading-[1.12] tracking-[-0.01em] text-[#1D1E1C]',
                isModal
                  ? 'text-[22px] sm:text-[25px]'
                  : 'text-[16px] sm:text-[18px] lg:text-[20px]'
              )}
            >
              {doc.title}
            </h4>

            {/* Champagne-gold sample badge */}
            <div
              className={cn(
                'mt-2 inline-flex items-center rounded-sm bg-[linear-gradient(90deg,#DFC484_0%,#EFE0B5_50%,#D9BC77_100%)] px-3 py-0.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_1px_2px_rgba(120,90,30,0.18)]',
                isModal ? 'text-[8.5px]' : 'text-[6.5px] sm:text-[7.5px]'
              )}
            >
              <span className="font-semibold uppercase tracking-[0.2em] text-[#4E3C1A]">
                {doc.sampleLabel}
              </span>
            </div>

            <p
              className={cn(
                'mt-2.5 max-w-[92%] leading-[1.45] text-[#4A463D]',
                isModal ? 'text-[11.5px]' : 'text-[8.5px] sm:text-[9.5px]'
              )}
            >
              {doc.sampleStatement}
            </p>
          </>
        )}
      </div>

      {/* Footer: Signature, Seal, Reference & Issue Date */}
      <div className="relative z-10 pb-1">
        <div className="flex items-end justify-between gap-2 px-2">
          {/* Signatory */}
          <div className="flex flex-col items-start">
            <svg
              viewBox="0 0 80 26"
              fill="none"
              className={cn(isModal ? 'h-6 w-16' : 'h-4 w-12 sm:h-5 sm:w-14')}
              aria-hidden="true"
            >
              <path
                d="M4 19 C 12 8, 17 22, 26 12 C 33 5, 36 18, 45 13 C 53 9, 60 15, 74 11"
                stroke="#2C2A25"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            </svg>
            <div className="h-px w-16 bg-[#7B715E]/55 sm:w-20" />
            <span
              className={cn(
                'mt-0.5 text-[#5D5649]',
                isModal ? 'text-[8px]' : 'text-[6px] sm:text-[6.5px]'
              )}
            >
              Authorized Signatory
            </span>
          </div>

          {/* Embossed gold seal */}
          <EmbossedGoldSeal
            className={cn(
              'shrink-0',
              isModal ? 'h-12 w-12' : isSecondary ? 'h-7 w-7 opacity-80' : 'h-9 w-9 sm:h-11 sm:w-11'
            )}
          />
        </div>

        {/* Bottom reference bar */}
        {!isSecondary && (
          <div
            className={cn(
              'mt-2 flex items-center justify-between border-t border-[#C9A45C]/30 px-2 pt-1.5 text-[#6D6556]',
              isModal ? 'text-[8.5px]' : 'text-[6px] sm:text-[7px]'
            )}
          >
            <span>Ref. No: {doc.refNo}</span>
            <span>Issue Date: {doc.issueDate}</span>
          </div>
        )}
      </div>
    </div>
  );
}
