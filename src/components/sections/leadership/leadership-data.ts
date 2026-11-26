export interface LeadershipProfile {
  id: string;
  name: string;
  role: string;
  quote: string;
  portrait: string;
  portraitAlt: string;
  portraitWidth: number;
  portraitHeight: number;
}

export const LEADERSHIP_PROFILES: LeadershipProfile[] = [
  {
    id: 'ramshad-ashraf',
    name: 'Mr. Ramshad Ashraf',
    role: 'Managing Director (MD)',
    quote:
      'At Takhlees Business, our mission is to empower businesses and individuals by simplifying complex processes. We believe in building long-lasting relationships with our clients through trust, professionalism, and exceptional service. Together, we create a pathway to success!',
    portrait: '/images/leadership/ramshad-ashraf-portrait.webp',
    portraitAlt: 'Mr. Ramshad Ashraf, Managing Director (MD) of Takhlees Business',
    portraitWidth: 433,
    portraitHeight: 577,
  },
  {
    id: 'sadique-manalaya',
    name: 'Mr. Sadique Manalaya',
    role: 'Chief Executive Officer (CEO)',
    quote:
      'Innovation and dedication drive Takhlees Business to deliver the best solutions for our clients. Our team is committed to excellence, ensuring that your journey with us is smooth, efficient, and impactful.',
    portrait: '/images/leadership/sadique-manalaya-portrait.webp',
    portraitAlt: 'Mr. Sadique Manalaya, Chief Executive Officer (CEO) of Takhlees Business',
    portraitWidth: 433,
    portraitHeight: 577,
  },
];
