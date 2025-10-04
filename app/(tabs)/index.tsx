import { EventCard } from '@/components/events/event-card';
import { FilterChips } from '@/components/events/filter-chips';
import { SearchBar } from '@/components/events/search-bar';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { NormalizedEvent, searchEvents } from '@/services/api';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const [keyword, setKeyword] = useState('');
  const [city, setCity] = useState('');
  const [classification, setClassification] = useState<string | null>(null);
  const [events, setEvents] = useState<NormalizedEvent[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scheme = useColorScheme() ?? 'light';
  const c = Colors[scheme];

  const fetchPage = useCallback(async (nextPage: number, replace = false) => {
    if (loading) return;
    setLoading(true);
    setError(null);
    try {
      const mappedClass = classification === 'other' ? undefined : classification || undefined;
      const res = await searchEvents({ keyword, city, classificationName: mappedClass, page: nextPage, size: 20 });
      setTotalPages(res.totalPages);
      setPage(res.page);
      setEvents(prev => (replace ? res.events : [...prev, ...res.events]));
    } catch (e: any) {
      setError(e?.message || 'Failed to load events');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [keyword, city, classification, loading]);

  useEffect(() => {
    const t = setTimeout(() => fetchPage(0, true), 300);
    return () => clearTimeout(t);
  }, [keyword, city, classification, fetchPage]);

  const onEndReached = () => {
    if (loading) return;
    if (page + 1 >= totalPages) return;
    fetchPage(page + 1);
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchPage(0, true);
  };

  return (
    <View
      // Plain view so no automatic top inset; hero gradient will sit flush
      style={[styles.safe, { backgroundColor: c.background }]}
    >
      <LinearGradient colors={['#ec4899', '#9333ea']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.hero}>
        <View style={styles.heroHeaderRow}>
          <Text style={styles.heroTitle}>{`Discover Events`}</Text>
        </View>
        <Text style={styles.heroSubtitle}>{`Find and book tickets to concerts, sports, theater and more`}</Text>
        <View style={styles.searchWrapper}>
          <SearchBar value={keyword} onChange={setKeyword} placeholder="Search events by name or keyword" />
        </View>
        <FilterChips
          value={classification}
          onChange={setClassification}
          options={[
            { value: 'Music', label: 'Music' },
            { value: 'Sports', label: 'Sports' },
            { value: 'Arts & Theatre', label: 'Theatre' },
            { value: 'other', label: 'Other' },
          ]}
        />
        <Pressable
          style={styles.clearSmall}
          onPress={() => { setCity(''); setClassification(null); setKeyword(''); }}
          hitSlop={8}
        >
          <Text style={styles.clearSmallText}>Clear Filters</Text>
        </Pressable>
      </LinearGradient>
      <View style={styles.container}>
        {error ? (
          <View style={styles.center}>
            <Text style={styles.error}>{error}</Text>
            <Pressable onPress={() => fetchPage(0, true)} style={styles.retryBtn} hitSlop={6}>
              <Text style={styles.retryText}>Retry</Text>
            </Pressable>
          </View>
        ) : (
          <FlatList
            data={events}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <EventCard event={item} />}
            contentContainerStyle={{ paddingVertical: 16, paddingTop: 8 }}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.4}
            refreshing={refreshing}
            onRefresh={onRefresh}
            ListFooterComponent={loading ? (
              <View style={{ paddingVertical: 20 }}><ActivityIndicator /></View>
            ) : null}
            ListEmptyComponent={!loading ? (
              <View style={styles.center}><Text style={styles.empty}>No events found</Text></View>
            ) : null}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  favNav: { fontSize: 20, color: '#9333ea' },
  hero: {
    paddingHorizontal:15,
    paddingTop: 0,
    paddingBottom: 15,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
  },
  heroHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  heroTitle: {
    fontSize: 30,
    lineHeight: 30,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 0.5,
    marginTop: 55,
  },
  heroSubtitle: {
    color: '#fde7ff',
    fontSize: 15,
    lineHeight: 20,
    marginTop: 16,
    marginBottom: 26,
    fontWeight: '500',
  },
  searchWrapper: { marginBottom: 14 },
  cityWrapper: { marginBottom: 12 },
  cityInput: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 14,
    fontSize: 15,
  },
  clearSmall: { marginTop: 14, alignSelf: 'flex-start', paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.15)' },
  clearSmallText: { color: '#fff', fontSize: 12, fontWeight: '600', letterSpacing: 0.5 },
  container: { flex: 1, paddingHorizontal: 16 },
  center: { alignItems: 'center', padding: 40 },
  error: { color: '#dc2626', marginBottom: 12, textAlign: 'center' },
  retryBtn: { backgroundColor: '#7e22ce', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8, marginTop: 4 },
  retryText: { color: '#fff', fontWeight: '600' },
  empty: { color: '#64748b' },
});
