export interface CurrencyItem {
  id: string;
  name: string;
  year: number;
  description: string;
  issuer: string;
  details?: string;
  imageUrl: string;
}

export interface TimeEpoch {
  id: string;
  name: string;
  startYear: number;
  endYear: number;
  scrollHeight: number;
  color: string;
  description: string;
}

export interface DetailedCurrencyInfo {
  name: string;
  note: string;
  year: number;
  imageUrl?: string;
}

export interface EpochDetailedInfo {
  title: string;
  period: string;
  description: string;
  currencies: DetailedCurrencyInfo[];
}