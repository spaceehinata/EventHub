import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IconSymbol } from './icon-symbol';

interface Props {
  icon: string;
  label: string;
  value: string | undefined | null;
}

export const IconTextRow: React.FC<Props> = ({ icon, label, value }) => {
  if (!value) return null;
  return (
    <View style={styles.row}>
      <IconSymbol name={icon as any} color="#9333ea" size={20} />
      <View style={{ flex: 1 }}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#f5f3ff',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 18,
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    color: '#6b21a8',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  value: {
    fontSize: 16,
    marginTop: 2,
    fontWeight: '500',
  },
});
