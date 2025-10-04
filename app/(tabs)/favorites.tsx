import React, { useMemo } from 'react';
import { SafeAreaView, View, StyleSheet, FlatList } from 'react-native';
import { useFavorites } from '@/hooks/useFavorites';
import { EventCard } from '@/components/events/event-card';
import { EmptyState } from '@/components/events/empty-state';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function FavoritesScreen() {
  const { favorites, snapshots } = useFavorites();
  const scheme = useColorScheme() ?? 'light';
  const c = Colors[scheme];
  const items = useMemo(() => {
    const list = Array.from(favorites).map(id => {
      const snap = snapshots[id];
      if (!snap) {
        console.warn('Missing favorite snapshot for id', id);
        return null;
      }
      return {
        id: snap.id,
        title: snap.title,
        date: snap.date || undefined,
        location: snap.location || snap.venue,
        thumbnail: snap.image,
        type: snap.type || 'Event',
        description: '',
      };
    }).filter(Boolean) as any[];
    return list;
  }, [favorites, snapshots]);

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: c.subtleBackground }] }>
      <View style={[styles.container, { backgroundColor: c.background }]}>
        {!items.length ? (
          <EmptyState message="You haven't added any favorites yet." />
        ) : (
          <FlatList
            data={items}
            keyExtractor={i => i.id}
            contentContainerStyle={{ paddingVertical: 16 }}
            renderItem={({ item }) => <EventCard event={item as any} />}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 16 },
});
