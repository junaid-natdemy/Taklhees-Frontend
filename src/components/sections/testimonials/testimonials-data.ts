export type TestimonialServiceIcon =
  | 'building'
  | 'shield'
  | 'file-check'
  | 'landmark'
  | 'award'
  | 'briefcase'
  | 'users'
  | 'globe'
  | 'check-circle';

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  quote: string;
  avatar?: string;
  initials: string;
  icon: TestimonialServiceIcon;
}

export const TESTIMONIAL_COLUMNS: [
  TestimonialItem[],
  TestimonialItem[],
  TestimonialItem[],
] = [
  [
    {
      id: 'takhlees-uae-1',
      name: 'Khalid Al Mansoori',
      role: 'Managing Partner • Abu Dhabi Mainland',
      quote:
        'Takhlees handled our commercial trade license renewal and DED approvals in a single visit. Their Al Wahda Mall team kept every step transparent and effortless.',
      avatar: '/images/testimonials/avatar-1.webp',
      initials: 'KM',
      icon: 'building',
    },
    {
      id: 'takhlees-uae-2',
      name: 'Nadia Al Hashimi',
      role: 'HR Operations Lead • Musaffah',
      quote:
        'Managing Tasheel, Tawjeeh, and employment visa clearances for 40+ staff used to take weeks. With Takhlees corporate PRO support, every file moves on schedule.',
      avatar: '/images/testimonials/avatar-2.webp',
      initials: 'NH',
      icon: 'users',
    },
    {
      id: 'takhlees-uae-3',
      name: 'Faisal Al Dhaheri',
      role: 'Real Estate Investor • UAE',
      quote:
        'My 10-year UAE Golden Visa and Emirates ID biometric scheduling were completed ahead of time without a single back-and-forth trip.',
      initials: 'FD',
      icon: 'award',
    },
  ],
  [
    {
      id: 'takhlees-uae-4',
      name: 'Tariq Al Suwaidi',
      role: 'Founder • Logistics & Trading LLC',
      quote:
        'From initial company formation to chamber attestations and labour cards, Takhlees acts like an extension of our own operations department.',
      avatar: '/images/testimonials/avatar-3.webp',
      initials: 'TS',
      icon: 'briefcase',
    },
    {
      id: 'takhlees-uae-5',
      name: 'Meera Nair',
      role: 'Family Residency Client • Muroor Branch',
      quote:
        'Sponsoring my parents and updating our Emirates IDs felt daunting at first, but the officer at the Muroor counter guided us with genuine warmth and precision.',
      avatar: '/images/testimonials/avatar-4.webp',
      initials: 'MN',
      icon: 'shield',
    },
    {
      id: 'takhlees-uae-6',
      name: 'Omar Alblooshi',
      role: 'Corporate PRO Coordinator • Abu Dhabi',
      quote:
        'Accurate Arabic-English typing, zero typing errors on MOFAIC attestations, and proactive status updates. Easily our most reliable clearing partner.',
      initials: 'OA',
      icon: 'file-check',
    },
  ],
  [
    {
      id: 'takhlees-uae-7',
      name: 'Daniel Carter',
      role: 'Regional Director • Consulting Group',
      quote:
        'Setting up our Abu Dhabi branch required coordinated ICP, DED, and municipal clearances. Takhlees delivered every approval smoothly and on budget.',
      avatar: '/images/testimonials/avatar-5.webp',
      initials: 'DC',
      icon: 'globe',
    },
    {
      id: 'takhlees-uae-8',
      name: 'Salma Al Mazrouei',
      role: 'SME Owner • Healthcare Clinic',
      quote:
        'Having 20+ accessible branches across the UAE means our clinic staff can complete medical typing and visa renewals quickly near our workplace.',
      initials: 'SM',
      icon: 'landmark',
    },
    {
      id: 'takhlees-uae-9',
      name: 'Rashid Al Qasimi',
      role: 'General Manager • Engineering Services',
      quote:
        'Consistent professionalism across every visit. Whether it is an urgent quota modification or a routine license amendment, Takhlees delivers on time.',
      initials: 'RQ',
      icon: 'check-circle',
    },
  ],
];
