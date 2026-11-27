export interface StoryMilestone {
  id: string;
  chapter: string;
  year: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  imagePosition?: string;
}

/*
 * Editable editorial milestone chapters for the Our Story & Journey section.
 * Copy and media assets remain data-driven for straightforward updates.
 */
export const STORY_MILESTONES: readonly StoryMilestone[] = [
  {
    id: 'milestone-2010',
    chapter: '01',
    year: '2010',
    title: 'The Beginning',
    description:
      'Takhlees was established with a simple goal — to support businesses in the UAE.',
    imageSrc: '/images/about/journey-2010-beginning.webp',
    imageAlt:
      'Traditional UAE sandstone archway with Arabic mashrabiya latticework overlooking an early morning Dubai skyline',
    imagePosition: 'object-[56%_45%]',
  },
  {
    id: 'milestone-2015',
    chapter: '02',
    year: '2015',
    title: 'Steady Growth',
    description:
      'Expanded our service portfolio and built long-term relationships with clients.',
    imageSrc: '/images/about/journey-2015-growth.webp',
    imageAlt:
      'Developing Dubai commercial financial district with limestone colonnade and modern office towers in natural daylight',
    imagePosition: 'object-center',
  },
  {
    id: 'milestone-2020',
    chapter: '03',
    year: '2020',
    title: 'Greater Reach',
    description:
      'Strengthened our presence and continued supporting businesses across the UAE.',
    imageSrc: '/images/about/journey-2020-reach.webp',
    imageAlt:
      'Expansive Downtown Dubai skyline with Burj Khalifa and Emirates Towers reflected along the waterfront canal',
    imagePosition: 'object-center',
  },
  {
    id: 'milestone-today',
    chapter: '04',
    year: 'Today',
    title: 'A Trusted Partner',
    description:
      'Supporting entrepreneurs, investors and businesses with comprehensive UAE business services.',
    imageSrc: '/images/about/journey-today-partner.webp',
    imageAlt:
      'Executive business consultation inside a sunlit Dubai office overlooking Downtown Dubai skyline',
    imagePosition: 'object-[50%_30%]',
  },
] as const;
