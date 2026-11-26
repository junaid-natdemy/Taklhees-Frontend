export interface GovernmentPartner {
  id: string;
  name: string;
  src: string;
  width: number;
  height: number;
}

export const GOVERNMENT_PARTNERS: GovernmentPartner[] = [
  {
    id: 'uae-federal-emblem',
    name: 'United Arab Emirates Government',
    src: '/images/partners/uae-federal-emblem.webp',
    width: 184,
    height: 154,
  },
  {
    id: 'haad-abu-dhabi',
    name: 'Department of Health — Abu Dhabi (DOH)',
    src: '/images/partners/haad-abu-dhabi.webp',
    width: 218,
    height: 148,
  },
  {
    id: 'dmt-abu-dhabi',
    name: 'Department of Municipalities and Transport',
    src: '/images/partners/dmt-abu-dhabi.webp',
    width: 208,
    height: 154,
  },
  {
    id: 'tadbeer',
    name: 'Tad-beer',
    src: '/images/partners/tadbeer.webp',
    width: 128,
    height: 162,
  },
  {
    id: 'tamm',
    name: 'Tamm — Abu Dhabi Government Services',
    src: '/images/partners/tamm.webp',
    width: 192,
    height: 76,
  },
];
