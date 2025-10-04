import axios, { AxiosInstance } from 'axios';

const API_KEY = 'hJqOh426mrk3DGfrP9Ll9LYWEhHP78Rf';
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2';

// Basic axios instance
const client: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  params: { apikey: API_KEY },
});

export interface NormalizedEvent {
  id: string;
  name: string;
  date: string | null; // ISO
  venue?: string;
  city?: string;
  country?: string;
  image?: string;
  classification?: string;
  priceMin?: number;
  priceMax?: number;
  currency?: string;
  raw: any; // keep for future detail usage
}

function pickBestImage(images?: any[]): string | undefined {
  if (!images || !images.length) return undefined;
  const sorted = [...images].sort((a, b) => Math.abs(600 - a.width) - Math.abs(600 - b.width));
  return sorted[0]?.url;
}

function normalizeEvent(e: any): NormalizedEvent {
  const venue = e?._embedded?.venues?.[0];
  const classification = e?.classifications?.[0];
  const priceRange = e?.priceRanges?.[0];
  return {
    id: e.id,
    name: e.name,
    date: e.dates?.start?.dateTime ?? null,
    venue: venue?.name,
    city: venue?.city?.name,
    country: venue?.country?.countryCode,
    image: pickBestImage(e.images),
    classification: classification?.segment?.name || classification?.genre?.name,
    priceMin: priceRange?.min,
    priceMax: priceRange?.max,
    currency: priceRange?.currency,
    raw: e,
  };
}

export interface SearchEventsParams {
  keyword?: string;
  city?: string;
  countryCode?: string;
  classificationName?: string;
  page?: number;
  size?: number;
}

export interface PagedEventsResult {
  events: NormalizedEvent[];
  page: number;
  totalPages: number;
  totalElements: number;
}

export async function searchEvents({ keyword, city, countryCode = 'US', classificationName, page = 0, size = 20 }: SearchEventsParams): Promise<PagedEventsResult> {
  const params: Record<string, any> = {
    keyword,
    city,
    countryCode,
    classificationName,
    page,
    size,
  };
  Object.keys(params).forEach(k => params[k] == null && delete params[k]);
  const res = await client.get('/events.json', { params });
  const data = res.data;
  const eventsArray = data?._embedded?.events || [];
  return {
    events: eventsArray.map(normalizeEvent),
    page: data?.page?.number ?? page,
    totalPages: data?.page?.totalPages ?? 0,
    totalElements: data?.page?.totalElements ?? eventsArray.length,
  };
}

export async function getEventDetails(eventId: string): Promise<NormalizedEvent | null> {
  try {
    const res = await client.get(`/events/${eventId}.json`);
    return normalizeEvent(res.data);
  } catch (e) {
    console.warn('getEventDetails failed', e);
    return null;
  }
}

export async function getSuggestions(keyword: string, countryCode?: string): Promise<string[]> {
  if (!keyword) return [];
  const params: Record<string, any> = { keyword };
  if (countryCode) params.countryCode = countryCode;
  const res = await client.get('/suggest.json', { params });
  const terms: string[] = res.data?._embedded?.attractions?.map((a: any) => a.name) || [];
  return terms;
}

export interface VenueResult {
  id: string;
  name: string;
  city?: string;
  country?: string;
  raw: any;
}

export async function getVenues(keyword: string, countryCode: string = 'US'): Promise<VenueResult[]> {
  if (!keyword) return [];
  const res = await client.get('/venues.json', { params: { keyword, countryCode } });
  const venues = res.data?._embedded?.venues || [];
  return venues.map((v: any) => ({
    id: v.id,
    name: v.name,
    city: v.city?.name,
    country: v.country?.countryCode,
    raw: v,
  }));
}

// Simple helper for safe API call with error capture
export async function safe<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try { return await fn(); } catch { return fallback; }
}
