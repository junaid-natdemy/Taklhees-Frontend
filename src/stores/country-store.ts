import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CountryCode = 'ae' | 'in';

interface CountryState {
  country: CountryCode;
  setCountry: (country: CountryCode) => void;
}

export const useCountryStore = create<CountryState>()(
  persist(
    (set) => ({
      country: 'ae',
      setCountry: (country) => set({ country }),
    }),
    {
      name: 'takhlees-country-preference',
    }
  )
);
