export type PillarIconKey =
  | 'uae-skyline'
  | 'comprehensive-support'
  | 'client-focused'
  | 'long-term';

export interface DifferentiationPillar {
  id: string;
  titleLines: [string, string];
  description: string;
  icon: PillarIconKey;
  /*
   * Exact coordinates solved directly from the emerald SVG upper Bezier curve
   * (P0=(175,434), P1=(460,412), P2=(860,356), P3=(1249,268) in 1320x460 space)
   * at width = 15.6% so every pillar bottom seats flush onto its local wave slope.
   */
  desktopLeftPercent: number;
  desktopBottomPercent: number;
  desktopHeightPercent: number;
  bottomSlope01: {
    midY: number;
    rightY: number;
  };
}

export const DIFFERENTIATION_PILLARS: readonly DifferentiationPillar[] = [
  {
    id: 'uae-market-knowledge',
    titleLines: ['UAE Market', 'Knowledge'],
    description:
      'A deep understanding of the UAE business environment, regulations and opportunities.',
    icon: 'uae-skyline',
    desktopLeftPercent: 25,
    desktopBottomPercent: 8.6,
    desktopHeightPercent: 60.5,
    bottomSlope01: {
      midY: 0.9585,
      rightY: 0.9116,
    },
  },
  {
    id: 'comprehensive-support',
    titleLines: ['Comprehensive', 'Support'],
    description:
      'End-to-end assistance from business setup to PRO and essential documentation.',
    icon: 'comprehensive-support',
    desktopLeftPercent: 43,
    desktopBottomPercent: 14.85,
    desktopHeightPercent: 61,
    bottomSlope01: {
      midY: 0.9472,
      rightY: 0.8897,
    },
  },
  {
    id: 'client-focused-approach',
    titleLines: ['Client-Focused', 'Approach'],
    description:
      'Solutions tailored to your business goals, industry and requirements.',
    icon: 'client-focused',
    desktopLeftPercent: 61,
    desktopBottomPercent: 22.7,
    desktopHeightPercent: 61.5,
    bottomSlope01: {
      midY: 0.9369,
      rightY: 0.8692,
    },
  },
  {
    id: 'long-term-relationships',
    titleLines: ['Long-Term', 'Relationships'],
    description:
      'A commitment to lasting partnerships built on trust, reliability and continued support.',
    icon: 'long-term',
    desktopLeftPercent: 79,
    desktopBottomPercent: 32.1,
    desktopHeightPercent: 62,
    bottomSlope01: {
      midY: 0.9263,
      rightY: 0.8474,
    },
  },
] as const;
