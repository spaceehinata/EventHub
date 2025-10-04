import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';
import { EventItem, mockEvents, EVENT_PAGE_SIZE } from '@/data/mockEvents';
import { EventCard } from './event-card';
import { EmptyState } from './empty-state';
import { LoadingFooter } from './loading-footer';

interface Props {
  search: string;
  category: string; // EventType or 'All'
}

export const EventList: React.FC<Props> = ({ search, category }) => {
  const [page, setPage] = useState(0);
  const [data, setData] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [end, setEnd] = useState(false);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return mockEvents.filter(e => {
      const matchesQuery = !q || [e.title, e.type, e.location].some(v => v.toLowerCase().includes(q));
      const matchesCat = category === 'All' || e.type === category;
      return matchesQuery && matchesCat;
    });
  }, [search, category]);

  const pageSlice = useCallback((p: number) => {
    const start = p * EVENT_PAGE_SIZE;
    return filtered.slice(start, start + EVENT_PAGE_SIZE);
  }, [filtered]);

  useEffect(() => {
    // reset when filters change
    setPage(0);
    setEnd(false);
    setData(pageSlice(0));
  }, [filtered, pageSlice]);

  const loadMore = () => {
    if (loading || end) return;
    setLoading(true);
    setTimeout(() => { // simulate network
      const nextPage = page + 1;
      const chunk = pageSlice(nextPage);
      if (!chunk.length) {
        setEnd(true);
      } else {
        setData(prev => [...prev, ...chunk]);
        setPage(nextPage);
      }
      setLoading(false);
    }, 400);
  };

  if (!data.length && !loading) {
    return <EmptyState message="No events found." />;
  }

  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      contentContainerStyle={{ paddingVertical: 16 }}
      renderItem={({ item }) => <EventCard event={item} />}
      onEndReachedThreshold={0.4}
      onEndReached={loadMore}
      ListFooterComponent={<LoadingFooter loading={loading && !end} />}
    />
  );
};
