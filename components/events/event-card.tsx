import { Colors } from '@/constants/theme';
import { EventItem } from '@/data/mockEvents';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useFavorites } from '@/hooks/useFavorites';
import { NormalizedEvent } from '@/services/api';
import { Link } from 'expo-router';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

type EventLike = EventItem | (NormalizedEvent & { thumbnail?: string; location?: string; type?: string });

interface Props { event: EventLike; }

export const EventCard: React.FC<Props> = ({ event }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const scheme = useColorScheme() ?? 'light';
  const c = Colors[scheme];
  const fav = isFavorite(event.id);

  const title = 'title' in event ? (event as EventItem).title : event.name;
  const dateStr = (event as any).date || (event as any).dateTime || (event as any).dates?.start?.dateTime;
  const date = dateStr ? new Date(dateStr) : null;
  const dateDisplay = date ? date.toLocaleDateString() : 'TBA';
  const timeDisplay = date ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
  const image = (event as any).thumbnail || (event as any).image;
  const location = (event as any).location || (event as any).venue || [ (event as any)?.city, (event as any)?.country ].filter(Boolean).join(', ');
  const category = (event as any).type || (event as any).classification || 'Event';
  const priceMin = (event as any).priceMin;
  const priceMax = (event as any).priceMax;
  const currency = (event as any).currency || 'USD';
  const priceDisplay = priceMin != null ? `$${priceMin.toFixed(2)}` + (priceMax && priceMax !== priceMin ? ` - $${priceMax.toFixed(2)}` : '') : '—';

  const handleToggleFav = () => {
    toggleFavorite(event.id, {
      id: event.id,
      title,
      date: dateStr || null,
      image,
      location,
      venue: (event as any).venue,
      type: category,
    });
  };

  return (
    <View style={styles.outerWrap}>
      <Link href={{ pathname: '/event/[id]', params: { id: event.id } }} asChild>
        <Pressable style={[styles.card, { backgroundColor: '#fff' }]} android_ripple={{ color: '#f1f5f9' }}>
          <View style={styles.imageWrapper}>
            {image ? (
              <Image source={{ uri: image }} style={styles.heroImage} />
            ) : (
              <View style={[styles.heroImage, styles.imagePlaceholder]} />
            )}
            <View style={styles.overlayRow}>
              <View style={styles.badge}><Text style={styles.badgeText}>{category}</Text></View>
              <Pressable onPress={handleToggleFav} hitSlop={8} style={[styles.heartWrap, fav && styles.heartActive]}>
                <Text style={[styles.heartIcon, fav && styles.heartIconActive]}>{fav ? '♥' : '♡'}</Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.body}>            
            <Text style={styles.title} numberOfLines={2}>{title}</Text>
            <View style={styles.row}>              
              <Text style={styles.rowText} numberOfLines={1}>{dateDisplay}{timeDisplay ? ` • ${timeDisplay}` : ''}</Text>
            </View>
            {location ? (
              <View style={styles.row}>
                <Text style={styles.iconText}>📍</Text>
                <Text style={styles.rowText} numberOfLines={1}>{location}</Text>
              </View>
            ) : null}
            <View style={styles.footerRow}>
              <View style={{ flex: 1 }} />
              <Link href={{ pathname: '/event/[id]', params: { id: event.id } }} asChild>
                <Pressable style={styles.ctaBtn}>
                  <Text style={styles.ctaText}>View Details</Text>
                </Pressable>
              </Link>
            </View>
          </View>
        </Pressable>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  outerWrap: { marginBottom: 18 },
  card: {
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    borderWidth: 1,
    borderColor: '#ececec',
  },
  imageWrapper: { position: 'relative' },
  heroImage: { width: '100%', height: 140, resizeMode: 'cover' },
  imagePlaceholder: { backgroundColor: '#e2e8f0' },
  overlayRow: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: '#ec4899',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
  },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: '600', letterSpacing: 0.5 },
  heartWrap: {
    backgroundColor: '#fff',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  heartActive: { backgroundColor: '#fff' },
  heartIcon: { fontSize: 20, color: '#475569' },
  heartIconActive: { color: '#ec4899' },
  body: { padding: 16 },
  title: { fontSize: 18, fontWeight: '700', color: '#1e293b', marginBottom: 10 },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  iconText: { fontSize: 14, marginRight: 6 },
  rowText: { flex: 1, fontSize: 14, color: '#475569' },
  footerRow: { flexDirection: 'row', alignItems: 'center', marginTop: 14 },
  ctaBtn: { backgroundColor: '#9333ea', paddingHorizontal: 18, paddingVertical: 10, borderRadius: 14 },
  ctaText: { color: '#fff', fontSize: 13, fontWeight: '600', letterSpacing: 0.5 },
});
