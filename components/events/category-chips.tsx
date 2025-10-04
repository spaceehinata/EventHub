import React from 'react';
import { Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { EventType } from '@/data/mockEvents';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface Props {
  categories: EventType[];
  active: EventType | 'All';
  onChange: (c: EventType | 'All') => void;
}

export const CategoryChips: React.FC<Props> = ({ categories, active, onChange }) => {
  const scheme = useColorScheme() ?? 'light';
  const c = Colors[scheme];
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
      {['All', ...categories].map(cat => {
        const selected = cat === active;
        return (
          <Pressable
            key={cat}
            onPress={() => onChange(cat as any)}
            style={[styles.chip, { backgroundColor: selected ? c.tint : c.badgeBg, borderColor: selected ? c.tint : c.border }]}
          >
            <Text style={[styles.chipText, { color: selected ? '#fff' : c.badgeText }]}>{cat}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 22,
    marginRight: 10,
    borderWidth: 1,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});
