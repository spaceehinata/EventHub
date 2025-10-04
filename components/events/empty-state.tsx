import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const EmptyState: React.FC<{ message: string }> = ({ message }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 40,
    alignItems: 'center',
  },
  text: {
    color: '#64748b',
    fontSize: 14,
  },
});
