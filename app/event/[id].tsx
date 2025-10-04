import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, Stack } from 'expo-router';
import { ScrollView, View, Text, StyleSheet, Image, Pressable, ActivityIndicator, Linking } from 'react-native';
import { useFavorites } from '@/hooks/useFavorites';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { getEventDetails, NormalizedEvent } from '@/services/api';

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [event, setEvent] = useState<NormalizedEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const detail = await getEventDetails(id);
        if (mounted) setEvent(detail);
      } catch (e: any) {
        if (mounted) setError(e?.message || 'Failed to load event');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [id]);
  const { isFavorite, toggleFavorite } = useFavorites();
  const scheme = useColorScheme() ?? 'light';
  const c = Colors[scheme];
  if (loading) return <View style={{ padding: 40 }}><ActivityIndicator /></View>;
  if (error) return <View style={{ padding: 24 }}><Text style={{ color: 'red' }}>{error}</Text></View>;
  if (!event) return <Text style={{ padding: 24, color: c.text }}>Event not found.</Text>;
  const fav = isFavorite(event.id);
  const ticketUrl = (event.raw && event.raw.url) || undefined;
  const image = event.image;
  const venue = event.venue || [ (event as any).city, (event as any).country ].filter(Boolean).join(', ');

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: c.background }] }>
      <Stack.Screen options={{ title: event.name }} />
      {image ? <Image source={{ uri: image }} style={styles.hero} /> : <View style={[styles.hero, { backgroundColor: '#e2e8f0' }]} />}
      <View style={styles.headerRow}>
        <Text style={[styles.title, { color: c.text }]}>{event.name}</Text>
        <Pressable
          onPress={() => toggleFavorite(event.id, {
            id: event.id,
            title: event.name,
            date: event.date,
            image: image,
            venue: venue,
            type: event.classification || 'Event',
          })}
          hitSlop={10}
        >
          <Text style={[styles.fav, { color: fav ? c.favorite : c.icon }]}>{fav ? '★' : '☆'}</Text>
        </Pressable>
      </View>
      {event.date && <Text style={[styles.meta, { color: c.icon }]}>{new Date(event.date).toLocaleString()}</Text>}
      {venue ? <Text style={[styles.meta, { color: c.icon }]}>{venue}</Text> : null}
      {event.classification ? <View style={[styles.badge, { backgroundColor: c.badgeBg }]}><Text style={[styles.badgeText, { color: c.badgeText }]}>{event.classification}</Text></View> : null}
      {ticketUrl ? (
        <Pressable onPress={() => Linking.openURL(ticketUrl)} style={styles.ticketBtn}>
          <Text style={styles.ticketBtnText}>Get Tickets</Text>
        </Pressable>
      ) : null}
      <Text style={[styles.desc, { color: c.text }]}>More event details will appear here once expanded (pricing, seat map, etc.).</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 8,
  },
  hero: {
    width: '100%',
    height: 220,
    borderRadius: 16,
    marginBottom: 12,
  },
  title: {
    flex: 1,
    fontSize: 22,
    fontWeight: '700',
  },
  meta: {
    fontSize: 14,
    color: '#475569',
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    marginVertical: 6,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  desc: {
    fontSize: 16,
    lineHeight: 22,
    marginTop: 4,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  fav: {
    fontSize: 28,
  },
  ticketBtn: {
    marginTop: 4,
    backgroundColor: '#7e22ce',
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
  },
  ticketBtnText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});
