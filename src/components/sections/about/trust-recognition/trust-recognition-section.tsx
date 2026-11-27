'use client';

/* ===================================================================
 * Trust & Recognition — Evidence Atelier V3
 * ===================================================================
 * Premium optical liquid-glass exhibition:
 * - UAE architectural limestone backdrop with receding arches & Mashrabiya
 * - Vertically centered left category timeline
 * - Center dominant 3D optical liquid-glass certificate showcase
 * - Right selected document metadata panel
 * - Bottom multi-layer sculpted emerald liquid wave
 * =================================================================== */

import { useCallback, useMemo, useRef, useState } from 'react';
import { m, useReducedMotion } from 'motion/react';
import { useSectionInView } from '@/hooks/use-section-in-view';
import {
  EVIDENCE_CATEGORIES,
  type EvidenceCategoryKey,
} from './trust-recognition-data';
import { EvidenceArchitecturalBackdrop } from './evidence-architectural-backdrop';
import { EvidenceEmeraldWave, EvidenceTopWave } from './evidence-emerald-wave';
import { EvidenceDocumentDisplay } from './evidence-document-display';
import { EvidenceArchiveIndex } from './evidence-archive-index';

export function TrustRecognitionSection() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useSectionInView(sectionRef, '150px');

  const [activeCategory, setActiveCategory] =
    useState<EvidenceCategoryKey>('certifications');
  const [activeDocIndex, setActiveDocIndex] = useState(0);

  const categoryData = useMemo(
    () => EVIDENCE_CATEGORIES.find((c) => c.key === activeCategory),
    [activeCategory]
  );

  const documents = useMemo(
    () => categoryData?.documents ?? [],
    [categoryData]
  );

  const activeDoc = documents[activeDocIndex] ?? null;

  const handleCategorySelect = useCallback((key: EvidenceCategoryKey) => {
    setActiveCategory(key);
    setActiveDocIndex(0);
  }, []);

  const handleNavigate = useCallback((index: number) => {
    setActiveDocIndex(index);
  }, []);

  const categoryItems = useMemo(
    () => EVIDENCE_CATEGORIES.map((c) => ({ key: c.key, label: c.label })),
    []
  );

  return (
    <section
      ref={sectionRef}
      id="trust-recognition"
      aria-labelledby="trust-recognition-heading"
      data-section-paused={!inView ? 'true' : undefined}
      className="relative overflow-x-clip bg-[#F5F1E6] transition-colors duration-300 dark:bg-[#050B08]"
    >
      {/* Layer 1–3: UAE Architectural Exhibition Environment */}
      <EvidenceArchitecturalBackdrop />

      {/* Top Sculpted Emerald Transition Wave */}
      <EvidenceTopWave />

      {/* Layer 6: Continuous Sculpted Emerald Liquid Wave */}
      <EvidenceEmeraldWave />

      {/* ================= MAIN EXHIBITION CONTENT ================= */}
      <div className="relative z-10 mx-auto max-w-[1260px] px-5 pb-16 pt-16 sm:px-8 sm:pt-20 md:pb-20 md:pt-20 lg:px-10 lg:pb-24 lg:pt-20">
        {/* Compact Editorial Header */}
        <m.header
          initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.65, ease: [0.22, 1, 0.36, 1] }
          }
          className="mb-5 max-w-xl md:mb-6"
        >
          <div className="mb-1.5 flex items-center gap-3">
            <span
              aria-hidden="true"
              className="h-[1.5px] w-7 rounded-full bg-[#C9A45C]"
            />
            <span className="text-[10.5px] font-semibold uppercase tracking-[0.24em] text-[#454846] dark:text-[#929D95]">
              Trust & Recognition
            </span>
          </div>

          <h2
            id="trust-recognition-heading"
            className="font-serif text-[26px] font-semibold leading-[1.08] tracking-[-0.015em] text-[#222321] dark:text-[#F4F0E8] sm:text-[32px] lg:text-[36px]"
          >
            Proof Behind{' '}
            <span className="relative inline-block font-semibold italic text-[#063D29] dark:text-[#2EB04B]">
              Every Promise
              <svg
                aria-hidden="true"
                viewBox="0 0 240 12"
                fill="none"
                className="pointer-events-none absolute -bottom-1 left-0 h-2 w-full"
              >
                <path
                  d="M4 9.5 C 74 3, 174 2, 236 7"
                  stroke="#C9A45C"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>

          <p className="mt-1.5 max-w-lg text-[13px] leading-[1.52] text-[#4A4E4B] dark:text-[#C1C8C1] lg:text-[13.5px]">
            Our commitments are backed by regulatory approvals, industry
            affiliations, and strong, long-standing relationships across the UAE.
          </p>
        </m.header>

        {/* ================= 3-ZONE BALANCED EXHIBITION GRID ================= */}
        <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-[195px_1fr] md:gap-6 xl:grid-cols-[205px_1fr_300px] xl:gap-6">
          {/* ZONE A: Vertically Centered Category Navigation */}
          <m.div
            initial={prefersReducedMotion ? false : { opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }
            }
            className="md:self-center"
          >
            <EvidenceArchiveIndex
              categories={categoryItems}
              activeCategory={activeCategory}
              onSelect={handleCategorySelect}
            />
          </m.div>

          {/* ZONE B: Dominant 3D Optical Liquid-Glass Certificate Exhibition */}
          <m.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }
            }
            role="tabpanel"
            id={`evidence-panel-${activeCategory}`}
            aria-labelledby={`evidence-tab-${activeCategory}`}
          >
            <EvidenceDocumentDisplay
              documents={documents}
              activeIndex={activeDocIndex}
              onNavigate={handleNavigate}
            />
          </m.div>

          {/* ZONE C: Selected Document Optical Liquid-Glass Container */}
          <m.div
            initial={prefersReducedMotion ? false : { opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }
            }
            className="atelier-optical-glass relative overflow-hidden rounded-2xl p-4 sm:p-5 md:col-span-2 md:mx-auto md:max-w-2xl xl:col-span-1 xl:mx-0 xl:max-w-none xl:self-center"
          >
            {/* Subtle upper-left glass meniscus highlight */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(90%_65%_at_12%_8%,rgba(255,255,255,0.45)_0%,transparent_58%)] dark:bg-[radial-gradient(90%_65%_at_12%_8%,rgba(255,255,255,0.06)_0%,transparent_58%)]"
            />
            {activeDoc && (
              <div key={activeDoc.id} className="relative z-10">
                <div className="flex items-center gap-2.5">
                  <span
                    aria-hidden="true"
                    className="h-[1.5px] w-6 bg-[#C9A45C]"
                  />
                  <span className="text-[9.5px] font-semibold uppercase tracking-[0.22em] text-[#7B7261] dark:text-[#929D95]">
                    Selected Document
                  </span>
                </div>

                <h3 className="mt-1.5 font-serif text-[20px] font-semibold leading-[1.14] text-[#222321] dark:text-[#F4F0E8] lg:text-[23px]">
                  {activeDoc.title}
                </h3>

                {/* 2-Column Metadata with Vertical Divider */}
                <div className="mt-3 grid grid-cols-[1fr_auto_1fr] items-start gap-2.5">
                  <div className="flex items-start gap-2">
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#9A7B3B] dark:text-[#C9A45C]"
                    >
                      <path
                        d="M3 14 L3 5 L7 5 L7 14 M7 14 L7 2 L11 2 L11 14 M11 14 L11 7 L14 7 L14 14"
                        stroke="currentColor"
                        strokeWidth="1.2"
                      />
                    </svg>
                    <div>
                      <span className="block text-[11px] font-semibold text-[#2E302E] dark:text-[#F4F0E8]">
                        Issuing Authority
                      </span>
                      <span className="mt-0.5 block text-[10.5px] leading-[1.35] text-[#6B6E6C] dark:text-[#929D95]">
                        {activeDoc.issuer}
                      </span>
                    </div>
                  </div>

                  <span
                    aria-hidden="true"
                    className="h-9 w-px bg-[#C9A45C]/35"
                  />

                  <div className="flex items-start gap-2">
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#9A7B3B] dark:text-[#C9A45C]"
                    >
                      <rect
                        x="2"
                        y="3"
                        width="12"
                        height="11"
                        rx="1.5"
                        stroke="currentColor"
                        strokeWidth="1.2"
                      />
                      <line
                        x1="2"
                        y1="7"
                        x2="14"
                        y2="7"
                        stroke="currentColor"
                        strokeWidth="1.2"
                      />
                    </svg>
                    <div>
                      <span className="block text-[11px] font-semibold text-[#2E302E] dark:text-[#F4F0E8]">
                        Valid Till
                      </span>
                      <span className="mt-0.5 block text-[10.5px] leading-[1.35] text-[#6B6E6C] dark:text-[#929D95]">
                        {activeDoc.validUntil}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="mt-3 text-[12.5px] leading-[1.55] text-[#4A4E4B] dark:text-[#C1C8C1] lg:text-[13px]">
                  {activeDoc.description}
                </p>
              </div>
            )}
          </m.div>
        </div>
      </div>
    </section>
  );
}

export default TrustRecognitionSection;
