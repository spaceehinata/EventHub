export type EventType = 'Concert' | 'Theater' | 'Sports' | 'Comedy' | 'Festival' | 'Conference';

export interface EventItem {
  id: string;
  title: string;
  type: EventType;
  date: string; // ISO string
  location: string; // City, Venue
  thumbnail: string; // remote URL or require() path (for now remote)
  description: string;
}

// For simplicity use unsplash placeholder images. In real app these could be CDN images.
export const mockEvents: EventItem[] = [
  {
    id: '1',
    title: 'Rock Legends Reunion',
    type: 'Concert',
    date: '2025-10-12T19:30:00Z',
    location: 'Madison Square Garden, NYC',
    thumbnail: 'https://source.unsplash.com/800x600/?concert,rock',
    description: 'An unforgettable night with classic rock legends performing their greatest hits.'
  },
  {
    id: '2',
    title: 'Shakespeare in the Park',
    type: 'Theater',
    date: '2025-07-05T00:00:00Z',
    location: 'Central Park, NYC',
    thumbnail: 'https://source.unsplash.com/800x600/?theater,stage',
    description: 'Outdoor performance of a timeless Shakespearean comedy under the stars.'
  },
  {
    id: '3',
    title: 'City Marathon 2025',
    type: 'Sports',
    date: '2025-11-03T13:00:00Z',
    location: 'Downtown, Chicago',
    thumbnail: 'https://source.unsplash.com/800x600/?marathon,running',
    description: 'Annual marathon featuring elite runners and enthusiastic amateurs alike.'
  },
  {
    id: '4',
    title: 'Stand-up Night: Laugh Riot',
    type: 'Comedy',
    date: '2025-06-20T02:00:00Z',
    location: 'The Laugh Factory, LA',
    thumbnail: 'https://source.unsplash.com/800x600/?comedy,stage',
    description: 'A lineup of top comedians delivering rapid-fire jokes and hilarious stories.'
  },
  {
    id: '5',
    title: 'Summer EDM Festival',
    type: 'Festival',
    date: '2025-08-14T18:00:00Z',
    location: 'Desert Grounds, Nevada',
    thumbnail: 'https://source.unsplash.com/800x600/?festival,music',
    description: 'Three-day electronic dance music spectacle with immersive light shows.'
  },
  {
    id: '6',
    title: 'Tech Innovators Summit',
    type: 'Conference',
    date: '2025-09-21T15:00:00Z',
    location: 'Moscone Center, San Francisco',
    thumbnail: 'https://source.unsplash.com/800x600/?technology,conference',
    description: 'Conference showcasing breakthrough technologies and visionary speakers.'
  },
  {
    id: '7',
    title: 'Symphony Under the Stars',
    type: 'Concert',
    date: '2025-07-30T01:30:00Z',
    location: 'Riverside Park, Portland',
    thumbnail: 'https://source.unsplash.com/800x600/?symphony,orchestra',
    description: 'Open-air orchestral performance featuring classical masterpieces.'
  },
  {
    id: '8',
    title: 'Broadway Classics Revival',
    type: 'Theater',
    date: '2025-12-10T00:00:00Z',
    location: 'Imperial Theatre, NYC',
    thumbnail: 'https://source.unsplash.com/800x600/?broadway,theater',
    description: 'A revival performance celebrating the golden era of Broadway musicals.'
  },
  {
    id: '9',
    title: 'Championship Basketball Finals',
    type: 'Sports',
    date: '2025-06-15T23:00:00Z',
    location: 'Staples Center, LA',
    thumbnail: 'https://source.unsplash.com/800x600/?basketball,arena',
    description: 'The thrilling conclusion to the season as the top two teams face off.'
  },
  {
    id: '10',
    title: 'Indie Film & Arts Fest',
    type: 'Festival',
    date: '2025-09-05T16:00:00Z',
    location: 'Waterfront District, Seattle',
    thumbnail: 'https://source.unsplash.com/800x600/?film,festival',
    description: 'Celebration of independent cinema and visual arts with screenings and panels.'
  },
  {
    id: '11',
    title: 'Gaming & Esports Expo',
    type: 'Conference',
    date: '2025-10-02T17:00:00Z',
    location: 'Convention Center, Austin',
    thumbnail: 'https://source.unsplash.com/800x600/?gaming,esports',
    description: 'Expo featuring esports tournaments, new game demos, and industry talks.'
  },
  {
    id: '12',
    title: 'Jazz & Wine Evening',
    type: 'Concert',
    date: '2025-07-18T02:00:00Z',
    location: 'Harbor Pavilion, New Orleans',
    thumbnail: 'https://source.unsplash.com/800x600/?jazz,music',
    description: 'Smooth jazz performances paired with curated regional wine tastings.'
  },
  {
    id: '13',
    title: 'Contemporary Drama Premiere',
    type: 'Theater',
    date: '2025-11-22T00:00:00Z',
    location: 'Downtown Playhouse, Denver',
    thumbnail: 'https://source.unsplash.com/800x600/?drama,theater',
    description: 'Premiere of a thought-provoking contemporary drama exploring modern themes.'
  },
  {
    id: '14',
    title: 'City Triathlon',
    type: 'Sports',
    date: '2025-08-19T12:00:00Z',
    location: 'Harbor Front, Miami',
    thumbnail: 'https://source.unsplash.com/800x600/?triathlon,sports',
    description: 'Swim, bike, and run challenge across scenic urban and coastal routes.'
  },
  {
    id: '15',
    title: 'Improv Comedy Jam',
    type: 'Comedy',
    date: '2025-06-25T01:00:00Z',
    location: 'Downtown Comedy Club, Boston',
    thumbnail: 'https://source.unsplash.com/800x600/?improv,comedy',
    description: 'Interactive improv night where audience suggestions fuel spontaneous humor.'
  },
  {
    id: '16',
    title: 'Global Food & Music Fair',
    type: 'Festival',
    date: '2025-09-28T18:00:00Z',
    location: 'Cultural Plaza, Toronto',
    thumbnail: 'https://source.unsplash.com/800x600/?food,festival',
    description: 'A fusion of global cuisines, live performances, and cultural showcases.'
  },
  {
    id: '17',
    title: 'AI & Future Tech Forum',
    type: 'Conference',
    date: '2025-07-09T15:00:00Z',
    location: 'Innovation Hub, Silicon Valley',
    thumbnail: 'https://source.unsplash.com/800x600/?artificial-intelligence,technology',
    description: 'Forum discussing ethical, societal, and business impacts of AI advancements.'
  },
  {
    id: '18',
    title: 'Chamber Music Recital',
    type: 'Concert',
    date: '2025-06-18T00:30:00Z',
    location: 'City Arts Hall, Philadelphia',
    thumbnail: 'https://source.unsplash.com/800x600/?violin,music',
    description: 'Intimate performance featuring a selection of chamber music ensembles.'
  },
  {
    id: '19',
    title: 'Urban Street Theater',
    type: 'Theater',
    date: '2025-07-12T20:00:00Z',
    location: 'Market Square, Atlanta',
    thumbnail: 'https://source.unsplash.com/800x600/?street,performance',
    description: 'Dynamic outdoor street theater blending movement, dialogue, and live music.'
  },
  {
    id: '20',
    title: 'Regional Soccer Cup Final',
    type: 'Sports',
    date: '2025-09-02T19:00:00Z',
    location: 'National Stadium, Dallas',
    thumbnail: 'https://source.unsplash.com/800x600/?soccer,stadium',
    description: 'Decisive soccer match crowning the regional champions.'
  }
];

export const EVENT_PAGE_SIZE = 6;

export function getPagedEvents(page: number, pageSize: number = EVENT_PAGE_SIZE): EventItem[] {
  const start = page * pageSize;
  return mockEvents.slice(start, start + pageSize);
}
