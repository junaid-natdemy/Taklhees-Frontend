'use client';

/* ===================================================================
 * Evidence Document Display V3 — Optical Liquid-Glass Exhibition
 * ===================================================================
 * Three 3D-perspective optical liquid-glass plates seated on a
 * sculpted multi-tiered marble & glass exhibition platform.
 * Uses transparent optical glass (.atelier-optical-glass), curved
 * beveled edges, emerald rim refraction, flowing specular sheen,
 * and champagne-gold corner fasteners.
 * =================================================================== */

import { useCallback, useRef } from 'react';
import {
  m,
  AnimatePresence,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react';
import { LiquidButton } from '@/components/ui/liquid-glass-button';
import { cn } from '@/lib/utils';
import type { EvidenceDocument } from './trust-recognition-data';
import { SampleCertificateSheet } from './sample-certificate-sheet';

interface EvidenceDocumentDisplayProps {
  documents: readonly EvidenceDocument[];
  activeIndex: number;
  onNavigate: (index: number) => void;
}

/* Four champagne-gold metallic corner fasteners */
function GoldCornerFasteners({ subtle = false }: { subtle?: boolean }) {
  const pinCls = cn(
    'pointer-events-none absolute z-30 rounded-full bg-[radial-gradient(circle_at_35%_35%,#FFF5CC_0%,#D9B45D_58%,#82601D_100%)] shadow-[0_1.5px_4px_rgba(0,0,0,0.34),inset_0_0.5px_0.5px_rgba(255,255,255,0.9)]',
    subtle ? 'h-2 w-2 opacity-80' : 'h-2.5 w-2.5 sm:h-3 sm:w-3'
  );
  const pos = subtle ? 10 : 12;

  return (
    <>
      <span aria-hidden="true" className={pinCls} style={{ left: pos, top: pos }} />
      <span aria-hidden="true" className={pinCls} style={{ right: pos, top: pos }} />
      <span aria-hidden="true" className={pinCls} style={{ left: pos, bottom: pos }} />
      <span aria-hidden="true" className={pinCls} style={{ right: pos, bottom: pos }} />
    </>
  );
}

/* Individual 3D optical liquid-glass plate enclosing a physical certificate */
function GlassDocumentPlate({
  doc,
  position,
  isActive,
  onClick,
  tiltX,
  tiltY,
}: {
  doc: EvidenceDocument;
  position: 'back-left' | 'center' | 'back-right';
  isActive: boolean;
  onClick: () => void;
  tiltX: MotionValue<number>;
  tiltY: MotionValue<number>;
}) {
  const positionStyles = {
    'back-left': {
      x: -102,
      y: -6,
      rotateY: 16,
      scale: 0.79,
      opacity: 0.84,
      zIndex: 1,
    },
    center: {
      x: 0,
      y: 0,
      rotateY: 0,
      scale: 1,
      opacity: 1,
      zIndex: 4,
    },
    'back-right': {
      x: 102,
      y: -6,
      rotateY: -16,
      scale: 0.79,
      opacity: 0.84,
      zIndex: 2,
    },
  };

  const style = positionStyles[position];
  const tiltFactor = isActive ? 1 : 0.35;
  const combinedRotateY = useTransform(
    tiltX,
    (v) => style.rotateY + v * tiltFactor * 5.5
  );
  const combinedRotateX = useTransform(
    tiltY,
    (v) => v * tiltFactor * -4
  );

  return (
    <m.button
      type="button"
      onClick={onClick}
      aria-label={isActive ? doc.title : `Select ${doc.title}`}
      className={cn(
        'atelier-optical-glass group absolute left-1/2 top-1/2 aspect-[3/4] origin-center overflow-hidden rounded-[22px]',
        isActive
          ? 'w-[222px] cursor-default sm:w-[254px] lg:w-[276px]'
          : 'w-[196px] cursor-pointer sm:w-[222px] lg:w-[240px]'
      )}
      style={{
        zIndex: style.zIndex,
        transformStyle: 'preserve-3d',
        rotateY: combinedRotateY,
        rotateX: combinedRotateX,
      }}
      animate={{
        x: `calc(-50% + ${style.x}px)`,
        y: `calc(-50% + ${style.y}px)`,
        scale: style.scale,
        opacity: style.opacity,
      }}
      transition={{
        type: 'spring',
        stiffness: 170,
        damping: 24,
        mass: 0.85,
      }}
      whileHover={
        isActive
          ? { scale: 1.02, transition: { duration: 0.25 } }
          : { opacity: 0.96, scale: 0.82, transition: { duration: 0.22 } }
      }
    >
      {/* Secondary rear optical glass plate shadow separation */}
      {isActive && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-[7px] rounded-[16px] border border-white/45 bg-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.65)] dark:border-[#C9A45C]/20 dark:bg-transparent dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
        />
      )}

      {/* Physical certificate seated centrally INSIDE the transparent glass enclosure */}
      <div
        className={cn(
          'relative z-10 h-full w-full',
          isActive ? 'p-5 sm:p-6' : 'p-3.5 sm:p-4'
        )}
      >
        <div className="h-full w-full rounded-[6px] shadow-[0_12px_26px_-8px_rgba(18,22,18,0.28)]">
          <SampleCertificateSheet
            doc={doc}
            variant={isActive ? 'foreground' : 'secondary'}
            className="h-full w-full"
          />
        </div>
      </div>

      {/* Curved front glass meniscus & emerald-edge refraction */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] bg-[radial-gradient(95%_65%_at_18%_8%,rgba(255,255,255,0.42)_0%,transparent_55%),linear-gradient(135deg,rgba(20,103,54,0.07)_0%,transparent_35%,transparent_65%,rgba(201,164,92,0.12)_100%)] dark:bg-[radial-gradient(95%_65%_at_18%_8%,rgba(255,255,255,0.08)_0%,transparent_55%),linear-gradient(135deg,rgba(11,107,69,0.12)_0%,transparent_35%,transparent_65%,rgba(205,170,104,0.14)_100%)]"
      />

      {/* Flowing liquid-glass specular sheen on active showcase */}
      {isActive && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-[inherit]"
        >
          <div className="atelier-liquid-sheen absolute inset-y-0 left-0 w-1/2 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.26)_48%,transparent_100%)] dark:bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.08)_48%,transparent_100%)]" />
        </div>
      )}

      {/* Champagne-gold corner fasteners */}
      <GoldCornerFasteners subtle={!isActive} />
    </m.button>
  );
}

