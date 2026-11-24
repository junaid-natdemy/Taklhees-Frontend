export type CountryCode = 'ae' | 'in';

export interface BaseEntity {
  id: string | number;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: 'success' | 'error';
}

export interface ApiErrorResponse {
  message: string;
  code?: string;
  errors?: Record<string, string[]>;
}

export interface CountryInfo {
  code: CountryCode;
  name: string;
  label: string;
  currency: string;
  currencySymbol: string;
  defaultPath: string;
}
