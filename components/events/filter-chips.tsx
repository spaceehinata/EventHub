import React from 'react';
import { ScrollView, Pressable, Text, StyleSheet, View } from 'react-native';

export interface ChipOption { value: string; label: string; }

interface Props {
  options: ChipOption[];
  value: string | null;
  onChange: (val: string | null) => void;
}

export const FilterChips: React.FC<Props> = ({ options, value, onChange }) => {
  return (
    <View style={{ marginTop: 6 }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Pressable onPress={() => onChange(null)} style={[styles.chip, value == null && styles.active]}>
          <Text style={[styles.text, value == null && styles.activeText]}>All</Text>
        </Pressable>
        {options.map(opt => {
          const active = value === opt.value;
          return (
            <Pressable key={opt.value} onPress={() => onChange(opt.value)} style={[styles.chip, active && styles.active]}>
              <Text style={[styles.text, active && styles.activeText]}>{opt.label}</Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  chip: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  active: {
    backgroundColor: '#7e22ce',
  },
  text: {
    fontSize: 14,
    color: '#334155',
    fontWeight: '500',
  },
  activeText: {
    color: '#fff',
  },
});