export function EvidenceDocumentDisplay({
  documents,
  activeIndex,
  onNavigate,
}: EvidenceDocumentDisplayProps) {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const rawTiltX = useMotionValue(0);
  const rawTiltY = useMotionValue(0);
  const tiltX = useSpring(rawTiltX, { stiffness: 170, damping: 24, mass: 0.85 });
  const tiltY = useSpring(rawTiltY, { stiffness: 170, damping: 24, mass: 0.85 });

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (prefersReducedMotion || e.pointerType === 'touch') return;
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      rawTiltX.set(x);
      rawTiltY.set(y);
    },
    [prefersReducedMotion, rawTiltX, rawTiltY]
  );

  const handlePointerLeave = useCallback(() => {
    rawTiltX.set(0);
    rawTiltY.set(0);
  }, [rawTiltX, rawTiltY]);

  const totalDocs = documents.length;
  const activeDoc = documents[activeIndex];
  if (!activeDoc) return null;

  const prevIdx = activeIndex > 0 ? activeIndex - 1 : totalDocs - 1;
  const nextIdx = activeIndex < totalDocs - 1 ? activeIndex + 1 : 0;

  const getPosition = (
    docIdx: number
  ): 'back-left' | 'center' | 'back-right' => {
    if (docIdx === activeIndex) return 'center';
    if (docIdx === prevIdx) return 'back-left';
    return 'back-right';
  };

  const visibleDocs =
    totalDocs <= 1
      ? [{ doc: activeDoc, idx: activeIndex }]
      : totalDocs === 2
        ? [
            { doc: documents[prevIdx], idx: prevIdx },
            { doc: activeDoc, idx: activeIndex },
          ]
        : [
            { doc: documents[prevIdx], idx: prevIdx },
            { doc: activeDoc, idx: activeIndex },
            { doc: documents[nextIdx], idx: nextIdx },
          ];

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative flex flex-col items-center"
      style={{ perspective: '1400px' }}
    >
      {/* 3D Optical Liquid-Glass Exhibition Stage + Flanking Controls */}
      <div className="relative mx-auto flex h-[320px] w-full max-w-[490px] items-center justify-center sm:h-[365px] lg:h-[395px]">
        {totalDocs > 1 && (
          <LiquidButton
            type="button"
            variant="default"
            size="icon"
            aria-label="Previous document"
            onClick={() => onNavigate(prevIdx)}
            className="absolute left-0 top-1/2 z-30 h-10 w-10 -translate-y-1/2 bg-white/30 text-[#2E302E] ring-1 ring-[#C9A45C]/35 hover:bg-white/45 hover:text-[#063D29] sm:left-1 sm:h-11 sm:w-11 dark:bg-[#0B1D15]/85 dark:text-[#F4F0E8] dark:ring-[#C9A45C]/25 dark:hover:bg-[#10291E] dark:hover:text-[#2EB04B]"
          >
            <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
              <path
                d="M12 15 L7 10 L12 5"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </LiquidButton>
        )}

        <div className="relative h-full w-full">
          <AnimatePresence mode="popLayout">
            {visibleDocs.map(({ doc, idx }) => (
              <GlassDocumentPlate
                key={doc.id}
                doc={doc}
                position={getPosition(idx)}
                isActive={idx === activeIndex}
                onClick={() => {
                  if (idx !== activeIndex) onNavigate(idx);
                }}
                tiltX={tiltX}
                tiltY={tiltY}
              />
            ))}
          </AnimatePresence>
        </div>

        {totalDocs > 1 && (
          <LiquidButton
            type="button"
            variant="default"
            size="icon"
            aria-label="Next document"
            onClick={() => onNavigate(nextIdx)}
            className="absolute right-0 top-1/2 z-30 h-10 w-10 -translate-y-1/2 bg-white/30 text-[#2E302E] ring-1 ring-[#C9A45C]/35 hover:bg-white/45 hover:text-[#063D29] sm:right-1 sm:h-11 sm:w-11 dark:bg-[#0B1D15]/85 dark:text-[#F4F0E8] dark:ring-[#C9A45C]/25 dark:hover:bg-[#10291E] dark:hover:text-[#2EB04B]"
          >
            <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
              <path
                d="M8 5 L13 10 L8 15"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </LiquidButton>
        )}
      </div>

      {/* Sculpted Architectural Ivory-Marble & Brass Exhibition Pedestal */}
      <div
        aria-hidden="true"
        className="relative z-[2] -mt-8 flex w-[290px] flex-col items-center sm:-mt-10 sm:w-[375px] lg:w-[425px]"
      >
        {/* Soft floor ambient occlusion beneath pedestal */}
        <div className="pointer-events-none absolute -bottom-3 h-7 w-[88%] rounded-[100%] bg-[#18140C]/28 blur-lg dark:bg-black/65" />

        {/* Precision SVG 3D Cylindrical Travertine Marble Pedestal */}
        <svg
          viewBox="0 0 500 108"
          fill="none"
          className="relative z-10 h-auto w-full"
        >
          <defs>
            {/* Cylindrical body horizontal lighting */}
            <linearGradient id="pedestal-body-light" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#D6C9B0" />
              <stop offset="18%" stopColor="#ECE3D0" />
              <stop offset="42%" stopColor="#F8F3E8" />
              <stop offset="70%" stopColor="#EAE0CA" />
              <stop offset="100%" stopColor="#C4B598" />
            </linearGradient>

            {/* Dark mode cylindrical body */}
            <linearGradient id="pedestal-body-dark" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#091610" />
              <stop offset="32%" stopColor="#12291E" />
              <stop offset="65%" stopColor="#0E2118" />
              <stop offset="100%" stopColor="#060F0B" />
            </linearGradient>

            {/* Upper marble table surface */}
            <radialGradient id="pedestal-top-light" cx="46%" cy="42%" r="60%">
              <stop offset="0%" stopColor="#FDFBF6" />
              <stop offset="55%" stopColor="#F1E9D8" />
              <stop offset="88%" stopColor="#E2D6BE" />
              <stop offset="100%" stopColor="#D2C3A7" />
            </radialGradient>

            {/* Champagne-gold inlay band */}
            <linearGradient id="pedestal-brass-band" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#A98642" stopOpacity="0.55" />
              <stop offset="28%" stopColor="#E6C97D" stopOpacity="0.92" />
              <stop offset="52%" stopColor="#FFF0BA" stopOpacity="0.98" />
              <stop offset="78%" stopColor="#C9A45C" stopOpacity="0.88" />
              <stop offset="100%" stopColor="#9A7836" stopOpacity="0.5" />
            </linearGradient>

            {/* Subtle glass-to-marble contact shadow */}
            <radialGradient id="pedestal-glass-shadow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#063D29" stopOpacity="0.28" />
              <stop offset="58%" stopColor="#2A2419" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#2A2419" stopOpacity="0" />
            </radialGradient>

            {/* Subtle marble veining clip */}
            <clipPath id="pedestal-cylinder-clip">
              <path d="M 16 34 C 16 14, 120 4, 250 4 C 380 4, 484 14, 484 34 L 484 68 C 484 88, 380 98, 250 98 C 120 98, 16 88, 16 68 Z" />
            </clipPath>
          </defs>

          {/* Main marble cylinder body */}
          <path
            d="M 16 34 L 484 34 L 484 68 C 484 88, 380 98, 250 98 C 120 98, 16 88, 16 68 Z"
            fill="url(#pedestal-body-light)"
            className="dark:hidden"
          />
          <path
            d="M 16 34 L 484 34 L 484 68 C 484 88, 380 98, 250 98 C 120 98, 16 88, 16 68 Z"
            fill="url(#pedestal-body-dark)"
            className="hidden dark:block"
          />

          {/* Subtle champagne-gold inlay groove around cylinder */}
          <path
            d="M 16 58 C 16 76, 120 86, 250 86 C 380 86, 484 76, 484 58"
            stroke="url(#pedestal-brass-band)"
            strokeWidth="1.5"
          />

          {/* Upper bevel / rim shadow transition */}
          <ellipse
            cx="250"
            cy="34"
            rx="234"
            ry="29"
            fill="url(#pedestal-top-light)"
            className="dark:fill-[#0F1E16]"
          />

          {/* Subtle natural marble veining across top & front */}
          <g clipPath="url(#pedestal-cylinder-clip)" opacity="0.28">
            <path
              d="M 62 42 C 118 36, 162 48, 218 40 C 268 33, 322 44, 388 38"
              stroke="#B5A17D"
              strokeWidth="0.9"
            />
            <path
              d="M 110 74 C 168 68, 232 82, 310 72 C 365 65, 410 74, 452 68"
              stroke="#B5A17D"
              strokeWidth="0.8"
            />
            <path
              d="M 48 64 C 95 60, 134 70, 178 65"
              stroke="#FFFFFF"
              strokeOpacity="0.65"
              strokeWidth="0.8"
              className="dark:opacity-20"
            />
          </g>

          {/* Top-edge specular highlight rim */}
          <ellipse
            cx="250"
            cy="34"
            rx="233.5"
            ry="28.5"
            stroke="#FFFFFF"
            strokeOpacity="0.72"
            strokeWidth="1.1"
            className="dark:opacity-15"
          />
          <ellipse
            cx="250"
            cy="34"
            rx="234"
            ry="29"
            stroke="#C9A45C"
            strokeOpacity="0.35"
            strokeWidth="0.9"
          />

          {/* Recessed brass mounting channel & soft emerald-glass contact shadow */}
          <ellipse
            cx="250"
            cy="32"
            rx="156"
            ry="11"
            fill="url(#pedestal-glass-shadow)"
          />
          <path
            d="M 122 33 C 165 38, 335 38, 378 33"
            stroke="url(#pedestal-brass-band)"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Frosted Glass Pill Progress Indicator */}
      {totalDocs > 1 && (
        <div
          className="relative z-20 -mt-4 inline-flex items-center gap-2 rounded-full border border-white/85 bg-white/82 px-3.5 py-1.5 shadow-[0_6px_16px_-4px_rgba(6,61,41,0.18),inset_0_1px_1px_rgba(255,255,255,0.95)] backdrop-blur-md dark:border-[#C9A45C]/25 dark:bg-[#0B1D15]/90 dark:shadow-[0_10px_24px_-6px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.10)]"
          role="tablist"
          aria-label="Document navigation"
        >
          {documents.map((doc, i) => (
            <button
              key={doc.id}
              type="button"
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Document ${i + 1}: ${doc.title}`}
              onClick={() => onNavigate(i)}
              className={cn(
                'h-2 rounded-full transition-all duration-300',
                i === activeIndex
                  ? 'w-5 bg-[#0A6B36] dark:bg-[#2EB04B]'
                  : 'w-2 bg-[#C9A45C]/45 hover:bg-[#C9A45C]/80'
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
